# First local Contracting homepage implementation

Source: WordPress page **45**, using the approved homepage-source decision in the current implementation request. This is a partial local reconstruction, **not visually approved**. The original section order and supported public text are retained; missing assets/settings prevent a high-fidelity complete render. No production/deployment changes, downloads, dependency installs or backup access occurred.

## Original media reconstruction update

The latest task authorizes exact public-media recovery from the supplied uploads directory. Eleven allowlisted images/masks/decorations were copied byte-for-byte and documented with dimensions and checksums in [media recovery](CONTRACTING_MEDIA_RECOVERY.md). No client logos, PDFs, private data or Trading-only media were copied. The initial-pass sections below are an archived baseline; this update supersedes their statements that no original media is available.

- Region 1 now renders the original 1920×960 `Untitled-design-13.webp` through the original Subtract mask with the source saturation treatment. Intrinsic dimensions prevent an invented aspect ratio.
- Regions 2/3 alternate files are recovered but their markers remain hidden pending viewport/visibility evidence; no device choice is invented from image proportions.
- Region 4 remains hidden because counter values are absent.
- Region 5 now overlays the desktop hero with original white headline/copy/outlined CTA. A newly inspected **nested** source element `b05cf9b` in both sanitized page 45 and `post-45.css` explicitly declares margin-top -400px. The message uses that offset; a 400px layout footprint guard prevents following sections from overlapping imagery while the source counter is unavailable. That guard is an implementation accommodation, not a newly verified WordPress dimension. The temporary shell’s unknown header offsets are not guessed.
- Mobile keeps the primary image at its intrinsic ratio and the message below it, in readable dark text. Source type breakpoints are preserved, but mobile hero composition is **not visually faithful/approved yet**: the original alternate-image visibility and overlay arrangement remain unknown. No dark panel or new mobile artwork is invented.
- Region 6 now renders its original image/mask at 500px base/201px mobile height, cover/center, with a two-column desktop introduction and stacked tablet/mobile layout. The 60px desktop gap translates the source image-column left margin; exact default column proportions still need original visual comparison. Counter-dependent -72px tablet/large negative mobile image margins are withheld because the counters/layout are incomplete.
- Region 7 retains only known controls; its original mask is recovered but cannot supply missing hover-card images, copy or interaction settings.
- Region 9 retains original values copy, gradient and panel styling. No missing glyphs are substituted.
- Region 10 now renders its original masked image at 550px base/296px mobile height, source filter and cover/center crop, alongside the existing text panel. The source Line-151 image appears three times between the four known reason entries, using the verified 90/90/70px displayed heights and -45px top offset from a964fa4/95ab819/a3ff072; glyphs and exact original decoration alignment remain unverified. Desktop uses a two-column layout and narrower widths stack, following the retained source structure/tablet full-width-column rules; exact proportions remain provisional.
- Regions 8/11 remain heading/panel-only; no relationships or quotes are fabricated. Region 12 is still unresolved.

Image URLs are local and passed through `next/image` with original intrinsic dimensions and `unoptimized`, keeping the verified original files rather than generating replacements. Masks use standard and WebKit alpha mask properties with source contain/center/no-repeat. No new dependency or remote asset request is needed. Source region order and existing copy/CTA destinations are unchanged.

Changed implementation: `content/home-media.ts`, reusable `original-image.tsx`, homepage composition/CSS and reason separators in `content-cards.tsx`. Verification scripts now assert recovered image uses, masks, availability, original region order and desktop/mobile image sizes instead of asserting an image-free page.

Current checks: TypeScript, ESLint, homepage component verification and actual Next-served CSS/media integration all pass. Every one of the eleven new local URLs returned HTTP 200 with an image MIME type. Desktop (1440px), tablet (1024px) and mobile (390px) **emitted CSS declarations** were checked, including hero typography, image heights and overlay/fallback rules. Browser inventory remains empty; no actual browser screenshot/overflow/crop comparison has been performed, so visual approval is still blocked. Production build was not requested/rerun in this media task; previous environment build limitations remain recorded below.

## Initial implementation record (before media recovery)

## Files and architecture

