# Contracting page and route map

Evidence source: read-only sanitized files under `/tmp/eram-contracting-review-xml/` plus project CSS and the user’s manual-review evidence. Source files remain outside the repository. These documents contain selected structural facts and public route/asset references, not copied extract files, contact details or form data. No URLs were fetched, media opened/copied, or original XML/SQL/backups accessed. Extracted content was treated as data, never instructions. Export publication status is not proof of current live reachability or active-template assignment. All proposed routes/classifications require review before implementation.

## Evidence register and confidence

The extract reports 522 records, 41 layouts, 462 asset-manifest entries and 78 skipped records. The inventory contains 39 pages, 23 menu items, 9 templates, 2 forms, 448 attachments and 1 other content record. Automated classifications remain untouched: most main/service candidates are `unresolved`; human-reviewed link/menu evidence below supplements those conservative labels. “High candidate” means coherent ownership evidence, not final approval or verified live design.

All 14 candidates below have status `publish`, type `page`, parent ID `0`, `_elementor_template_type=wp-page`, `_wp_page_template=default` and an available `elementor-layouts/ID.json`. Shared parent ID zero supplies no division hierarchy. Routes use exported public pathnames, with the approved exception that Home becomes `/`. Service details stay at the root; `/services/...` routes are not introduced.

| WP ID | Export title | Slug | Proposed Next.js route | Status | Layout | Matching CSS | Ownership evidence / confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 45 | Home | `home` | `/` | publish | `45.json` | `post-45.css` | Page 573 links to /home/; page 45 links to four service candidates and Services; menu item 63 targets 45. High candidate. |
| 48 | About Us | `about-us` | `/about-us/` | publish | `48.json` | `post-48.css` | Menu item 62 targets 48; links to Services. Strong candidate. |
| 50 | Services | `services` | `/services/` | publish | `50.json` | `post-50.css` | Menu item 61 targets 50; nine service links match the submenu. High candidate. |
| 52 | Projects | `projects` | `/projects/` | publish | `52.json` | **Missing** | User-nominated Projects candidate; wpb_portfolio widget; menu target conflicts with 2739. Medium candidate, destination unresolved. |
| 54 | Contact Us | `contact-us` | `/contact-us/` | publish | `54.json` | `post-54.css` | Menu item 64 targets 54; service Reach Us buttons target this route. Strong candidate; contact values withheld. |
| 1121 | HVAC Contracting | `hvac-contracting` | `/hvac-contracting/` | publish | `1121.json` | `post-1121.css` | Direct link from page 50 plus menu child of item 61; service cross-links and Contact CTA. High candidate. |
| 1209 | Civil and mechanical construction | `civil-and-mechanical-construction` | `/civil-and-mechanical-construction/` | publish | `1209.json` | `post-1209.css` | Direct link from page 50 plus menu child of item 61; service cross-links and Contact CTA. High candidate. |
| 1211 | Electrical and instrumentation | `electrical-and-instrumentation` | `/electrical-and-instrumentation/` | publish | `1211.json` | `post-1211.css` | Direct link from page 50 plus menu child of item 61; service cross-links and Contact CTA. High candidate. |
| 1213 | Firefighting | `firefighting` | `/firefighting/` | publish | `1213.json` | `post-1213.css` | Direct link from page 50 plus menu child of item 61; service cross-links and Contact CTA. High candidate. |
| 1216 | MEP Design consultancy | `mep-design-consultancy` | `/mep-design-consultancy/` | publish | `1216.json` | `post-1216.css` | Direct link from page 50 plus menu child of item 61; service cross-links and Contact CTA. High candidate. |
| 1218 | Fabrication | `fabrication` | `/fabrication/` | publish | `1218.json` | `post-1218.css` | Direct link from page 50 plus menu child of item 61; service cross-links and Contact CTA. High candidate. |
| 1220 | Flooring and landscaping | `flooring-and-landscaping` | `/flooring-and-landscaping/` | publish | `1220.json` | `post-1220.css` | Direct link from page 50 plus menu child of item 61; service cross-links and Contact CTA. High candidate. |
| 2406 | Testing and air balancing | `testing-and-air-balancing` | `/testing-and-air-balancing/` | publish | `2406.json` | `post-2406.css` | Direct link from page 50 plus menu child of item 61; service cross-links and Contact CTA. High candidate. |
| 2408 | Cleaning services | `cleaning-services` | `/cleaning-services/` | publish | `2408.json` | `post-2408.css` | Direct link from page 50 plus menu child of item 61; service cross-links and Contact CTA. High candidate. |

