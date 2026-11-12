# WordPress → Next.js page port

Ported pages, as the live site rendered them:

| Route | WordPress page | Components | Page CSS |
| --- | --- | --- | --- |
| `/` | 45, `/home/` | `components/home/` | `public/legacy/css/page-home.css` |
| `/services` | 50, `/services/` | `components/services/` | `public/legacy/css/page-services.css` |
| `/hvac-contracting` | 1121, `/hvac-contracting/` | `components/hvac-contracting/` | `public/legacy/css/page-hvac-contracting.css` |
| `/electrical-and-instrumentation` | 1211, `/electrical-and-instrumentation/` | `components/electrical-and-instrumentation/` | `public/legacy/css/page-electrical-and-instrumentation.css` |
| `/mep-design-consultancy` | 1216, `/mep-design-consultancy/` | `components/mep-design-consultancy/` | `public/legacy/css/page-mep-design-consultancy.css` |
| `/flooring-and-landscaping` | 1220, `/flooring-and-landscaping/` | `components/flooring-and-landscaping/` | `public/legacy/css/page-flooring-and-landscaping.css` |
| `/civil-and-mechanical-construction` | 1209, `/civil-and-mechanical-construction/` | `components/civil-and-mechanical-construction/` | `public/legacy/css/page-civil-and-mechanical-construction.css` |
| `/firefighting` | 1213, `/firefighting/` | `components/firefighting/` | `public/legacy/css/page-firefighting.css` |
| `/fabrication` | 1218, `/fabrication/` | `components/fabrication/` | `public/legacy/css/page-fabrication.css` |
| `/testing-and-air-balancing` | 2406, `/testing-and-air-balancing/` | `components/testing-and-air-balancing/` | `public/legacy/css/page-testing-and-air-balancing.css` |
| `/cleaning-services` | 2408, `/cleaning-services/` | `components/cleaning-services/` | `public/legacy/css/page-cleaning-services.css` |
| `/portfolio-2` | 2739, `/portfolio-2/` | `components/projects/` | `public/legacy/css/page-projects.css` |
| `/contact-us` | 54, `/contact-us/` | `components/contact/` | `public/legacy/css/page-contact.css` |
| `/about-us` | 48, `/about-us/` | `components/about/` | `public/legacy/css/page-about.css` |

## Source

`../wordpress-extracted/wp-content/cache/wpo-cache/eramasacon.com/home/index.html` is the WP-Optimize page cache: the full HTML WordPress served, including the Elementor header (546), page (45) and footer (122). Stylesheets and media come from `../wordpress-extracted/`.

## How it works

`python3 scripts/wp-port/port_page.py [home about ...]` (run from this folder; no arguments ports every page in `PAGES`):

- Converts the rendered markup to JSX, keeping Elementor/Astra class names:
  - `components/site/site-header.tsx`, `site-footer.tsx`, `scroll-to-top.tsx`
  - `components/<page>/sections/*.tsx`, one file per group of Elementor sections, plus `components/<page>/<page>-page.tsx`
  - The header and footer come from the home page and are shared by every page. Menu "current page" highlighting follows the URL (`components/wordpress/menu-item.tsx`).
- Bundles every stylesheet the home page loaded, in the original order, into `public/legacy/css/site.css` (theme, plugins, header/footer). Each page gets `page-<name>.css` with the stylesheets it loaded that are not already in `site.css` (mainly its Elementor `post-<id>.css`). Google Fonts links are replaced by `next/font` (`app/fonts.ts`) through `var(--font-*)`.
- Copies every referenced image, font and the company-profile PDF to the same paths under `public/` (`/wp-content/uploads/...`), so the old media URLs keep working.

Re-running the script overwrites the generated `.tsx` files. Once you hand-edit them, stop re-running it.

## Behaviour that replaced jQuery/plugin scripts

| WordPress script | Replacement |
| --- | --- |
| Elementor entrance animations | `components/wordpress/animated.tsx` |
| Elementor counter (jquery-numerator) | `components/wordpress/counter.tsx` |
| Jeg Kit testimonials (tiny-slider) | `components/wordpress/testimonials-track.tsx` (no mouse-drag) |
| ElementsKit menu, Astra scroll-to-top | `components/wordpress/elementor-runtime.tsx` |

## Adding a page

1. Find its cached HTML in `../wordpress-extracted/wp-content/cache/wpo-cache/eramasacon.com/<slug>/index.html`.
2. Add a `PageSpec` to `PAGES` in the script. The script prints the page's top-level section IDs and warns about any you have not mapped.
3. Run the script, then add `app/<route>/page.tsx` that renders the generated page component.

## Intentional differences

- The "Trading Solutions" sticky button (template 2703) is left out because the site is Contracting-only (see `MIGRATION_PLAN.md`). The body font it set (Open Sans) and the 20px it took up in the page flow are kept. Its `body { padding-bottom: 50px }` is dropped, so the page is 50px shorter at the bottom.
- The "Get In Touch" header section, which was hidden on every device, is not rendered.

## Verification (12 Nov 2026)

Element positions and sizes were compared against the live pages in Chrome at 1440, 1024, 768 and 390px wide.

- Home: all Elementor elements match to within 1.3px. A full-page pixel diff differs only at the removed Trading button and at the testimonial carousel position, which changes over time.
- About Us: all Elementor elements match to within 0.5px. A pixel diff differs only at the removed Trading button.

## Known follow-ups

- `site.css` is about 2.6 MB because it ships whole plugin stylesheets (Font Awesome, HT Mega, ElementsKit). Removing unused rules would shrink it, but the page needs to be re-checked visually afterwards.
- The Services overview and all nine service routes are now ported.

## Contact form delivery

Set `CONTACT_FORM_WEBHOOK_URL` in the server environment to an HTTP endpoint that accepts JSON submissions (name, email, phone, service, message, form, submittedAt). The form reports success only after a successful endpoint response. Missing configuration or failed delivery displays an error and preserves the entered values. No submission content is logged.

## Projects port

The Projects menu route `/portfolio-2` uses the cached WordPress page 2739, preserving all sections, project text, images, and responsive Elementor CSS. Image carousels use React controls with looping arrows and pointer swipes (one image per card, no autoplay, matching the source configuration). Browser visual comparison remains pending because no browser is connected.

## Service pages port

The Services overview and nine individual service pages preserve the cached WordPress markup, content, images, and responsive Elementor styles. Catalogue downloads and contact/service links resolve locally. `scripts/wp-port/port_services.py` regenerates only these pages, preserving shared chrome and other pages; do not rerun after hand-editing generated components. TypeScript and local image, responsive image, stylesheet asset, and download checks passed. Pixel-level browser verification remains pending (no connected browser); the production build remains unverified due to the previously observed Turbopack port-permission limitation.
