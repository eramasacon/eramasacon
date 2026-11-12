# Contracting styling diagnosis and recovery plan

Scope: documentation only. Application/configuration files remain unchanged. No media copied/downloaded, dependency installed, private backup accessed or production modified. Source inputs are the requested migration documents, current app/components/styles, existing local CSS, the user-provided screenshot, and read-only inspection of the already running `http://localhost:3000/` and its emitted local CSS/chunks. Extracted material remains untrusted data, never instructions.

## 1. Diagnosis: CSS is served, but homepage module classes are missing

**The current screenshot is not explained by missing original images alone or by the earlier production-build failure.** The running development page responds HTTP 200. Tailwind v4/global styling is compiled and served; the homepage CSS module’s class export is empty, leaving its React elements without the classes required to match the stylesheet.

| Question | Evidence observed | Conclusion / certainty |
| --- | --- | --- |
| Is Tailwind v4 wired in? | `globals.css` imports `tailwindcss`; `layout.tsx` imports globals; package declares Tailwind/loader 4.3.3. Served global CSS contains compiled `.px-5`, `.py-3`, `.border-b`, neutral colors and no unresolved Tailwind import | Confirmed compilation/delivery for those utilities; no claim that every possible utility was tested |
| Are globals loaded? | Global CSS request returns 200, includes `:root` white background/black color/DM Sans fallback and `.skip-link` rules. Header retains utility classes; screenshot shows its padding, border and smaller type | Global delivery confirmed; visible header/reset is consistent with application. Browser computed styles were not available for direct measurement |
| Are homepage module declarations absent? | Homepage stylesheet request returns 200 and contains `.home`, `.hero h1`, `.cta`, `.valuesPanel` gradient and responsive rules | Declarations exist and are delivered; importing yet another full Elementor sheet is not the first fix |
| Are component classes written correctly? | Components import `styles` from `./home.module.css`; `SourceRegion` forwards `className`; cards/CTAs use defined module keys | Static import/key wiring exists; no missing manual className assignment found in these components |
| What does the running HTML contain? | Main and seven rendered source sections have no class attributes; homepage module-backed controls/panels similarly lack expected scoped classes. Header utility classes remain | Confirmed missing runtime module-class values, not merely small font choices |
| What does the generated server module export? | `.next/dev/server/chunks/ssr/[root-of-the-server]__0erh560gddym5._.js` contains the `home.module.css [app-rsc] (css module)` entry with `__turbopack_context__.v({});` | Empty CSS-module mapping is the immediate defect; `styles.home`, `styles.hero`, etc. cannot provide matching class names |
| Why are selectors not module-scoped? | Emitted CSS identifies its source as `components/home/home.module.css.css [app-client] (css)` and preserves plain `.home`/`.cta` names. `next.config.ts` applies the Tailwind loader to `*.css` with `as: "*.css"` | Strongly supported configuration cause: the remapping changes a `.module.css` resource into `.module.css.css`, losing module recognition in the transformed resource. A fix/restart has not been performed, so controlled repair confirmation is still pending |
| Why are headings reset and buttons concatenated? | Screenshot has ordinary-size headings, inline “More About UsView All Services” / “Know More…” labels and no values gradient. Tailwind/global reset is present while module selectors have no matching classes | These symptoms follow directly from absent module classes. They are not the intended appearance of the implemented local stylesheet |

Observed stylesheet paths for this session (generated names can change):

- `/_next/static/chunks/app_globals_css_20o3uo5wggppq.css`: HTTP 200, 9,021 characters; compiled utility/global rules.
- `/_next/static/chunks/components_home_home_module_css_0xzoafjxv_if8.css`: HTTP 200, 4,746 characters; unscoped homepage rules with transformed `.css.css` source annotation.

The screenshot and actual local HTTP response are evidence from the current development app. The historical build port-binding failure is a separate environment issue. A working dev response does not establish that a production build succeeds; a failed production build does not establish why these current elements lack class names.

## 2. Intentional omissions versus defects

**Defect:** missing runtime module classes hide styling that already exists for headline sizes, container widths, CTA fills/borders/padding, grid/panel treatments, values gradient, spacing and media queries. These should become visibly styled once class export/attachment is repaired, even with zero recovered images.

