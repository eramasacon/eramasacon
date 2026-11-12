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
PUBLIC = PROJECT / "public"
SITE = "https://eramasacon.com"


@dataclass
class PageSpec:
    """A WordPress page to port: its page-cache folder, Elementor page ID and
    how its top-level Elementor sections are grouped into components."""
    cache_dir: str          # folder under the WP-Optimize cache, e.g. "about-us"
    page_id: int            # Elementor / WordPress post ID
    name: str               # component folder and CSS name, e.g. "about"
    component: str          # page component name, e.g. "AboutPage"
    sections: list[tuple[str, list[str]]]


PAGES: dict[str, PageSpec] = {
    "home": PageSpec("home", 45, "home", "HomePage", [
        ("Hero", ["fc5da28", "9d527f3", "92f0964", "c79b068", "3344d06"]),
        ("Introduction", ["e64adbd"]),
        ("Services", ["7a24bee"]),
        ("Clients", ["58749c8"]),
        ("Values", ["b80c63d"]),
        ("WhyUs", ["121f708"]),
        ("Testimonials", ["59490c0", "1bdd178"]),
    ]),
    "about": PageSpec("about-us", 48, "about", "AboutPage", [
        ("Banner", ["50faf93", "1760284", "87d5e3e", "a8c0f23"]),
        ("Introduction", ["ccdfbc1"]),
        ("GlobalPresence", ["b5b869f", "25df6e8"]),
        ("Values", ["4c6cbba"]),
        ("MissionVision", ["17a1c3c", "9fe672f"]),
    ]),
}
# The header, footer and shared stylesheet bundle are taken from this page.
CHROME_PAGE = "home"
# Section 1bdd178's shortcode widget (7d08f0d) embeds template 2703, the
# "Trading Solutions" sticky button. Trading is out of scope for the Contracting
# site (see MIGRATION_PLAN.md), so the embedded template is dropped; the empty
# section/widget wrappers stay because their spacing is part of the layout.
SKIPPED_TEMPLATE_IDS = {"2703"}


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


CURRENT_ITEM_CLASSES = {"current-menu-item", "current_page_item", "current-menu-ancestor", "current-menu-parent",
                        "current_page_parent", "current_page_ancestor", "page_item", "active"}


def strip_classes(attr: str, remove: set[str]) -> str:
    """Remove classes (and WordPress page-item-N markers) from a className="..." attribute."""
    value = attr[len('className="'):-1]
    kept = [c for c in value.split() if c not in remove and not re.fullmatch(r"page-item-\d+", c)]
    return f'className="{" ".join(kept)}"'


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
                value, _ = page_href(value)
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

        # WordPress nav menus: "current page" classes follow the URL (menu-item.tsx).
        if n.tag == "li" and "menu-item" in cls:
            link = next((c for c in n.children if isinstance(c, Node) and c.tag == "a"), None)
            if link is not None and page_href(link.attrs.get("href") or "")[1]:
                self.imports.add('import { MenuItem, MenuLink } from "@/components/wordpress/menu-item";')
                path = page_href(link.attrs["href"])[0]
                below = sorted({page_href(a.attrs["href"])[0] for a in walk(n)
                                if a is not link and a.tag == "a" and page_href(a.attrs.get("href") or "")[1]})
                attrs = re.sub(r'className="[^"]*"', lambda m: strip_classes(m.group(0), CURRENT_ITEM_CLASSES), attrs)
                extra = f' path="{path}"' + (f" descendantPaths={{{json.dumps(below)}}}" if below else "")
                tag = "MenuItem"
        if tag == "a" and n.attrs.get("href") is not None and page_href(n.attrs["href"])[1]:
            in_menu = n.parent is not None and n.parent.tag == "li" and "menu-item" in n.parent.classes()
            if in_menu:
                attrs = re.sub(r'className="[^"]*"', lambda m: strip_classes(m.group(0), {"active"}), attrs)
            tag = "MenuLink" if in_menu else "Link"
            self.uses_link |= not in_menu
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
STYLESHEET_PATTERN = re.compile(r"<link[^>]*rel=['\"]stylesheet['\"][^>]*>|<style([^>]*)>(.*?)</style>", re.S)
BODY_FONT_RULE = "/* from template 2703 */\nbody { font-family: var(--font-open-sans), sans-serif; }"


