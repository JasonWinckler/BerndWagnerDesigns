const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const layoutOverride = document.documentElement.dataset.layoutOverride;
const viewport = { width: window.innerWidth, height: window.innerHeight };

function detectLayout({ width, height }) {
  if (height > width) return 'mobile';
  if (width >= 2400 && height >= 1300) return 'desktop-high';
  if (width >= 1600 && height >= 900) return 'desktop-low';
  return 'other-device';
}

const layout = layoutOverride || detectLayout(viewport);
document.documentElement.dataset.layout = layout;

// Keep the automatically selected version visible in the URL without reloading
// the shared landing page. Direct links to a version remain useful for previews.
if (!layoutOverride && location.protocol !== 'file:') {
  history.replaceState({ layout }, '', `/${layout}/${location.search}${location.hash}`);
}

const welcomePopup = document.querySelector('[data-welcome-popup]');
if (welcomePopup) {
  window.setTimeout(() => {
    welcomePopup.hidden = true;
  }, 5200);
}
