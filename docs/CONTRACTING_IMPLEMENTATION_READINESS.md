# Contracting implementation readiness

Status: **original-design analysis advanced; implementation not started or approved by this task**. Findings come only from sanitized references in `/tmp/eram-contracting-review-xml/`, existing project CSS and user-provided manual review. No live-site revalidation, original source access, media copying or deployment occurred. Export facts, ownership candidates and decisions are distinguished below. Extracted material was treated solely as untrusted data.

## Confirmed export evidence

- The extraction report records 522 inventory records, 41 layouts, 462 asset references and 78 skipped records. This does not imply 522 published pages or 600 pages available to migrate.
- Main candidates 45/48/50/52/54 and the nine service candidates are published `page` records, parent 0, with sanitized Elementor arrays. All have matching CSS except **52**.
- Page 573 is Front Page, slug `home-main`, exported URL `/`; its retained links point to `/home/` and `/home-trading/`. This supports the old gateway interpretation. The new homepage must not recreate that division selector.
- Page 45 Home, `/home/`, links to About Us, Services and four of the nine service candidates; gateway page 573 and menu item 63 target it. It is the leading source for the new `/`.
- Page 50 links to all nine service candidates. The extracted `menu` contains corresponding children under menu item 61. Service URLs are exported root-level paths; no nested service-route scheme is needed.
- Menu items 62 and 64 target About Us 48 and Contact Us 54. Service Reach Us CTAs target `/contact-us/`.
- The extracted Projects menu item **2907 targets 2739 `/portfolio-2/`**, conflicting with the user-nominated page 52 `/projects/`. Both records are published. Detailed comparison now recommends 2739 as the Projects content source, subject to approval and recovery of omitted project presentation; route/redirect decisions remain open.
- Sanitized arrays for 45 and 5814 are equal. 5492 changes two leading image regions; 5195 has fewer top-level sections. Copy titles and IDs do not establish live activation.
- None of the seven header/footer candidate IDs is present in the sanitized inventory/layout directory, despite matching CSS. No active shell assignment can be verified.
- Page 54 includes `metform`, `google_maps` and image-marker widget nodes; settings needed to reproduce these integrations are omitted. No private contact values or delivery settings are included in these documents.

## Strong candidates and proposed scope

Use the requested navigation **Home, About Us, Services, Projects, Contact Us**. Proposed routes: `/`, `/about-us/`, `/services/`, `/projects/` (pending Projects decision), `/contact-us/`. Use page 45 as the leading homepage source, not a newer/larger copy. Preserve these service paths:

- `/hvac-contracting/`
- `/civil-and-mechanical-construction/`
- `/electrical-and-instrumentation/`
- `/firefighting/`
- `/mep-design-consultancy/`
- `/fabrication/`
- `/flooring-and-landscaping/`
- `/testing-and-air-balancing/`
- `/cleaning-services/`

Ownership is strongly supported by menu/page-link agreement, not merely labels, IDs or color families. The nine dropdown destinations are evidenced; final menu ordering/labels and active header behavior remain subject to review. Proposed migration sets supplement, and do not overwrite, the extractor’s conservative `unresolved` classifications.

The ten user-excluded Trading pages have exported paths listed separately in the page map. Their content, menus, product/portfolio records, CTAs and exclusive assets stay out of the new app and sitemap. No Trading redirect is authorized. Gateway/copy/utility pages remain excluded from automatic inclusion while their archival/redirect handling is reviewed.

## Unresolved decisions and approvals