def page_stylesheet_ids(page_id: int) -> set[str]:
    return {f"elementor-post-{page_id}-css", f"happy-elementor-addons-{page_id}-css"}


def parse_link(tag: str) -> tuple[str, str | None, str] | None:
    """(id, site-root path or None if external, href) for a stylesheet <link>; None for Google Fonts."""
    href = unescape(re.search(r"href=['\"]([^'\"]+)", tag).group(1))
    if "fonts.googleapis.com" in href:
        return None  # replaced by next/font in app/fonts.ts
    sid = (re.search(r"id=['\"]([^'\"]+)", tag) or [None, ""])[1]
    return sid, local_path(href), href


def stylesheet_links(html: str):
    """Yield parse_link() results for each stylesheet <link>, in document order."""
    for m in STYLESHEET_PATTERN.finditer(html):
        if m.group(0).startswith("<link") and (link := parse_link(m.group(0))):
            yield link


def stylesheet_block(path: str) -> str | None:
    src = WP_ROOT / path.lstrip("/")
    if not src.is_file():
        warnings.append(f"missing stylesheet: {path}")
        return None
    return f"/* {path} */\n{rewrite_css(src.read_text(errors='replace'), urljoin(SITE, path))}"


def write_css(name: str, blocks: list[str]) -> None:
    out = PUBLIC / "legacy/css"
    out.mkdir(parents=True, exist_ok=True)
    note = "/* Generated by scripts/wp-port/port_page.py from the WordPress page cache. */\n"
    (out / f"{name}.css").write_text(note + "\n".join(blocks))
    print(f"wrote public/legacy/css/{name}.css ({len(blocks)} blocks)")


def build_site_css(html: str, page_id: int, body_styles: list[str]) -> set[str]:
    """Shared bundle: everything the chrome page loaded except its own page CSS.
    Returns the stylesheet paths it contains."""
    body_start = html.find("<body")
    blocks, paths = [], set()
    for m in STYLESHEET_PATTERN.finditer(html):
        tag = m.group(0)
        if tag.startswith("<link"):
            link = parse_link(tag)
            if link is None:
                continue
            sid, path, href = link
            if path is None:
                warnings.append(f"external stylesheet skipped: {href}")
                continue
            if sid in page_stylesheet_ids(page_id):
                continue
            block = stylesheet_block(path)
            if block:
                blocks.append(block)
                paths.add(path)
        elif m.start() < body_start and m.group(2).strip():
            label = (re.search(r"id=['\"]([^'\"]+)", m.group(1)) or [None, "inline head style"])[1]
            blocks.append(f"/* inline: {label} */\n{rewrite_css(m.group(2), SITE + '/')}")
    blocks.extend(f"/* inline body style */\n{rewrite_css(css, SITE + '/')}" for css in body_styles)
    write_css("site", blocks)
    return paths


def build_page_css(name: str, html: str, site_paths: set[str], body_styles: list[str], has_body_font: bool) -> None:
    """Page bundle: the page's stylesheets that are not already in site.css."""
    blocks = []
    for sid, path, href in stylesheet_links(html):
        if path is None:
            warnings.append(f"external stylesheet skipped: {href}")
        elif path not in site_paths:
            block = stylesheet_block(path)
            if block:
                blocks.append(block)
    blocks.extend(f"/* inline page style */\n{rewrite_css(css, SITE + '/')}" for css in body_styles)
    if has_body_font:
        # The removed Trading template (2703) also set the body font for the
        # whole page; every unstyled text inherits it, so keep that one rule.
        blocks.append(BODY_FONT_RULE)
    write_css(f"page-{name}", blocks)


# ----------------------------------------------------------------------- main
def load(cache_dir: str) -> tuple[str, Node]:
    html = (CACHE / cache_dir / "index.html").read_text()
    builder = TreeBuilder()
    builder.feed(html)
    return html, builder.root


def without_skipped_templates(html: str) -> str:
    """Cut the skipped Trading template (with its own <link>/<style> tags) out of the source."""
    start = html.find('data-elementor-id="2703"')
    end = html.find("wpr-template-edit-btn", start)
    return html[:start] + html[end:] if start != -1 and end != -1 else html


def body_inline_styles(html: str) -> list[str]:
    body_start = html.find("<body")
    return [m.group(1).strip() for m in re.finditer(r"<style[^>]*>(.*?)</style>", html[body_start:], re.S) if m.group(1).strip()]


