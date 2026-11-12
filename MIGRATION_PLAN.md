# ERAM ASACON CONTRACTING — WordPress to Next.js migration plan

Prepared and revised: 12 November 2026 (Asia/Kolkata). Scope: Contracting-only analysis and planning.

**Approved business scope:** The new website represents ERAM ASACON CONTRACTING exclusively. Trading is excluded from navigation, menus, homepage, pages, content records, division-specific components, product listings, Trading portfolios, calls to action, sitemap and internal links. Existing WordPress content, private backups and style references remain intact. This revision changes this document only; implementation awaits further instructions.

## 1. Existing website analysis

### Evidence and inspection limits

This plan separates **verified project/CSS evidence**, **user-supplied facts**, and **proposed implementation**. CSS establishes declarations and widget signatures, not the current rendered website, published pages, text, menu order, or template assignments. No page title or URL has been inferred from a WordPress post ID.

The user identifies the original stack as WordPress, Astra 4.10.1, Elementor with addons and portfolio plugins, and MetForm. The supplied Astra stylesheet confirms version 4.10.1. Its contents are theme metadata and license comments, ending with a note that actual CSS is loaded from `assets/css/`; it does **not** include the theme's runtime styling or Customizer output.

Public inspection attempts recorded during the initial analysis (not repeated for this document revision):

| Resource | Result | Implication |
| --- | --- | --- |
| https://eramasacon.com/ | Web fetch timed out | No homepage DOM, content, navigation, or screenshot obtained |
| http://eramasacon.com/ | Fetch resolved to HTTPS and timed out | No independent HTTP content obtained |
| https://www.eramasacon.com/ | Reported inaccessible by web tool | Host alias/canonical behavior unverified |
| https://eramasacon.com/robots.txt | Reported inaccessible by web tool | Crawl directives unverified |
| https://eramasacon.com/wp-sitemap.xml | Reported inaccessible by web tool | WordPress sitemap unavailable for inventory |
| https://eramasacon.com/sitemap_index.xml | Reported inaccessible by web tool | Alternate sitemap unavailable for inventory |
| Search for `site:eramasacon.com` | No results returned | No additional public URLs discovered; this does not establish that the site is unindexed |
| Browser inspection | In-app browser unavailable; browser inventory empty | No desktop/mobile visual or interaction inspection possible |

These are limitations of inspection from this environment, not proof of a global website outage. No public page was successfully inspected. Guessed company, service, contact, or division URLs are deliberately excluded from the verified inventory.

Filesystem inspection was confined to the Next.js project after locating it at `eramasacon-nextjs/`. The initial filename-only discovery from its parent listed sibling backup paths unintentionally; no sibling file contents, WordPress configuration, credentials, or SQL backups were opened. Those sources are excluded from this plan. Private media/content must later be supplied as a sanitized export inside this project before use under the current access restriction.

### Existing Next.js project

| Area | Verified state | Migration consequence |
| --- | --- | --- |
| Framework | `next` 16.4.6; `react` and `react-dom` 19.3.0 in `package.json` | Continue this project; do not initialize a replacement |
| Styling | Tailwind CSS 4.3.3 and `@tailwindcss/turbopack` 4.3.3 | Use existing CSS-first setup; do not add a Tailwind v3 configuration or redundant PostCSS pipeline |
| Language/tooling | TypeScript `^5`, strict mode, ESLint `^9`, Next ESLint 16.4.6 | Preserve strict typing and current lint configuration |
| Scripts | `dev`, `build`, `start`, `lint` | No test script currently defined |
| Routing | Root `app/`, only `page.tsx` and `layout.tsx`, plus globals and favicon | App Router already established; no corporate pages implemented |
| Aliases | `@/*` resolves from project root | Keep root-level organization consistent |
| Next configuration | `cacheComponents: true`, `partialPrefetching: true`, experimental agent feedback, Turbopack CSS loader | Preserve initially; validate behavior against this installed version when implementing |
| Current UI | Next starter content, Geist/Geist Mono imports, Arial body rule, starter light/dark colors | These are scaffold defaults, not the corporate design |
| Metadata | “Create Next App” title and generated description | Replace with verified company/page metadata during implementation |
| Public assets | Starter SVGs and `app/favicon.ico` | No verified corporate media/font library in supplied project files |
| References | 40 files, 2,257,673 bytes: Astra metadata stylesheet plus 39 Elementor CSS files | Preserve as read-only migration evidence; do not ship these wholesale |
| Repository baseline | `migration-reference/` was untracked; no tracked changes reported | Preserve existing files and user work; no commit/push |

`AGENTS.md` requires consulting installed Next.js documentation before coding. Relevant installed guides were inspected for Server/Client Components, Cache Components, and redirects. In particular, the enabled Cache Components mode changes the applicability of older route-level `dynamic`, `revalidate`, and `fetchCache` recipes. Future implementation must read the relevant local guide for each feature, not copy older Next.js patterns.

