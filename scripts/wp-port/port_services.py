#!/usr/bin/env python3
"""Port only service pages; preserve hand-edited shared chrome and other pages."""
from pathlib import Path
import json
import port_page as port

SLUGS = [
    "services", "hvac-contracting", "electrical-and-instrumentation",
    "mep-design-consultancy", "flooring-and-landscaping",
    "civil-and-mechanical-construction", "firefighting", "fabrication",
    "testing-and-air-balancing", "cleaning-services",
]


def main():
    home, _ = port.load("home")
    source = port.without_skipped_templates(home)
    paths = {path for sid, path, _ in port.stylesheet_links(source)
             if path and sid not in port.page_stylesheet_ids(45)}
    styles = set(port.body_inline_styles(source))
    for slug in SLUGS:
        _, root = port.load(slug)
        page = port.find(root, lambda n: n.attrs.get("data-elementor-type") == "wp-page")
        page_id = int(page.attrs["data-elementor-id"])
        sections = [n.attrs["data-id"] for n in page.children
                    if isinstance(n, port.Node) and n.tag == "section"]
        component = "".join(word.title() for word in slug.split("-")) + "Page"
        groups = [("Banner", sections[:4]), ("ServiceOverview", sections[4:])] if slug == "services" else [
            ("Banner", sections[:2]), ("ServiceDetails", sections[2:])]
        port.PAGES[slug] = port.PageSpec(slug, page_id, slug, component, groups)
        port.port_page(slug, paths, styles)
        heading = port.find(page, lambda n: n.tag in {"h1", "h2"})
        title = heading.text().strip() if heading else slug.replace("-", " ").title()
        route = port.PROJECT / "app" / slug
        route.mkdir(exist_ok=True)
        (route / "page.tsx").write_text(
            'import type { Metadata } from "next";\n'
            f'import {{ {component} }} from "@/components/{slug}/{slug}-page";\n\n'
            f'export const metadata: Metadata = {{ title: {json.dumps(title)} }};\n\n'
            f'export default function Page() {{\n  return <{component} />;\n}}\n')
    for warning in sorted(set(port.warnings)):
        print("WARNING:", warning)
    print(f"Copied {len(port.copied)} assets")


if __name__ == "__main__":
    main()
