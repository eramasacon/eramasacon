#!/usr/bin/env python3
"""
One-off migration tool: ports a WordPress/Elementor page, as rendered by the
live site and saved by WP-Optimize's page cache, into Next.js components.

It keeps the original Elementor/Astra markup and class names and bundles the
exact stylesheets the page loaded, so the result renders like the WordPress
page. jQuery/plugin scripts are not shipped; the few behaviours the page needs
are reimplemented in components/wordpress/elementor-runtime.tsx.

Usage (from eramasacon-nextjs/):
    python3 scripts/wp-port/port_page.py

The generated .tsx files are normal source files afterwards. Re-running the
script overwrites them, so only re-run before hand-editing them.
"""
from __future__ import annotations

import json
import re
import shutil
import sys
from dataclasses import dataclass, field
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit

PROJECT = Path(__file__).resolve().parents[2]
WP_ROOT = PROJECT.parent / "wordpress-extracted"
CACHE = WP_ROOT / "wp-content/cache/wpo-cache/eramasacon.com"
SOURCE_HTML = CACHE / "home/index.html"
PUBLIC = PROJECT / "public"
SITE = "https://eramasacon.com"

# Top-level sections of Elementor page 45 -> generated component.
HOME_SECTIONS: list[tuple[str, list[str]]] = [
    ("Hero", ["fc5da28", "9d527f3", "92f0964", "c79b068", "3344d06"]),
    ("Introduction", ["e64adbd"]),
    ("Services", ["7a24bee"]),
    ("Clients", ["58749c8"]),
    ("Values", ["b80c63d"]),
    ("WhyUs", ["121f708"]),
    ("Testimonials", ["59490c0", "1bdd178"]),
]
# Section 1bdd178's shortcode widget (7d08f0d) embeds template 2703, the
# "Trading Solutions" sticky button. Trading is out of scope for the Contracting
# site (see MIGRATION_PLAN.md), so the embedded template is dropped; the empty
# section/widget wrappers stay because their spacing is part of the layout.
SKIPPED_TEMPLATE_IDS = {"2703"}

# Stylesheets that belong to page 45 rather than the shared header/footer chrome.
PAGE_STYLESHEET_IDS = {"elementor-post-45-css", "happy-elementor-addons-45-css"}

# Google font families loaded by Elementor -> next/font CSS variable.
FONT_VARS = {
    "Roboto": "--font-roboto",
    "Roboto Slab": "--font-roboto-slab",
    "Poppins": "--font-poppins",
    "DM Sans": "--font-dm-sans",
    "Space Grotesk": "--font-space-grotesk",
    "Questrial": "--font-questrial",
    "Open Sans": "--font-open-sans",
}

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
RAW = {"script", "style"}
INLINE = {"a", "span", "i", "img", "svg", "strong", "em", "b", "br", "button", "label", "input", "small", "sup", "sub", "u", "abbr", "code"}
ATTR_RENAME = {
    "class": "className", "for": "htmlFor", "tabindex": "tabIndex", "srcset": "srcSet",
    "fetchpriority": "fetchPriority", "crossorigin": "crossOrigin", "itemscope": "itemScope",
    "itemtype": "itemType", "itemprop": "itemProp", "readonly": "readOnly", "maxlength": "maxLength",
    "colspan": "colSpan", "rowspan": "rowSpan", "autocomplete": "autoComplete", "enctype": "encType",
    "novalidate": "noValidate", "frameborder": "frameBorder", "allowfullscreen": "allowFullScreen",
    "datetime": "dateTime", "xml:space": "xmlSpace", "xmlns:xlink": "xmlnsXlink", "xlink:href": "xlinkHref",
    "viewbox": "viewBox", "referrerpolicy": "referrerPolicy",
}
DROP_ATTRS = {"data-id", "data-element_type", "data-e-type", "data-widget_type", "data-elementor-settings", "data-settings"}
SVG_TAGS = {"svg", "path", "g", "circle", "rect", "line", "polygon", "polyline", "ellipse", "defs", "use", "lineargradient", "radialgradient", "stop", "clippath", "mask", "symbol", "text", "tspan"}
SVG_CASE = {"lineargradient": "linearGradient", "radialgradient": "radialGradient", "clippath": "clipPath"}

warnings: list[str] = []
copied: set[str] = set()


# ---------------------------------------------------------------- DOM parsing
@dataclass
class Node:
    tag: str
    attrs: dict[str, str | None] = field(default_factory=dict)
    children: list["Node | str"] = field(default_factory=list)
    parent: "Node | None" = None

    def classes(self) -> list[str]:
        return (self.attrs.get("class") or "").split()

    def text(self) -> str:
        return "".join(c if isinstance(c, str) else c.text() for c in self.children)