### Structure and functionality indicated by CSS

ElementsKit navigation and submenu styles occur in posts 546, 849, 2374, 3161, and 5816. Posts 122 and 1793 contain copyright widget selectors, making them footer candidates. Several large files contain testimonial, counter, and logo-grid styling; repeated groups may represent templates, revisions, or duplicate pages. Published status cannot be determined.

MetForm-specific rules occur in posts 960 and 1765. The rules include input and validation-related styling, but generated addon CSS can contain selectors for controls absent from the actual form. Field labels, required fields, select options, uploads, recipients, consent, success/error copy, anti-spam, and delivery behavior remain unknown.

Post 1972 contains an advanced accordion; post 2739 has extensive Owl/Unlimited Elements card-carousel rules; post 2914 contains Premium gallery, category, load-more, masonry/fitRows, and lightbox styling. These are behavior candidates, not proof every feature is enabled on a published page.

### Contracting-only business decision and homepage strategy

The user confirms that the existing WordPress homepage is an entry point to Contracting and Trading. The new `/` will instead be the main **ERAM ASACON CONTRACTING homepage**, based on the original Contracting landing page. Remove the division selector and Trading links rather than reproducing the old dual-division entry experience.

Preserve the original Contracting visual identity, typography, colors, section order, layout, imagery, content and responsive behavior as accurately as possible. Its original landing URL, Elementor/template IDs, text and screenshots remain **unresolved**. No new hero, slogan, services, projects, statistics or company claims may be invented. Moving the Contracting landing experience to `/` is approved; any content adjustment beyond excluding Trading needs verified source material or business-provided copy.

Red-heavy and blue-heavy stylesheet families exist, but neither color families nor post IDs are assigned to Contracting without evidence. Shared legacy material is eligible only after confirming relevance to Contracting, including company facts, contact details, testimonials, clients, certifications and downloads. Unclassified material remains outside implementation until resolved.

## 2. Contracting page inventory and route mapping

### In-scope register

No Contracting page URL or service/project name has been independently verified. The following records specify required discovery categories, not invented public pages.

| Content/resource | Evidence/status | Next.js destination | Required verification |
| --- | --- | --- | --- |
| Main Contracting homepage | Business-approved replacement for the dual-division entry page | `/`, existing `app/page.tsx` | Original Contracting landing URL, content, active Elementor/template IDs, desktop/mobile appearance |
| Legacy Contracting landing URL | Exact URL unresolved | Proposed redirect to `/` only after URL is verified and mapping approved | Confirm that the entire old page is equivalent to the new homepage; avoid duplicate canonicals |
| Contracting services overview/details | Names, count and hierarchy unresolved | Preserve verified legacy paths where appropriate | Service names/descriptions, ordering, detail pages, media and CTAs |
| Contracting projects/portfolios | Published items and categories unresolved | Preserve verified legacy paths where appropriate | Project titles, descriptions, images, categories, filters, pagination, detail URLs and permissions |
| Contracting company/profile material | Existence and eligible shared content unresolved | Assign only after inventory | Approved company facts, credentials, team/client content and relevant downloads |
| Contracting contact/enquiry content | URL, fields and routing unresolved | Preserve verified path or section target | Contact details, form schema, recipients, validation, consent and delivery flow |
| Relevant legal/shared pages | Inclusion unresolved | Preserve only verified, relevant pages | Current approved text and applicability to Contracting |
| Elementor post IDs in Appendix A | CSS evidence only | No automatic public routes | Map each ID to source URL, type, publication status and Contracting eligibility |
| Media references | Whole-legacy CSS pool; division ownership unresolved | Approved Contracting assets only | Match files to retained content and establish old-URL compatibility |

For retained routes, record original absolute URL/pathname, status, canonical, title/H1, parent, menu label/order, Elementor ID, template, content provenance, assets, metadata, destination and redirect decision. Track inclusion as `Contracting`, `shared-approved-for-Contracting`, `excluded-Trading` or `unresolved` in the migration register; the app content model contains only retained material. Published Contracting detail pages, categories, archives, PDFs and language variants enter scope only when verified.

### Contracting navigation structure

Confirmed target behavior: the homepage link leads to `/`; no division switcher or Trading destination appears in desktop/mobile navigation, footer, breadcrumbs, cards, CTAs or related-content links. Exact labels, ordering, nesting and destinations are **unresolved**. Services, projects, company and contact are inventory categories above, not an approved menu. Recover the original Contracting menu and relevant shared links before finalizing navigation. Audit links embedded in rich text, images, buttons, forms, downloads and galleries as well as explicit menus.

### Excluded Trading URL register

Trading content has no Next.js page destination or sitemap entry. **No exact Trading URL is verified**, and `/trading` must not be presumed to exist. Keep excluded URLs in this planning register separately from retained routes and runtime content.

