#!/usr/bin/env python3
"""Offline, lossy WordPress presentation discovery. Never executes source SQL/PHP."""
import argparse
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit, urlunsplit
import xml.etree.ElementTree as ET
from xml.parsers import expat

VERSION = 1
MAX_STATEMENT = 32 * 1024 * 1024
PUBLIC_TYPES = {'page', 'post', 'attachment', 'elementor_library', 'nav_menu_item'}
FORM_TYPES = {'metform-form', 'wpforms', 'wpcf7_contact_form', 'forminator_forms'}
META = {'_elementor_data', '_elementor_template_type', '_wp_page_template',
        '_thumbnail_id', '_wp_attached_file', '_menu_item_object_id',
        '_menu_item_menu_item_parent', '_menu_item_url', '_menu_item_type',
        '_menu_item_object'}
SENSITIVE = re.compile(r'(?i)(?:password|passwd|secret|token|nonce|api[_-]?key|authorization|credential|smtp|recipient|submission|user[_-]?id)')
TOKEN = re.compile(r'(?i)(?:\b(?:password|passwd|secret|token|nonce|api[_-]?key|authorization|credential)\s*[:=]\s*\S+|\bBearer\s+\S+|\b(?:sk-|AKIA)[A-Za-z0-9_-]{12,}|\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)')
ID = re.compile(r'^[A-Za-z0-9_-]{1,100}$')

class ExtractionError(Exception):
    pass


def clean_text(value):
    return TOKEN.sub('[redacted]', re.sub(r'\s+', ' ', str(value))).strip()[:20000]


def safe_url(value):
    """Retain public path only: no userinfo, query, or fragment credentials."""
    if not isinstance(value, str) or len(value) > 4096:
        return None
    value = value.strip()
    if not value or SENSITIVE.search(value) or TOKEN.search(value):
        return None
    try:
        u = urlsplit(value)
        if u.scheme not in ('', 'http', 'https') or u.username or u.password:
            return None
        path = unquote(u.path)
        if any(c in path for c in ('\x00', '\\', '\n', '\r')) or '..' in path.split('/'):
            return None
        if not u.path and not u.netloc:
            return None
        return urlunsplit((u.scheme, u.netloc, u.path, '', ''))
    except ValueError:
        return None


class PublicHTML(HTMLParser):
    """Extract text/references only; never copy HTML attributes or form values."""
    BLOCKED = {'script', 'style', 'form', 'textarea', 'select', 'button', 'iframe', 'object', 'template'}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocked = []
        self.text = []
        self.headings = []
        self.links = []
        self.media = []
        self.heading = None

    def handle_starttag(self, tag, attrs):
        if self.blocked:
            if tag in self.BLOCKED:
                self.blocked.append(tag)
            return
        if tag in self.BLOCKED:
            self.blocked.append(tag)
            return
        a = dict(attrs)
        if re.fullmatch('h[1-6]', tag):
            self.heading = {'level': int(tag[1]), 'text': ''}
        if tag == 'a' and (url := safe_url(a.get('href'))):
            self.links.append(url)
        if tag in {'img', 'source', 'video', 'audio'}:
            for k in ('src', 'poster'):
                if url := safe_url(a.get(k)):
                    self.media.append(url)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if self.blocked:
            if tag == self.blocked[-1]:
                self.blocked.pop()
            return
        if self.heading and tag == 'h' + str(self.heading['level']):
            self.heading['text'] = clean_text(self.heading['text'])
            self.headings.append(self.heading)
            self.heading = None

    def handle_data(self, data):
        if not self.blocked:
            data = clean_text(data)
            if data:
                self.text.append(data)
                if self.heading:
                    self.heading['text'] += data + ' '


def public_html(value):
    parser = PublicHTML()
    # Shortcodes may contain secrets or form configuration; never expand them.
    parser.feed(re.sub(r'\[[^\]]*\]', '', str(value)))
    return {'text': clean_text(' '.join(parser.text)), 'headings': parser.headings,
            'links': sorted(set(parser.links)), 'media': sorted(set(parser.media))}


TEXT_FIELDS = {'title', 'editor', 'description', 'button_text', 'text', 'caption',
               'title_text', 'description_text', 'tab_title', 'tab_content',
               'list_text', 'testimonial_content', 'testimonial_name'}