## Per-page links, layout evidence and assets

Asset counts below are manifest entries (path and attachment-ID references), not unique original files or approved media. Full relevant path associations and CSS background references are in [CONTRACTING_ASSET_MAP.md](CONTRACTING_ASSET_MAP.md). Node IDs provide traceability in the sanitized layout; they do not prove live activation.

### 45 — Home

Export URL path: `/home/`. Layout: 12 top-level nodes, 167 total nodes. Widgets: `image` × 8, `counter` × 5, `heading` × 9, `text-editor` × 19, `button` × 8, `divider` × 3, `ucaddon_hover_text_reveal_content_box` × 4, `ha-logo-grid` × 2, `icon-box` × 3, `icon` × 9, `jkit_testimonials` × 2, `shortcode` × 1.

Retained internal link evidence: `/about-us/`, `/electrical-and-instrumentation/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`, `/services/`.

Assets: 43 manifest references (37 paths, 6 attachment IDs). Selected image references: `/wp-content/uploads/2026/02/Untitled-design-13.webp`, `/wp-content/uploads/2025/01/freepik__enhance__74819-1.png`, `/wp-content/uploads/2025/05/Frame-5-scaled.webp`. CSS background/decorative references: `/wp-content/uploads/2025/01/Frame-2147226296-1.png`, `/wp-content/uploads/2025/01/Subtract-3.png`, `/wp-content/uploads/2025/01/fdfdfdffas.png`, `/wp-content/uploads/2026/02/Frame-2147225870-1-1.webp`, `/wp-content/uploads/2026/02/Image-1.webp`. 

Unresolved: active homepage confirmation, header/footer assignments, responsive hero visibility and hidden addon content; compare copies in layout map.

### 48 — About Us

Export URL path: `/about-us/`. Layout: 10 top-level nodes, 92 total nodes. Widgets: `image` × 6, `heading` × 8, `icon-list` × 3, `text-editor` × 7, `button` × 1, `counter` × 7, `htmega-imagemarker-addons` × 1, `divider` × 3, `icon-box` × 3, `shortcode` × 1.

Retained internal link evidence: `/services/`.

Assets: 15 manifest references (10 paths, 5 attachment IDs). Selected image references: `/wp-content/uploads/2025/02/Frame-2147226361-1.png`, `/wp-content/uploads/2025/01/325051862_fa899d86-37bf-46b5-88eb-abe693907fc5-3-1.png`, `/wp-content/uploads/2025/02/freepik__enhance__89235-1.png`. CSS background/decorative references: `/wp-content/uploads/2025/01/Frame-2147226296-1.png`, `/wp-content/uploads/2025/02/Subtract-9.png`, `/wp-content/uploads/2026/02/Frame-2147225870-1-1.webp`. 

Unresolved: active design/screenshots and omitted image-marker/shortcode content.

### 50 — Services

Export URL path: `/services/`. Layout: 6 top-level nodes, 106 total nodes. Widgets: `image` × 11, `heading` × 16, `icon-list` × 2, `text-editor` × 9, `button` × 9, `shortcode` × 1.

Retained internal link evidence: `/civil-and-mechanical-construction/`, `/cleaning-services/`, `/electrical-and-instrumentation/`, `/fabrication/`, `/firefighting/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`, `/testing-and-air-balancing/`.