| Excluded source category | Verified URLs | Target content | Handling decision |
| --- | --- | --- | --- |
| Trading landing and child pages | Unresolved; none verified | Excluded | Pending verified URL inventory and business approval |
| Trading products/listings and portfolios | Unresolved; none verified | Excluded | Pending per-URL review, including category/pagination/detail variants |
| Trading-specific enquiry/download/media URLs | Unresolved; none verified | Excluded unless explicitly approved as relevant shared material | Review separately; do not carry over Trading forms, CTAs or assets by default |

For every discovered excluded URL, record exact URL, evidence of Trading ownership, current status/canonical, relevant existing links, any genuine equivalent destination, proposed response, approval and final verification. Do not redirect Trading pages automatically to the Contracting homepage or use a wildcard division redirect. Recommend a permanent redirect only where a verified destination satisfies the same user intent and the business approves that mapping. For confirmed permanently removed content with no equivalent, recommend an explicit 410 response where supported; a genuine 404 is appropriate for unknown URLs or where removal handling has not been approved. A separately approved external successor may be considered only if verified. Do not publish placeholder Trading pages.

These are recommendations for the future Next.js release, not instructions to delete or modify the original WordPress site. Omit excluded URLs from new internal links and sitemap regardless of their eventual HTTP handling.

## 3. Design system findings

All values below describe the entire legacy CSS reference pool, not an approved Contracting design system. Their Contracting relevance, live use and cascade must be checked against the original Contracting DOM and screenshots before finalizing tokens. Unmapped values must not be adopted merely because they are frequent.

| Category | Evidence | Migration treatment |
| --- | --- | --- |
| Main font candidate | `DM Sans` is explicitly used across nearly all content/header families | Likely primary family; obtain font files/weights and verify computed styles |
| Other families | Radio Canada in detail-like families; Questrial/Space Grotesk/Poppins in large marketing-like families; Archivo in post 1765; Roboto and SF Pro Display Regular in post 960 | Preserve only demonstrated uses; confirm font rights and availability, especially SF Pro |
| Kit defaults | Post 6 defines Roboto, Roboto Slab; primary `#6EC1E4`, secondary `#54595F`, text `#7A7A7A`, accent `#61CE70` | These are fallback kit tokens, not a reliable representation of the overridden brand |
| Red accents | `#C5352D` widely repeated; `#BF0002` in posts 48/54; `#C4372D` in 2739 | Record per-component variants; do not flatten distinct reds without visual verification |
| Blue accents | `#06344D` prominent in 856/1935/2259; `#07344E` in 1972; `#02AAE6` in some menu files | Roles and division assignments unverified |
| Neutrals | Black/white, `#F1F1F1`, `#F3F3F3`, `#E6E6E6`, `#4C4C4C`; alpha hex overlays | Preserve background/overlay alpha values and contrast relationships |
| Type scale | Frequent 14–16px text, 22px component titles, 25/40/50px headings; 93px display values in large marketing families | Extract by selector and breakpoint, not frequency alone; icons also use font-size |
| Weights/leading | 400/500/600 common, some 300; 26/28/33px and 2em body-like leading, 53/61px heading-like leading | Use named text variants after matching actual text roles |
| Containers | Kit 1500px desktop, 1024px tablet, 767px mobile; many section overrides at 1340px; some 1600px | Support intentional container variants and edge gutters |
| Spacing | Kit widget spacing 20px; repeated 10/20/30/40px spacing; some desktop 90px side padding, tablet 20px; some mobile title sections use 140px top padding | Preserve section-specific geometry; avoid one global spacing substitution |
| Shape | Common 20/30px radii; asymmetrical 10/20px corners and 100px pills | Map to component variants where repeated |
| Images | `cover` background rules; center, bottom, and right positioning; transparent PNG/WebP decoration URLs | Preserve crop, focal point, layering, and aspect ratio using original assets |
| Motion | Repeated 0.3s color/background/fill/overlay transitions; a 600ms transition in post 856; carousel/counter selectors | No verified autoplay, entrance timing, scroll triggers, parallax, or sticky behavior |

Responsive evidence uses mobile `max-width:767px`, tablet 768–1024px, desktop from 1025px. Headers 546/5816 add a 1300px custom space-between rule. Some two-column layouts become 100%-width columns on tablet. Header logo limits include 160px tablet and 120/135px mobile. Post 2669 logo cards change from 173px to 150px height. Testimonial fallback CSS hides items beyond two on tablet and beyond one on mobile, but contains invalid-looking `width: calc(2)`/`calc(1)` declarations: do not reproduce these blindly or mistake pre-initialization CSS for working carousel behavior.

Define semantic CSS variables and Tailwind v4 theme mappings in the existing globals file during implementation. Keep source breakpoint boundaries exactly where necessary instead of accepting Tailwind defaults. Do not retain the starter's automatic dark mode unless the original site demonstrates one. Use CSS modules for specialized masks or complex decorative rules when utilities reduce clarity. Avoid importing generated Elementor/Astra CSS into the app.

