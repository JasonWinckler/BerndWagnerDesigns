import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { products } from '../js/config.js';

const pages = ['index.html', 'impressum.html', 'datenschutz.html'];
const root = process.cwd();
const refPattern = /(?:href|src)="([^"]+)"/g;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const page of pages) {
  const html = await readFile(join(root, page), 'utf8');
  assert(/<html\s+lang="de"/.test(html), `${page} must declare German language`);
  assert(/<title>[^<]+<\/title>/.test(html), `${page} must include a title`);

  for (const [, reference] of html.matchAll(refPattern)) {
    if (/^(#|mailto:|tel:|https?:|\{\{)/.test(reference)) continue;
    const cleanReference = reference.split('#')[0].split('?')[0];
    assert(existsSync(join(root, dirname(page), cleanReference)), `${page} references missing file: ${reference}`);
  }
}

const index = await readFile(join(root, 'index.html'), 'utf8');
const app = await readFile(join(root, 'js/app.js'), 'utf8');

assert(products.length === 6, 'exactly six product designs must be configured');
assert(products.filter((product) => product.category === 'Handtasche').length === 3, 'three handbags must be configured');
assert(products.filter((product) => product.category === 'Bespoke-Hose').length === 3, 'three bespoke trousers must be configured');

for (const product of products) {
  assert(existsSync(join(root, product.image)), `${product.id} references missing image ${product.image}`);
  assert(product.status === 'Auf Anfrage', `${product.id} must be marked as on request`);
  assert(product.isConcept === true, `${product.id} must be marked as design visualization`);
}

assert(index.includes('Entworfen für genau eine Person.'), 'hero headline is missing');
assert(index.includes('data-carousel'), 'gallery carousel is missing');
assert(app.includes('6000'), 'carousel interval must be 6,000 ms');
assert(app.includes('prefers-reduced-motion: reduce'), 'reduced motion handling is missing');
assert(app.includes('navigator.clipboard.writeText'), 'copy fallback is missing');
assert(app.includes('mailto:'), 'email fallback is missing');

console.log(`Static smoke checks passed for ${pages.length} pages and ${products.length} products.`);
