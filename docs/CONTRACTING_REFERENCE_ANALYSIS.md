# Contracting discovery: existing CSS evidence

This is CSS-only analysis for Phase A. Every file in `migration-reference/styles/` was read for selectors, declarations, fonts, colors, media queries and URL references. There are 40 CSS files (39 numbered Elementor files plus Astra metadata), totaling 2,257,673 bytes. **No ID, color family or candidate layout below establishes Contracting membership, publication status, or active template use.** No real SQL/XML or private backup was opened. Existing live-site inspection limitations remain recorded in `MIGRATION_PLAN.md`; no public page is treated as newly verified here.

## Candidates and reusable patterns

- Header/navigation candidates: posts 546, 849, 2374, 3161 and 5816 have ElementsKit navigation/submenu selectors. Posts 546 and 5816 also contain custom 1300px header alignment rules. Active header assignment, labels, nesting and the original Contracting header remain unresolved.
- Footer candidates: posts 122 and 1793 contain copyright widget selectors. Neither is assigned to Contracting without page/template evidence.
- Large marketing-layout candidates: 45, 5195, 5492 and 5814 contain testimonial/logo-grid/counter styling. They may be duplicate pages, templates, revisions or alternate layouts; none is selected as the Contracting homepage.
- Detail-layout candidates: 1121, 1209, 1211, 1213, 1216, 1218, 1220, 1581, 1854, 1862, 1907, 2406, 2408 and 2957 share combinations of text, headings, image/icon boxes and background images. These could supply reusable detail patterns only if mapped to retained Contracting services/projects. No service or project names are inferred.
- Other layout candidates: 48/50/54 have column and icon-box layouts; 856 has a blue-heavy logo/counter/slider family; 1935/2259 have blue/text-heading rules. Colors do not establish division identity.
- Interaction candidates: MetForm 960/1765; advanced accordion 1972; Owl/Unlimited Elements card carousel 2739; Premium gallery 2914; compact logo grid 2669. Unknown addon settings are intentionally omitted by the extractor until a reviewed allowlist supports them.
- Shared components eligible for later consideration: verified Contracting header/footer, container, section heading, hero, split content, service/project cards, icon lists, enquiry form and relevant logo/gallery/accordion sections. Their exact content and applicability remain unresolved. Trading components and assets are never imported automatically.

## Typography, colors and responsive declarations

DM Sans is widespread; Radio Canada appears in detail-like families, and Questrial, Space Grotesk, Poppins, Archivo, Roboto and SF Pro Display Regular occur elsewhere. Kit post 6 declares Roboto/Roboto Slab and default Elementor colors; override frequency does not prove computed Contracting styling. Obtain active DOM/template mappings and licensed original font files before setting tokens.

Repeated reds include `#C5352D`, `#BF0002`, `#C4372D`; blue families include `#06344D`/`#07344E`; black/white and light neutral surfaces recur. Typical text sizes are 14–16px, component titles 22px and headings 25/40/50px, with some 93px display declarations. Icons also use font-size. Weights 400/500/600 are common. Preserve per-selector differences after verifying Contracting ownership.

The global kit sets a 1500px container and 20px widget spacing, with many section overrides at 1340px. CSS boundaries are mobile through 767px, tablet 768–1024px and desktop from 1025px; headers 546/5816 also change at 1300px. Some columns stack at tablet width. Logo limits include 160px tablet and 120/135px mobile. Logo cards in 2669 change from 173px to 150px tall. Hover/background transitions commonly use 0.3s. Testimonial fallback CSS contains invalid-looking `calc(1)`/`calc(2)` widths; reproduce verified behavior rather than copying generator artifacts.

Across the whole legacy CSS pool are 30 unique asset URLs (29 uploads and one Elementor mask); these are not a Contracting asset count or the full image inventory. Image subjects, crop, ownership and original files remain unresolved. Astra's supplied stylesheet is theme metadata, not the runtime theme/Customizer CSS.

## Evidence required to resolve candidates

Obtain a separately approved export and review source ID, title/slug, status/type, parent hierarchy, menu relationships, original public URL, Elementor tree and active header/footer assignments. Obtain Contracting landing-page screenshots/HTML and responsive states; confirm services/projects, menu labels, CTAs, contact schema, original media and public metadata. Published export status does not prove reachability or active use. The original Contracting landing experience becomes `/`; the old two-division entry design does not become the new homepage. Shared assets/content require explicit Contracting relevance review; conflicting or missing evidence remains unresolved.

## Complete CSS candidate inventory

Widget signatures below indicate stylesheet contents only. All rows have unresolved Contracting eligibility and published-page mapping.