## 4. Reusable component architecture

Proposed organization; no files or routes in this tree are implemented by this plan:

```text
app/
  layout.tsx                  # global language, fonts, metadata and shell
  page.tsx                    # original Contracting landing experience at /
  (site)/                     # optional route group; adds no URL segment
    [verified route folders]  # preserve original paths
  not-found.tsx
  sitemap.ts
  robots.ts
  api/enquiry/route.ts        # only if a verified form requires this endpoint
components/
  layout/                    # Header, Navigation, MobileMenu, Footer, Container
  ui/                        # ButtonLink, SectionHeading, Breadcrumbs, Icon
  sections/                  # Hero, SplitContent, FeatureGrid, LogoGrid, CTA
  interactive/               # Carousel, Accordion, Gallery, Form as needed
content/
  site.ts                    # verified Contracting company data
  navigation.ts              # Contracting-only menu structure
  pages/                     # retained Contracting content only
  assets.ts                  # original URL → local asset metadata
lib/
  content.ts                 # typed lookup, unknown-slug handling
  seo.ts                     # metadata helpers and canonical policy
  validation.ts              # shared form rules if required
  mail.ts                    # server-only adapter if required
public/
  media/                     # approved Contracting/shared media only
  fonts/                     # licensed local fonts
```

Build the shared Contracting Header, Navigation, MobileMenu, Footer, Container, Hero, SplitContent, service/project cards, LogoGrid and CTA only where supported by verified Contracting layouts. Gallery, carousel, counters and accordion components are conditional on confirmed use in retained content. Remove Trading-specific controls and references from shared component inputs.

Use Server Components for pages, shell, copy, cards, static grids, breadcrumbs, and SEO. Restrict Client Components to stateful menus, carousel controls, filtering/lightboxes, animated counters, and form feedback. Prefer native disclosure elements when they meet the verified design. Static final counter values and all essential text must remain available without animation.

Use typed content records with stable IDs, original URL/post ID provenance, section variants, media references, and metadata. Runtime content must contain only approved Contracting content; do not build a two-division selector, Trading product model or Trading-specific component family. Shared layout components should accept intentional variants rather than branching on pathname throughout the UI. Keep route hierarchy separate from internal content classification so a flat legacy URL can belong to contracting without gaining a new URL prefix.

Use explicit route folders for distinct page structures; use a dynamic segment with a verified slug registry only for truly repeated detail templates. Reject unknown slugs with a real 404. Use the installed framework's parameter and prerendering conventions. A small corporate site can start with typed local content; a CMS is a separate editorial decision, not a prerequisite or an automatic headless WordPress integration.

Keep existing Cache Components settings initially. Local static content needs no remote data/cache layer. If future runtime data is introduced, use the installed Cache Components guidance, appropriate cache boundaries and Suspense; never cache enquiry submissions or personal data as shared content. Deployment needs must be evaluated before choosing static export: forms and image optimization may require a runtime or external service.

Accessibility is part of parity: semantic landmarks, one meaningful H1, logical headings, skip link, descriptive links, keyboard menus, focus restoration and Escape behavior, visible focus, labeled forms, error announcements, appropriate alt text, and reduced-motion support. Do not conceal essential content until JavaScript animates it.

## 5. WordPress functionality replacement strategy

| Original layer / evidence | Proposed replacement | Outstanding verification |
| --- | --- | --- |
| Astra theme and Elementor templates | App Router layouts and reusable React sections | Active shell assignments and exact layout |
| ElementsKit navigation selectors | Server-rendered links plus small accessible menu controller | Labels, nesting, active states, breakpoint, overlay and sticky behavior |
| Copyright/footer selectors | Reusable footer with typed verified data | Contact details, legal/social links, columns and variants |
| MetForm | Native accessible controls; server validation and delivery endpoint or Server Action | Actual schema, recipients, consent, spam controls, upload requirements |
| Portfolio plugins reported by user | Typed portfolio data and server-rendered list/detail templates if published | Routes, categories, ordering, pagination, filters and detail content |
| Premium gallery CSS | Responsive image grid; optional client filters/lightbox/load-more | Active settings, image order, captions and categories |
| JKit/Owl/Swiper-related CSS | Small reusable carousel only where necessary | Slides per breakpoint, looping, touch, autoplay, timing and controls |
| Happy Addons logo grid | Semantic static grid and CSS hover effects | Logos, destinations, borders and responsive count |
| Advanced accordion CSS | Accessible disclosure/accordion | Exclusive vs multiple expansion, initial state and content |
| Counters/testimonials | Server-visible figures/quotes, optional client enhancement | Actual data, attribution, timing and source approval |
| Plugin icon fonts/masks | Verified SVG assets or minimal equivalents | Exact glyphs and license; do not install multiple icon packs |