ENUM_FIELDS = {'align', 'content_position', 'vertical_align', 'size', 'header_size',
               'layout', 'content_width', 'background_background', 'image_size',
               'animation', 'hover_animation', 'position', 'icon', 'view'}
STYLE_FIELDS = {'color', 'background_color', 'title_color', 'text_color',
                'typography_font_family', 'typography_font_weight', 'typography_font_size',
                'typography_line_height', 'padding', 'margin', 'width', 'height',
                'min_height', 'border_radius', 'column_gap', 'gap', 'space_between',
                'hide_desktop', 'hide_tablet', 'hide_mobile'}
MEDIA_FIELDS = {'image', 'background_image', 'background_overlay_image'}
LINK_FIELDS = {'link', 'button_link', 'url'}
REPEATERS = {'tabs', 'icon_list', 'slides', 'testimonials', 'gallery'}
PUBLIC_WIDGETS = {'heading', 'text-editor', 'button', 'image', 'image-box', 'icon',
                  'icon-box', 'icon-list', 'divider', 'spacer', 'counter', 'progress',
                  'tabs', 'accordion', 'toggle', 'testimonial', 'image-gallery',
                  'image-carousel', 'slides', 'video', 'social-icons', 'container'}


def style_value(value):
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return value
    if isinstance(value, str) and len(value) <= 100 and not SENSITIVE.search(value) and not TOKEN.search(value):
        if re.fullmatch(r'[\w #.,%()+/-]*', value):
            return value
    if isinstance(value, dict):
        return {k: v for k in ('unit', 'size', 'top', 'right', 'bottom', 'left', 'isLinked')
                if k in value and (v := style_value(value[k])) is not None}
    return None


def settings_public(settings):
    out = {}
    if not isinstance(settings, dict):
        return out
    for key, value in sorted(settings.items()):
        base = re.sub(r'_(tablet|mobile)$', '', key)
        if SENSITIVE.search(key):
            continue
        if base in TEXT_FIELDS and isinstance(value, str):
            out[key] = public_html(value)
        elif base in ENUM_FIELDS and isinstance(value, str) and ID.fullmatch(value):
            out[key] = value
        elif base in STYLE_FIELDS:
            if (v := style_value(value)) is not None:
                out[key] = v
        elif base in LINK_FIELDS:
            if url := safe_url(value.get('url') if isinstance(value, dict) else value):
                out[key] = {'url': url}
        elif base in MEDIA_FIELDS:
            if isinstance(value, dict):
                v = {}
                if str(value.get('id', '')).isdigit():
                    v['attachment_id'] = int(value['id'])
                if url := safe_url(value.get('url')):
                    v['url'] = url
                out[key] = v
        elif base in REPEATERS and isinstance(value, list):
            # Images in galleries and presentation-only repeater fields.
            out[key] = [settings_public(v) for v in value if isinstance(v, dict)]
    return out


def sanitize_layout(raw):
    data = json.loads(raw)
    if not isinstance(data, list):
        raise ExtractionError('Unsupported Elementor root; expected an array.')

    def node(item, depth=0):
        if depth > 80 or not isinstance(item, dict):
            raise ExtractionError('Unsupported Elementor nesting.')
        out = {}
        for key in ('id', 'elType', 'widgetType'):
            if isinstance(item.get(key), str) and ID.fullmatch(item[key]):
                out[key] = item[key]
        widget = str(item.get('widgetType', '')).lower()
        # Even public form definitions may embed delivery or submitted values.
        is_form = any(x in widget for x in ('form', 'mf-', 'html', 'shortcode'))
        unknown_widget = bool(widget) and widget not in PUBLIC_WIDGETS
        out['settings'] = {} if is_form or unknown_widget else settings_public(item.get('settings', {}))
        if unknown_widget and not is_form:
            out['settings_omitted'] = 'unsupported-widget'
        if is_form:
            out['settings_omitted'] = 'form-or-code-widget'
        children = item.get('elements', [])
        if not isinstance(children, list):
            raise ExtractionError('Unsupported Elementor children.')
        out['elements'] = [] if is_form or unknown_widget else [node(v, depth + 1) for v in children]
        return out
    return [node(v) for v in data]


