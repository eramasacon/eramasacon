/** Local component-render check. CSS is stubbed; this does not replace next build/browser QA. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module, { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const load = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  return resolveFilename.call(this, request.startsWith('@/') ? path.join(root, request.slice(2)) : request, ...rest);
};
for (const extension of ['.ts', '.tsx']) {
  Module._extensions[extension] = (module, filename) => {
    const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    });
    module._compile(result.outputText, filename);
  };
}
Module._extensions['.css'] = (module) => {
  module.exports = { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) };
};
const { ContractingHome } = load('../components/home/contracting-home.tsx');
const { plannedServices, projectsSource } = load('../content/routes.ts');
const { homeMedia } = load('../content/home-media.ts');
const html = renderToStaticMarkup(React.createElement(ContractingHome));
const sourceOrder = ['fc5da28', '9d527f3', '92f0964', 'c79b068', '3344d06', 'e64adbd', '7a24bee', '58749c8', 'b80c63d', '121f708', '59490c0', '1bdd178'];
assert.deepEqual([...html.matchAll(/data-source-region="([^"]+)"/g)].map((m) => m[1]), sourceOrder);
assert.deepEqual([...html.matchAll(/data-source-order="(\d+)"/g)].map((m) => Number(m[1])), sourceOrder.map((_, i) => i + 1));
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.equal((html.match(/data-fidelity="blocked" hidden=""/g) || []).length, 4);
assert.equal((html.match(/data-planned-href=/g) || []).length, 8);
assert.equal((html.match(/aria-disabled="true"/g) || []).length, 8);
assert.doesNotMatch(html, /<a\b[^>]*\shref=/); // Planned destinations must not lead visitors to absent routes.
assert.doesNotMatch(html, /trading|home-main|arco-profile|<blockquote|<video\b/i);
assert.equal(plannedServices.length, 9);
assert.deepEqual(plannedServices.map((s) => s.href), [
  '/hvac-contracting/', '/civil-and-mechanical-construction/', '/electrical-and-instrumentation/',
  '/firefighting/', '/mep-design-consultancy/', '/fabrication/', '/flooring-and-landscaping/',
  '/testing-and-air-balancing/', '/cleaning-services/',
]);
assert.deepEqual(projectsSource, { sourceId: 2739, approval: 'pending' });
assert.match(html, /Building Efficiency from Start to Finish/);
assert.match(html, /Complete MEP Solutions/);
assert.equal((html.match(/Complete MEP Solutions/g) || []).length, 1); // Do not duplicate responsive source prose.
assert.doesNotMatch(html, /elementor-counter-number|testimonial-item/);
const imageSources = [...html.matchAll(/<img\b[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1]);
assert.deepEqual(imageSources, [homeMedia.hero.src, homeMedia.about.src, homeMedia.whyUs.src, homeMedia.line.src, homeMedia.line.src, homeMedia.line.src]);
for (const asset of Object.values(homeMedia)) {
  assert.ok(asset.src.startsWith('/images/contracting/'));
  assert.ok(fs.existsSync(path.join(root, 'public', asset.src)), 'Recovered image is missing');
  assert.ok(asset.width > 0 && asset.height > 0);
}
assert.ok(html.includes(homeMedia.heroMask.src));
assert.ok(html.includes(homeMedia.aboutMask.src));
assert.ok(html.includes(homeMedia.whyUsMask.src));
// Any future CSS media/font URL must resolve locally; no hotlinked substitutes.
for (const file of ['app/globals.css', 'components/home/home.module.css']) {
  const css = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of css.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)) {
    assert.ok(match[1].startsWith('/') && !match[1].startsWith('//'), 'Only local CSS assets are allowed');
    assert.ok(fs.existsSync(path.join(root, 'public', match[1])), 'Local CSS asset is missing');
  }
}
console.log('PASS: 12 ordered source regions; 4 blocked regions; supported copy; 8 disabled CTAs; 9 planned service routes; Projects 2739 pending; 6 original image uses and 11 recovered assets; no Trading, fabricated widget data or broken local media references.');