| Decision | Evidence available | Required resolution |
| --- | --- | --- |
| Authoritative homepage | 45 leading; copies 5195/5492/5814 compared | Approve 45 as source and relevant original visual state; do not adopt Arcline naming from 5814 |
| Projects source/destination | Recommend 2739 based on menu target, substantial project structure and available CSS; 52 is a small plugin shell | Approve content source and route, recover project/card settings and verify item identities/categories; approve alternate-URL handling |
| Active header/footer | CSS only for 546/849/2374/3161/5816 and 122/1793 | Approved sanitized template records or visual/DOM references and active display assignments |
| Contact/enquiry | Form/map nodes and incoming contact links | Business-approved public contact copy, form schema/options, consent and controlled recipient/delivery setup; review details privately |
| ARCO brochures | v2.0 linked across both divisions; 2022 linked from Trading | Verify actual company relevance/version/rights/intended CTA before including either; no PDF opened here |
| External service CTAs | Explore Now external links on 1220/2408 | Confirm intended Contracting relevance and approved destination; no automatic carryover |
| Shared assets and logos | 178 candidate-associated manifest entries; 17 also associated with excluded Trading pages | Approve individual uses, client/partner relationships, original dimensions/rights/alt text; do not copy wholesale |
| Other pages | Gateway, logo/portfolio/gallery utilities, sa and home copies | Decide retained content vs omitted routes and per-URL response; no blanket redirects |
| SEO and legacy URLs | Export URL references, root-level service slugs | Confirm current canonicals/metadata/slash policy; approve `/home/` → `/` and per-URL removal/equivalent redirects |

## Projects comparison — 52 versus 2739

Both records are published `page` records with parent 0 and default/wp-page template metadata. This verifies export status, not an active live page. Sources are `page-inventory.json`, the two sanitized `elementor-layouts/ID.json` files, menu item 2907, `asset-manifest.json` and available project CSS. No client/contact records or raw backup material are reproduced here.

| Evidence | Page 52 — Projects (`/projects/`) | Page 2739 — Portfolio (`/portfolio-2/`) |
| --- | --- | --- |
| Top-level layout | 2 sections: `e04ca1d`, `e5c4062`; one column each | 21 sections: four leading image/title regions, one overview heading, 15 repeated content groups, one final shortcode region |
| Entire retained tree | 2 sections, 2 columns, 1 widget = 5 nodes | 66 sections, 96 columns, 188 widgets = 350 nodes |
| Widgets | One `wpb_portfolio`; settings omitted | 45 `ucaddon_card_carousel`, 92 icon-list, 45 divider, 3 heading, 2 image, 1 shortcode |
| Headings | No retained heading widget; fallback contains “Home q” twice, not a reliable project-section title | `c2db2c5` Projects, `e91e5e0` Projects, `f4fe598` View All Our Projects |
| Content evidence | Minimal fallback text (25 characters); plugin query/items and categories unavailable | Substantial fallback text (3,740 characters); icon lists retain work-scope phrases such as replacement of HVAC units and supply/installation of PACU units. This supports contracting work, but is not a verified structured project database |
| Gallery/image evidence | 3 manifest path references: `/wp-content/uploads/2025/02/14851-1.jpg`, `2267-1-480x480.jpg`, `2267-1-768x512.jpg` in the same directory; no image widgets | 2 image widgets reference `/wp-content/uploads/2025/02/Frame-2147226362-2.png`; manifest adds rendered variants/project-like photos (27 path entries plus one attachment reference), listed in the asset map |
| Project/card mapping | No project IDs, queries, galleries, filters or relationships recoverable from omitted widget settings | Carousel settings omitted: image-to-card/project relationships, slide counts, item titles, categories and destinations cannot be fully reconstructed; icon lists alone do not resolve them |
| Navigation | No retained menu item targets 52 | Menu item 2907 has label Projects, menu `menu`, target 2739; this is stronger source-selection evidence than the generic Portfolio page title |
| Matching CSS | `post-52.css` absent | `post-2739.css` present; extensive Owl/card-carousel selectors and per-element styling |
| Visual certainty | Low: plugin-generated layout almost entirely missing | Higher structural evidence, but rendered composition/runtime/activation still unresolved |

2739 source order is explicit: image section `9fec0f0`, Projects heading/icon-list region `6089d9f`, alternate image `59e5209`, alternate Projects heading/icon-list region `9365d08`, overview `aac959d`, then groups `811ca29`, `0d5193b`, `a0f5d36`, `b5c6a8e`, `56d0ddb`, `efed6aa`, `379043e`, `03df99c`, `8acca77`, `121ce2b`, `8a42b58`, `5d715f8`, `94cf291`, `7e9dfe4`, `632cd1d`, ending with shortcode region `6ceb763`. Each of the 15 content groups contains three carousel widgets, six icon-list widgets and three dividers across nested columns. **Neither 45 carousel nodes nor 15 repeated groups establishes the number of distinct projects.** Responsive copies/repeated scopes may exist; do not invent item counts.