def integer(value):
    try:
        return max(0, int(value or 0))
    except (ValueError, TypeError):
        raise ExtractionError('Invalid numeric source identifier.') from None


def validate_xml(text):
    """Reject actual declarations, while allowing declaration-like character data.

    Expat distinguishes markup from CDATA, escaped text and comments. Reject
    DTDs at their opening callback, before processing their entity declarations.
    No external entity parser or resource loader is ever created.
    """
    if '\x00' in text:
        raise ExtractionError('XML NUL bytes are unsupported.')
    parser = expat.ParserCreate(namespace_separator='}')

    def reject(*_args):
        raise ExtractionError('XML DTDs and entity declarations/references are unsupported.')

    parser.StartDoctypeDeclHandler = reject
    parser.EntityDeclHandler = reject
    parser.ExternalEntityRefHandler = reject
    parser.SkippedEntityHandler = reject
    parser.SetParamEntityParsing(expat.XML_PARAM_ENTITY_PARSING_NEVER)
    try:
        parser.Parse(text, True)
    except expat.ExpatError:
        # Expat messages may expose source details; retain generic diagnostics.
        raise ExtractionError('Malformed or unsupported XML.') from None


def wxr_records(path, allowed, report):
    # Validate the exact UTF-8 text later consumed by ElementTree, before extraction.
    raw = path.read_bytes()
    text = raw.decode('utf-8-sig')
    validate_xml(text)
    root = ET.fromstring(text)
    wp = 'http://wordpress.org/export/1.2/'
    if not root.findall('.//{' + wp + '}wxr_version'):
        raise ExtractionError('Expected WordPress WXR 1.2 export.')
    def val(item, key):
        return item.findtext('{' + wp + '}' + key, '')
    records = []
    for item in root.findall('./channel/item'):
        kind = val(item, 'post_type')
        if kind not in allowed | FORM_TYPES | {'revision'}:
            report['skipped_content_records'] += 1
            continue
        meta = {}
        for m in item.findall('{' + wp + '}postmeta'):
            k = val(m, 'meta_key')
            if k in META:
                meta[k] = val(m, 'meta_value')
        records.append({'id': integer(val(item, 'post_id')), 'title': item.findtext('title', ''),
                        'slug': val(item, 'post_name'), 'parent_id': integer(val(item, 'post_parent')),
                        'status': val(item, 'status'), 'type': kind,
                        'password_protected': bool(val(item, 'post_password')),
                        'url': item.findtext('link', ''),
                        'content': item.findtext('{http://purl.org/rss/1.0/modules/content/}encoded', ''),
                        'menu_order': integer(val(item, 'menu_order')), 'meta': meta,
                        'menus': [clean_text(c.text or '') for c in item.findall('category') if c.get('domain') == 'nav_menu']})
    return records


def statements(path):
    """Stream SQL statements; comments are discarded, quoted semicolons preserved."""
    with path.open(encoding='utf-8-sig') as stream:
        buf = []; quote = None; escaped = False; block = False
        for line in stream:
            i = 0
            while i < len(line):
                c = line[i]; nxt = line[i:i+2]
                if block:
                    if nxt == '*/':
                        block = False; i += 2
                    else:
                        i += 1
                    continue
                if quote:
                    buf.append(c)
                    if escaped:
                        escaped = False
                    elif c == '\\' and quote != '`':
                        escaped = True
                    elif c == quote:
                        if i + 1 < len(line) and line[i+1] == quote:
                            buf.append(quote); i += 1
                        else:
                            quote = None
                elif nxt == '/*':
                    block = True; buf.append(' '); i += 2; continue
                elif c == '#' or (nxt == '--' and (i + 2 == len(line) or line[i+2].isspace())):
                    break
                elif c in "'\"`":
                    quote = c; buf.append(c)
                elif c == ';':
                    yield ''.join(buf).strip(); buf = []
                else:
                    buf.append(c)
                if len(buf) > MAX_STATEMENT:
                    raise ExtractionError('SQL statement exceeds 32 MiB limit.')
                i += 1
            if not quote and not block:
                buf.append('\n')
        if quote or block or ''.join(buf).strip():
            raise ExtractionError('Unterminated SQL statement or comment.')


