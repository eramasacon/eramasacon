# WordPress → Next.js home page port

The home page (`/`) is a port of WordPress page 45 (`/home/`) as the live site rendered it.

## Source

`../wordpress-extracted/wp-content/cache/wpo-cache/eramasacon.com/home/index.html` is the WP-Optimize page cache: the full HTML WordPress served, including the Elementor header (546), page (45) and footer (122). Stylesheets and media come from `../wordpress-extracted/`.

## How it works

`python3 scripts/wp-port/port_page.py` (run from this folder):

- Converts the rendered markup to JSX, keeping Elementor/Astra class names:
  - `components/site/site-header.tsx`, `site-footer.tsx`, `scroll-to-top.tsx`
  - `components/home/sections/*.tsx`, one file per group of Elementor sections
- Bundles every stylesheet the page loaded, in the original order, into `public/legacy/css/site.css` (theme, plugins, header/footer) and `public/legacy/css/page-home.css` (page 45 only). Google Fonts links are replaced by `next/font` (`app/fonts.ts`) through `var(--font-*)`.
- Copies every referenced image, font and the company-profile PDF to the same paths under `public/` (`/wp-content/uploads/...`), so the old media URLs keep working.

Re-running the script overwrites the generated `.tsx` files. Once you hand-edit them, stop re-running it.

## Behaviour that replaced jQuery/plugin scripts

| WordPress script | Replacement |
| --- | --- |
| Elementor entrance animations | `components/wordpress/animated.tsx` |
| Elementor counter (jquery-numerator) | `components/wordpress/counter.tsx` |
| Jeg Kit testimonials (tiny-slider) | `components/wordpress/testimonials-track.tsx` (no mouse-drag) |
| ElementsKit menu, Astra scroll-to-top | `components/wordpress/elementor-runtime.tsx` |

## Intentional differences

- The "Trading Solutions" sticky button (template 2703) is left out because the site is Contracting-only (see `MIGRATION_PLAN.md`). The body font it set (Open Sans) and the 20px it took up in the page flow are kept. Its `body { padding-bottom: 50px }` is dropped, so the page is 50px shorter at the bottom.
- The "Get In Touch" header section, which was hidden on every device, is not rendered.

## Verification (12 Nov 2026)

Element positions and sizes were compared against https://eramasacon.com/home/ in Chrome at 1440, 1024, 768 and 390px wide. All Elementor elements match to within 1.3px. A full-page pixel diff differs only at the removed Trading button and at the testimonial carousel position, which changes over time.

## Known follow-ups

- `site.css` is about 2.6 MB because it ships whole plugin stylesheets (Font Awesome, HT Mega, ElementsKit). Removing unused rules would shrink it, but the page needs to be re-checked visually afterwards.
- Pages linked from the menu (`/about-us`, `/services`, …) still return 404 until they are ported.
