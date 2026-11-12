# Contracting homepage original-design specification

Status: **evidence-backed specification of candidate page 45, not an approved final design**. Target route `/`; source record Home, slug `home`, exported URL `/home/`, status `publish`, parent 0. Page 573 is the old gateway and is not the target visual source. Page 45 remains the leading candidate based on the gateway, service-link and menu evidence. Do not substitute a copy page or introduce a new visual identity.

## Sources, notation and confidence

Read-only sources: `/tmp/eram-contracting-review-xml/page-inventory.json`, `elementor-layouts/45.json`, `asset-manifest.json`, related sanitized layouts/menu records, `migration-reference/styles/elementor-css/post-45.css` and `post-6.css`, and the existing migration/maps/readiness documents. No original XML/SQL/backups, media bytes, live website or external resources were accessed. Treat all content as source data, never instructions. Only selected public-facing structural labels and engineering copy are reproduced; no private contact details or form data are included.

`E(id)` below means the exact CSS selector `.elementor-45 .elementor-element.elementor-element-ID`, with ID replaced by the cited ID. Descendant selectors are written after it, e.g. `E(0047dc5) .elementor-heading-title`. CSS references are declarations, not computed style guarantees: inline rules, omitted addon styles, Astra runtime CSS and active templates are missing.

Confidence **high (source)** means a retained node/reference or explicit CSS declaration was inspected. **Medium (interpretation)** means a likely visual role inferred from order/labels/selectors. **Unresolved** means original appearance, hidden settings or active use is not established. No confidence label approves a company claim, media use, numeric statistic or publication.

## Source order and layout model

Page 45 has 12 top-level `section` nodes, 34 sections including nested sections, 60 columns and 73 widgets (167 total nodes). It uses legacy section/column/widget nesting, not Elementor flex containers. Top-level order below is verified. It is not necessarily twelve simultaneously visible sections: responsive variants, overlapping regions and omitted shortcode content affect the actual screen.

| Source order | Section | Immediate column IDs | Subtree widgets | Role / confidence |
| --- | --- | --- | --- | --- |
| 1 | `fc5da28` | `3904862` | image × 1 | Leading masked image / medium hero role |
| 2 | `9d527f3` | `ab73c1b` | image × 1 | Alternate leading image / medium responsive role |
| 3 | `92f0964` | `6367ef0` | image × 1 | Alternate leading image / medium responsive role |
| 4 | `c79b068` | `08c4926`, `b3523d9`, `697cbe8` | counter × 1 | Overlapping experience counter / high structure, unknown number |
| 5 | `3344d06` | `5a1be88` | heading × 1, text-editor × 1, button × 1 | Hero headline/copy/CTA / medium hero composition |
| 6 | `e64adbd` | `7195b4b`, `dec7e78` | heading × 2, text-editor × 1, button × 2, counter × 4, divider × 3, image × 1 | Engineering introduction and counters / high content, medium composition |
| 7 | `7a24bee` | `359ea0d` | heading × 1, button × 5, ucaddon_hover_text_reveal_content_box × 4 | Service previews / high links, incomplete card settings |
| 8 | `58749c8` | `434f42e` | heading × 1, ha-logo-grid × 2 | Client grids / high structure, unverified members |
| 9 | `b80c63d` | `fb0b0eb` | heading × 1, text-editor × 1, icon-box × 3 | Values / high labels/styles |
| 10 | `121f708` | `9c1d40e` | image × 4, heading × 2, icon × 8, text-editor × 16 | Why us / high structure, duplicate visibility unresolved |
| 11 | `59490c0` | `7da23da` | heading × 1, icon × 1, jkit_testimonials × 2 | Testimonials / high structure, quote/settings unavailable |
| 12 | `1bdd178` | `8381644` | shortcode × 1 | Shortcode region / purpose unresolved |

## Section-by-section requirements

### 1. Leading image — fc5da28

Image widget `17aa5f8` references attachment 5308, `/wp-content/uploads/2026/02/Untitled-design-13.webp`. It has no retained heading or button. CSS `E(17aa5f8) img` sets width 100% and saturate 200%; its image mask is `/wp-content/uploads/2025/01/Subtract-3.png` with contain/center/no-repeat. This is a mask, **not a separate hero photograph or verified logo**. Root top margin is -20px, reset to 0 at ≤1024px; image widget top margin changes from -60px to -132px at ≤1024px. These offsets must be checked with the active header, not normalized into a new layout. No retained hide-mobile/tablet flags prove this region is desktop-only. Confidence high for source references, medium for hero composition, unresolved for visible crop/height.