def sql_values(text):
    """Accept literal tuples only; expressions, functions and binary blobs fail closed."""
    i = 0
    def ws():
        nonlocal i
        while i < len(text) and text[i].isspace(): i += 1
    while True:
        ws()
        if i == len(text): return
        if text[i] != '(':
            raise ExtractionError('Unsupported SQL VALUES structure.')
        i += 1; row = []
        while True:
            ws()
            if i >= len(text): raise ExtractionError('Incomplete SQL tuple.')
            if text[i] == "'":
                i += 1; chars = []; closed = False
                while i < len(text):
                    c = text[i]; i += 1
                    if c == '\\':
                        if i == len(text): raise ExtractionError('Invalid SQL escape.')
                        c = text[i]; i += 1
                        chars.append({'0':'\0', 'n':'\n', 'r':'\r', 't':'\t', 'b':'\b', 'Z':'\x1a'}.get(c, c))
                    elif c == "'":
                        if i < len(text) and text[i] == "'": chars.append("'"); i += 1
                        else: closed = True; break
                    else: chars.append(c)
                if not closed: raise ExtractionError('Unterminated SQL string.')
                row.append(''.join(chars))
            else:
                m = re.match(r'(?:NULL|-?\d+(?:\.\d+)?)\b', text[i:], re.I)
                if not m: raise ExtractionError('Unsupported SQL literal/expression.')
                row.append(None if m[0].upper() == 'NULL' else m[0]); i += len(m[0])
            ws()
            if i >= len(text): raise ExtractionError('Incomplete SQL tuple.')
            c = text[i]; i += 1
            if c == ')': break
            if c != ',': raise ExtractionError('Invalid SQL separator.')
        yield row
        ws()
        if i == len(text): return
        if text[i] != ',': raise ExtractionError('Unsupported trailing SQL clause.')
        i += 1; ws()
        if i == len(text): raise ExtractionError('Incomplete SQL VALUES list.')


def sql_records(path, prefix, allowed, report):
    tables = {prefix + 'posts': 'posts', prefix + 'postmeta': 'meta',
              prefix + 'terms': 'terms', prefix + 'term_taxonomy': 'taxonomy',
              prefix + 'term_relationships': 'relationships'}
    schemas = {}; posts = {}; metadata = {}; terms = {}; tax = {}; rel = []
    for statement in statements(path):
        if not statement: continue
        if re.match(r'SET\b', statement, re.I) and re.search(r'NO_BACKSLASH_ESCAPES|ANSI_QUOTES', statement, re.I):
            raise ExtractionError('Unsupported SQL quoting mode.')
        create = re.match(r'CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?(\w+)`?\s*\(', statement, re.I)
        if create and create[1] in tables:
            # Standard mysqldump CREATE format: each column starts its own line.
            columns = re.findall(r'^\s*`([^`]+)`\s+\w+', statement, re.M)
            if not columns: raise ExtractionError('Unsupported CREATE TABLE column layout.')
            schemas[create[1]] = columns
            continue
        insert = re.match(r'INSERT\s+INTO\s+`?(\w+)`?\s*(\([^)]*\))?\s*VALUES\s*(.*)\Z', statement, re.I | re.S)
        if not insert or insert[1] not in tables:
            if re.match(r'(?:INSERT|REPLACE|UPDATE)\b', statement, re.I) and any(re.search(r'\b' + re.escape(t) + r'\b', statement[:250]) for t in tables):
                raise ExtractionError('Unsupported target-table SQL statement.')
            report['ignored_sql_statements'] += 1
            continue
        table, colgroup, values = insert.groups()
        cols = [x.strip().strip('`') for x in colgroup[1:-1].split(',')] if colgroup else schemas.get(table)
        if not cols or any(not re.fullmatch(r'\w+', x) for x in cols) or len(set(cols)) != len(cols):
            raise ExtractionError('Explicit columns or supported CREATE TABLE schema required.')
        for values_row in sql_values(values):
            if len(values_row) != len(cols): raise ExtractionError('SQL column/value count mismatch.')
            row = dict(zip(cols, values_row)); role = tables[table]
            if role == 'posts':
                if not {'ID', 'post_type', 'post_status'} <= row.keys(): raise ExtractionError('Missing required posts columns.')
                kind = row['post_type']
                if kind not in allowed | FORM_TYPES | {'revision'}:
                    report['skipped_content_records'] += 1; continue
                pid = integer(row['ID'])
                if pid in posts: raise ExtractionError('Duplicate source post ID.')
                posts[pid] = {'id':pid, 'title':row.get('post_title') or '', 'slug':row.get('post_name') or '',
                              'parent_id':integer(row.get('post_parent')), 'status':row['post_status'], 'type':kind,
                              'password_protected':bool(row.get('post_password')), 'url':'',
                              'content':row.get('post_content') or '', 'menu_order':integer(row.get('menu_order')),
                              'menus':[], 'meta':{}}
            elif role == 'meta' and row.get('meta_key') in META:
                metadata.setdefault(integer(row.get('post_id')), {})[row['meta_key']] = row.get('meta_value') or ''
            elif role == 'terms': terms[integer(row.get('term_id'))] = clean_text(row.get('name') or '')
            elif role == 'taxonomy' and row.get('taxonomy') == 'nav_menu':
                tax[integer(row.get('term_taxonomy_id'))] = integer(row.get('term_id'))
            elif role == 'relationships': rel.append((integer(row.get('object_id')), integer(row.get('term_taxonomy_id'))))
    for pid, p in posts.items(): p['meta'] = metadata.get(pid, {})
    for pid, tid in rel:
        if pid in posts and tid in tax: posts[pid]['menus'].append(terms.get(tax[tid], ''))
    return list(posts.values())