**Intentional incomplete implementation:** source regions 1–4 and 12 are hidden markers; region 6 lacks image/counter figures; region 7 lacks hover-card content; region 8 has no logo grid; region 10 lacks image/icons and deduplicates responsive prose; region 11 has no testimonial items. No CSS fix can create those missing source assets/settings. Current source contains no image tags, media URL references or font-face declarations.

**Temporary deviation:** the hero uses readable black text/red-outline control on white because the original imagery/layering is unavailable. The source declares white headline/CTA styling. Missing DM Sans files cause fallback typography. Several image-dependent negative margins/heights were deliberately withheld. These prevent original-design fidelity but do not explain the missing gradient and button styles visible in the screenshot.

The existing `scripts/verify-contracting-home.mjs` check stubs CSS module imports with a proxy returning every requested class name. It tests component content/order but **cannot detect this integration failure**. A passing TypeScript/lint/component check must not be presented as proof of actual CSS delivery, class-map exports or visual parity.

## 3. Proposed repair sequence — not executed

1. In the next authorized code change, stop the broad CSS remapping from changing CSS-module resource identity. Evaluate narrowing Tailwind transformation to the actual global Tailwind entry, or a rule arrangement that preserves the `.module.css` suffix and native module processing. Keep the installed Tailwind v4 pipeline; do not assume a new package or a v3 config is needed. Exact replacement configuration needs a controlled test, not an unverified snippet in this plan.
2. Restart the owned development server after configuration changes. If stale generated artifacts are suspected, handle only generated state after authorization; no cleanup/deletion is performed in this documentation task.
3. Inspect the real returned page, CSS module export and stylesheet: module export must contain actual class mappings; main/sections/cards/CTAs must receive the corresponding scoped names; emitted selectors must match them. A stylesheet HTTP 200 alone is insufficient.
4. Verify an existing property from each class family: 50px desktop hero heading, 40px introduction heading, red rounded CTA, 1340px max-width container, radial values panel, value boxes and mobile font/padding changes. Obtain browser computed-style/screenshots when available. Check that Tailwind header utilities and global skip link still work.
5. Add an integration-level check against actual Next-served output/CSS or browser computed styles; retain the current component check for its narrower content/order purpose. Then rerun TypeScript/lint and the real production build. Treat any environment port restriction independently.
6. Only after styling attachment works, restore original-media and original-layout details in the source order below. Do not redesign around the current bare screenshot or fill missing regions with generic marketing sections.

Local installed Next.js guides consulted: `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` (CSS Modules/global CSS) and `01-app/03-api-reference/05-config/01-next-config-js/turbopack.md` (loader/rule remapping). The served output supplies the project-specific diagnosis. No external research, package installation or configuration mutation is part of this task.

## 4. Styling recovery by original region

Notation: `E(id)` is `.elementor-45 .elementor-element.elementor-element-ID`. Properties marked **confirmed** are retained declarations/content/structure in post-45.css/specification; they are not measured original screenshots. **Unresolved/inferred** describes missing computed geometry/behavior. Reuse existing React sections where faithful; do not import all generated WordPress CSS or plugin runtimes indiscriminately.

### Global / shared containers

**Confirmed:** post-6 kit container 1500px and widget spacing 20px; selected page-45 regions override to 1340px. Source body/heading declarations use DM Sans; experience figure uses Poppins 600. Red `#C5352D`, white/black and section-specific neutrals/gradient are explicit. Breakpoints are ≤767px mobile, ≤1024px tablet-and-mobile, tablet-only 768–1024px, and ≥768/≥1025 rules.

**Plan:** recover module mappings first; map only retained page-45 selectors/DOM relationships. Apply overlapping media rules in original cascade order. Use original font files only after approval. Preserve focus/semantic reading order without introducing another visual identity.

**Unresolved/inferred:** complete Astra/runtime reset/cascade, exact font metrics, arbitrary 20px flex/grid gaps, all default column proportions and original inline styling. Equal-column modern grids are implementations to verify, not source facts merely because several widgets exist.

### 1 — fc5da28: masked leading image

**Confirmed:** image `17aa5f8`, width 100%, saturation 200%; Subtract-3 mask contain/center/no-repeat. Root margin-top -20px → 0 at ≤1024px; widget margin-top -60px → -132px at ≤1024px.

**Plan:** recover original Untitled-design-13.webp and mask; match its crop and layer relationship to the verified header/message before restoring offsets. No new bitmap background.

