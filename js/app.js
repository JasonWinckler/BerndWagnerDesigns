const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const stage = document.querySelector('[data-choice-stage]');
if (stage && matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  stage.addEventListener('pointermove', (event) => {
    const card = event.target.closest('.choice');
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    card.style.setProperty('--pointer-x', `${x * 8}px`);
    card.style.setProperty('--pointer-y', `${y * 8}px`);
    card.querySelector('.choice-copy').style.transform = `translate(${x * 8}px, ${y * 5}px)`;
  });
  stage.addEventListener('pointerleave', () => {
    stage.querySelectorAll('.choice-copy').forEach((copy) => { copy.style.transform = ''; });
  });
}
