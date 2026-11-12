/** Integration regression: inspect real Next-served HTML and CSS, never mocked classes.
 * Usage: node scripts/verify-css-integration.mjs http://127.0.0.1:3000/
 * Requires the local Next dev/start server to already be running. No browser dependencies.
 */
import assert from 'node:assert/strict';
import postcss from 'postcss';
import fs from 'node:fs';

const base = new URL(process.argv[2] || 'http://127.0.0.1:3000/');
assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(base.hostname), 'Use a local Next.js server');
assert.ok(['http:', 'https:'].includes(base.protocol));

async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000), redirect: 'error' });
  assert.equal(response.status, 200, `HTTP failure: ${url.pathname}`);
  return response.text();
}

const raw = await get(base);
const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
function attrs(source) {
  return Object.fromEntries([...source.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
}
const tags = [...html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)].map((m) => ({ tag: m[1], attrs: attrs(m[2]) }));
const stylesheets = tags.filter((n) => n.tag === 'link' && n.attrs.rel === 'stylesheet').map((n) => new URL(n.attrs.href.replaceAll('&amp;', '&'), base));
assert.ok(stylesheets.length, 'No stylesheets linked by Next');
assert.ok(stylesheets.every((url) => url.origin === base.origin), 'Unexpected external stylesheet');
const css = (await Promise.all(stylesheets.map(get))).join('\n');
const ast = postcss.parse(css);
assert.doesNotMatch(css, /home\.module\.css\.css/, 'CSS Modules suffix was remapped to ordinary CSS');
assert.doesNotMatch(css, /@import\s*["']tailwindcss["']/, 'Tailwind import was not compiled');

function target(attribute, value) {
  const element = tags.find((n) => n.attrs[attribute] === value);
  assert.ok(element, `Missing rendered target ${attribute}=${value}`);
  return element;
}
function scopedClass(attribute, value, localName) {
  const element = target(attribute, value);
  const names = (element.attrs.class || '').split(/\s+/).filter(Boolean);
  assert.ok(names.length, `Missing CSS-module classes on ${attribute}=${value}`);
  assert.ok(!names.includes('undefined') && !names.includes('[object'), 'Invalid class export');
  const scoped = names.find((name) => name !== localName && hasSelector(name));
  assert.ok(scoped, `No generated class with matching CSS for ${localName}`);
  return scoped;
}
function escaped(text) { return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function hasSelector(name) {
  let found = false;
  ast.walkRules((rule) => { if (new RegExp(`\\.${escaped(name)}(?![\\w-])`).test(rule.selector)) found = true; });
  return found;
}
function active(rule, width) {
  for (let node = rule.parent; node; node = node.parent) {
    if (node.type !== 'atrule' || node.name !== 'media') continue;
    const media = node.params.replace(/\s+/g, '');
    // Evaluate only the stylesheet's width queries. Do not pretend to be a browser.
    const max = /max-width:(\d+)px/.exec(media);
    const min = /min-width:(\d+)px/.exec(media);
    if ((max && width > Number(max[1])) || (min && width < Number(min[1]))) return false;
  }
  return true;
}
function declaration(selector, prop, width) {
  let value;
  ast.walkRules((rule) => {
    if (!rule.selector.split(',').map((s) => s.trim()).includes(selector) || !active(rule, width)) return;
    rule.walkDecls(prop, (decl) => { value = decl.value; });
  });
  return value;
}
const home = scopedClass('data-source-page', '45', 'home');
const regions = [
  ['3344d06', 'hero'], ['e64adbd', 'introduction'], ['7a24bee', 'services'],
  ['58749c8', 'clients'], ['b80c63d', 'values'], ['121f708', 'whyUs'], ['59490c0', 'testimonials'],
];
const classes = Object.fromEntries(regions.map(([id, name]) => [name, scopedClass('data-source-region', id, name)]));
const values = scopedClass('data-source-element', '3007b6f', 'valuesPanel');
const why = scopedClass('data-source-element', '186b49f', 'whyPanel');
const ctaNode = target('data-source-widget', '76c11a4');
const cta = (ctaNode.attrs.class || '').split(/\s+/).find((name) => declaration(`.${name}`, 'border-radius', 1440) === '20px');
assert.ok(cta, 'CTA module class or rounded-button rule missing');
assert.equal(declaration(`.${classes.hero} h1`, 'font-size', 1440), '50px');
assert.equal(declaration(`.${classes.hero} h1`, 'font-size', 1024), '48px');
assert.equal(declaration(`.${classes.hero} h1`, 'font-size', 390), '30px');
assert.equal(declaration(`.${cta}`, 'padding', 1440), '13px 40px');
assert.equal(declaration(`.${cta}`, 'padding', 390), '10px 20px');
assert.ok(declaration(`.${cta}`, 'border', 1440)?.includes('solid'), 'CTA border missing');
assert.equal(declaration(`.${classes.introduction}`, 'margin-top', 1440), '40px');
assert.equal(declaration(`.${classes.introduction}`, 'padding', 390), '10px');
assert.match(declaration(`.${values}`, 'background', 1440) || '', /radial-gradient\(/);
assert.equal(declaration(`.${values}`, 'padding', 1440), '60px 0');
assert.equal(declaration(`.${values}`, 'padding', 390), '50px 20px 40px');
assert.ok(declaration(`.${why}`, 'background', 1440), 'Why Us background missing');
assert.equal(declaration(`.${why}`, 'border-radius', 1440), '30px');
const reason = scopedClass('data-source-widget', 'e182d78', 'reasonCard');
assert.ok(reason);
const panel = tags.find((n) => (n.attrs.class || '').split(/\s+/).some((name) => declaration(`.${name}`, 'border-radius', 1440) === '25px'));
assert.ok(panel, 'Why Us bordered panel is missing');
const panelClass = panel.attrs.class.split(/\s+/).find((name) => declaration(`.${name}`, 'border-radius', 1440) === '25px');
assert.ok(declaration(`.${panelClass}`, 'border', 1440)?.includes('solid'));
assert.ok(declaration('.px-5', 'padding-inline', 1440), 'Tailwind px-5 utility missing');
assert.ok(declaration('.py-3', 'padding-block', 1440), 'Tailwind py-3 utility missing');
assert.ok(declaration('.border-b', 'border-bottom-width', 1440), 'Tailwind border utility missing');
assert.ok(declaration(':root', 'font-family', 1440)?.includes('DM Sans'), 'Global font-family rule missing');
assert.equal(declaration('.skip-link', 'position', 1440), 'absolute');
assert.ok(tags.some((n) => n.tag === 'header' && (n.attrs.class || '').split(/\s+/).includes('px-5')), 'Header Tailwind class is absent');
// Verify every recovered URL, including verified assets held for later use.
const mediaSource = fs.readFileSync(new URL('../content/home-media.ts', import.meta.url), 'utf8');
const mediaUrls = [...mediaSource.matchAll(/"src":\s*"([^"]+)"/g)].map((m) => m[1]);
assert.equal(mediaUrls.length, 11, 'Recovered media registry changed: review URL coverage');
for (const url of mediaUrls) {
  assert.ok(url.startsWith('/images/contracting/'));
  const response = await fetch(new URL(url, base), { signal: AbortSignal.timeout(30000), redirect: 'error' });
  assert.equal(response.status, 200, `Missing local asset: ${url}`);
  assert.match(response.headers.get('content-type') || '', /^image\/(png|webp)/);
  assert.ok((await response.arrayBuffer()).byteLength > 0);
}
assert.equal(tags.filter((n) => n.tag === 'img').length, 6, 'Original homepage image uses changed');
const lead = scopedClass('data-source-region', 'fc5da28', 'leadingImage');
assert.ok(lead);
const heroImage = scopedClass('data-source-widget', '17aa5f8', 'heroImage');
const aboutImage = scopedClass('data-source-widget', '1e25d96', 'aboutImage');
const whyImage = scopedClass('data-source-widget', '833a41d', 'whyImage');
assert.equal(declaration(`.${heroImage}`, 'width', 1440), '100%');
assert.equal(declaration(`.${aboutImage}`, 'height', 1440), '500px');
assert.equal(declaration(`.${aboutImage}`, 'height', 390), '201px');
assert.equal(declaration(`.${whyImage}`, 'height', 1440), '550px');
assert.equal(declaration(`.${whyImage}`, 'height', 390), '296px');
assert.equal(declaration(`.${classes.hero}`, 'margin-top', 1440), '-400px');
assert.equal(declaration(`.${classes.hero}`, 'margin-top', 390), '0');
for (const id of ['17aa5f8', '1e25d96', '833a41d']) {
  assert.ok(target('data-source-widget', id).attrs.style?.includes('mask-image'), 'Original alpha mask is missing');
}
console.log('PASS: all 11 copied media URLs return images; original alpha masks; desktop/mobile image heights and hero rules.');
console.log(`PASS: actual Next HTML/CSS at ${base.origin}; nonempty scoped classes match emitted selectors.`);
console.log('PASS: hero 50/48/30px; CTA borders/padding/radius; section spacing; values gradient; Why Us panels; Tailwind and globals.');
console.log('Width checks inspect emitted declarations at 1440/1024/390px; browser computed-style/visual checks are separate.');
console.log(JSON.stringify({ home, ...classes, valuesPanel: values, whyPanel: why }, null, 2));