def division_words(text):
    return {w for w in ('contracting', 'trading') if re.search(r'\b' + w + r'\b', text, re.I)}


def build_outputs(records, source, report):
    ids = [r['id'] for r in records]
    if len(ids) != len(set(ids)): raise ExtractionError('Duplicate source post ID.')
    pages = {}; layouts = {}; evidence = {}
    for r in sorted(records, key=lambda x:x['id']):
        kind = r['type']; status = r['status']; meta = r['meta']
        role = 'form' if kind in FORM_TYPES else 'revision' if kind == 'revision' else 'template' if kind == 'elementor_library' else 'menu' if kind == 'nav_menu_item' else 'attachment' if kind == 'attachment' else 'page' if kind == 'page' else 'content'
        public = status == 'publish' and not r['password_protected'] and role not in {'form', 'revision'}
        if role == 'attachment' and status == 'inherit':
            parent = next((v for v in records if v['id'] == r['parent_id']), None)
            public = bool(not r['password_protected'] and parent and parent['status'] == 'publish' and not parent['password_protected'] and parent['type'] not in FORM_TYPES | {'revision', 'attachment', 'nav_menu_item', 'elementor_library'})
        p = {k:r[k] for k in ('id', 'parent_id', 'type', 'menu_order')}
        p['status'] = status if status in {'publish', 'draft', 'pending', 'private', 'future', 'inherit', 'trash', 'auto-draft'} else 'unknown'
        # Draft/private titles and slugs can themselves contain private records.
        p.update({'title':public_html(r['title'])['text'] if public else '', 'slug':clean_text(r['slug']) if public else '',
                  'role':role, 'published':status == 'publish', 'presentation_eligible':public,
                  'provenance':{'format':source, 'post_id':r['id']}, 'division':'unresolved',
                  'evidence':[], 'review_required':True, 'url':safe_url(r['url']) if public else None,
                  'presentation':public_html(r['content']) if public else {}, 'template_assignments':{}})
        if public:
            for k in ('_elementor_template_type', '_wp_page_template'):
                v = meta.get(k, '')
                if re.fullmatch(r'[A-Za-z0-9_./-]{1,100}', v) and '..' not in v and not SENSITIVE.search(v):
                    p['template_assignments'][k] = v
            for k in ('_thumbnail_id',):
                if str(meta.get(k, '')).isdigit(): p['template_assignments'][k] = int(meta[k])
            if '_elementor_data' in meta:
                try: layouts[r['id']] = sanitize_layout(meta['_elementor_data'])
                except (ValueError, RecursionError, ExtractionError):
                    report['invalid_elementor_records'] += 1
            hints = division_words(p['title'] + ' ' + p['slug'])
            for d in sorted(hints): p['evidence'].append({'kind':'title-or-slug', 'division':d, 'source_id':r['id']})
            evidence[r['id']] = set(hints)
            if role == 'menu':
                p['menu'] = {'labels':sorted(set(r['menus'])), 'target_id':integer(meta.get('_menu_item_object_id')),
                             'parent_menu_item_id':integer(meta.get('_menu_item_menu_item_parent')),
                             'url':safe_url(meta.get('_menu_item_url'))}
        pages[r['id']] = p
    # Menu names are evidence, not proof of a target's exclusive ownership.
    for p in pages.values():
        if 'menu' not in p: continue
        raw_meta = next(r['meta'] for r in records if r['id'] == p['id'])
        target = pages.get(p['menu']['target_id'])
        if not (raw_meta.get('_menu_item_type') == 'post_type' and target and raw_meta.get('_menu_item_object') == target['type']):
            p['menu']['target_id'] = 0
        menu_parent = pages.get(p['menu']['parent_menu_item_id'])
        if not menu_parent or menu_parent['role'] != 'menu':
            p['menu']['parent_menu_item_id'] = 0
        hints = division_words(' '.join(p['menu']['labels']))
        target = pages.get(p['menu']['target_id'])
        if target and target['presentation_eligible']:
            for d in sorted(hints):
                evidence[target['id']].add(d)
                target['evidence'].append({'kind':'menu-label', 'division':d, 'source_id':p['id']})
    # Accumulate ancestor evidence with cycle protection; conflicts stay unresolved.
    for p in pages.values():
        if not p['presentation_eligible']: continue
        seen = {p['id']}; parent = p['parent_id']
        while parent in pages and parent not in seen:
            seen.add(parent)
            for d in sorted(evidence.get(parent, set())):
                evidence[p['id']].add(d)
                p['evidence'].append({'kind':'ancestor', 'division':d, 'source_id':parent})
            parent = pages[parent]['parent_id']
        # Outbound links are recorded for review only; links to both divisions do not imply ownership.
        for url in p['presentation'].get('links', []):
            if division_words(url): p['evidence'].append({'kind':'outbound-link-review-only', 'url':url})
        hints = evidence[p['id']]
        if len(hints) == 1: p['division'] = next(iter(hints))
        p['evidence'] = sorted(p['evidence'], key=lambda e:json.dumps(e, sort_keys=True))
    assets = {}
    record_index = {r['id']:r for r in records}
    def collect(value, pid):
        if isinstance(value, dict):
            for k,v in value.items():
                if k == 'attachment_id' and isinstance(v, int):
                    assets.setdefault(('attachment', str(v)), set()).add(pid)
                collect(v, pid)
        elif isinstance(value, list):
            for v in value: collect(v, pid)
        elif isinstance(value, str):
            url = safe_url(value)
            if url and '/wp-content/uploads/' in urlsplit(url).path:
                path = urlsplit(url).path
                assets.setdefault(('path', path), set()).add(pid)
    for p in pages.values():
        if not p['presentation_eligible']: continue
        collect(p['presentation'], p['id']); collect(layouts.get(p['id'], []), p['id'])
        thumb = p['template_assignments'].get('_thumbnail_id')
        if thumb: assets.setdefault(('attachment', str(thumb)), set()).add(p['id'])
        raw_record = record_index[p['id']]
        attached = raw_record['meta'].get('_wp_attached_file')
        if p['role'] == 'attachment' and attached:
            url = safe_url('/wp-content/uploads/' + attached.lstrip('/'))
            if url: assets.setdefault(('path', urlsplit(url).path), set()).add(p['id'])
    # Resolve attachment paths onto all referring pages without copying media bytes.
    for (kind, value), pids in list(assets.items()):
        if kind == 'attachment':
            attachment = pages.get(int(value))
            if attachment and attachment['role'] == 'attachment' and attachment['presentation_eligible']:
                for (asset_kind, path), owners in list(assets.items()):
                    if asset_kind == 'path' and int(value) in owners:
                        assets[(asset_kind, path)].update(pids)
    manifest = [{'kind':kind, 'relative_path':value if kind == 'path' else None,
                 'attachment_id':int(value) if kind == 'attachment' else None,
                 'page_ids':sorted(pids), 'divisions':sorted({pages[i]['division'] for i in pids}),
                 'copy_approved':False} for (kind,value),pids in sorted(assets.items())]
    inventory = list(pages.values())
    # Review sets include eligible pages/templates/menus; never imply publication approval.
    outputs = {'page-inventory.json':inventory, 'asset-manifest.json':manifest}
    for name, div in [('contracting-pages.json','contracting'), ('excluded-trading-pages.json','trading'), ('unresolved-pages.json','unresolved')]:
        outputs[name] = [p for p in inventory if p['division'] == div]
    report['records'] = len(inventory)
    report['layouts'] = len(layouts)
    report['assets'] = len(manifest)
    return outputs, layouts