Every replacement in the table is conditional on verified use within retained Contracting content. Portfolio data includes Contracting projects only; product listings and Trading portfolios are excluded.

Do not recreate unused plugin features or assume all CSS selectors correspond to active controls. No addon/plugin JavaScript or jQuery is required by default. Add a dependency only when a demonstrated interaction warrants it and its bundle/accessibility tradeoffs have been reviewed.

For forms, identify the Contracting contact/enquiry form and verified recipient/team first. Exclude Trading enquiry routes, department/product options and Trading CTAs; confirm any necessary field/copy changes with the business rather than inventing them. Preserve verified Contracting fields and behavior; enforce server-side type/length/allowlist checks, abuse protection, safe mail construction, pending/success/error states, and minimal logging. Use a server-only delivery adapter with later environment configuration; never expose credentials or silently report successful delivery on failure. Confirm retention and consent requirements. Enable attachment validation and limits only if uploads are part of the verified form. Test against a controlled recipient/sandbox later, without submitting production WordPress forms during discovery.

## 6. Media and asset migration strategy

During the initial analysis, all 40 reference files were read programmatically in full for declarations, URLs, selectors, media queries, and custom CSS. Across Elementor files there are **30 unique CSS asset URLs: 29 under `/wp-content/uploads/` and one Elementor plugin mask SVG**. These counts cover both divisions and are not Contracting asset counts. This is not the full media inventory: `<img>`, `srcset`, videos, documents, logos, inline styles and JS-configured slides are absent from CSS extraction.

Examples include `2025/01/80.jpg`, `2025/02/19572-3-1.jpg`, `2025/02/Subtract-9.png`, `2025/01/Subtract-3.png`, and `2026/02/Image-1.webp`. Numeric filenames cannot establish subject matter. No referenced image was visually inspected or downloaded in this phase; upload-folder dates do not establish publication or modification dates.

1. Obtain a sanitized media/content export inside the project, excluding configuration, credentials, database dumps and personal form submissions. Do not read sibling private backups under the current restrictions.
2. Select only verified Contracting imagery, logos, fonts, service/project photographs, decorative shapes and relevant shared downloads; leave Trading-only assets out of the shipped application. Contracting-specific filenames and counts remain unresolved. Build an asset manifest with inclusion evidence and referring Contracting pages: source URL, approved local path, checksum, dimensions, format, byte size, alt/caption, role, focal point, rights, and referring pages.
3. Deduplicate by checksum while preserving a mapping for every retained old asset URL. Retain original filenames when useful; do not generate replacement photography or logos.
4. Use `next/image` for content images with accurate dimensions and `sizes`; follow the installed version's current loading/preload guidance for the actual LCP image. Keep small vectors/decorative backgrounds as appropriate. Lazy-load below-fold media.
5. Recover masks, transparent decorations and original font weights. Sanitize SVGs; verify embedded font licensing. Prefer local fonts to remove external font-loading dependencies where permitted.
6. Decide old upload URL compatibility individually: serve legacy paths or use reviewed redirects. Preserve linked PDF/download URLs and image indexing value. Do not redirect every missing asset to the homepage.
7. Verify every retained Contracting asset resolves; compare crops at desktop/tablet/mobile. Keep unavailable media as an explicit blocker, not a stock-image substitution.

## 7. Elementor layout migration strategy

Recover a per-page Contracting layout specification from successful public HTML/screenshots or a sanitized page/Elementor export inside the project. Record section order, text, links, element IDs, columns, width constraints, backgrounds, overlays, image crops, spacing, alignment, visibility, responsive changes, and interactions. Match IDs against these CSS files to resolve the cascade and template source.

Translate section/container structure into semantic sections and grid/flex layouts. Translate headings, text editors, image/icon boxes and buttons into shared React components. Replace repeated Elementor nesting with minimal markup while preserving geometry. Keep decorations independent from semantic content. Do not treat generated selectors, negative-margin patches, or fixed pixel widths as required architecture; preserve their visible outcome after checking overflow and source order.

Start with the original Contracting landing experience at `/` and its shared shell, then verified Contracting service and project templates. Compare side by side at matching viewport widths, then expand the template families. Reuse patterns only after confirming differences in content order, layout and branding. Do not choose the highest numbered post file as the latest published template. Do not assume posts 45/5195/5492/5814 are all distinct public pages merely because all have CSS.

## 8. SEO and redirect strategy

Preserve retained Contracting public URLs wherever possible, except the approved move of the Contracting landing experience to `/`. Replace dual-division homepage metadata with source-verified Contracting metadata; exact title/description remain unresolved. Review the former Contracting landing URL for an approved redirect to `/` after confirming equivalence. Trading handling follows the separate excluded register in section 2. Extract titles, descriptions, canonicals, social metadata, heading hierarchy, image alt text and structured data from verified sources. Preserve accurate content and internal-link destinations; do not fabricate company details or schema claims.

