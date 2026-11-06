const services = [
  [
    'Поисковый спрос',
    'Выясняем, что клиенты ищут в Яндексе и Google. Определяем, какие услуги продвигать и какие страницы нужны под эти запросы.',
    'demand',
  ],
  [
    'Посадочные страницы',
    'Дорабатываем страницы услуг и категорий. Помогаем посетителю понять предложение, найти ответы и оставить заявку.',
    'landing',
  ],
  [
    'Локальное продвижение',
    'Помогаем находить компанию по запросам с городом или районом. Дорабатываем региональные страницы и карточки на картах.',
    'local',
  ],
  [
    'Переходы и заявки',
    'Отслеживаем, какие запросы и страницы приводят посетителей и обращения. По этим данным выбираем следующие доработки.',
    'leads',
  ],
];

export function renderPromotion({ asset }) {
  return `<section class="promotion" id="projects" aria-labelledby="promotion-title">
  <div class="wrap">
    <h2 id="promotion-title">SEO-продвижение сайтов</h2>
    <label class="promotion-motion"><input type="checkbox"> Остановить анимацию</label>
    <div class="promotion-grid">
      ${services.map(([title, description, image], index) => `<article class="promotion-card">
        <div class="promotion-art" aria-hidden="true">
          <span>0${index + 1}</span>
          <img src="${asset('assets/seo-services/' + image + '.webp')}" width="720" height="450" alt="" loading="lazy" decoding="async">
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