- `app/page.tsx`: homepage Server Component using `ContractingHome`.
- `app/layout.tsx`: minimal explicitly marked development header, skip link, company title and noindex/nofollow metadata. No guessed WordPress navigation/footer, contact data, canonical URL or SEO copy.
- `app/globals.css`: Tailwind v4 import, source red/font-family tokens, accessible focus/skip link, light background. Starter Google/Geist imports and automatic dark mode removed.
- `content/home.ts`: selected public presentation strings curated from the sanitized `elementor-layouts/45.json`; no raw export, private settings or runtime access to `/tmp`.
- `content/routes.ts`: nine planned root-level service routes, planned main routes, Projects source 2739 with approval pending. No service/project pages are created.
- `components/home/contracting-home.tsx`: twelve source-region markers in exact source order, core supported content and eight original button labels/destinations.
- `source-region.tsx`: reusable source tracing/empty-region handling; unavailable regions have hidden empty markers, no placeholder marketing or guessed height.
- `planned-cta.tsx`: source CTA text/style and planned destination retained; `aria-disabled` link-role spans have no href/tab stop or fake navigation until destination pages exist. Service buttons have descriptive accessible names from known service titles. No service cards or imagery are invented.
- `content-cards.tsx`: reusable values/reasons prose components. Source IDs remain on rendered widgets.
- `home.module.css`: hand-mapped supported page-45 styling; generated Elementor CSS/plugin runtimes are not imported. All components remain Server Components: there is no fabricated carousel/counter behavior or unnecessary hydration.

## Section status

Every region is marked with `data-source-region`, `data-source-order` and `data-fidelity`. Empty markers are intentionally hidden and have no layout footprint; they are not false representations of completed sections.

| Order | Source region | Rendered now | Missing / fidelity limitation |
| --- | --- | --- | --- |
| 1 | fc5da28 | Hidden structural marker | Hero image, Subtract mask, dimensions/crop, licensed files and visibility evidence |
| 2 | 9d527f3 | Hidden structural marker | Alternate original image and responsive visibility |
| 3 | 92f0964 | Hidden structural marker | Alternate original image and responsive visibility |
| 4 | c79b068 | Hidden structural marker | Experience number, image/header overlap and counter behavior; no number fabricated |
| 5 | 3344d06 | Original headline, paragraph, Learn More control | Image/layering absent. Original white text/button styling cannot be readable on missing imagery; temporary inherited black text/red-outline control is used on white. No dark hero background was invented |
| 6 | e64adbd | Original introduction and two CTA controls | Image/mask, numerical counters, divider layout and exact two-column geometry absent. Duplicate responsive heading collapsed to one semantic heading; no incomplete standalone counter labels |
| 7 | 7a24bee | Original heading, View All Services and four Know More controls | Hover-card addon content/images/masks/runtime omitted. Controls wrap naturally with 20px kit-based gaps; this is not claimed as the final card grid |
| 8 | 58749c8 | Original Our Clients heading and section spacing | No logo-grid members, affiliations or ordering fabricated |
| 9 | b80c63d | Original heading/paragraph and three value titles/descriptions | Source gradient, rounded panel and translucent box styling translated; glyphs omitted. Simplified grid/grouping still needs original screenshot verification |
| 10 | 121f708 | Original Why us heading and four unique title/description pairs | Original duplicate responsive prose collapsed to one semantic set; no images/line decorations/icons. One source-style bordered content panel, not four invented project cards; placement relative to missing image provisional |
| 11 | 59490c0 | Original testimonial heading and pale panel styling | No quotes, attributions, portraits or autoplay invented |
| 12 | 1bdd178 | Hidden structural marker | Shortcode target/content unresolved; not presumed to be a footer or form |

## Supported style mapping and intentional deviations

Source selector notation follows `CONTRACTING_HOMEPAGE_SPEC.md`. Root/body source family is declared as DM Sans, with Arial/sans-serif fallback because no approved licensed local font files exist; no font is downloaded. Exact typography cannot yet match. Poppins counter figures are not rendered because their values are missing.