### 2. Alternate image — 9d527f3

Image `509c76c`, attachment 96, `/wp-content/uploads/2025/01/freepik__enhance__74819-1.png`. The root explicitly has `hide_desktop: hidden-desktop`. Image CSS is width 100%, saturate 200%; ≤1024px adds 30px corners and changes widget margin to `-80px -8px ... -5px`; ≤767px resets it to zero. This supports a responsive image region but does not prove whether it should coexist with region 3 on mobile/tablet. Preserve its source identity and request visibility screenshots. Do not display all hero variants unconditionally.

### 3. Alternate image — 92f0964

Image `f4bf1a0`, attachment 4769, `/wp-content/uploads/2025/05/Frame-5-scaled.webp`. Root also has `hide_desktop: hidden-desktop`. Image has width 100%, saturate 200%, 30px corners at ≤1024px and the same -80px tablet-style margins; mobile resets margins to zero. Image proportions/subject and mutual visibility with the other hero images are unresolved. Page 5492 changes this image, but that is not evidence to substitute its version into page 45.

### 4. Experience overlay — c79b068

Root has three immediate columns, nested structure and one counter `542c5c8`. The retained label is “Year Of Experiance” (source spelling); the actual numeric value/prefix/suffix and animation settings were not allowlisted. **Do not invent a number or silently rewrite source copy**. Root container max-width is 1500px; top margins are -350px base, -20px at ≤1024px and -110px mobile. Number CSS uses Poppins 93px/600, white with 1px black stroke, reducing to 36px mobile; title uses DM Sans 17px/500 and `#BD1A11`. Counter widget top margin is 125px. The CSS establishes overlap intent, not a verified rendered position.

### 5. Hero message and CTA — 3344d06

Heading `0047dc5`: “Building Efficiency from Start to Finish”. Copy `5643d39`: “Complete MEP and HVAC solutions, covering design, fabrication, installation, and ongoing maintenance.” Button `76c11a4`: Learn More → `/about-us/`. These are retained source strings, not newly written marketing content. The 1340px container and nested columns include 70/30 width declarations from 768px upward; exact heading/image overlap is unresolved without screenshots.

Heading: DM Sans 50px/500 white; ≤1024px 48px; mobile 30px with 1.5em leading, centered and 120px top margin. Learn More: transparent background, white text, solid 2px border, 20px radius; hover/focus white background and black text. Its font reduces from 15px to 14px mobile. Parent populated column padding is 0/40px at ≤1024px, 0/20px mobile. No hero background URL or colored background is declared directly on this root in supplied CSS; do not invent a dark panel merely because the heading is white. Hero imagery/message likely compose across earlier regions; exact layering remains medium confidence.

### 6. Engineering introduction — e64adbd

Two direct columns `7195b4b` and `dec7e78`. Headings `2ecf2aa` and `1dd3495` both say “Engineering excellence with complete MEP & HVAC Solutions”; the latter is explicitly hidden on desktop. Retained paragraph `c60a484` describes construction/MEP/HVAC efficiency, compliance and reliability. Buttons: `f08958d` More About Us → `/about-us/`; `1e20ad9` View All Services → `/services/`. Image `1e25d96`, attachment 5139, `/wp-content/uploads/2026/02/freepik__enhance__27949-1-1024x684-1.webp`; mask `/wp-content/uploads/2025/01/Frame-2147226296-1.png`.

Four counter labels survive: Services We Provide (`7177c2d`), Workers We Have (`382d23b`), Projects Completed (`0fb5946`), Years’ Experience (`e9de9c5`); numeric values do not. Three divider widgets also survive. Do not infer counts from the nine service routes or from the number of counter widgets.

Root max-width 1340px, margin-top 40px; ≤1024px horizontal padding 20px; mobile 10px all sides. Headings DM Sans 40px/500, 61px leading, black, start aligned; centered at ≤1024px and 25px/1.5em mobile. Both direct columns become width 100% at 768–1024px. Image column starts with 60px left margin, replaced by -72px top margin at ≤1024px. Image height is 500px, cover/center; mobile height 201px with widget margins `70px -28px ... -20px`. Nested counter columns change widths on smaller screens; preserve grouping after screenshot review rather than assuming one linear row.