Use App Router metadata at the global and page levels, with a verified canonical host and per-page canonical path. Add sitemap and robots metadata routes only after publication status is known. Sitemap entries must be canonical, indexable, successful Contracting or approved shared pages; omit Trading URLs, templates, form endpoints, drafts and redirects. All internal links, related content, CTAs and structured data must represent the retained Contracting scope. Use truthful Organization and breadcrumb structured data where supported by verified content.

Resolve host, HTTP→HTTPS and trailing-slash policy from the original site before configuration changes. Maintain a reviewed old→new redirect register for renamed pages, verified WordPress `?p=`/`?page_id=` links, attachment pages, archives and downloads when applicable. Next.js `permanent: true` redirects use **308**, not 301, according to installed documentation. If a strict 301 is required, choose an explicitly supported status mechanism and verify it. Avoid chains, loops, catch-all homepage redirects and losing meaningful query parameters. Preserve anchor targets where existing links use them; URL fragments are not sent to the server for redirect matching.

Provide genuine 404 responses for unknown routes, and make deliberate removal decisions for confirmed retired pages. Keep preview deployments out of indexing using suitable access/indexing controls and verify production controls before eventual release. No DNS, GoDaddy, WordPress, hosting or deployment changes are authorized by this planning task.

## 9. Implementation phases

| Phase | Work | Exit criteria |
| --- | --- | --- |
| A — Identify Contracting pages and original assets | Obtain verified Contracting landing/service/project/navigation records and original media; classify shared material; document excluded Trading URLs separately | Contracting inventory, original visual references and approved asset provenance; unresolved items explicitly logged |
| B — Establish the Next.js design system | Extract Contracting-specific fonts, tokens, containers, spacing and breakpoints; establish typed content and asset mappings with existing dependencies | Evidence-backed Contracting tokens and responsive specifications; no color/post-ID assumptions |
| C — Build Contracting homepage and shared layout | Reproduce the original Contracting landing experience at `/`, header, navigation and footer; remove dual-division entry controls | Approved visual/content comparison at desktop/tablet/mobile; no Trading links or CTAs |
| D — Migrate Contracting services and projects | Implement verified service/project templates, retained detail pages, relevant company/legal material and downloads | All approved Contracting routes covered; no Trading products, portfolios or content |
| E — Implement forms and interactions | Implement Contracting enquiry delivery and verified menus, galleries, filters, accordions and carousels | Controlled form-delivery, accessibility and interaction checks pass; no Trading form options |
| F — SEO, responsiveness, and testing | Validate metadata, canonicals, sitemap, approved redirect/removal mappings, content/asset parity, responsive states and performance | No broken retained links/assets or Trading exposure; build/lint/type and relevant behavior checks pass |
| G — Vercel preview and approved production deployment | Prepare a Vercel preview with indexing controls; validate runtime/forms; review release and rollback plan; deploy production only after explicit approval | Preview accepted, per-URL handling approved and explicit production authorization obtained; GoDaddy/DNS changes remain outside this task |

This task ends with this document. This revision updates only `MIGRATION_PLAN.md`; no preview or deployment is authorized now. No implementation phase has been started. No dependency installation, app edits, production changes, deletion, commit or push was performed. Build/lint were not run for a documentation-only change; application baseline behavior remains untested.

## 10. Risks, unknowns, and verification checklist

### Risks and next evidence needed

| Risk / unknown | Impact | Resolution |
| --- | --- | --- |
| Live site could not be inspected | Layout/page/content fidelity cannot yet be established | Reachable public site or sanitized HTML/content exports plus screenshots in project |
| Numbered CSS files lack page mapping | Drafts/duplicates/templates may be mistaken for pages | Sanitized ID/title/URL/type/status/template assignment register |
| Contracting hierarchy and source design unknown | Incorrect navigation/content or visual identity | Verify original Contracting landing page, menu, services, projects and shell |
| Trading URL inventory and removal decisions unresolved | Accidental inclusion or irrelevant redirects | Separate exclusion register with verified ownership and approved per-URL handling |
| Astra runtime and addon base styles absent | CSS overrides alone cannot reproduce computed styling | Capture computed styles and approved missing style references in project |
| Original media/fonts unavailable in project | Branding, dimensions and layout may drift | Approved in-project media/font package with usage rights |
| CSS includes multiple visual variants | Over-normalization could redesign site | Selector-level token mapping plus screenshot review |
| Forms/delivery unknown | Lost enquiries or wrong destination/schema | Verified public form specification and later controlled delivery configuration |
| Portfolio/gallery behavior unknown | Missing filters, projects or detail pages | Verified Contracting published items, categories, order and interaction captures |
| Animation/mobile behavior unobserved | Wrong timing, overlays, crops or reading order | Viewport and interaction captures; reduced-motion baseline |
| SEO/canonical/redirect history unknown | URL loss and indexing regressions | Crawl/export and approved historical URL/metadata register |
| Existing Next feature flags/version | Older implementation recipes may fail | Consult installed docs; validate build and route behavior during implementation |
| Deployment/runtime unspecified | Forms/image handling may not fit target hosting | Validate Vercel runtime compatibility in the later preview phase without altering hosting now |

