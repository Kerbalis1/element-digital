// Small, event-driven motion controller; no external animation runtime.
export function initMotion() {
  const root = document.documentElement;
  const toggle = document.getElementById('motion-toggle');
  if (!toggle) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  const hero = document.querySelector('.hero');
  const composition = document.querySelector('.hero-composition');
  const product = document.querySelector('.product-scene');
  let userPaused = false;
  let frame = 0;
  let visible = new Set();
  const stages = [...document.querySelectorAll('.motion-stage,.product-scene,.service-avatars')];
  const isPaused = () => preference.matches || userPaused || document.hidden;

  function refreshState() {
    root.dataset.motion = isPaused() ? 'off' : 'on';
    toggle.hidden = false;
    toggle.disabled = preference.matches;
    const text = preference.matches ? 'Анимация отключена' : userPaused ? 'Включить анимацию' : 'Остановить анимацию';
    toggle.querySelector('span').textContent = text;
    toggle.setAttribute('aria-label', text);
    toggle.querySelector('path').setAttribute('d', userPaused || preference.matches ? 'M4 2L12 7L4 12Z' : 'M4 2v10M10 2v10');
    if (isPaused()) {
      composition?.style.removeProperty('--hero-x');
      composition?.style.removeProperty('--hero-y');
    } else requestUpdate();
  }

  function updateScroll() {
    frame = 0;
    if (isPaused()) return;
    if (product && visible.has(product)) {
      const rect = product.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (innerHeight - rect.top) / (innerHeight + rect.height)));
      product.style.setProperty('--scene-progress', progress.toFixed(4));
    }
  }
  function requestUpdate() {
    if (!frame && !isPaused()) frame = requestAnimationFrame(updateScroll);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        entry.target.classList.toggle('motion-sleep', !entry.isIntersecting);
        if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
      }
      requestUpdate();
    }, { rootMargin: '80px', threshold: 0 });
    stages.forEach(stage => observer.observe(stage));
  } else visible = new Set(stages);

  toggle.addEventListener('click', () => { userPaused = !userPaused; refreshState(); });
  preference.addEventListener('change', refreshState);
  document.addEventListener('visibilitychange', refreshState);
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  // A very small depth response, restricted to fine pointers and the artwork.
  hero?.addEventListener('pointermove', event => {
    if (isPaused() || mobile.matches || event.pointerType === 'touch' || !composition) return;
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 5;
    composition.style.setProperty('--hero-x', `${x.toFixed(2)}px`);
    composition.style.setProperty('--hero-y', `${y.toFixed(2)}px`);
  }, { passive: true });
  hero?.addEventListener('pointerleave', () => {
    composition?.style.removeProperty('--hero-x');
    composition?.style.removeProperty('--hero-y');
  });
  refreshState();
}