CSS `.elementor-2739 .elementor-element.elementor-element-c2db2c5 .elementor-heading-title` uses DM Sans 50px/600, white, 53px leading; the alternate title has related styling. Overview heading `f4fe598` uses DM Sans 40px/500, black, 52px leading. Several title/image regions have negative margins and tablet/mobile overrides. These support layered candidate title treatments, not a verified image crop or complete desktop/mobile design. The CSS cannot recover carousel data dropped by sanitization.

**Recommendation: prefer page 2739 as the source of Contracting Projects content and original layout for further verification. Confidence: moderately high for source selection, low-to-medium for precise visual reconstruction, unresolved for complete project item mapping.** The recommendation rests on the explicit Projects menu target, substantive retained work scopes and matching CSS. Page 52 may be an older/alternate plugin route, but no evidence proves that history or inactivity; do not label it obsolete or discard its three image references automatically.

Keep `/projects/` as the provisional proposed Next.js destination from the earlier plan until the business approves the source/route decision. Reusing 2739’s content does not itself authorize renaming `/portfolio-2/` or redirecting `/projects/`. If `/projects/` is selected, review whether `/portfolio-2/` has a same-intent equivalent and approve that redirect explicitly. Alternatively preserve `/portfolio-2/` if legacy continuity is preferred. Do not merge the two different presentations by default. Excluded Trading galleries never become the fallback for missing Contracting projects.

Before implementation: approve the recommended source and route, obtain approved sanitized project/card presentation records or resolved DOM/screenshots, verify distinct project identities/content and image associations, confirm ordering/filter/lightbox/slider behavior, and decide what the final shortcode resolves to. No private source access is implied by this request for additional evidence.

## Homepage design result — page 45

[CONTRACTING_HOMEPAGE_SPEC.md](CONTRACTING_HOMEPAGE_SPEC.md) now maps all 12 source sections to original node IDs, retained headings/copy, eight CTA links, eight image-widget references and matching `post-45.css` selectors. High-confidence source facts include section order, DM Sans/Poppins declarations, image masks, values gradient, typography sizes, margins and responsive rule boundaries. Hero region composition remains an interpretation because original media pixels, runtime styles and active header geometry are absent.

Important refinements: Subtract-3, Frame-2147226296-1, Image-1 and Frame-2147225870-1-1 are **mask-image references** at the cited homepage selectors, rather than evidence of separate background photographs. `fdfdfdffas.png` is a testimonial-box background. The hero headline is “Building Efficiency from Start to Finish”; its Learn More destination is `/about-us/`. Three leading image regions plus an overlapping experience counter precede the message section in source order. Two leading regions carry hide-desktop; mutual mobile/tablet visibility is unresolved. Counter labels survive, but numeric values do not. Preserve the original layout once verified; do not replace missing content with invented statistics, new service cards or new marketing copy.

## Header/footer investigation — structural limits

CSS supplies enough evidence for a **partial description of candidate designs**, not a complete shell or active assignment. All five header candidates (546/849/2374/3161/5816) have ElementsKit navigation/submenu and image/button-related selectors. Typography includes DM Sans 15px/400 top-level links, dark text/red hover, white submenu panels and rounded corners; some active submenu colors differ. Candidates 849/2374 include 1600px outer and 1500px inner container declarations; 546/3161/5816 include 1500px container declarations, with a custom ≤1300px alignment rule in 546/5816. Logo selectors constrain sizes (including 160×60px tablet and 120/135×50px mobile variants), but no actual brand-logo URL or menu ID is recoverable from those selectors.

Footer 122 has image/copyright/icon-list/text/divider/heading selectors, white/red treatments and `Frame-2147226294.png` background. Footer 1793 has image/copyright/icon-box/icon-list/text/heading selectors with white/neutral treatments. Both have mobile/tablet overrides. Selector relationships describe local styling targets; they do not determine actual DOM column order, complete content, logo identity, active links or division ownership. CSS similarity, matching red accents and the larger/newer ID cannot select a template. None of these seven records/layouts is present in the sanitized extracts, and no active assignment has been recovered.