def run(args):
    source = Path(args.xml or args.sql)
    output = Path(args.output_dir)
    if output.exists() and (not output.is_dir() or any(output.iterdir())):
        raise ExtractionError('Output must be a new or empty directory; existing files are never overwritten.')
    if not source.is_file(): raise ExtractionError('Input file is unavailable.')
    if not re.fullmatch(r'[A-Za-z0-9_]+', args.table_prefix): raise ExtractionError('Invalid table prefix.')
    if any(not ID.fullmatch(v) or re.search(r'form|submission|entry|user|order|customer|token', v, re.I) or v == 'revision' for v in args.public_post_type):
        raise ExtractionError('Invalid public content type selection.')
    allowed = PUBLIC_TYPES | set(args.public_post_type)
    report = Counter()
    records = wxr_records(source, allowed, report) if args.xml else sql_records(source, args.table_prefix, allowed, report)
    if not records: raise ExtractionError('No supported content records found; check format, prefix and public types.')
    outputs, layouts = build_outputs(records, 'wxr-1.2' if args.xml else 'mysql-literal-inserts', report)
    # Validate and sanitize fully before creating any output.
    output.mkdir(parents=True, exist_ok=True)
    folder = output / 'elementor-layouts'; folder.mkdir(exist_ok=True)
    def write(path, value):
        path.write_text(json.dumps(value, indent=2, sort_keys=True, ensure_ascii=False) + '\n', encoding='utf-8')
    for name,value in outputs.items(): write(output / name, value)
    for pid,value in sorted(layouts.items()): write(folder / f'{pid}.json', {'source_post_id':pid, 'source_format':'wxr-1.2' if args.xml else 'mysql-literal-inserts', 'elements':value})
    counts = '\n'.join(f'- {k}: {v}' for k,v in sorted(report.items()))
    (output / 'extraction-report.md').write_text(
        '# Offline extraction report\n\nSchema version: 1\n\n' + counts +
        '\n\nAll division assignments are candidates requiring review. Only published, non-password-protected supported records expose presentation data. '
        'Draft/private/form/revision bodies and titles are omitted. Unknown post types and metadata are excluded. '
        'No source path, raw SQL/XML, credentials, user records, source code, form settings or media bytes are copied. '
        'Query strings/fragments are removed. Unknown widgets/settings, PHP serialization, theme options and dynamic tags are not reconstructed. '
        'SQL URLs are not inferred from GUIDs. Menu labels do not establish active theme locations. '
        'Invalid Elementor arrays are omitted and counted. Review all outputs locally before sharing or committing.\n', encoding='utf-8')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    inputs = parser.add_mutually_exclusive_group(required=True)
    inputs.add_argument('--xml', help='Explicit path to UTF-8 WordPress WXR 1.2 export')
    inputs.add_argument('--sql', help='Explicit path to MySQL/MariaDB literal INSERT dump')
    parser.add_argument('--output-dir', required=True)
    parser.add_argument('--table-prefix', default='wp_')
    parser.add_argument('--public-post-type', action='append', default=[], help='Opt in a reviewed public custom post type (repeatable)')
    args = parser.parse_args()
    try:
        run(args)
    except (ExtractionError, OSError, UnicodeError, ET.ParseError, ValueError, RecursionError):
        # Deliberately never echo exceptions: parser errors can include private source fragments.
        print('Extraction failed safely: check input format, table prefix, size limits and an empty output directory. No source details are logged.', file=sys.stderr)
        return 1
    print('Sanitized reference files created. Review locally; no content is approved for publication.')
    return 0

if __name__ == '__main__':
    sys.exit(main())