**Unresolved:** rendered height, active header overlap and whether this image remains visible alongside later regions on mobile. First-image role is hero interpretation, not complete viewport assignment.

### 2 — 9d527f3: alternate leading image

**Confirmed:** `hide_desktop` retained; image 509c76c / freepik__enhance__74819-1.png; width 100%, saturation 200%; base widget top margin -178px, ≤1024px margin `-80px -8px ... -5px` and 30px corners; mobile margin 0. Root -20px → 0 at ≤1024px.

**Plan:** recover exact file and preserve conditional rendering based on approved original responsive visibility.

**Unresolved:** whether this is tablet-only, mobile-only or visible together with another hero image. Do not infer missing hide flags from aspect ratio.

### 3 — 92f0964: alternate leading image

**Confirmed:** hide-desktop; f4bf1a0 / Frame-5-scaled.webp; width 100%, saturation 200%, base -178px widget top margin; tablet-style offsets/30px corners and mobile zero margins. Root -20px → 0 below desktop.

**Plan:** recover original file, not the screenshot image from copy 5492; restore offsets only with screenshot evidence.

**Unresolved:** mutual visibility, final height/crop and hero stacking.

### 4 — c79b068: experience overlay

**Confirmed:** 1500px max-width, top margin -350px base / -20px ≤1024 / -110px mobile. Counter 542c5c8 number style Poppins 93px/600, white, 1px black stroke; mobile 36px. Title DM Sans 17px/500 `#BD1A11`; widget top margin 125px.

**Plan:** reconstruct overlay geometry and typography once value/prefix/suffix and hero/header layers are verified.

**Unresolved:** number itself, animation duration/trigger, exact placement and columns. Keep this region empty until public value evidence exists; do not fabricate counts.

### 5 — 3344d06: headline, message and CTA

**Confirmed:** 1340px container; headline 0047dc5 DM Sans 50px/500 white, ≤1024px 48px, mobile 30px/1.5em centered with 120px top margin. Copy 5643d39 16px/28px white (14px/2em mobile), base right margin 390px and top -12px; smaller-screen overrides remove/reduce margins. Nested 998438e/a7551f0 have 70/30 width declarations from 768px. Populated-column padding 40px horizontal ≤1024 and 20px mobile. Learn More 76c11a4 uses transparent/white treatment, 2px border, 20px corners; hover/focus white fill/black text; 15px → 14px mobile.

**Plan:** restore matching container/nested layout and original white treatment only when the imagery/composition supports readable contrast. Preserve exact retained headline/body/button destination. The current dark text is temporary, not the desired original appearance.

**Unresolved:** no direct background color/image on this section establishes a dark panel. Hero text/image composition spans preceding regions; do not invent a black background or absolute-position coordinates.

### 6 — e64adbd: engineering / About introduction

**Confirmed:** 1340px container, margin-top 40px; 20px side padding ≤1024, 10px all sides mobile. Headings 2ecf2aa/1dd3495 DM Sans 40px/500, 61px leading, black, centered ≤1024, mobile 25px/1.5em; duplicate 1dd3495 hides on desktop. Paragraph 17px/33px → 15px/2em mobile. Direct columns become 100% at tablet; image-column margin-left 60px becomes top -72px ≤1024. Image 1e25d96 height 500px → 201px mobile, cover/center, Frame-2147226296-1 mask; mobile margins `70px -28px ... -20px`. Source red-filled and red-outlined buttons have 20px corners and documented 40px horizontal desktop padding.

**Plan:** recover the exact image/mask; match original columns/heading visibility and counter/divider positions. Typography and buttons can be corrected independently of counter values.

**Unresolved:** numeric counters and animation; whether deduplicated heading must be repositioned rather than repeated for final responsive structure. Do not infer statistical values from the service count.

### 7 — 7a24bee: service previews

**Confirmed:** root padding `0 8px 20px`; mobile margin-top 30px, zero padding. Heading 2d0f90c 45px/500, 60px leading, black → 25px mobile, centered ≤1024. Four hover-widget IDs have Image-1.webp **mask** selectors; source has four Know More controls and View All Services. Know More exemplar bae4880 red/white, 10px corners, 15px text → 14px mobile, reverse content direction, black hover/focus.

