const scene = document.querySelector('.seo-chess');
const trigger = scene.querySelector('.hit');
const pawn = scene.querySelector('.pawn');
const status = scene.querySelector('.chess-status');
let busy = false;
let resetTimer;

function play() {
  if (busy) return;
  clearTimeout(resetTimer);
  scene.classList.remove('active');
  void scene.offsetWidth;
  busy = true;
  status.textContent = '';
  scene.classList.add('active');
}

pawn.addEventListener('animationend', () => {
  busy = false;
  status.textContent = 'Ферзь сделал ход. Пешка упала.';
  resetTimer = setTimeout(() => scene.classList.remove('active'), 1600);
});

trigger.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') play();
});
trigger.addEventListener('click', play);