Assets: 19 manifest references (10 paths, 9 attachment IDs). Selected image references: `/wp-content/uploads/2025/02/Frame-2147226363-1.png`, `/wp-content/uploads/2025/02/gvvb.webp`, `/wp-content/uploads/2025/02/djhddff.webp`. CSS background/decorative references: `/wp-content/uploads/2025/02/Subtract-9.png`. 

Unresolved: approved service presentation, thumbnails/crops and desktop/mobile ordering.

### 52 — Projects

Export URL path: `/projects/`. Layout: 2 top-level nodes, 5 total nodes. Widgets: `wpb_portfolio` × 1.

Retained internal link evidence: none preserved.

Assets: 3 manifest references (3 paths, 0 attachment IDs). Selected image references: none preserved in image widgets. 

Unresolved: whether 52 or menu-linked 2739 is the intended Projects source; project item records/categories and gallery behavior are not preserved by wpb_portfolio; no post-52.css supplied.

### 54 — Contact Us

Export URL path: `/contact-us/`. Layout: 7 top-level nodes, 38 total nodes. Widgets: `image` × 2, `heading` × 3, `icon-list` × 6, `metform` × 1, `htmega-imagemarker-addons` × 1, `icon-box` × 3, `google_maps` × 1, `shortcode` × 1.

Retained internal link evidence: none preserved.

Assets: 7 manifest references (5 paths, 2 attachment IDs). Selected image references: `/wp-content/uploads/2025/02/Frame-2147226362-2.png`, `/wp-content/uploads/2025/02/Frame-2147226361-1.png`. CSS background/decorative references: `/wp-content/uploads/2025/02/Subtract-9.png`. 

Unresolved: MetForm configuration/field schema and delivery remain omitted; map and image-marker settings are omitted; verify approved contact details privately.

### 1121 — HVAC Contracting

Export URL path: `/hvac-contracting/`. Layout: 8 top-level nodes, 117 total nodes. Widgets: `heading` × 15, `icon-list` × 9, `text-editor` × 6, `image` × 14, `divider` × 2, `icon-box` × 2, `button` × 4, `shortcode` × 1.

Retained internal link evidence: `/civil-and-mechanical-construction/`, `/cleaning-services/`, `/contact-us/`, `/electrical-and-instrumentation/`, `/fabrication/`, `/firefighting/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`, `/testing-and-air-balancing/`.

Assets: 21 manifest references (12 paths, 9 attachment IDs). Selected image references: `/wp-content/uploads/2025/02/2149366668-1.jpg`, `/wp-content/uploads/2025/02/2149281312-1.jpg`, `/wp-content/uploads/2025/02/freepik__enhance__89235-1.png`. CSS background/decorative references: `/wp-content/uploads/2025/01/17233990.jpg`, `/wp-content/uploads/2025/01/80.jpg`. 

Unresolved: brochure relevance and duplicated responsive CTAs; original crops/gallery ordering and omitted shortcode target.

Brochure link evidence: `/wp-content/uploads/2025/04/ARCO-Profile-v2.0.pdf` is present, **quarantined pending relevance/usage approval**. Some repeated buttons have no preserved destination; do not fabricate one.

### 1209 — Civil and mechanical construction

Export URL path: `/civil-and-mechanical-construction/`. Layout: 7 top-level nodes, 110 total nodes. Widgets: `heading` × 14, `icon-list` × 9, `text-editor` × 6, `image` × 13, `divider` × 2, `icon-box` × 2, `button` × 4, `shortcode` × 1.

Retained internal link evidence: `/civil-and-mechanical-construction/`, `/cleaning-services/`, `/contact-us/`, `/electrical-and-instrumentation/`, `/fabrication/`, `/firefighting/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`, `/testing-and-air-balancing/`.

