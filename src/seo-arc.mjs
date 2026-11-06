import { renderPromotion } from './promotion.mjs';

const solutions = [
 ['Стратегия и позиционирование','Уточняем, кому и какую ценность даёт компания. Фиксируем приоритеты.','compass'],
 ['Разработка цифровых продуктов','Проектируем сайты, сервисы и инструменты для клиентов и команды.','cube'],
 ['Маркетинг и привлечение клиентов','Подбираем каналы, связываем рекламу с посадочными страницами и аналитикой.','growth'],
 ['Развитие и сопровождение','После запуска отслеживаем результаты, исправляем узкие места и планируем развитие.','cycle'],
];
const icons = {
 compass:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-4-6 2-6 6-2-2 6-6 2Z',
 cube:'M12 2 22 8v9l-10 5-10-5V8L12 2Zm0 10v10M2 8l10 4 10-4',
 growth:'M2 3v19h20M6 17l6-7 4 3 6-8',
 cycle:'M21 9a9 9 0 1 0 0 7M21 3v6h-6',
};
const approach = [
 ['Бизнес-цели','Что должно измениться'],
 ['Стратегия','На чём сосредоточиться'],
 ['Дизайн','Что увидит клиент'],
 ['Технологии','Как это будет работать'],
 ['Маркетинг','Как привлечь аудиторию'],
];
const roles = [
 ['Руководитель стратегии','Бизнес-цели и приоритеты'],
 ['Арт-директор','Визуальная система и качество'],
 ['Руководитель разработки','Архитектура и реализация'],
 ['Руководитель маркетинга','Каналы и аналитика'],
];
const process = [
 ['Погружаемся в бизнес','Разбираем задачу, ограничения и критерии успеха.'],
 ['Формируем стратегию','Фиксируем приоритеты, этапы и состав работ.'],
 ['Реализуем решения','Проектируем, проверяем и запускаем согласованное.'],
 ['Анализируем и развиваем','Смотрим на данные, уточняем и планируем следующий шаг.'],
];
const index = i => String(i + 1).padStart(2,'0');
const intro = (label, title, description = '') => `<div class="arc-intro"><div><p class="arc-label">${label}</p><h2>${title}</h2></div>${description ? `<p class="arc-aside">${description}</p>` : ''}</div>`;
const imageWindow = (src, viewBox, width, height) =>
 `<svg class="arc-photo" viewBox="${viewBox}" aria-hidden="true" focusable="false"><image href="${src}" width="${width}" height="${height}"/></svg>`;

const heroLight = `<svg class="arc-hero-light" viewBox="0 0 1536 1024" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">
  <defs>
   <radialGradient id="arc-gold-spot">
    <stop stop-color="#fff8df"/>
    <stop offset=".42" stop-color="#ffd28a" stop-opacity=".75"/>
    <stop offset="1" stop-color="#ffc474" stop-opacity="0"/>
   </radialGradient>
   <clipPath id="arc-stair-profile">
    <path d="M92 880L432 845 487 816 598 789 710 759 832 729 941 700 1057 669 1138 636 1205 607 1268 578 1374 546 1384 575 1330 620 1250 683 1140 757 1021 827 1000 917 802 955 119 958Z"/>
   </clipPath>
   <filter id="arc-ring-halo" x="-12%" y="-14%" width="124%" height="128%">
    <feGaussianBlur stdDeviation="9"/>
   </filter>
  </defs>
  <g clip-path="url(#arc-stair-profile)">
   <ellipse class="arc-stair-light" rx="258" ry="96" fill="url(#arc-gold-spot)"/>
  </g>
  <path class="arc-ring-light" d="M666 768C542 650 548 478 589 371C650 204 798 107 984 100C1204 91 1370 242 1373 448C1374 492 1366 522 1351 551" pathLength="100"
    fill="none" stroke="#ffe1a1" stroke-width="30" stroke-linecap="round" filter="url(#arc-ring-halo)"/>
  <ellipse class="arc-crown-light" cx="980" cy="466" rx="90" ry="165" fill="url(#arc-gold-spot)"/>
 </svg>`;

export function renderSeoArc({ asset, cta, href }) {
 return `<section class="arc-hero">
  <div class="arc-hero-art">
   <img src="${asset('assets/seo-king-arch.webp')}" width="1320" height="880" alt="" fetchpriority="high">
   ${heroLight}
  </div>
  <div class="wrap arc-hero-inner">
   <p class="arc-label">Стратегическое сопровождение</p>
   <h1>Для тех, кто<br><span>создаёт масштаб.</span></h1>
   <p class="arc-lead">Стратегия, дизайн и цифровые решения для собственников и руководителей бизнеса. Объединяем технологии и маркетинг вокруг задач компании.</p>
   <div class="arc-actions">${cta('Обсудить стратегию')}<a class="arc-secondary" href="#approach">Наш подход <span aria-hidden="true">→</span></a></div>
   <p class="arc-hero-caption">Для собственников и руководителей</p>
  </div>
 </section>
 <section class="arc-band arc-paper" id="solutions"><div class="wrap">
  ${intro('01 / Решения для бизнеса','Одна стратегия.<br>Сильные решения.','Определяем, что важно для бизнеса, и собираем нужных специалистов вокруг общей задачи.')}
  <div class="arc-grid arc-four">${solutions.map(([title,description,icon],i)=>`<article class="arc-solution"><div class="arc-card-top"><span class="arc-label">${index(i)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[icon]}"/></svg></div><h3>${title}</h3><p>${description}</p></article>`).join('')}</div>
 </div></section>
 <section class="arc-band arc-dark" id="approach"><div class="wrap">
  ${intro('02 / Подход','Не набор услуг.<br>Система развития.','Начинаем с бизнес-цели и связываем с ней каждое решение. Данные после запуска подсказывают, что улучшать дальше.')}
  <ol class="arc-flow">${approach.map(([title,description],i)=>`<li><span class="arc-label">${index(i)}</span><h3>${title}</h3><p>${description}</p></li>`).join('')}</ol>
  <p class="arc-feedback arc-label">Данные и обратная связь</p>
 </div></section>
 ${renderPromotion({ asset, href, page: 'seo' })}
 <section class="arc-band arc-dark" id="team"><div class="wrap">
  ${intro('04 / Команда','Люди, которые отвечают<br>за результат.','Пример распределения ролей в проекте. Иллюстративные портреты.')}
  <div class="arc-grid arc-four">${roles.map(([title,description],i)=>`<article class="arc-role">${imageWindow(asset('assets/seo-roles.webp'),`${(i%2)*560} ${Math.floor(i/2)*560+45} 560 445`,1120,1120)}<h3>${title}</h3><p>${description}</p></article>`).join('')}</div>
 </div></section>
 <section class="arc-band arc-paper" id="process"><div class="wrap">
  ${intro('05 / Процесс','От задачи руководителя —<br>к работающему решению.')}
  <ol class="arc-grid arc-four arc-timeline">${process.map(([title,description],i)=>`<li><p class="arc-label">${index(i)}</p><h3>${title}</h3><p>${description}</p></li>`).join('')}</ol>
 </div></section>`;
}
