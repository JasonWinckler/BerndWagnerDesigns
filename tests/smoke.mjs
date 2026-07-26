import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { products as luxuryProducts } from '../luxury/js/config.js';
import { products as streetwearProducts } from '../streetwear/js/config.js';

const pages = ['index.html', 'desktop-low/index.html', 'desktop-high/index.html', 'mobile/index.html', 'other-device/index.html', 'impressum.html', 'datenschutz.html', 'luxury/index.html', 'luxury/impressum.html', 'luxury/datenschutz.html', 'streetwear/index.html', 'streetwear/impressum.html', 'streetwear/datenschutz.html'];
const root = process.cwd();
const refPattern = /(?:href|src)="([^"]+)"/g;
const pendingImageNames = new Set(['streetwear_collection.png', 'luxury_collection.png']);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

for (const page of pages) {
  const html = await readFile(join(root, page), 'utf8');
  assert(/<html\s+lang="de"/.test(html), `${page} must declare German language`);
  assert(/<title>[^<]+<\/title>/.test(html), `${page} must include a title`);
  for (const [, reference] of html.matchAll(refPattern)) {
    if (/^(#|mailto:|tel:|https?:|\{\{)/.test(reference)) continue;
    const cleanReference = reference.split('#')[0].split('?')[0];
    assert(existsSync(join(root, dirname(page), cleanReference)) || pendingImageNames.has(cleanReference.split('/').at(-1)), `${page} references missing file: ${reference}`);
  }
}

const landing = await readFile(join(root, 'index.html'), 'utf8');
const landingApp = await readFile(join(root, 'js/app.js'), 'utf8');
const landingStyles = await readFile(join(root, 'css/styles.css'), 'utf8');
assert(landing.includes('href="luxury/"'), 'landing page must link to luxury');
assert(landing.includes('href="streetwear/"'), 'landing page must link to streetwear');
assert(landing.includes('Luxurious Collection entdecken'), 'luxury choice is missing');
assert(landing.includes('Streetwear Collection entdecken'), 'streetwear choice is missing');
assert(landing.includes("url('../upload/BannerLinks.png')") === false, 'banner styling belongs in the stylesheet');
assert(existsSync(join(root, 'upload', 'README.md')), 'upload/README.md is missing');
assert(!landing.includes('<header'), 'landing page must not render a navigation header');
assert(landing.includes('data-welcome-popup'), 'landing page must include the timed welcome popup');
assert(landing.includes('upload/logo/bernd-wagner-designs.svg'), 'welcome popup logo is missing');
assert(landing.includes('src="upload/BannerLinks.png"'), 'luxury banner image is missing');
assert(landing.includes('src="upload/BannerRechts.png"'), 'streetwear banner image is missing');
assert(landingStyles.includes('height: 100svh'), 'banner must fill the viewport height');
assert(landing.includes('class="choice-canvas"'), 'banner artwork must use a full-screen canvas');
assert(landingStyles.includes('.choice-canvas { position: relative;'), 'banner canvas must be responsive');
assert(landingStyles.includes('object-fit: contain'), 'desktop banner must keep all artwork visible');
assert(landingStyles.includes('clip-path: polygon(0 0,56.65% 0,41.3% 100%,0 100%)'), 'luxury banner must use the transparent artwork diagonal');
assert(landingStyles.includes('clip-path: polygon(56.65% 0,100% 0,100% 100%,41.3% 100%)'), 'streetwear banner must use the transparent artwork diagonal');
assert(landingStyles.includes('border: 1px solid rgba(197,154,94,.65)'), 'landing banner must retain its gold frame');
assert(landingStyles.includes('transform: scale(1.025)'), 'banner hover zoom is missing');
assert(!landing.includes('<header'), 'landing header must remain removed');
for (const profile of ['desktop-low', 'desktop-high', 'mobile', 'other-device']) assert(landingStyles.includes(`html[data-layout="${profile}"]`), `${profile} layout styles are missing`);
assert(landingApp.includes("height > width"), 'portrait viewports must select mobile');
assert(!landingApp.includes('history.replaceState'), 'automatic layout detection must not rewrite the page URL');
assert(landingApp.includes('5200'), 'welcome popup must be removed after its exclusive welcome sequence');
assert(landingStyles.includes('prefers-reduced-motion: reduce'), 'landing interaction must honor reduced motion');

assert(luxuryProducts.length === 6, 'luxury must retain all six configured designs');
assert(new Set(luxuryProducts.map(({ image }) => image)).size === 6, 'luxury images must be unique');
for (const product of luxuryProducts) assert(existsSync(join(root, 'luxury', product.image)), `${product.id} references missing luxury image`);

assert(streetwearProducts.length === 4, 'streetwear must contain the trousers, bag, shirt and cap');
assert(
  JSON.stringify(streetwearProducts.map(({ name, image }) => [name, image])) === JSON.stringify([
    ['Streetwear Hose', '../upload/streetwear/hosen/StreetWear_Trouser.png'],
    ['Streetwear Rucksack', '../upload/streetwear/bags/StreetWear_Bag.png'],
    ['Streetwear Hemd', '../upload/streetwear/oberteile/StreetWear_Shirt.png'],
    ['Streetwear Cap', '../upload/streetwear/caps/StreetWear_Cap.png']
  ]),
  'streetwear products must reference the documented upload filenames'
);
assert(streetwearProducts.every(({ pendingUpload }) => pendingUpload), 'streetwear images must remain marked as pending upload');
for (const collection of ['luxury', 'streetwear']) {
  assert(existsSync(join(root, 'upload', collection, 'README.md')), `shared upload/${collection} directory is missing`);
}
assert(existsSync(join(root, 'upload', 'streetwear', 'oberteile', 'README.md')), 'streetwear tops upload instructions are missing');
assert(existsSync(join(root, 'upload', 'streetwear', 'bags', 'README.md')), 'streetwear bags upload instructions are missing');
assert(existsSync(join(root, 'upload', 'streetwear', 'caps', 'README.md')), 'streetwear caps upload instructions are missing');
for (const [collection, filename] of [['streetwear', 'streetwear_collection.png'], ['luxury', 'luxury_collection.png']]) {
  const preview = join(root, 'upload', collection, 'collection-preview');
  assert(existsSync(join(preview, 'README.md')), `${collection} collection preview upload instructions are missing`);
  const html = await readFile(join(root, collection, 'index.html'), 'utf8');
  assert(html.includes(`../upload/${collection}/collection-preview/${filename}`), `${collection} hero must use its collection preview image`);
  const styles = await readFile(join(root, collection, 'css/styles.css'), 'utf8');
  assert(styles.includes('.hero-art img{object-fit:contain'), `${collection} hero preview must fit inside its frame`);
}

for (const profile of ['desktop-low', 'desktop-high', 'mobile', 'other-device']) {
  for (const collection of ['luxury', 'streetwear']) {
    const edition = join(profile, collection);
    assert(existsSync(join(root, edition, 'index.html')), `${edition} device edition is missing`);
    assert(existsSync(join(root, edition, 'css/styles.css')), `${edition} responsive styles are missing`);
    assert(existsSync(join(root, edition, 'js/app.js')), `${edition} interactions are missing`);
    assert(!existsSync(join(root, edition, 'upload')), `${edition} must not keep a duplicate upload directory`);
  }
  const profileLanding = await readFile(join(root, profile, 'index.html'), 'utf8');
  assert(profileLanding.includes('href="luxury/"'), `${profile} landing must open its local luxury edition`);
  assert(profileLanding.includes('href="streetwear/"'), `${profile} landing must open its local streetwear edition`);
}

for (const profile of ['desktop-low', 'desktop-high', 'mobile', 'other-device']) {
  const { products } = await import(`../${profile}/streetwear/js/config.js`);
  assert(products.every(({ image }) => image.startsWith('../../upload/streetwear/')), `${profile} streetwear must use the shared upload folder`);
}

for (const profile of ['desktop-low', 'desktop-high', 'mobile', 'other-device']) {
  const { products } = await import(`../${profile}/luxury/js/config.js`);
  for (const product of products) {
    assert(product.image.startsWith('../../upload/luxury/'), `${profile} luxury must use the shared upload folder`);
    assert(existsSync(join(root, profile, 'luxury', product.image)), `${profile} ${product.id} references a missing shared image`);
  }
}

console.log(`Static smoke checks passed for ${pages.length} pages, ${luxuryProducts.length} luxury designs and ${streetwearProducts.length} streetwear designs.`);
