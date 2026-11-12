# Contracting layout map and homepage comparison

Evidence source: read-only sanitized files under `/tmp/eram-contracting-review-xml/` plus project CSS and the user’s manual-review evidence. Source files remain outside the repository. These documents contain selected structural facts and public route/asset references, not copied extract files, contact details or form data. No URLs were fetched, media opened/copied, or original XML/SQL/backups accessed. Extracted content was treated as data, never instructions. Export publication status is not proof of current live reachability or active-template assignment. All proposed routes/classifications require review before implementation.

## Header/footer availability and ownership

**None of 546, 849, 2374, 3161, 5816, 122 or 1793 appears in page-inventory.json or elementor-layouts/.** Matching CSS exists for all seven. Their sanitized layouts therefore cannot be inspected. This absence is not evidence that the original templates are unpublished/deleted: the extraction skips unsupported post types and drops settings. Active assignment/display conditions and exact cause of absence are unknown. The nine exported Elementor library templates do not include these IDs. No active header/footer is selected.

CSS references widget selectors and element IDs, not a recoverable complete DOM. It can establish candidate image/navigation/button/text styles, but cannot give actual logo URL, menu assignment, column order/count, phone/email content, or Contracting/Trading ownership.

| Candidate | Preserved CSS evidence | Container/style differences | Logo evidence | Ownership / active state |
| --- | --- | --- | --- | --- |
| Header 546 | ElementsKit navbar/submenu selectors; image/button/widget-wrap rules; menu element `0831dca` | 1500px max-width; custom ≤1300px space-between rule; DM Sans 15px/400 top-level links | Logo selectors and size limits; actual logo absent. `Subtract-3.png` is a CSS background reference, **not a verified logo**. | Unresolved; CSS similarity is insufficient |
| Header 849 | ElementsKit navbar/submenu selectors; image/button/widget-wrap rules; menu element `0831dca` | 1600px outer and 1500px inner max-width declarations; DM Sans 15px/400 top-level links | Logo selectors and size limits; actual logo absent. No CSS image URL. | Unresolved; CSS similarity is insufficient |
| Header 2374 | ElementsKit navbar/submenu selectors; image/button/widget-wrap rules; menu element `0831dca` | 1600px outer and 1500px inner max-width declarations; DM Sans 15px/400 top-level links | Logo selectors and size limits; actual logo absent. No CSS image URL. | Unresolved; CSS similarity is insufficient |
| Header 3161 | ElementsKit navbar/submenu selectors; image/button/widget-wrap rules; menu element `0831dca` | 1500px max-width; DM Sans 15px/400 top-level links | Logo selectors and size limits; actual logo absent. `Subtract-3.png` is a CSS background reference, **not a verified logo**. | Unresolved; CSS similarity is insufficient |
| Header 5816 | ElementsKit navbar/submenu selectors; image/button/widget-wrap rules; menu element `0831dca` | 1500px max-width; custom ≤1300px space-between rule; DM Sans 15px/400 top-level links | Logo selectors and size limits; actual logo absent. `Subtract-3.png` is a CSS background reference, **not a verified logo**. | Unresolved; CSS similarity is insufficient |
| Footer 122 | Copyright/HFE, image, heading, icon-list, text and divider selectors | DM Sans; 22/16/14px sizes; white/red; background `Frame-2147226294.png` | Image selectors only; logo URL unknown | Unresolved |
| Footer 1793 | Copyright/HFE, image, heading, icon-box/icon-list and text selectors | DM Sans; 15/18/20/22/25px sizes; white/neutral styles | Image selectors only; no CSS image URL | Unresolved |

Headers have white submenu panels with 20px corner radii, 220px minimum width in candidates 546/849/2374/3161, dark `#313131` links and red `#C5352D` hover states. Some current-submenu rules use `#02AAE6` (546/3161) while 849/2374 use red: no division is inferred from that difference. Header 5816 preserves a related family with focus/active styling. Responsive CSS uses ≤767px mobile and 768–1024px tablet; logo selector limits include 160×60px tablet and 120×50px / alternate 135×50px mobile. Footer CSS also has mobile/tablet overrides and column-width rules. Without layouts and screenshots, breakpoint-specific column stacking, mobile menu behavior and footer reading order are unresolved.