**Plan:** restore existing heading/CTA styling now after module repair; recover narrowly sanitized addon presentation settings before rebuilding the four original cards. Keep nine service detail routes planned separately.

**Unresolved:** card images, full titles/descriptions, exact grid proportions, hover reveal/touch alternatives and runtime animation. The current wrapped button row is provisional. Do not generate nine replacement cards or use the mask as a photograph.

### 8 — 58749c8: client grids

**Confirmed:** heading 40px/500, 52px leading, -0.6px tracking, black → 25px mobile. Root padding `0 90px 70px` → `0 20px 40px` ≤1024 → `25px 10px 0` mobile. Two inner columns have 50% widths from 768px; two logo-grid widgets exist.

**Plan:** fix heading/container/gutters independently; restore client assets/order only after verifying members and intended layout. Inspect source hover filters only for the selected active grids, rather than adopting the utility page 2669’s style by resemblance.

**Unresolved:** number and identity of approved clients, logo order, whether grids complement or duplicate one another, cell sizes/mobile columns and exact hover behavior. Shared Trading logos require per-use review.

### 9 — b80c63d: values

**Confirmed:** root horizontal padding 8px; mobile margin-top 40px and `0 0 10px` padding. Inner 3007b6f max-width 1340px, 30px radius, centered radial overlay `#910800` → `#230200`, opacity 1; base vertical padding 60px, ≤1024 `40px 20px`, mobile `50px 20px 40px`. Heading 40px/500, 60px leading white → 25px mobile. Intro 16px/33px white with 180px side margins → 40px tablet → 0 mobile, 15px/2em. Boxes #36000054, 20px corners, `20px 20px 30px` padding. Titles 22px/400 → 18px mobile; descriptions 15px/300. Tablet inner-column width 100% declarations exist.

**Plan:** this section’s gradient, rounded boxes, typography and responsive padding can be styled substantially **without recovering images**. Preserve exact titles/descriptions; recover only missing glyph identities later.

**Unresolved:** computed icon sizing/placement, desktop base-column proportions and exact repeated-box positioning. Current equal three-column grid/20px gap are simplifications needing visual confirmation. Missing icons/fonts do not justify a completely unstyled values section.

### 10 — 121f708: Why us

**Confirmed:** root margin-top 30px, horizontal padding 10px → mobile `0 0 0 10px`. Nested 186b49f #F8F8F8/30px corners/base top padding 50px; 99f8c4b white, 1px #CCCCCC border, 25px corners/padding. Heading 77eda8c 40px/600 black. Repeated title/body prose has 22px/500/35px and 15px/28px styles. Main image 833a41d cover/center, 550px → 296px mobile; mask Frame-2147225870-1-1.webp; mobile margins `30px -34px ... -15px`. Three Line-151 references; duplicated nested region d925349 has hide-desktop; tablet/mobile full-width-column declarations exist.

**Plan:** fix original panel/type styling first, restore original image/line/glyph files, then match left/right relationships and responsive prose grouping. Preserve one semantic reading of each fact where source duplicates only support viewport layout.

**Unresolved:** exact image-panel arrangement and icon identities; do not convert it into a new product/project-card section. Background/panel styling does not depend on missing photography.

### 11 — 59490c0: testimonials

**Confirmed:** source heading 43px/500, 55px leading #0E1110 → 30px mobile. Root base bottom margin 30px/padding `0 8px 40px`, ≤1024 top margin 40px/bottom 0, mobile zero padding. Nested df408fc #FFF8F8/30px corners, base padding `50px 0 30px`, mobile zero. Repeater boxes reference fdfdfdffas.png background with cover sizing. Source shows two testimonial widgets.

**Plan:** recover heading/panel styling after module repair. Reconstruct quote list and slider only with approved retained public data and original behavior evidence.

**Unresolved:** quotes/attributions, order, portraits and autoplay/slide timing. Fallback item visibility suggests tablet/mobile limitations, but invalid `calc(2)`/`calc(1)` widths and missing runtime prohibit claiming final slider settings. No invented quotes.

### 12 — 1bdd178: unresolved shortcode

**Confirmed:** one shortcode widget; no direct post-45.css rule for this root, settings omitted.

**Plan:** retain hidden marker until its public resolved content/layout is known.

**Unresolved:** purpose, styles, dimensions and whether it relates to a footer, form or other content. Do not fill the gap with a new section.

