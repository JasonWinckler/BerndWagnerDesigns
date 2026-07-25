import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { products as luxuryProducts } from '../luxury/js/config.js';
import { products as streetwearProducts } from '../streetwear/js/config.js';

const pages = ['index.html', 'impressum.html', 'datenschutz.html', 'luxury/index.html', 'luxury/impressum.html', 'luxury/datenschutz.html', 'streetwear/index.html', 'streetwear/impressum.html', 'streetwear/datenschutz.html'];
const root = process.cwd();
const refPattern = /(?:href|src)="([^"]+)"/g;
const assert = (condition, message) => { if (!condition) throw new Error(message); };

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

const landing = await readFile(join(root, 'index.html'), 'utf8');
const landingApp = await readFile(join(root, 'js/app.js'), 'utf8');
const landingStyles = await readFile(join(root, 'css/styles.css'), 'utf8');
assert(landing.includes('href="luxury/"'), 'landing page must link to luxury');
assert(landing.includes('href="streetwear/"'), 'landing page must link to streetwear');
assert(landing.includes('<strong>Luxurious Collection</strong>'), 'luxury choice is missing');
assert(landing.includes('<strong>Streetwear Collection</strong>'), 'streetwear choice is missing');
assert(landing.includes("url('../upload/BannerLinks.png')") === false, 'banner styling belongs in the stylesheet');
assert(existsSync(join(root, 'upload', 'README.md')), 'upload/README.md is missing');
assert(landing.includes('class="welcome-overlay"'), 'welcome text overlay is missing');
assert(landingStyles.includes('prefers-reduced-motion:reduce'), 'landing interaction must honor reduced motion');

assert(luxuryProducts.length === 6, 'luxury must retain all six configured designs');
assert(new Set(luxuryProducts.map(({ image }) => image)).size === 6, 'luxury images must be unique');
for (const product of luxuryProducts) assert(existsSync(join(root, 'luxury', product.image)), `${product.id} references missing luxury image`);

assert(streetwearProducts.length > 0, 'streetwear should retain the collection structure');
assert(streetwearProducts.every(({ image, pendingUpload }) => !image && pendingUpload), 'streetwear designs must have no image uploads yet');
const streetwearFiles = ['streetwear/upload/hosen'];
for (const directory of streetwearFiles) assert(existsSync(join(root, directory)), `${directory} is missing`);

console.log(`Static smoke checks passed for ${pages.length} pages, ${luxuryProducts.length} luxury designs and ${streetwearProducts.length} streetwear placeholders.`);