### Information required before implementation

- Original Contracting landing URL, public HTML/content or sanitized in-project export, screenshots and responsive/interaction captures; the dual-division homepage is not the visual source for `/`.
- Exact Contracting page, service and project inventory, original text, menu labels/order/nesting, portfolio categories/detail relationships and relevant shared/legal/download content approved for retention.
- Evidence mapping each retained page and shell to Elementor/template IDs and CSS selectors; confirmed computed typography, colors, dimensions and breakpoints.
- Original Contracting media and licensed fonts supplied inside the project with provenance, dimensions, captions/alt text, crop guidance and usage rights. Private backups and credentials must not be accessed.
- Verified Contracting contact information, enquiry schema/options, recipient ownership, consent text and expected success/error behavior; later controlled delivery setup without sharing credentials in this document.
- Existing Contracting metadata/canonicals and exact legacy landing URL mapping; separately verified Trading URLs and business-approved removal/equivalent redirect decisions.
- Vercel preview ownership/access and runtime requirements for the later release phase, followed by explicit production approval and an accepted rollback plan.

All of the above source details remain unresolved except the business decisions stated here. Discovery must resolve the necessary inputs before the relevant implementation phase begins; no company content or design may be fabricated to fill a gap.

### Verification checklist for implementation

- [ ] Every verified Contracting legacy URL has a retained destination or approved redirect; excluded Trading URLs have a separate approved handling record.
- [ ] `/` matches the original Contracting landing design/content and contains no dual-division selector.
- [ ] No Trading navigation, content, product listings, portfolios, components, CTAs, sitemap entries or internal links are shipped.
- [ ] Trading URLs are never automatically redirected to `/`; equivalence and business approval support each redirect.
- [ ] Page counts distinguish published pages from reusable templates, forms and revisions.
- [ ] Contracting navigation, content and relevant shared shell are confirmed; no CSS color family or Elementor ID is assigned without evidence.
- [ ] Every title, paragraph, CTA, contact detail, testimonial and download matches approved source content.
- [ ] All 39 Elementor files are mapped to their role or explicitly marked unused/unresolved.
- [ ] Screenshots cover 375/390px mobile, 768px tablet, 1024/1025px boundary, 1300px header boundary, and 1440/1920px desktop where relevant.
- [ ] Check just below/above 767/768px; compare menu-open, hover/focus, accordion-expanded, gallery and form states.
- [ ] Typography, crops, overlays, spacing, section order, logo proportions and footer geometry match references.
- [ ] No horizontal overflow; readable at 200% zoom; keyboard focus/order and touch targets are usable.
- [ ] Reduced motion disables unnecessary animation/autoplay without hiding content.
- [ ] Form validation, abuse handling, pending/error/success feedback and controlled delivery are verified.
- [ ] Media/font URLs resolve; no unintended dependency on the old WordPress runtime remains.
- [ ] Canonicals, robots, sitemap, social metadata and structured data are validated from rendered output.
- [ ] Redirects are single-hop where possible; unknown URLs return real 404s; query/anchor behavior is covered.
- [ ] Run `npm run lint`, TypeScript checking and `npm run build` during implementation; verify preview runtime.
- [ ] Add focused route/interaction/form tests where they protect meaningful behavior, rather than testing static markup mechanically.
- [ ] Check mobile performance, layout shift, image sizing and client JavaScript; record baseline and post-migration results.
- [ ] Confirm release/rollback plan separately before any production, hosting or DNS change.

## Appendix A. Complete style reference inventory

Every file under `migration-reference/styles/` was examined during the initial analysis. This preserved inventory covers both legacy divisions and is not a list of approved implementation assets; Contracting eligibility remains unresolved for every ID. Roles below are CSS-based candidates only; **all public route assignments are unresolved**. “Detail-like” describes a repeated styling pattern, not a verified service/product page.