## 5. Motion, breakpoint and verification policy

Source post-45.css has repeated 0.3s background/border/overlay transitions and button hover/focus colors. No `@keyframes` definition is present in that file. This does not prove the original site had no animations: addon runtime/other styles may define them. Counter motion, service-card reveals, scroll effects, parallax, sticky header and carousel autoplay remain unresolved. Add only verified behavior later, with reduced-motion and keyboard/touch equivalents; do not install an animation package to fill evidence gaps.

Visual tests after an authorized repair should cover 375/390px, 767/768px, 1024/1025px, 1440px and 1920px; include 1300px if a header candidate with that rule is confirmed. Confirm actual matching classes/computed properties, no overflow, readable contrast and source-order semantics. Source masks/negative margins must be verified with original media and shell, not judged against an invented blank substitute. Existing component tests remain useful for order/copy/Trading exclusion but do not replace integration/browser checks.

## 6. Minimum visual/template evidence

| Evidence needed | Minimum content | Why |
| --- | --- | --- |
| Contracting desktop hero/header | Full above-fold capture at a known width (1440 or 1920), plus top-of-page and scrolled header | Identify actual logo, alignment, hero crop, overlapping text/counter, transparency and any sticky behavior |
| Tablet hero/header | Captures at 1024 and 768px; boundary state around 1025px if different | Resolve which leading image regions survive, title/counter/image relationships and menu switch |
| Mobile hero/header | Known 375/390px viewport and 767px boundary, menu closed/open, full hero bottom | Resolve the two hide-desktop image regions, masks, alternate crops, line wraps and counter position |
| Contracting footer | Full-width desktop/tablet/mobile captures through the final source region | Recover actual footer columns, branding, links, hierarchy and where shortcode content ends |
| Menu states | Desktop dropdown open, keyboard/focus state and mobile open/closed | Verify menus, interaction behavior, submenu geometry and responsive reading order |
| Sanitized template records | Public trees for headers 546/849/2374/3161/5816 and footers 122/1793, or identified active subset; ordered columns/widgets, approved media references, menu ID | CSS supplies styling targets but not a complete actual DOM/content/logo assignment |
| Active display assignments | Sanitized evidence of the header/footer applied to page 45 and Contracting service pages, breakpoint variants and applicable template conditions | Neither CSS similarity, page IDs, copy size nor current menu items select the active shell |
| Original foundations | Approved relevant Astra/Elementor runtime styling or computed-style captures; font/version references | Resolve cascade, visibility classes, column defaults, type metrics and source dimensions |

No original screenshots/templates are accessed in this task. The supplied screenshot demonstrates a broken local CSS integration, not the original WordPress design, so it cannot establish intended hero/header/footer geometry. Private contact values and integration/delivery settings must be omitted from any later shared template material.

## 7. Prioritized blockers and exit criteria

1. **P0 — CSS-module integration:** restore class-map exports and class-to-selector matching. Exit: real served homepage shows scoped classes, red CTAs, source heading sizes and values gradient while Tailwind/global rules remain functional. This is the first blocker, independent of media.
2. **P1 — Original core media/fonts:** approved exact hero/intro/Why us images and masks plus licensed DM Sans; use [media recovery manifest](CONTRACTING_MEDIA_RECOVERY.md). Exit: approved files present, dimensions/crops known, no substitutions or remote hotlinks.
3. **P1 — Responsive hero and active shell:** screenshots plus sanitized template/assignment evidence above. Exit: no guessed header/footer and no unconditional rendering of all hero variants.
4. **P2 — Public addon/counter/shortcode data:** exact counter figures, service card presentation, approved client grid, testimonial content/runtime and shortcode result. Exit: missing data resolved rather than replaced with filler; Trading excluded in each component.
5. **P2 — Original grid/cascade fidelity:** original foundations and full-page captures; verify containers, column ratios, typography, masks, hover/focus and responsive ordering. Exit: current provisional grids/gaps/geometry reviewed against original evidence.
6. **P3 — Production/build and visual acceptance:** resolve any persistent environment limitation, run actual production build and browser comparisons, accessibility/overflow checks. The historical port issue is not a substitute for diagnosing today’s missing classes. No deployment is authorized.

No application, config, dependency or test changes implement these recommendations yet. This task produces only this report and the media recovery manifest; stop before repair/copy/download work.