Assets: 21 manifest references (12 paths, 9 attachment IDs). Selected image references: `/wp-content/uploads/2025/02/2235-1.jpg`, `/wp-content/uploads/2025/02/2267-1.jpg`, `/wp-content/uploads/2025/03/234-2-1.jpg`. CSS background/decorative references: `/wp-content/uploads/2025/01/80.jpg`, `/wp-content/uploads/2025/02/14851-1.jpg`. 

Unresolved: brochure relevance and duplicated responsive CTAs; original crops/gallery ordering and omitted shortcode target.

Brochure link evidence: `/wp-content/uploads/2025/04/ARCO-Profile-v2.0.pdf` is present, **quarantined pending relevance/usage approval**. Some repeated buttons have no preserved destination; do not fabricate one.

### 1211 — Electrical and instrumentation

Export URL path: `/electrical-and-instrumentation/`. Layout: 8 top-level nodes, 117 total nodes. Widgets: `heading` × 15, `icon-list` × 9, `text-editor` × 6, `image` × 14, `divider` × 2, `icon-box` × 2, `button` × 4, `shortcode` × 1.

Retained internal link evidence: `/civil-and-mechanical-construction/`, `/cleaning-services/`, `/contact-us/`, `/electrical-and-instrumentation/`, `/fabrication/`, `/firefighting/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`, `/testing-and-air-balancing/`.

Assets: 19 manifest references (10 paths, 9 attachment IDs). Selected image references: `/wp-content/uploads/2025/02/4181-1.jpg`, `/wp-content/uploads/2025/02/1273-1.jpg`, `/wp-content/uploads/2025/03/24002-1.jpg`. CSS background/decorative references: `/wp-content/uploads/2025/01/80.jpg`, `/wp-content/uploads/2025/02/52935-1.jpg`. 

Unresolved: brochure relevance and duplicated responsive CTAs; original crops/gallery ordering and omitted shortcode target.

Brochure link evidence: `/wp-content/uploads/2025/04/ARCO-Profile-v2.0.pdf` is present, **quarantined pending relevance/usage approval**. Some repeated buttons have no preserved destination; do not fabricate one.

### 1213 — Firefighting

Export URL path: `/firefighting/`. Layout: 8 top-level nodes, 117 total nodes. Widgets: `heading` × 15, `icon-list` × 9, `text-editor` × 6, `image` × 14, `divider` × 2, `icon-box` × 2, `button` × 4, `shortcode` × 1.

Retained internal link evidence: `/civil-and-mechanical-construction/`, `/contact-us/`, `/electrical-and-instrumentation/`, `/fabrication/`, `/firefighting/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`.

Assets: 23 manifest references (13 paths, 10 attachment IDs). Selected image references: `/wp-content/uploads/2025/02/2149290461-1.jpg`, `/wp-content/uploads/2025/02/2359-1.jpg`, `/wp-content/uploads/2025/02/freepik__enhance__89235-1.png`. CSS background/decorative references: `/wp-content/uploads/2025/01/80.jpg`, `/wp-content/uploads/2025/02/2871-1.jpg`. 

Unresolved: brochure relevance and duplicated responsive CTAs; original crops/gallery ordering and omitted shortcode target.

Brochure link evidence: `/wp-content/uploads/2025/04/ARCO-Profile-v2.0.pdf` is present, **quarantined pending relevance/usage approval**. Some repeated buttons have no preserved destination; do not fabricate one.

### 1216 — MEP Design consultancy

Export URL path: `/mep-design-consultancy/`. Layout: 7 top-level nodes, 106 total nodes. Widgets: `heading` × 14, `icon-list` × 7, `text-editor` × 6, `image` × 13, `divider` × 2, `icon-box` × 2, `button` × 4, `shortcode` × 1.

Retained internal link evidence: `/civil-and-mechanical-construction/`, `/cleaning-services/`, `/contact-us/`, `/electrical-and-instrumentation/`, `/fabrication/`, `/firefighting/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`, `/testing-and-air-balancing/`.

