# Contracting reference extraction guide

This workflow prepares **review references**, not website content ready for publication. ERAM ASACON CONTRACTING is the sole target. Trading stays excluded; unknown material is never automatically assigned to Contracting. No real export has been processed or accessed in this task. Processing real WordPress data requires the user's next approval and explicit input paths.

## Requirements and inputs

Python **3.10+**, standard library only; no package installation, WordPress installation, PHP interpreter, database server or network connection is needed. Run from the existing `eramasacon-nextjs` project. The script never executes SQL/PHP, restores databases, fetches URLs, opens credentials, traverses backups or copies media files.

The script accepts exactly one source per run:

- `--xml PATH`: UTF-8 WordPress All Content / WXR 1.2 XML export.
- `--sql PATH`: UTF-8 MySQL/MariaDB dump with supported literal inserts.
- `--output-dir PATH`: required new or empty directory. Existing output is never overwritten. Use a separate directory for each run or format.
- `--table-prefix PREFIX`: SQL table prefix, default `wp_`; supply the exact site's prefix, especially for multisite.
- `--public-post-type TYPE`: repeatable opt-in for a **reviewed public** custom content type, such as the actual portfolio post type after its identity is confirmed. Unknown types are skipped by default. Do not opt in submission, user, order, private CRM or other confidential types.

Only explicit source files are opened. The current task prohibits reading private backups outside the project or running this script on real data. Future commands below are for a separately approved local run; leave original sensitive files outside Git and never copy raw exports into this project. The directory shown as `APPROVED_SOURCE_DIRECTORY` is a placeholder for that later authorized location, not a path the agent has inspected.

## Commands for a later approved run

From the project root, substitute the approved absolute source path:

```bash
python3 scripts/prepare-contracting-reference.py --xml /APPROVED_SOURCE_DIRECTORY/all-content.xml --output-dir /tmp/eram-contracting-review-xml
```

Alternatively, for a supported SQL dump:

```bash
python3 scripts/prepare-contracting-reference.py --sql /APPROVED_SOURCE_DIRECTORY/site.sql --table-prefix wp_ --output-dir /tmp/eram-contracting-review-sql
```

For a verified public portfolio type, append `--public-post-type ACTUAL_PUBLIC_TYPE`. Do not assume that `project` or `portfolio` is the real type name. The exporter does not automatically combine XML and SQL results: compare source IDs and evidence manually across separate outputs and resolve discrepancies.

Synthetic tests, safe to run now:

```bash
python3 -B -m unittest discover -s tests -p 'test_*.py' -v
```

Synthetic fixture extraction, if a manual example is needed:

```bash
python3 scripts/prepare-contracting-reference.py --xml tests/fixtures/wordpress-synthetic.xml --output-dir /tmp/eram-synthetic-review
```

## Output structure

```text
OUTPUT/
  page-inventory.json
  contracting-pages.json
  unresolved-pages.json
  excluded-trading-pages.json
  elementor-layouts/
    SOURCE_POST_ID.json
  asset-manifest.json
  extraction-report.md
```

`page-inventory.json` contains source IDs, type, role, parent, status, published flag, presentation eligibility, menu order, sanitized title/slug/URL, public presentation extracts, allowlisted template assignments, classification evidence and provenance. Draft/private/protected records, revisions and recognized form definitions retain only structural inventory data; their titles, slugs, URLs and bodies are omitted. Publication and presentation eligibility differ: WordPress attachments commonly use `inherit`; those are eligible only when attached directly to a published, unprotected public content record. Orphan/template-attached images require manual resolution. Attachment IDs remain separate manifest references where paths cannot be resolved.

The three classification files partition the entire inventory by candidate division. They may contain templates, menus or attachments: inspect `role`, `status` and `presentation_eligible` before treating any record as a page. Draft/private/form/revision records remain unresolved. A published template is not proof of an active template assignment.

Per-page layouts contain source ID/format and a lossy Elementor element tree. They are produced only for eligible public records with valid array-shaped `_elementor_data`. Invalid or unsupported arrays are omitted and counted. Empty or missing settings can mean intentional security filtering, not an empty original design.

The asset manifest contains original site-relative `/wp-content/uploads/...` paths or unresolved attachment IDs, referring page IDs, candidate divisions, and `copy_approved: false`. Thumbnail and Elementor image IDs are associated with pages; eligible attachment records can resolve those IDs to paths. No uploaded files are read/copied. References belonging to Trading or unresolved content remain in the discovery manifest for review, **not** in an approved Contracting asset list.

The report contains deterministic aggregate counts, sanitization notices and limitations. It includes neither timestamps nor absolute source paths. Source IDs plus format and metadata-key-specific template assignments provide traceability without copying raw source records. The exact input basename and credentials are never logged.

## Sanitization and privacy boundary

The script reads sensitive inputs offline but emits selected presentation data only. Default supported types are page, post, attachment, Elementor library template and navigation item; recognized form types and revisions receive structural inventory only. WordPress user tables, options, comments, submissions and arbitrary plugin tables are ignored. It never exports post authors, user IDs, post passwords, editor locks, email delivery settings, submitted form values, authentication data or raw postmeta. Explicitly opting in a custom post type is a trust decision: review that type first.

Only `_elementor_data`, `_elementor_template_type`, `_wp_page_template`, `_thumbnail_id`, `_wp_attached_file` and a small set of menu reference keys are read from postmeta. Unknown metadata, page-settings blobs, dynamic tags, CSS/JavaScript, shortcode code, integration config and serialized PHP are not copied. Template assignments preserve only simple approved values, not executable code.