def port_chrome() -> tuple[set[str], set[str]]:
    """Header, footer, scroll-to-top and site.css. Returns (site css paths, chrome inline styles)."""
    spec = PAGES[CHROME_PAGE]
    html, root = load(spec.cache_dir)
    header = find(root, lambda n: n.tag == "header" and n.attrs.get("id") == "masthead")
    footer = find(root, lambda n: n.tag == "footer" and n.attrs.get("id") == "colophon")
    scroll_top = find(root, lambda n: n.attrs.get("id") == "ast-scroll-top")
    emitters = []
    for path, name, node in [("site-header", "SiteHeader", header), ("site-footer", "SiteFooter", footer),
                             ("scroll-to-top", "ScrollToTop", scroll_top)]:
        em = Emitter()
        write_component(PROJECT / f"components/site/{path}.tsx", name, [node], em)
        emitters.append(em)
    chrome_styles = {css for em in emitters for css in em.styles}
    page = find(root, lambda n: n.tag == "div" and f"elementor-{spec.page_id}" in n.classes())
    page_styles = {n.text().strip() for n in walk(page) if n.tag == "style"}
    css_source = without_skipped_templates(html)
    # Body <style> blocks outside the page content (e.g. Unlimited Elements overlay CSS) are shared.
    shared = [css for css in body_inline_styles(css_source) if css not in page_styles]
    site_paths = build_site_css(css_source, spec.page_id, shared)
    return site_paths, set(shared) | chrome_styles


def port_page(key: str, site_paths: set[str], site_styles: set[str]) -> None:
    spec = PAGES[key]
    html, root = load(spec.cache_dir)
    page = find(root, lambda n: n.tag == "div" and f"elementor-{spec.page_id}" in n.classes())
    sections = {
        next(c[len("elementor-element-"):] for c in s.classes() if c.startswith("elementor-element-")): s
        for s in page.children if isinstance(s, Node) and s.tag == "section"
    }
    print(f"page {spec.page_id} sections:", list(sections))
    covered = [i for _, ids in spec.sections for i in ids]
    if set(sections) != set(covered):
        warnings.append(f"page {spec.page_id}: unmapped {set(sections) - set(covered)}, unknown {set(covered) - set(sections)}")

    page_styles: list[str] = []
    imports = []
    for name, ids in spec.sections:
        em = Emitter()
        write_component(PROJECT / f"components/{spec.name}/sections/{kebab(name)}.tsx", name,
                        [sections[i] for i in ids if i in sections], em)
        page_styles.extend(em.styles)
        imports.append(f'import {{ {name} }} from "./sections/{kebab(name)}";')

    css_source = without_skipped_templates(html)
    extra = [css for css in body_inline_styles(css_source) if css not in site_styles and css not in page_styles]
    build_page_css(spec.name, css_source, site_paths, page_styles + extra,
                   has_body_font='data-elementor-id="2703"' in html)

    body = "\n".join(f"      <{name} />" for name, _ in spec.sections)
    src = (f"{HEADER}import {{ WordPressPage }} from \"@/components/wordpress/wordpress-page\";\n"
           + "\n".join(sorted(imports)) + "\n\n"
           + f"/** WordPress page {spec.page_id} (/{spec.cache_dir}/), section by section. */\n"
           + f"export function {spec.component}() {{\n  return (\n"
           + f'    <WordPressPage pageId={{{spec.page_id}}} stylesheet="/legacy/css/page-{spec.name}.css">\n'
           + f"{body}\n    </WordPressPage>\n  );\n}}\n")
    path = PROJECT / f"components/{spec.name}/{spec.name}-page.tsx"
    path.write_text(src)
    print(f"wrote {path.relative_to(PROJECT)}")


def main() -> None:
    keys = sys.argv[1:] or list(PAGES)
    unknown = set(keys) - set(PAGES)
    if unknown:
        raise SystemExit(f"unknown page(s) {unknown}; choose from {list(PAGES)}")
    site_paths, site_styles = port_chrome()
    for key in keys:
        port_page(key, site_paths, site_styles)
    if warnings:
        print("\nWARNINGS:\n  " + "\n  ".join(sorted(set(warnings))))
    print(f"\ncopied {len(copied)} assets into public/")


if __name__ == "__main__":
    sys.exit(main())