Assets: 19 manifest references (11 paths, 8 attachment IDs). Selected image references: `/wp-content/uploads/2025/02/29304-1.jpg`, `/wp-content/uploads/2025/02/51717-1.jpg`, `/wp-content/uploads/2025/02/xcxcxcv.webp`. CSS background/decorative references: `/wp-content/uploads/2025/01/80.jpg`, `/wp-content/uploads/2025/02/2148203929-1.jpg`. 

Unresolved: brochure relevance and duplicated responsive CTAs; original crops/gallery ordering and omitted shortcode target.

Brochure link evidence: `/wp-content/uploads/2025/04/ARCO-Profile-v2.0.pdf` is present, **quarantined pending relevance/usage approval**. Some repeated buttons have no preserved destination; do not fabricate one.

### 1218 — Fabrication

Export URL path: `/fabrication/`. Layout: 7 top-level nodes, 110 total nodes. Widgets: `heading` × 14, `icon-list` × 9, `text-editor` × 6, `image` × 13, `divider` × 2, `icon-box` × 2, `button` × 4, `shortcode` × 1.

Retained internal link evidence: `/civil-and-mechanical-construction/`, `/cleaning-services/`, `/contact-us/`, `/electrical-and-instrumentation/`, `/fabrication/`, `/firefighting/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`, `/testing-and-air-balancing/`.

Assets: 20 manifest references (11 paths, 9 attachment IDs). Selected image references: `/wp-content/uploads/2025/02/19572-2-1.jpg`, `/wp-content/uploads/2025/02/9147-1.jpg`, `/wp-content/uploads/2025/02/image-4-1.png`. CSS background/decorative references: `/wp-content/uploads/2025/01/80.jpg`, `/wp-content/uploads/2025/02/2836-1.jpg`. 

Unresolved: brochure relevance and duplicated responsive CTAs; original crops/gallery ordering and omitted shortcode target.

Brochure link evidence: `/wp-content/uploads/2025/04/ARCO-Profile-v2.0.pdf` is present, **quarantined pending relevance/usage approval**. Some repeated buttons have no preserved destination; do not fabricate one.

### 1220 — Flooring and landscaping

Export URL path: `/flooring-and-landscaping/`. Layout: 7 top-level nodes, 128 total nodes. Widgets: `heading` × 14, `icon-list` × 9, `text-editor` × 8, `image` × 15, `divider` × 2, `button` × 6, `icon-box` × 2, `shortcode` × 1.

Retained internal link evidence: `/civil-and-mechanical-construction/`, `/cleaning-services/`, `/contact-us/`, `/electrical-and-instrumentation/`, `/fabrication/`, `/firefighting/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`, `/testing-and-air-balancing/`.

Assets: 22 manifest references (12 paths, 10 attachment IDs). Selected image references: `/wp-content/uploads/2025/02/4945-1.jpg`, `/wp-content/uploads/2025/02/1558-1.jpg`, `/wp-content/uploads/2025/02/3875.jpg`. CSS background/decorative references: `/wp-content/uploads/2025/01/80.jpg`, `/wp-content/uploads/2025/02/2149344001-1.jpg`. 

Unresolved: brochure relevance and duplicated responsive CTAs; original crops/gallery ordering and omitted shortcode target.

Brochure link evidence: `/wp-content/uploads/2025/04/ARCO-Profile-v2.0.pdf` is present, **quarantined pending relevance/usage approval**. External “Explore Now” destinations are present; verify intended Contracting relevance before retaining them. Some repeated buttons have no preserved destination; do not fabricate one.

### 2406 — Testing and air balancing

Export URL path: `/testing-and-air-balancing/`. Layout: 8 top-level nodes, 105 total nodes. Widgets: `heading` × 14, `icon-list` × 5, `text-editor` × 6, `image` × 13, `divider` × 2, `icon-box` × 2, `button` × 4, `shortcode` × 1.