Element trees retain validated element IDs/types and allowlisted presentation settings: public text/headings/button labels, image/link references, selected alignment/type values, spacing/colors/typography and responsive variants. Recognized core widgets are allowlisted; unknown addon widget settings and descendants are omitted. Container/section presentation styles can survive without a widget type. Form/code/HTML/shortcode widgets have settings and descendants omitted. Repeater items are recursively allowlisted; unrecognized field names disappear. HTML becomes text/headings/link/media references; scripts, forms, embedded objects, controls, event attributes and HTML markup are not output. Shortcodes are stripped rather than evaluated.

URLs permit HTTP(S) or relative paths only; userinfo, dangerous schemes, traversal and credential-like URLs are rejected. Query strings and fragments are stripped, including legitimate ones, to prevent carrying tokens. Common credential/token patterns in retained strings are redacted. No automatic sanitization can prove that arbitrary free text is public: a password pasted into a heading or a misidentified public custom post type can evade pattern checks. **Review outputs locally before sharing or placing them in Git.** Do not treat an allowlist as permission to publish data. Public contact information appearing in visible page copy can remain; mail delivery recipients/configuration do not.

Keep sources and review outputs outside the repository; do not put them in `public/`. Never commit raw SQL/XML, `wp-config.php`, credentials, user records or submissions. Restrict filesystem access to review outputs according to local policy. Do not follow extracted links or fetch media automatically. Errors print a fixed generic message so parsing exceptions cannot disclose source fragments. Invalid inputs fail before output creation; filesystem write errors may leave partial sanitized output, so use a fresh directory when retrying.

## Classification review

Classification uses whole-word `contracting` and `trading` evidence in public titles/slugs, ancestor records and WordPress menu names targeting a record. Conflicting evidence yields `unresolved`; absence of evidence yields `unresolved`. Outbound HTML links mentioning divisions are recorded as review-only hints and do not confer ownership: the old entry homepage can link to both divisions. Elementor links remain in sanitized layout settings for manual review. No CSS filename, color family, numeric ID or generic service name establishes division membership. All results carry `review_required: true`.

Review each candidate against the original Contracting navigation and page hierarchy. Resolve false positives such as a title saying “not Trading,” stale menus, duplicate templates and shared company material. Confirm public URL, status, content, imagery and active shell. Menu target IDs are retained only for explicitly declared public post-type targets; taxonomy/user targets are not treated as page IDs. Explicitly approve relevant shared material; the script never automatically labels it Contracting. Keep Trading URLs in an excluded register. No automatic redirects are generated; require equivalent content and business approval before recommending any redirect. The original Contracting landing experience maps to `/` only after its source is verified.

## SQL/XML support and limitations

- WXR 1.2, uncompressed UTF-8 (optional BOM), standard `channel/item` posts and postmeta are supported. An Expat validation pass rejects actual DTD/entity declarations, external entity references and malformed XML before ElementTree extraction; declaration-like text inside CDATA or escaped text is allowed. NUL bytes remain rejected. No external entity parser or resource loader is created. XML is read in memory; very large exports need a future bounded streaming implementation or an appropriately sized offline machine. No external entity/network resolution is used.
- SQL statements stream from disk, with a 32 MiB per-statement cap. Standard MySQL backslash escapes and doubled quotes are supported; semicolons inside quoted strings are preserved. Supported `INSERT INTO` statements use explicit column lists or a prior conventional multiline/backtick `CREATE TABLE` column schema. Extended multi-row inserts, NULL and numeric/string literals are supported. Table prefix is explicit; GUIDs are not treated as canonical page URLs.
- Target SQL tables are `posts`, `postmeta`, `terms`, `term_taxonomy`, and `term_relationships` under the selected prefix. Menu taxonomy data helps classification; no active Astra/Elementor theme-location configuration is inferred from it. Schema-qualified identifiers, compressed dumps, binary/hex expressions, functions, INSERT SELECT, REPLACE/UPDATE mutations, alternative quoting modes and arbitrary schema layouts are unsupported. Explicit unsupported target-table mutations fail closed; other tables/control statements are ignored without execution. MySQL versioned comments are skipped, not executed. `NO_BACKSLASH_ESCAPES`/`ANSI_QUOTES` modes are rejected when visible in SET statements; quoting modes hidden in comments cannot be reconstructed.
- Parsing does not reproduce database semantics, migrations, collation behavior, revisions, duplicate post IDs or updates. Duplicate post IDs and malformed target inserts fail. Input sources are alternatives, not a database import engine. Parser warnings/errors are deliberately generic; inspect format locally without exposing source content.
- PHP-serialized metadata, compressed/base64 Elementor blobs, non-array Elementor JSON, dynamic tags, addon-specific field names, form schema/configuration, theme mods/options, header/footer display conditions, SEO plugin metadata, `srcset`, CSS URLs, JS slides and full media libraries are not reconstructed. Add narrowly reviewed presentation fields only after studying synthetic examples; never enable raw passthrough.
- Post inventory can establish published state in an export, not whether a template is active or a page reachable/indexable now. SQL lacks canonical permalinks; WXR links are references, not independently verified responses. Missing XML items can reflect export filters. Private/protected content stays omitted even if linked by a public page.

## Existing CSS reference findings

The adjacent [CONTRACTING_REFERENCE_ANALYSIS.md](CONTRACTING_REFERENCE_ANALYSIS.md) records the current CSS-only evidence. All 40 stylesheet references have been inspected; no published Contracting page, active header/footer or media ownership can be confirmed from them alone. This workflow must supply and review the missing ID/title/status/hierarchy/menu/template/media associations before implementation. Do not process real sources until approval is given.