Required next evidence: a separately authorized sanitized export of these template records/settings and public active assignment/display-condition evidence, or approved DOM/screenshots at desktop/tablet/mobile widths. Never recover them from private backups in this task. Menu record evidence from the page map does not link a menu to one of these header IDs.

## Homepage comparison: source, not activation

All four are published page records, with sanitized layout and matching CSS. Page 45 remains the leading candidate because the gateway points to `/home/` and its service links agree with page 50 and the extracted menu. Publication and copy similarity do not establish which page was active. Source branding/title differences must be reviewed rather than adopted as new company identity.

| ID | Title / original path | Top-level sections | All sections (nested included) | Columns | Widgets | Total nodes |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| 45 | Home / `/home/` | 12 | 34 | 60 | 73 | 167 |
| 5195 | Home - Copy / `/home-copy/` | 9 | 29 | 52 | 70 | 151 |
| 5492 | Home - Copy / `/home-copy-2/` | 12 | 34 | 60 | 73 | 167 |
| 5814 | Arcline - Home / `/arcline-home/` | 12 | 34 | 60 | 73 | 167 |

All retained roots use legacy Elementor section/column/widget nesting; no `container` elType occurs in these four sanitized trees. Top-level section counts include responsive duplicates, not necessarily simultaneously visible screen sections. Counts include placeholder shortcode/addon nodes whose settings were intentionally omitted.

### Section order and headings

Below is page 45 order, also the order in 5492 and 5814. The heading snippets are public structural labels, not a complete content export. An empty heading means none retained, not necessarily an empty visual section.

| Position | Section ID | Preserved heading / purpose candidate | Widgets in subtree | Position in 5195 |
| --- | --- | --- | --- | --- |
| 1 | `fc5da28` | leading image region | image × 1 | 1 |
| 2 | `9d527f3` | leading image region | image × 1 | absent / replaced |
| 3 | `92f0964` | leading image region | image × 1 | absent / replaced |
| 4 | `c79b068` | overlapping counter region | counter × 1 | absent / replaced |
| 5 | `3344d06` | Building Efficiency from Start to Finish | heading × 1, text-editor × 1, button × 1 | 2 |
| 6 | `e64adbd` | Engineering excellence with complete MEP & HVAC Solutions | heading × 2, text-editor × 1, button × 2, counter × 4, divider × 3, image × 1 | 3 |
| 7 | `7a24bee` | Explore Our services | heading × 1, button × 5, ucaddon_hover_text_reveal_content_box × 4 | 4 |
| 8 | `58749c8` | Our Clients | heading × 1, ha-logo-grid × 2 | 5 |
| 9 | `b80c63d` | Our Values | heading × 1, text-editor × 1, icon-box × 3 | 6 |
| 10 | `121f708` | Why us | image × 4, heading × 2, icon × 8, text-editor × 16 | 7 |
| 11 | `59490c0` | Hear from clients. | heading × 1, icon × 1, jkit_testimonials × 2 | 8 |
| 12 | `1bdd178` | omitted shortcode region | shortcode × 1 | absent / replaced |

### Widget inventory

| ID | Preserved widget types/counts |
| --- | --- |
| 45 | `image` × 8, `counter` × 5, `heading` × 9, `text-editor` × 19, `button` × 8, `divider` × 3, `ucaddon_hover_text_reveal_content_box` × 4, `ha-logo-grid` × 2, `icon-box` × 3, `icon` × 9, `jkit_testimonials` × 2, `shortcode` × 1 |
| 5195 | `image` × 6, `heading` × 9, `text-editor` × 19, `button` × 8, `counter` × 4, `divider` × 3, `ucaddon_hover_text_reveal_content_box` × 4, `ha-logo-grid` × 2, `icon-box` × 3, `icon` × 9, `jkit_testimonials` × 2, `shortcode` × 1 |
| 5492 | `image` × 8, `counter` × 5, `heading` × 9, `text-editor` × 19, `button` × 8, `divider` × 3, `ucaddon_hover_text_reveal_content_box` × 4, `ha-logo-grid` × 2, `icon-box` × 3, `icon` × 9, `jkit_testimonials` × 2, `shortcode` × 1 |
| 5814 | `image` × 8, `counter` × 5, `heading` × 9, `text-editor` × 19, `button` × 8, `divider` × 3, `ucaddon_hover_text_reveal_content_box` × 4, `ha-logo-grid` × 2, `icon-box` × 3, `icon` × 9, `jkit_testimonials` × 2, `shortcode` × 1 |