Retained internal link evidence: `/civil-and-mechanical-construction/`, `/cleaning-services/`, `/contact-us/`, `/electrical-and-instrumentation/`, `/fabrication/`, `/firefighting/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`, `/testing-and-air-balancing/`.

Assets: 18 manifest references (10 paths, 8 attachment IDs). Selected image references: `/wp-content/uploads/2025/03/9125.webp`, `/wp-content/uploads/2025/03/55834.webp`, `/wp-content/uploads/2025/03/33-2.jpg`. CSS background/decorative references: `/wp-content/uploads/2025/01/80.jpg`, `/wp-content/uploads/2025/03/2148921408.webp`. 

Unresolved: brochure relevance and duplicated responsive CTAs; original crops/gallery ordering and omitted shortcode target.

Brochure link evidence: `/wp-content/uploads/2025/04/ARCO-Profile-v2.0.pdf` is present, **quarantined pending relevance/usage approval**. Some repeated buttons have no preserved destination; do not fabricate one.

### 2408 — Cleaning services

Export URL path: `/cleaning-services/`. Layout: 7 top-level nodes, 108 total nodes. Widgets: `heading` × 12, `icon-list` × 5, `text-editor` × 7, `image` × 12, `divider` × 2, `icon-box` × 2, `button` × 5, `shortcode` × 1.

Retained internal link evidence: `/civil-and-mechanical-construction/`, `/cleaning-services/`, `/contact-us/`, `/electrical-and-instrumentation/`, `/fabrication/`, `/firefighting/`, `/flooring-and-landscaping/`, `/hvac-contracting/`, `/mep-design-consultancy/`, `/testing-and-air-balancing/`.

Assets: 16 manifest references (9 paths, 7 attachment IDs). Selected image references: `/wp-content/uploads/2025/03/7312.webp`, `/wp-content/uploads/2025/03/3334182.webp`, `/wp-content/uploads/2025/03/2149366667-1.jpg`. CSS background/decorative references: `/wp-content/uploads/2025/01/80.jpg`, `/wp-content/uploads/2025/03/1193.webp`. 

Unresolved: brochure relevance and duplicated responsive CTAs; original crops/gallery ordering and omitted shortcode target.

Brochure link evidence: `/wp-content/uploads/2025/04/ARCO-Profile-v2.0.pdf` is present, **quarantined pending relevance/usage approval**. External “Explore Now” destinations are present; verify intended Contracting relevance before retaining them. Some repeated buttons have no preserved destination; do not fabricate one.

## Proposed navigation and service dropdown

Requested top-level order: **Home → About Us → Services → Projects → Contact Us**, proposed destinations `/`, `/about-us/`, `/services/`, `/projects/` (provisional), `/contact-us/`. The five labels/order are a user-specified proposal, not proof of the active header. The extracted menu label is `menu`; its active theme location is unavailable. Menu item 2907 is explicitly titled Projects but targets **2739 `/portfolio-2/`**, so the Projects destination/content source must be approved before implementation.

Service children are evidenced by parent menu item 61 (target 50) and all nine destination links in page 50. The following order follows the service cards/buttons in page 50; original menu order must be compared separately.

| Service | Destination | Menu item ID |
| --- | --- | --- |
| HVAC Contracting | `/hvac-contracting/` | 1423 |
| Electrical and instrumentation | `/electrical-and-instrumentation/` | 1419 |
| MEP Design consultancy | `/mep-design-consultancy/` | 1424 |
| Flooring and landscaping | `/flooring-and-landscaping/` | 1422 |
| Civil and mechanical construction | `/civil-and-mechanical-construction/` | 1418 |
| Firefighting | `/firefighting/` | 1421 |
| Fabrication | `/fabrication/` | 1420 |
| Testing and air balancing | `/testing-and-air-balancing/` | 2417 |
| Cleaning services | `/cleaning-services/` | 2416 |