| File (relative to `migration-reference/styles/`) | Bytes | Findings |
| --- | ---: | --- |
| `astra-style.css` | 4,572 | Astra 4.10.1 metadata/licenses only; actual theme CSS absent |
| `elementor-css/post-6.css` | 1,168 | Global Elementor kit, default fonts/colors, 1500px container and responsive limits |
| `elementor-css/post-45.css` | 104,658 | Large marketing-like family; testimonials, counters, logo grid; five unique CSS asset URLs |
| `elementor-css/post-48.css` | 85,507 | DM Sans, red variants, counter; tablet full-width column overrides |
| `elementor-css/post-50.css` | 52,384 | DM Sans, split columns including 40/60 proportions; tablet full-width overrides |
| `elementor-css/post-54.css` | 64,404 | DM Sans, red variants, icon-box content and responsive spacing |
| `elementor-css/post-122.css` | 38,421 | Footer candidate; copyright/icon-list styles, white/red, decorative PNG |
| `elementor-css/post-546.css` | 25,354 | ElementsKit header candidate; custom 1300px alignment rule |
| `elementor-css/post-573.css` | 14,430 | Heading/icon/divider/image styles; white and bright red; role unknown |
| `elementor-css/post-849.css` | 25,328 | ElementsKit navigation candidate; responsive logos/columns |
| `elementor-css/post-856.css` | 92,260 | Blue-heavy content family; logos, counters, Swiper/slider selectors |
| `elementor-css/post-960.css` | 93,437 | MetForm family; Roboto/DM Sans/SF Pro declarations |
| `elementor-css/post-1121.css` | 57,493 | Detail-like red family, DM Sans/Radio Canada; 80.jpg and 17233990.jpg |
| `elementor-css/post-1209.css` | 56,261 | Detail-like red family; 80.jpg and 14851-1.jpg |
| `elementor-css/post-1211.css` | 57,949 | Detail-like red family; 80.jpg and 52935-1.jpg |
| `elementor-css/post-1213.css` | 57,032 | Detail-like red family; 80.jpg and 2871-1.jpg |
| `elementor-css/post-1216.css` | 50,165 | Detail-like red family; 80.jpg and 2148203929-1.jpg |
| `elementor-css/post-1218.css` | 56,143 | Detail-like red family; 80.jpg and 2836-1.jpg |
| `elementor-css/post-1220.css` | 60,208 | Detail-like red family; 80.jpg and 2149344001-1.jpg |
| `elementor-css/post-1581.css` | 34,289 | DM Sans/Radio Canada; 19572-3-1.jpg and 27606.jpg |
| `elementor-css/post-1765.css` | 95,383 | MetForm family; DM Sans/Archivo declarations |
| `elementor-css/post-1793.css` | 21,482 | Footer candidate; copyright selectors, DM Sans, neutral palette |
| `elementor-css/post-1854.css` | 32,375 | DM Sans/Radio Canada detail-like family; 19572-3-1.jpg and 2149878749.webp |
| `elementor-css/post-1862.css` | 32,199 | Detail-like family; 19572-3-1.jpg and 512-1.jpg |
| `elementor-css/post-1907.css` | 35,923 | Detail-like family; 19572-3-1.jpg and 14292-1.jpg |
| `elementor-css/post-1935.css` | 22,991 | DM Sans, blue-heavy family, two background/decorative URLs |
| `elementor-css/post-1972.css` | 59,382 | Advanced accordion/counter; blue variant; Elementor mask reference |
| `elementor-css/post-2259.css` | 6,454 | Compact heading/text/icon-list family; blue/white; 40px heading, mobile 30px override |
| `elementor-css/post-2374.css` | 25,352 | ElementsKit navigation candidate |
| `elementor-css/post-2406.css` | 49,944 | Detail-like family; 80.jpg and 2148921408.webp |
| `elementor-css/post-2408.css` | 50,157 | Detail-like family; 80.jpg and 1193.webp |
| `elementor-css/post-2669.css` | 927 | Small logo-grid template; hover filter; responsive card heights |
| `elementor-css/post-2739.css` | 387,862 | Extensive Owl/Unlimited Elements card-carousel rules, DM Sans, red variant |
| `elementor-css/post-2914.css` | 10,662 | Premium gallery/category/load-more/lightbox rules |
| `elementor-css/post-2957.css` | 29,103 | Detail-like family; 19572-3-1.jpg and industrial-tank named image URL |
| `elementor-css/post-3161.css` | 25,564 | ElementsKit navigation candidate; Subtract-3.png |
| `elementor-css/post-5195.css` | 102,712 | Similar marketing-like family to post 45; testimonials/logos/counter |
| `elementor-css/post-5492.css` | 106,098 | Similar marketing-like family to post 45; testimonials/logos/counter |
| `elementor-css/post-5814.css` | 106,108 | Similar marketing-like family to post 45; active/public status unknown |
| `elementor-css/post-5816.css` | 25,532 | ElementsKit header candidate; custom 1300px alignment rule |

## Appendix B. Evidence references

- Project files: `AGENTS.md`, `package.json`, `package-lock.json` (present), `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `README.md`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, and the complete style inventory above. Versions reported here are declared dependency versions; no registry upgrade research or installation was performed.
- Installed framework guidance read: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`, `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`, and `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md`.
- Public resources attempted are listed in section 1. They yielded access errors rather than usable site content and cannot substantiate page/design claims.
