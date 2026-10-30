import { houseArt } from './house-art.js';

let illustrationId = 0;
const controls = new Set();
let observing = false;
const tubVisibility = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const entry of entries) if (!entry.isIntersecting) {
    const control = entry.target.querySelector('[data-tub-toggle]');
    if (control) setExpanded(control, false);
  }
}) : null;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const canAnimate = () => !reducedMotion.matches && document.documentElement.dataset.motion !== 'off';

export function renderHouse(className) {
  const id = `cabin-${++illustrationId}`;
  // Each inline copy owns its filter IDs, including when a dialog is open.
  const svg = houseArt.replace(/id="([^"]+)"/g, (_, name) => `id="${id}-${name}"`)
    .replace(/url\(#([^)]+)\)/g, (_, name) => `url(#${id}-${name})`)
    .replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
  return `<div class="house-illustration ${className}"><div class="house-canvas" id="${id}">${svg}<button type="button" class="house-hotspot" data-house-toggle aria-controls="${id}" aria-describedby="${id}-hint" aria-label="Разобрать дом" aria-pressed="false"></button><button type="button" class="tub-hotspot" data-tub-toggle aria-controls="${id}" aria-describedby="${id}-hint" aria-label="Разжечь огонь под чаном" aria-pressed="false"></button></div><p class="house-hint" id="${id}-hint"><span class="house-hint-pointer">Наведите на дом, чтобы разобрать его, или на чан — для огня и пара.</span><span class="house-hint-touch">Коснитесь дома или чана, чтобы включить эффект. Повторное касание выключит его.</span><span class="house-hint-static">Движение отключено. Дом и чан показаны без анимации.</span></p></div>`;
}

function setExpanded(control, expanded) {
  const value = Boolean(expanded && canAnimate());
  const tub = control.hasAttribute('data-tub-toggle');
  control.closest('.house-illustration').classList.toggle(tub ? 'is-heated' : 'is-exploded', value);
  control.setAttribute('aria-pressed', String(value));
  control.setAttribute('aria-label', tub ? (value ? 'Погасить огонь под чаном' : 'Разжечь огонь под чаном') : (value ? 'Собрать дом' : 'Разобрать дом'));
}
function refreshControls() {
  for (const control of controls) {
    if (!control.isConnected) { if(control.hasAttribute('data-tub-toggle')) tubVisibility?.unobserve(control.closest('.house-illustration')); controls.delete(control); continue; }
    const disabled = !canAnimate();
    control.disabled = disabled;
    control.closest('.house-illustration').classList.toggle('house-static', disabled);
    if (disabled) setExpanded(control, false);
  }
}

export function initHouses(root = document) {
  for (const control of root.querySelectorAll('[data-house-toggle]:not([data-house-ready]),[data-tub-toggle]:not([data-house-ready])')) {
    control.dataset.houseReady = 'true';
    controls.add(control);
    if(control.hasAttribute('data-tub-toggle')) tubVisibility?.observe(control.closest('.house-illustration'));
    let lastPointer = '';
    control.addEventListener('pointerdown', event => { lastPointer = event.pointerType; });
    control.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch' && matchMedia('(hover: hover)').matches) {
        lastPointer = event.pointerType;
        setExpanded(control, true);
      }
    });
    control.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'touch') setExpanded(control, false);
    });
    control.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      if (lastPointer === 'touch' || event.detail === 0 || matchMedia('(hover: none)').matches) {
        setExpanded(control, control.getAttribute('aria-pressed') !== 'true');
      } else setExpanded(control, true);
    });
    control.addEventListener('blur', () => setExpanded(control, false));
    control.addEventListener('keydown', event => {
      if (event.key === 'Escape' && control.getAttribute('aria-pressed') === 'true') {
        setExpanded(control, false);
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }
  if (!observing) {
    observing = true;
    new MutationObserver(refreshControls).observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    reducedMotion.addEventListener('change', refreshControls);
    document.addEventListener('visibilitychange', () => {if(document.hidden) for(const control of controls) if(control.isConnected && control.hasAttribute('data-tub-toggle')) setExpanded(control, false);});
    document.addEventListener('click', event => {
      if (!event.target.closest('.house-illustration')) {
        for (const control of controls) if (control.isConnected) setExpanded(control, false);
      }
    });
  }
  refreshControls();
}