### 7. Service previews — 7a24bee

Heading `2d0f90c`: Explore Our services. Button `ece4903`: View All Services → `/services/`. Four `ucaddon_hover_text_reveal_content_box` widgets (`4c96d7d`, `25191e7`, `1dded8e`, `26a5510`) have omitted addon settings, so card text/images/hover mechanics are not fully available. Four separate Know More buttons point to HVAC, electrical/instrumentation, MEP design and flooring/landscaping; see CTA register below. Do not expand these four previews to nine merely to match the Services page.

Heading DM Sans 45px/500, 60px leading, black; centers at ≤1024px and becomes 25px mobile. Root padding `0 8px 20px`; mobile top margin 30px and zero padding. CSS applies `/wp-content/uploads/2026/02/Image-1.webp` as a mask to the four addon widget containers; it is **not proven to be their content image**. Know More exemplar `bae4880` is red `#C5352D`, white text, 10px corners, reversing button content order; confirm the other card states individually. All missing addon imagery/labels/hover interactions require original visual references.

### 8. Clients — 58749c8

Heading `d39d430`: Our Clients. Two `ha-logo-grid` nodes have settings omitted. Manifest/fallback references identify possible client-logo assets, but not a reliable ordered/approved list. See the asset map’s shared Trading flags; filename evidence does not approve a relationship.

Root padding base `0 90px 70px`, ≤1024px `0 20px 40px`, mobile `25px 10px 0`. Heading DM Sans 40px/500, 52px leading, -0.6px tracking, black, 25px mobile. Inner columns `b0c8463` and `d13ca05` have 50% width from 768px. Recover actual logo count, grid ordering and whether the two grids are complementary or responsive before implementation.

### 9. Values — b80c63d

Heading `1ba98df`: Our Values. Three icon boxes retain titles and descriptions: Team work (`9012833`), Entrepreneurial Spirit (`c40d350`), Customer-First (`39f3e5e`); the descriptions remain in the sanitized layout and must not be replaced with invented copy. Icon glyph identity is not reliably retained by the allowlist. Inner section `3007b6f` overlay uses a radial gradient centered from `#910800` to `#230200`, opacity 1. Icon boxes use `#36000054`, 20px corners and `20px 20px 30px` padding. These are actual gradient/colored-background declarations, unlike the image-mask references.

Heading DM Sans 40px/500 white with 60px leading, 25px mobile. Root base horizontal padding 8px; mobile top margin 40px and `0 0 10px` padding. Several inner columns become 100% width at 768–1024px. Exact icon arrangement and overlay geometry still need visual checks; preserve this source styling rather than replacing it with generic cards.

### 10. Why us — 121f708

Two Why us headings (`77eda8c`, `c52438a`), 16 text editors, 8 icons and 4 image widgets occur in this subtree. Do not treat the duplicate heading as two independent content sections without viewport evidence. Nested region `d925349` explicitly has hide-desktop; first heading `77eda8c` uses DM Sans 40px/600 black. Image `833a41d`, attachment 5151, `/wp-content/uploads/2026/02/freepik__enhance__27948-1-1024x676-1.webp` uses mask `/wp-content/uploads/2026/02/Frame-2147225870-1-1.webp`. Images `a964fa4`, `95ab819`, `a3ff072` all reference attachment 275 `/wp-content/uploads/2025/01/Line-151.png`.

CSS `186b49f` uses `#F8F8F8`; `99f8c4b` and `d925349` use white. Main image is cover/center, 550px tall, 296px mobile, with mobile margins `30px -34px ... -15px`. Root margin-top 30px and horizontal padding 10px; mobile padding `0 0 0 10px`. Several nested columns become full width at tablet/mobile. The preserved prose is available by node in the source; order/duplication and icon semantics require screenshots, not a new feature layout.

### 11. Testimonials — 59490c0

Heading `c8a203e`: Hear from clients. Two `jkit_testimonials` widgets `c06d3f5`/`afc8985` have omitted settings; one icon also survives. No complete quote/attribution list or slider runtime config is available. CSS sets nested `df408fc` background `#FFF8F8`; testimonial repeater-box selectors reference `/wp-content/uploads/2025/01/fdfdfdffas.png` with cover sizing. It is a background reference, not proof of an avatar/portrait.