class TreeBuilder(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("#root")
        self.stack = [self.root]

    # Implied end tags from the HTML parsing spec (WordPress menus omit </li>).
    CLOSES_P = {"address", "article", "aside", "blockquote", "div", "dl", "fieldset", "figure", "footer", "form",
                "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "nav", "ol", "p", "pre", "section", "table", "ul"}

    def close_implied(self, tag: str) -> None:
        def pop_to(name: str, boundary: set[str]) -> None:
            for i in range(len(self.stack) - 1, 0, -1):
                if self.stack[i].tag == name:
                    del self.stack[i:]
                    return
                if self.stack[i].tag in boundary:
                    return
        if tag == "li":
            pop_to("li", {"ul", "ol"})
        if tag in ("dt", "dd"):
            pop_to("dt", {"dl"}); pop_to("dd", {"dl"})
        if tag in self.CLOSES_P:
            pop_to("p", {"div", "section", "li", "td", "button", "article", "header", "footer"})

    def handle_starttag(self, tag, attrs):
        self.close_implied(tag)
        node = Node(tag, dict(attrs), parent=self.stack[-1])
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        node = Node(tag, dict(attrs), parent=self.stack[-1])
        self.stack[-1].children.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def walk(node: Node):
    yield node
    for c in node.children:
        if isinstance(c, Node):
            yield from walk(c)


def find(node: Node, pred) -> Node:
    for n in walk(node):
        if pred(n):
            return n
    raise SystemExit("element not found")


# ------------------------------------------------------------- asset handling
def local_path(url: str) -> str | None:
    """Map an eramasacon.com URL to a site-root path, or None if external."""
    parts = urlsplit(url)
    if parts.netloc and parts.netloc not in ("eramasacon.com", "www.eramasacon.com"):
        return None
    return parts.path


def copy_asset(path: str) -> None:
    if path in copied:
        return
    copied.add(path)
    src = WP_ROOT / path.lstrip("/")
    dst = PUBLIC / path.lstrip("/")
    if not src.is_file():
        warnings.append(f"missing asset: {path}")
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    if not dst.exists() or dst.stat().st_size != src.stat().st_size:
        shutil.copy2(src, dst)


def asset_url(url: str, base: str = SITE + "/") -> str:
    url = url.strip()
    if url.startswith(("data:", "#")) or not url:
        return url
    absolute = urljoin(base, url)
    path = local_path(absolute)
    if path is None:
        return absolute
    copy_asset(path)
    frag = urlsplit(absolute).fragment
    return path + (f"#{frag}" if frag else "")


def page_href(url: str) -> tuple[str, bool]:
    """Return (href, is_internal_page)."""
    if url.startswith(("#", "mailto:", "tel:")):
        return url, False
    path = local_path(urljoin(SITE + "/", url))
    if path is None:
        return url, False
    if path.startswith(("/wp-content/", "/wp-includes/")):
        return asset_url(url), False
    if path in ("/", "/home/", "/home"):
        return "/", True
    return path.rstrip("/") or "/", True


CSS_URL = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)")


def rewrite_css(css: str, base: str) -> str:
    def repl(m: re.Match) -> str:
        url = m.group(2)
        if url.startswith(("data:", "#")):
            return m.group(0)
        return f'url("{asset_url(url, base)}")'

    css = re.sub(r"@charset[^;]*;", "", css)
    css = re.sub(r"/\*# sourceURL=.*?\*/", "", css)
    css = CSS_URL.sub(repl, css)
    for family, var in FONT_VARS.items():
        css = re.sub(rf"([\"']){re.escape(family)}\1", f"var({var})", css)
    return css


# ------------------------------------------------------------ JSX generation
def camel(name: str) -> str:
    head, *rest = name.split("-")
    return head + "".join(p[:1].upper() + p[1:] for p in rest)


def style_object(style: str, base: str = SITE + "/") -> str:
    props = []
    for decl in style.split(";"):
        if ":" not in decl:
            continue
        key, value = decl.split(":", 1)
        key, value = key.strip(), value.strip()
        if not key or not value:
            continue
        value = CSS_URL.sub(lambda m: f'url("{asset_url(m.group(2), base)}")', value)
        js_key = json.dumps(key) if key.startswith("--") else camel(key.lower())
        props.append(f"{js_key}: {json.dumps(value)}")
    return "{{ " + ", ".join(props) + " }}"


def js_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def jsx_attr(name: str, value: str) -> str:
    # JSX string attributes have no escape sequences; use an expression when needed.
    if re.search(r"[\"\\\n{}]", value):
        return f"{name}={{{js_string(value)}}}"
    return f'{name}="{value}"'


def is_hidden_everywhere(n: Node) -> bool:
    c = set(n.classes())
    return {"elementor-hidden-desktop", "elementor-hidden-tablet", "elementor-hidden-mobile"} <= c


class Emitter:
    def __init__(self) -> None:
        self.uses_link = False
        self.imports: set[str] = set()
        self.styles: list[str] = []

    @staticmethod
    def settings(n: Node) -> dict:
        try:
            return json.loads(n.attrs.get("data-settings") or "{}")
        except json.JSONDecodeError:
            return {}

    def skip(self, n: Node) -> bool:
        if n.tag in ("script", "noscript", "template"):
            return True
        if n.tag == "style":
            css = n.text().strip()
            if css:
                self.styles.append(css)
            return True
        cls = n.classes()
        if is_hidden_everywhere(n) or "wpr-template-edit-btn" in cls or "bhf-hidden" in cls:
            return True
        return n.attrs.get("data-elementor-id") in SKIPPED_TEMPLATE_IDS

    def attrs(self, n: Node, tag_out: str) -> str:
        out: list[str] = []
        is_svg = n.tag in SVG_TAGS
        for key, value in n.attrs.items():
            if key in DROP_ATTRS or key.startswith("on"):
                continue
            if key == "xmlns" or (is_svg and key in ("version", "x", "y") and n.tag == "svg"):
                continue
            if key == "style":
                if value and value.strip():
                    out.append(f"style={style_object(value)}")
                continue
            if key == "class":
                value = " ".join(value.split()) if value else ""
            if key == "href" and value is not None:
                value, internal = page_href(value)
                if internal and n.tag == "a":
                    self.uses_link = True
            elif key in ("src", "data-src", "poster") and value:
                value = asset_url(value)
            elif key == "srcset" and value:
                value = ", ".join(
                    " ".join([asset_url(part.split()[0])] + part.split()[1:])
                    for part in value.split(",") if part.strip()
                )
            name = ATTR_RENAME.get(key, key)
            if is_svg and name == key and not key.startswith(("data-", "aria-")) and "-" in key:
                name = camel(key)
            if n.tag == "img" and key == "url":
                continue  # non-standard attribute left by a Jeg Kit widget
            if value is None or name in ("itemScope", "allowFullScreen", "noValidate", "readOnly"):
                out.append(name)
            elif name in ("tabIndex", "colSpan", "rowSpan", "maxLength") and value.lstrip("-").isdigit():
                out.append(f"{name}={{{value}}}")
            else:
                out.append(jsx_attr(name, value))
        return " ".join(out)

    def emit(self, n: Node, depth: int) -> list[str]:
        pad = "  " * depth
        tag = SVG_CASE.get(n.tag, n.tag)
        cls = n.classes()

        # Elementor counter number -> <Counter> (replaces jquery-numerator).
        if "elementor-counter-number" in cls and "data-to-value" in n.attrs:
            self.imports.add('import { Counter } from "@/components/wordpress/counter";')
            a = n.attrs
            delim = f' delimiter={jsx_attr("x", a["data-delimiter"])[2:]}' if a.get("data-delimiter") else ""
            return [f'{pad}<Counter className="elementor-counter-number" from={{{a.get("data-from-value") or 0}}} '
                    f'to={{{a["data-to-value"]}}} duration={{{a.get("data-duration") or 2000}}}{delim} />']

        attrs = self.attrs(n, tag)
        extra = ""
        data = self.settings(n)

        # Elementor entrance animation -> <Animated> (replaces Elementor frontend JS).
        anim = data.get("_animation") or data.get("animation")
        if anim and anim != "none" and n.tag in ("div", "section", "span"):
            self.imports.add('import { Animated } from "@/components/wordpress/animated";')
            delay = data.get("_animation_delay") or data.get("animation_delay")
            extra = f' as="{n.tag}" animation="{anim}"' + (f" delay={{{int(delay)}}}" if delay else "")
            tag = "Animated"

        # Jeg Kit testimonials track -> <TestimonialsTrack> (replaces tiny-slider).
        if "testimonials-track" in cls:
            wrapper = n.parent
            while wrapper is not None and "jkit-testimonials" not in wrapper.classes():
                wrapper = wrapper.parent
            sdata = self.settings(wrapper) if wrapper is not None else {}
            keep = {k: sdata[k] for k in ("autoplay", "autoplay_speed", "autoplay_hover_pause", "responsive") if k in sdata}
            self.imports.add('import { TestimonialsTrack } from "@/components/wordpress/testimonials-track";')
            tag, attrs, extra = "TestimonialsTrack", "", f" settings={{{json.dumps(keep, separators=(', ', ': '))}}}"

        if tag == "a" and n.attrs.get("href") is not None and page_href(n.attrs["href"])[1]:
            tag = "Link"
        open_tag = f"<{tag}{extra}{' ' + attrs if attrs else ''}"
        kids = [c for c in n.children if not (isinstance(c, Node) and self.skip(c))]
        if "elementor-shortcode" in cls and any(
                isinstance(c, Node) and c.attrs.get("data-elementor-id") in SKIPPED_TEMPLATE_IDS for c in n.children):
            # Keep the 20px the removed template's (empty) section occupied in the flow.
            return [f"{pad}{open_tag}>", f'{pad}  <div aria-hidden="true" style={{{{ height: 20 }}}} />', f"{pad}</{tag}>"]
        if n.tag in VOID or not kids:
            return [f"{pad}{open_tag} />"]
        body: list[str] = []
        for i, c in enumerate(kids):
            if isinstance(c, Node):
                body.extend(self.emit(c, depth + 1))
                continue
            if c.strip() == "":
                if c and self.inline_neighbour(kids, i):
                    body.append(f'{pad}  {{" "}}')
                continue
            text = re.sub(r"\s+", " ", c)
            if text != text.strip() or re.search(r"[{}<>&\"'`]", text):
                body.append(f"{pad}  {{{js_string(text)}}}")
            else:
                body.append(f"{pad}  {text}")
        if not body:
            return [f"{pad}{open_tag} />"]
        return [f"{pad}{open_tag}>", *body, f"{pad}</{tag}>"]

    @staticmethod
    def inline_neighbour(kids: list, i: int) -> bool:
        def inline(x) -> bool:
            if x is None:
                return False
            if isinstance(x, str):
                return bool(x.strip())
            return x.tag in INLINE
        prev = kids[i - 1] if i > 0 else None
        nxt = kids[i + 1] if i + 1 < len(kids) else None
        return inline(prev) and inline(nxt) if prev is not None and nxt is not None else False


HEADER = """// Ported from the rendered WordPress page by scripts/wp-port/port_page.py.
// Markup and class names match the original Elementor output so the original
// stylesheets (public/legacy/css) apply unchanged.
"""
# Plain <img> keeps WordPress's exact srcset/sizes and the CSS that targets it.
IMG_LINT = "/* eslint-disable @next/next/no-img-element -- original WordPress srcset/sizes markup */\n"


def write_component(path: Path, name: str, nodes: list[Node], emitter: Emitter, depth_wrap: str | None = None) -> None:
    lines: list[str] = []
    for n in nodes:
        lines.extend(emitter.emit(n, 3 if len(nodes) > 1 else 2))
    import_lines = (['import Link from "next/link";'] if emitter.uses_link else []) + sorted(emitter.imports)
    imports = "\n".join(import_lines) + "\n\n" if import_lines else "\n"
    if len(nodes) > 1:
        jsx = "    <>\n" + "\n".join(lines) + "\n    </>"
    else:
        jsx = "\n".join(l[2:] for l in lines)
    header = HEADER + (IMG_LINT if "<img " in jsx else "")
    src = f"{header}{imports}export function {name}() {{\n  return (\n{jsx}\n  );\n}}\n"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(src)
    print(f"wrote {path.relative_to(PROJECT)}")


def kebab(name: str) -> str:
    return re.sub(r"(?<!^)(?=[A-Z])", "-", name).lower()


# ---------------------------------------------------------------- CSS bundles
def collect_css(html: str, body_styles_page: list[str], body_styles_site: list[str]) -> None:
    body_start = html.find("<body")
    site, page = [], []
    pattern = re.compile(r"<link[^>]*rel=['\"]stylesheet['\"][^>]*>|<style([^>]*)>(.*?)</style>", re.S)
    for m in pattern.finditer(html):
        tag = m.group(0)
        in_body = m.start() > body_start
        if tag.startswith("<link"):
            href = unescape(re.search(r"href=['\"]([^'\"]+)", tag).group(1))
            sid = (re.search(r"id=['\"]([^'\"]+)", tag) or [None, ""])[1]
            if "fonts.googleapis.com" in href:
                continue  # replaced by next/font in app/fonts.ts
            path = local_path(href)
            src = WP_ROOT / path.lstrip("/")
            if not src.is_file():
                warnings.append(f"missing stylesheet: {path}")
                continue
            css = rewrite_css(src.read_text(errors="replace"), urljoin(SITE, path))
            block = f"/* {path} */\n{css}"
            (page if sid in PAGE_STYLESHEET_IDS else site).append(block)
        elif not in_body:
            attrs, css = m.group(1), m.group(2)
            if not css.strip():
                continue
            label = (re.search(r"id=['\"]([^'\"]+)", attrs) or [None, "inline head style"])[1]
            site.append(f"/* inline: {label} */\n{rewrite_css(css, SITE + '/')}")
    site.extend(f"/* inline body style */\n{rewrite_css(s, SITE + '/')}" for s in body_styles_site)
    page.extend(f"/* inline page style */\n{rewrite_css(s, SITE + '/')}" for s in body_styles_page)
    # The removed Trading template (2703) also set the body font for the whole
    # page; every unstyled text inherits it, so keep that one rule.
    page.append("/* from template 2703 */\nbody { font-family: var(--font-open-sans), sans-serif; }")

    out = PUBLIC / "legacy/css"
    out.mkdir(parents=True, exist_ok=True)
    note = "/* Generated by scripts/wp-port/port_page.py from the WordPress page cache. */\n"
    (out / "site.css").write_text(note + "\n".join(site))
    (out / "page-home.css").write_text(note + "\n".join(page))
    print(f"wrote public/legacy/css/site.css ({len(site)} blocks), page-home.css ({len(page)} blocks)")


# ----------------------------------------------------------------------- main
def main() -> None:
    html = SOURCE_HTML.read_text()
    builder = TreeBuilder()
    builder.feed(html)
    root = builder.root

    body = find(root, lambda n: n.tag == "body")
    print("body classes:", body.attrs.get("class"))

    header = find(root, lambda n: n.tag == "header" and n.attrs.get("id") == "masthead")
    footer = find(root, lambda n: n.tag == "footer" and n.attrs.get("id") == "colophon")
    scroll_top = find(root, lambda n: n.attrs.get("id") == "ast-scroll-top")
    page = find(root, lambda n: "elementor-45" in n.classes() and n.tag == "div")

    sections = {
        next(c[len("elementor-element-"):] for c in s.classes() if c.startswith("elementor-element-")): s
        for s in page.children if isinstance(s, Node) and s.tag == "section"
    }
    print("page 45 sections:", list(sections))

    site_emitter = Emitter()
    write_component(PROJECT / "components/site/site-header.tsx", "SiteHeader", [header], site_emitter)
    footer_emitter = Emitter()
    write_component(PROJECT / "components/site/site-footer.tsx", "SiteFooter", [footer], footer_emitter)
    top_emitter = Emitter()
    write_component(PROJECT / "components/site/scroll-to-top.tsx", "ScrollToTop", [scroll_top], top_emitter)

    page_styles: list[str] = []
    for name, ids in HOME_SECTIONS:
        em = Emitter()
        write_component(PROJECT / f"components/home/sections/{kebab(name)}.tsx", name, [sections[i] for i in ids], em)
        page_styles.extend(em.styles)
    covered = {i for _, ids in HOME_SECTIONS for i in ids}
    if set(sections) - covered:
        warnings.append(f"unmapped sections: {set(sections) - covered}")

    # Body-level <style> blocks outside the regions above (e.g. Unlimited
    # Elements overlay CSS) are shared site CSS.
    # The skipped Trading template carries its own <link>/<style> tags; cut it
    # out of the source before collecting stylesheets.
    start = html.find('data-elementor-id="2703"')
    end = html.find("wpr-template-edit-btn", start)
    css_source = html[:start] + html[end:] if start != -1 and end != -1 else html
    region_styles = set(page_styles) | set(site_emitter.styles) | set(footer_emitter.styles)
    shared_body_styles = []
    body_start = css_source.find("<body")
    for m in re.finditer(r"<style[^>]*>(.*?)</style>", css_source[body_start:], re.S):
        css = m.group(1).strip()
        if css and css not in region_styles:
            shared_body_styles.append(css)
    collect_css(css_source, page_styles, site_emitter.styles + footer_emitter.styles + shared_body_styles)

    if warnings:
        print("\nWARNINGS:\n  " + "\n  ".join(sorted(set(warnings))))
    print(f"\ncopied {len(copied)} assets into public/")


if __name__ == "__main__":
    sys.exit(main())