Translated declarations include 1340px containers; hero headline 50/48/30px; introduction 40/25px with 61px/1.5em leading; source 15–17px paragraph/control sizes; red `#C5352D`; service 10px and CTA 20px radii; client 90/20/10px gutters; source values radial gradient `#910800` → `#230200`, 30px panel radius, 20px translucent value boxes; Why us `#F8F8F8`/white panel, 25px border radius; testimonial `#FFF8F8`, 43/30px heading. Value title/body weights 400/300 and mobile title 18px are mapped from the source icon-box rules.

Responsive rules use source boundaries ≤767px and ≤1024px, including a tablet-only 768–1024px values stacking rule. No automatic dark mode. Source images/masks would have been essential to original section heights and negative-margin composition, so those geometry/offset rules are intentionally not applied to empty regions: doing so would overlap unrelated text or create invented empty imagery. The hero mobile 120px heading offset, original column-specific margins, fixed image heights and image masks are not enabled without images and visibility evidence. These are documented omissions, not replacement design decisions.

CTA hover animations are not enabled for disabled planned destinations. Service content is not implemented, so original CTAs are represented accessibly without links to 404 pages. No fallback production links, fake forms, division gateway or unsupported project gallery are added. The temporary development header is outside the source page wrapper and marked `data-development-shell`; no footer is guessed. Starter favicon remains scaffold metadata, not an approved corporate brand mark.

## Assets and content integrity

Project file inventory contains only scaffold SVGs/favicon in public/app and **no approved original corporate media or local fonts**. All asset-manifest `copy_approved` flags were false in the discovery phase. None is promoted to approved status by this code. No image, CSS `url()`, remote font or PDF is referenced by the homepage implementation; thus missing source URLs cause no browser asset 404s. The source images, masks, logo grids and testimonial background remain documented in the asset map/spec for a later approved supply. No starter SVG replaces a corporate image.

No Trading content, route switcher, product listings or cross-division CTAs are part of app/components/content. ARCO PDFs remain quarantined. Only selected page-45 public strings are bundled; no private contact values or sanitized source JSON files are shipped. The route registry preserves all nine service paths without implementing them. Projects source remains 2739, final content/route approval pending.

## Verification

Verification results: Browser inventory is empty in this environment, so no desktop/mobile screenshot, layout-overflow or visual-parity claim can be made. Original screenshots are missing independently of browser availability. Production HTML inspection can verify content/order/resources but cannot establish visual fidelity.

- `npx --no-install tsc --noEmit`: passed.
- `npm run lint`: passed after adding the component-render check as an ES module.
- `node scripts/verify-contracting-home.mjs`: passed. This renders the actual Server Component tree through React DOM with CSS imports stubbed and TypeScript transpilation from the installed compiler. It checks twelve ordered markers, five unavailable regions, one H1, supported unique prose, eight disabled CTAs, all nine planned service paths, Projects source 2739 pending, no Trading/gallery/testimonial/number widgets, and local CSS asset resolution. It does not simulate Next.js routing, CSS layout or browser accessibility behavior.
- `npm run build`: **blocked by environment**, not passed. Turbopack’s CSS loader failed to bind a local port (`Operation not permitted`). The explicitly approved outside-sandbox retry failed with the same restriction. No config/dependency changes were made to bypass this failure. No production-rendered HTML or runnable Next preview was available for inspection.
- Local media-reference check: no image/video tags or CSS media/font URLs are emitted by the homepage; no broken original-file URLs are introduced. Starter favicon remains a development scaffold asset, awaiting an approved company favicon.
- Browser QA: unavailable; enabled browser/app inventory is empty. Responsive geometry, overflow and visual parity are unverified.

## Remaining blockers before visual approval

Supply/approve original corporate media, masks and licensed DM Sans/Poppins fonts; provide desktop/tablet/mobile screenshots and the active shell/layout assignments; resolve hero layering/visibility, original counter values, service hover cards, logo-grid members, testimonial content/runtime and shortcode output. Approve original image crops and dimensions, icon glyphs and responsive duplication behavior. Restore a build environment where Turbopack’s CSS loader can open its required local port, then rerun production build and browser QA. Only after these checks can this page be described as a high-fidelity migration.