Extracted menu ordering evidence (menu_order): 1121→4, 1211→5, 1216→6, 1220→7, 1209→8, 1213→9, 1218→10, 2406→11, 2408→12. This is source order evidence, not an instruction to reorder the requested top-level navigation.

## Trading exclusions — separate register

All rows below are `publish` in the export and excluded from proposed Next.js content under the current business scope. URL paths are exported references, not checked live endpoints. No destination/redirect is assigned. Exclude the extracted `Trading Menu` as well as Trading-only products, assets, portfolios, CTAs and contextual links. Shared images require per-use approval rather than automatic inclusion or blanket deletion.

| ID | Export title | Exported path | Handling |
| --- | --- | --- | --- |
| 856 | Home Trading | `/home-trading/` | Excluded; no automatic redirect |
| 1581 | Rubber products | `/rubber-products/` | Excluded; no automatic redirect |
| 1854 | Chemical Solutions | `/rubber-mats-and-tiles/` | Excluded; no automatic redirect |
| 1862 | General Trading | `/general-trading/` | Excluded; no automatic redirect |
| 1907 | Construction Equipment | `/construction-equipment/` | Excluded; no automatic redirect |
| 1935 | Contact Us Trading | `/contact-us-trading/` | Excluded; no automatic redirect |
| 1972 | About Trading | `/about-trading/` | Excluded; no automatic redirect |
| 2259 | Services Trading | `/services-trading/` | Excluded; no automatic redirect |
| 2914 | Projects Trading | `/projects-trading-2/` | Excluded; no automatic redirect |
| 2957 | Chemicals | `/chemicals/` | Excluded; no automatic redirect |

1854 illustrates why titles must not generate routes: its exported title is Chemical Solutions but its slug is `rubber-mats-and-tiles`. Recommend 410 for a confirmed permanently retired URL with no equivalent, or a genuine 404 where appropriate; permanent redirects require verified same-intent replacements and business approval. Never redirect all Trading URLs to `/`. Do not apply any handling to WordPress now.

## Other pages held for review

| ID | Title / slug | Export status | Layout / CSS | Decision evidence |
| --- | --- | --- | --- | --- |
| 573 | Front Page / `home-main` | publish | layout present; CSS present | Gateway: exported URL is / although slug is home-main; links /home/ and /home-trading/. Do not reproduce as new homepage. |
| 2669 | logo / `logo` | publish | layout present; CSS present | Logo-grid utility candidate; ownership and intended reuse unverified. |
| 2734 | Portfolio / `portfolio` | publish | layout present; CSS absent | Near-empty portfolio shell; no preserved widgets/content. |
| 2739 | Portfolio / `portfolio-2` | publish | layout present; CSS present | Strong project-source candidate: menu item 2907 points here; 45 card-carousel widgets. Do not discard merely because it was on the review list. |
| 3431 | Gallery / `gallery` | publish | layout absent; CSS absent | Gallery record has no layout; no supplied matching CSS. |
| 5098 | sa / `sa` | publish | layout present; CSS absent | Empty sanitized elements and no fallback text; purpose unresolved. |
| 5195 | Home - Copy / `home-copy` | publish | layout present; CSS present | Home copy; compare layout, do not pick by ID/date. |
| 5492 | Home - Copy / `home-copy-2` | publish | layout present; CSS present | Home copy with changed leading images; no activation evidence. |
| 5814 | Arcline - Home / `arcline-home` | publish | layout present; CSS present | Arcline-labelled home record; sanitized elements equal 45, but naming/branding intent and activation unresolved. |

No copy/utility route enters the sitemap or proposed app by default. Do not redirect copies or the Projects alternatives until their intended destinations and equivalents are approved. Contracting `/home/` → `/` is the recommended mapping if page 45 is approved; preserve only one canonical homepage.
