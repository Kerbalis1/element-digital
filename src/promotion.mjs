const services = [
  [
    'Поисковый спрос',
    'Выясняем, что клиенты ищут в Яндексе и Google. Определяем, какие услуги продвигать и какие страницы нужны под эти запросы.',
    '<rect x="32" y="23" width="176" height="28" rx="14"/><circle cx="50" cy="36" r="5"/><path d="m54 40 4 4m12-8h110M49 68h142M49 84h107M49 100h76"/>',
  ],
  [
    'Посадочные страницы',
    'Дорабатываем страницы услуг и категорий. Помогаем посетителю понять предложение, найти ответы и оставить заявку.',
    '<rect x="35" y="19" width="170" height="82" rx="7"/><path d="M35 35h170m-155-8h2m5 0h2m5 0h2m-16 22h70m-70 13h48m-48 13h52"/><rect x="50" y="84" width="38" height="7" rx="3"/><rect x="134" y="48" width="57" height="42" rx="4"/><path d="m135 81 17-15 10 8 11-11 17 15"/>',
  ],
  [
    'Локальное продвижение',
    'Помогаем находить компанию по запросам с городом или районом. Дорабатываем региональные страницы и карточки на картах.',
    '<path d="M32 84 77 65l43 15 42-15 46 19-46 21-42-15-43 15-45-21Zm45-19v40m85-40v40M120 72c-4-8-20-20-20-34a20 20 0 1 1 40 0c0 14-16 26-20 34Z"/><circle cx="120" cy="38" r="7"/>',
  ],
  [
    'Переходы и заявки',
    'Отслеживаем, какие запросы и страницы приводят посетителей и обращения. По этим данным выбираем следующие доработки.',
    '<path d="M39 25v67h162M50 77l26-6 27 2 25-15 24 4 37-20M61 105h117"/><circle cx="76" cy="71" r="3"/><circle cx="128" cy="58" r="3"/><circle cx="189" cy="42" r="4"/><path d="m181 29 7 5 10-11"/>',
  ],
];

export function renderPromotion() {
  return `<section class="promotion" id="projects" aria-labelledby="promotion-title">
  <div class="wrap">
    <h2 id="promotion-title">SEO-продвижение сайтов</h2>
    <div class="promotion-grid">
      ${services.map(([title, description, illustration], index) => `<article class="promotion-card">
        <div class="promotion-art" aria-hidden="true">
          <span>0${index + 1}</span>
          <svg viewBox="0 0 240 120" focusable="false">${illustration}</svg>
        </div>
        <div class="promotion-content">
          <h3>${title}</h3>
          <p>${description}</p>
          <a class="promotion-link" href="#contact" aria-label="Обсудить услугу «${title}»">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
          </a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;
}