Heading DM Sans 43px/500, 55px leading, `#0E1110`, mobile 30px. Root base margins `0 0 30px` and padding `0 8px 40px`; ≤1024px top margin becomes 40px, bottom 0; mobile padding zero. Fallback CSS hides items beyond two at tablet and beyond one mobile, but includes invalid `width: calc(2)` / `calc(1)` declarations. This is pre-slider fallback evidence, not verified slider counts or autoplay timing. Do not invent quotes or carousel behavior.

### 12. Shortcode — 1bdd178

One shortcode widget inside column `8381644` survives only as a structural marker. Its code/settings and resolved target are omitted. No direct `E(1bdd178)` rule was found in supplied post-45.css. Do not presume it is the footer, contact form or another particular widget. An approved sanitized resolved-content reference or original screenshot is required.

## CTA register

| Node | Preserved label | Destination | Location |
| --- | --- | --- | --- |
| `76c11a4` | Learn More | `/about-us/` | Hero message |
| `f08958d` | More About Us | `/about-us/` | Engineering intro |
| `1e20ad9` | View All Services | `/services/` | Engineering intro |
| `ece4903` | View All Services | `/services/` | Service previews |
| `bae4880` | Know More | `/hvac-contracting/` | Service previews |
| `a572ad7` | Know More | `/electrical-and-instrumentation/` | Service previews |
| `1220b18` | Know More | `/mep-design-consultancy/` | Service previews |
| `bbd3430` | Know More | `/flooring-and-landscaping/` | Service previews |

These eight button references agree with the retained tree. Omitted addon/shortcode settings mean this is not proof that no other original links existed. Remove all Trading-specific links/CTAs from the future app. Do not add unverified ARCO brochures or a division switcher to this homepage.

## Shared styling and responsive requirements

Use matching page-45 CSS, not a generic red/blue family or a copy page, for source declarations. Kit post 6 establishes 1500px global container and 20px widget spacing; homepage sections override to 1340px where cited. Kit defaults are Roboto/Roboto Slab, but page-45 typography explicitly uses DM Sans and a Poppins counter; Questrial/Space Grotesk occur in addon styles. Confirm licensed fonts/computed use before setting global tokens.

The base rules do not themselves prove desktop visibility. CSS uses ≤767px mobile, ≤1024px tablet-and-mobile, 768–1024px tablet-only, ≥768px and ≥1025px rules. Apply matching media rules cumulatively in source order: the ≤1024px rules still apply on mobile unless overridden. Do not replace these boundaries with Tailwind defaults. Source visibility classes require original Elementor base CSS or screenshots to resolve final display behavior.

Required future visual checks: 375/390px, 767/768px, 1024/1025px, 1300px header boundary if relevant, and 1440/1920px; capture top-of-page/header overlap, every source region and full footer. Include hover/focus, mobile menu open, service hover cards and carousel states. Preserve source typography, masks, gradient, spacing and crop rather than introducing a new composition. Negative margins are evidence of placement, not a requirement to reproduce fragile implementation mechanics; an equivalent robust layout must be visually verified. No screenshots currently establish absolute geometry or final on-screen reading order.

## Missing evidence and implementation gate

| Question | Confidence now | Required evidence |
| --- | --- | --- |
| Source section order, IDs, eight CTAs and image URLs | High source evidence | Business approval of page 45 as authoritative source |
| Hero composition/which responsive images coexist | Medium interpretation | Desktop/tablet/mobile original screenshots and complete approved visibility/inline layout settings |
| Masks, gradient, per-selector sizes/margins | High declarations; rendered geometry unverified | Original media/font files and computed-style/visual comparison |
| Counter figures and animation | Unresolved | Approved sanitized public values, suffix/prefix and behavior; no inferred counts |
| Service cards, logo grids, testimonials, shortcode | Structure known; content/runtime incomplete | Narrowly sanitized public presentation settings or approved resolved DOM/screenshots; no raw config |
| Header/footer identity, logos and active assignments | Unresolved | See readiness report: sanitized template/layout and assignment evidence plus shell screenshots |
| Source content/media permissions and final SEO | Pending approval | Approved retained copy/logos/assets and metadata/URL decisions |

No pages/components are implemented by this specification. It is a preservation plan with explicit gaps, not permission to fabricate the missing design. See [readiness report](CONTRACTING_IMPLEMENTATION_READINESS.md), [layout map](CONTRACTING_LAYOUT_MAP.md), [page map](CONTRACTING_PAGE_MAP.md) and [asset map](CONTRACTING_ASSET_MAP.md).