| Reference | Candidate signatures | Explicit fonts | Frequent opaque colors |
| --- | --- | --- | --- |
| `astra-style.css` | No identifying widget signature | No explicit family | No opaque colors |
| `elementor-css/post-1121.css` | No identifying widget signature | DM Sans, Radio Canada | #000000, #C5352D, #FFFFFF, #F1F1F1 |
| `elementor-css/post-1209.css` | No identifying widget signature | DM Sans, Radio Canada | #000000, #C5352D, #FFFFFF, #F1F1F1 |
| `elementor-css/post-1211.css` | No identifying widget signature | DM Sans, Radio Canada | #000000, #C5352D, #FFFFFF, #F1F1F1 |
| `elementor-css/post-1213.css` | No identifying widget signature | DM Sans, Radio Canada | #000000, #C5352D, #FFFFFF, #F1F1F1 |
| `elementor-css/post-1216.css` | No identifying widget signature | DM Sans, Radio Canada | #000000, #C5352D, #FFFFFF, #F1F1F1 |
| `elementor-css/post-1218.css` | No identifying widget signature | DM Sans, Radio Canada | #000000, #C5352D, #FFFFFF, #F1F1F1 |
| `elementor-css/post-122.css` | copyright/footer | DM Sans | #FFFFFF, #C5352D, #9F9F9F |
| `elementor-css/post-1220.css` | No identifying widget signature | DM Sans, Radio Canada | #000000, #FFFFFF, #C5352D, #F1F1F1 |
| `elementor-css/post-1581.css` | No identifying widget signature | DM Sans, Radio Canada | #FFFFFF, #000000, #F1F1F1, #C5352D |
| `elementor-css/post-1765.css` | MetForm | Archivo, DM Sans | #000000, #B0B0B0, #FFFFFF, #E1E1E1 |
| `elementor-css/post-1793.css` | copyright/footer | DM Sans | #FFFFFF, #BFBFBF, #E4E4E4, #000000 |
| `elementor-css/post-1854.css` | No identifying widget signature | DM Sans, Radio Canada | #FFFFFF, #000000, #C5352D, #F1F1F1 |
| `elementor-css/post-1862.css` | No identifying widget signature | DM Sans, Radio Canada | #FFFFFF, #000000, #C5352D, #F1F1F1 |
| `elementor-css/post-1907.css` | No identifying widget signature | DM Sans, Radio Canada | #000000, #FFFFFF, #F1F1F1, #C5352D |
| `elementor-css/post-1935.css` | No identifying widget signature | DM Sans | #FFFFFF, #3A5C6C, #06344D, #000000 |
| `elementor-css/post-1972.css` | advanced accordion, counter | DM Sans, Radio Canada | #000000, #07344E, #FFFFFF, #06344D |
| `elementor-css/post-2259.css` | No identifying widget signature | DM Sans | #FFFFFF, #06344D, #000000, #F3F3F3 |
| `elementor-css/post-2374.css` | ElementsKit navigation | DM Sans | #C5352D, #FFFFFF, #000000, #06344D |
| `elementor-css/post-2406.css` | No identifying widget signature | DM Sans, Radio Canada | #000000, #FFFFFF, #C5352D, #F1F1F1 |
| `elementor-css/post-2408.css` | No identifying widget signature | DM Sans, Radio Canada | #FFFFFF, #000000, #C5352D, #F1F1F1 |
| `elementor-css/post-2669.css` | logo grid | No explicit family | No opaque colors |
| `elementor-css/post-2739.css` | Owl card carousel | DM Sans | #000000, #ffffff, #C4372D, #FFFFFF |
| `elementor-css/post-2914.css` | Premium gallery | DM Sans | #FFFFFF, #000000, #FCFCFC, #F7F7F7 |
| `elementor-css/post-2957.css` | No identifying widget signature | DM Sans, Radio Canada | #FFFFFF, #000000, #C5352D, #06344D |
| `elementor-css/post-3161.css` | ElementsKit navigation | DM Sans | #C5352D, #FFFFFF, #000000, #02AAE6 |
| `elementor-css/post-45.css` | testimonials, logo grid, counter | DM Sans, Poppins, Questrial, Space Grotesk | #000000, #FFFFFF, #E6E6E6, #ffffff |
| `elementor-css/post-48.css` | counter | DM Sans | #BF0002, #FFFFFF, #000000, #242424 |
| `elementor-css/post-50.css` | No identifying widget signature | DM Sans | #FFFFFF, #000000, #101010, #C5352D |
| `elementor-css/post-5195.css` | testimonials, logo grid, counter | DM Sans, Questrial, Space Grotesk | #000000, #FFFFFF, #E6E6E6, #ffffff |
| `elementor-css/post-54.css` | No identifying widget signature | DM Sans | #BF0002, #FFFFFF, #000000, #18012c |
| `elementor-css/post-546.css` | ElementsKit navigation | DM Sans | #C5352D, #FFFFFF, #000000, #02AAE6 |
| `elementor-css/post-5492.css` | testimonials, logo grid, counter | DM Sans, Poppins, Questrial, Space Grotesk | #000000, #FFFFFF, #E6E6E6, #ffffff |
| `elementor-css/post-573.css` | No identifying widget signature | DM Sans | #FFFFFF, #FF0000, #000000 |
| `elementor-css/post-5814.css` | testimonials, logo grid, counter | DM Sans, Poppins, Questrial, Space Grotesk | #000000, #FFFFFF, #E6E6E6, #ffffff |
| `elementor-css/post-5816.css` | ElementsKit navigation | DM Sans | #C5352D, #FFFFFF, #000000, #02AAE6 |
| `elementor-css/post-6.css` | No identifying widget signature | Roboto, Roboto Slab | #6EC1E4, #54595F, #7A7A7A, #61CE70 |
| `elementor-css/post-849.css` | ElementsKit navigation | DM Sans | #C5352D, #FFFFFF, #000000, #313131 |
| `elementor-css/post-856.css` | logo grid, counter | DM Sans | #FFFFFF, #06344D, #000000, #C5352D |
| `elementor-css/post-960.css` | MetForm | DM Sans, Roboto, SF Pro Display Regular | #000000, #c9c1c1, #FFFFFF, #FF0000 |