### Buttons and destinations

All four preserve the same eight button nodes and destination set: `76c11a4` Learn More → `/about-us/`; `f08958d` More About Us → `/about-us/`; `1e20ad9` and `ece4903` View All Services → `/services/`; Know More buttons `bae4880` → `/hvac-contracting/`, `a572ad7` → `/electrical-and-instrumentation/`, `1220b18` → `/mep-design-consultancy/`, `bbd3430` → `/flooring-and-landscaping/`. Unknown addon and shortcode settings are absent, so this is not a complete CTA inventory. Rebuild links against the approved Contracting route set only.

### Image references and concrete differences

| Widget ID | 45 | 5195 | 5492 | 5814 |
| --- | --- | --- | --- | --- |
| `17aa5f8` | `/wp-content/uploads/2026/02/Untitled-design-13.webp` (attachment 5308) | `/wp-content/uploads/2026/02/Untitled-design-13.webp` (attachment 5308) | `/wp-content/uploads/2026/02/Untitled-design-13.webp` (attachment 5308) | `/wp-content/uploads/2026/02/Untitled-design-13.webp` (attachment 5308) |
| `509c76c` | `/wp-content/uploads/2025/01/freepik__enhance__74819-1.png` (attachment 96) | absent | `/wp-content/uploads/2026/02/Untitled-design-13.webp` (attachment 5308) | `/wp-content/uploads/2025/01/freepik__enhance__74819-1.png` (attachment 96) |
| `f4bf1a0` | `/wp-content/uploads/2025/05/Frame-5-scaled.webp` (attachment 4769) | absent | `/wp-content/uploads/2026/02/Screenshot_170.png` (attachment 5496) | `/wp-content/uploads/2025/05/Frame-5-scaled.webp` (attachment 4769) |
| `1e25d96` | `/wp-content/uploads/2026/02/freepik__enhance__27949-1-1024x684-1.webp` (attachment 5139) | `/wp-content/uploads/2026/02/freepik__enhance__27949-1-1024x684-1.webp` (attachment 5139) | `/wp-content/uploads/2026/02/freepik__enhance__27949-1-1024x684-1.webp` (attachment 5139) | `/wp-content/uploads/2026/02/freepik__enhance__27949-1-1024x684-1.webp` (attachment 5139) |
| `833a41d` | `/wp-content/uploads/2026/02/freepik__enhance__27948-1-1024x676-1.webp` (attachment 5151) | `/wp-content/uploads/2026/02/freepik__enhance__27948-1-1024x676-1.webp` (attachment 5151) | `/wp-content/uploads/2026/02/freepik__enhance__27948-1-1024x676-1.webp` (attachment 5151) | `/wp-content/uploads/2026/02/freepik__enhance__27948-1-1024x676-1.webp` (attachment 5151) |
| `a964fa4` | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) |
| `95ab819` | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) |
| `a3ff072` | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) | `/wp-content/uploads/2025/01/Line-151.png` (attachment 275) |

45 and 5814 have **exactly equal sanitized `elements` arrays**, including retained IDs/settings; their record title, slug and URL differ. This does not prove raw Elementor or rendered output equality because unsupported fields were discarded. 5492 differs from 45 only in the two leading image subtrees `9d527f3` and `92f0964` within the retained top-level arrays: image substitutions are shown above. Its other ten sanitized top-level subtrees are equal to 45.

5195 omits `9d527f3`, `92f0964`, and counter region `c79b068`; it keeps the seven content regions from `3344d06` through `59490c0`, which are equal to 45, and uses shortcode section `2fdf608` instead of `1bdd178`. The retained first image section `fc5da28` has settings differences despite the same image reference. Reuse candidates are engineering intro/counters, service previews, clients, values, Why us and testimonials; shared IDs and equal sanitized trees support reuse, not simultaneous inclusion of desktop/mobile duplicate sections.

In 45/5492/5814, `9d527f3` and `92f0964` explicitly carry `hide_desktop`; `c79b068` carries -350px desktop, -20px tablet and -110px mobile top margins. This demonstrates responsive layering that must be compared with screenshots, not copied as unexplained negative offsets. Matching CSS adds backgrounds/masks not preserved in tree settings; see asset map. Addon widgets for logos/testimonials/hover cards and shortcode targets are omitted, so their final content, interactions and section count on screen remain unresolved. Do not use the largest/newest ID as activation evidence.