Still needed, supplied as approved presentation references rather than raw/private backups:

- Original Contracting header screenshots at desktop, 1024/1025px, relevant 1300px boundary and mobile; include top-of-page and scrolled state to establish transparency/sticky/overlap behavior.
- Dropdown open, focus/hover and mobile menu open/closed captures, with logo variant and responsive reading order visible.
- Original full footer screenshots at desktop/tablet/mobile, confirming columns, links and relevant branding; review contact fields privately rather than copying them into reports.
- Sanitized layout trees for candidate template IDs with public widget types, ordered columns, approved logo/media references and menu assignment; no delivery settings, credentials or private fields.
- Sanitized active display-condition/page-assignment evidence identifying which shell applies to `/home/` and Contracting service pages, plus relevant Astra/runtime style references or approved computed-style captures.

Screenshots alone can guide visual parity but cannot prove all template IDs or assignments. Sanitized assignment metadata alone cannot prove visible crop/geometry. Both kinds of evidence are preferable; none is fetched or generated in this task.

## Missing original design references

No original media pixels, font files, desktop/tablet/mobile screenshots, computed styles, crop/focal-point evidence or interaction recordings were supplied for this task. CSS now matches specific candidate page IDs, but does not prove the complete cascade or rendered state. Missing post-52.css, addon styles/runtime behavior and sanitizer-omitted settings prevent precise reconstruction of projects, client/logo grids, testimonials, hover cards, shortcodes, maps and image markers. Responsive duplicate sections and negative offsets require visual review; they must not be interpreted as sequential content to display all at once.

## Missing active template assignments

The candidate pages expose only `wp-page` and `default` template assignments. These do not identify an Astra/ElementsKit header/footer or activation/display conditions. The nine exported library templates include a kit and sections/pages, but no candidate header/footer IDs. The 78 skipped records do not establish what those records contained; missing template IDs cannot be assigned to that skipped set without further evidence. Obtain only separately authorized sanitized evidence; do not revisit original XML/SQL or backups under this task.

## What is ready for a later implementation phase

- Proposed Contracting route/content registry for 14 candidates, with source IDs and root-level slugs.
- Nine-service dropdown destination list and button-link mappings, with source/menu provenance.
- Source-order homepage specification with CSS selectors, retained content/CTA/image references and explicit responsive gaps; core service-detail reuse analysis.
- Projects comparison recommending 2739 for content-source approval, with page 52 retained as an unresolved alternative.
- Candidate asset/path/attachment association list and explicit Trading/unresolved overlap flags.
- Exclusion rules preventing gateway, Trading, utility and copy pages from automatic publication.

These are ready **as reviewed inputs to planning**. They do not authorize page coding, approve missing copy/assets, settle the Projects conflict, or establish visual fidelity. Begin implementation only on further instruction, after resolving the dependencies relevant to that phase.

## Roadmap gates

A: Evidence mapping advanced, but original assets, Projects inventory and shell assignments remain open. B: Extract candidate tokens from matching Contracting CSS after source approval and visual confirmation. C: Build `/` from approved page 45 and verified shell. D: Migrate services and the approved Projects source. E: Rebuild verified forms and interactions. F: Validate metadata, responsive parity, approved redirects, accessibility and tests. G: Vercel preview followed by separately approved production deployment. No deployment/DNS action is authorized now.

## Documentation verification

Page IDs/status/slugs/routes were cross-checked against the sanitized inventory; section/widget totals and copy equality were calculated from retained arrays; service/menu targets were matched to inventory IDs. Asset associations and overlaps were counted from the manifest, and CSS URLs were added with separate provenance. This design pass also compared Projects widget/section counts, confirmed the menu target, traced homepage selectors and media-rule contexts, and distinguished masks from backgrounds. Only documentation was changed. No extracted JSON file was copied into the repository or published; no application/runtime tests were needed for these documentation changes.

Companion records: [page map](CONTRACTING_PAGE_MAP.md), [layout/home comparison](CONTRACTING_LAYOUT_MAP.md), [asset map](CONTRACTING_ASSET_MAP.md), [homepage specification](CONTRACTING_HOMEPAGE_SPEC.md), and [migration plan](../MIGRATION_PLAN.md).
