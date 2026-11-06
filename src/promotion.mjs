const services = [
  ['analysis', 'Анализ', 'Изучаем рынок, конкурентов и аудиторию, чтобы выстроить сильную стратегию продвижения.', 'M4 20v-6h4v6m2 0V9h4v11m2 0V4h4v16M3 20h18'],
  ['context', 'Контекстная реклама', 'Запускаем рекламу в поиске и получаем обращения от пользователей, уже заинтересованных в вашем предложении.', 'm4 3 15 10-7 1-3 6L4 3Z'],
  ['target', 'Таргетированная реклама', 'Настраиваем точное продвижение в соцсетях и привлекаем нужную аудиторию в заявку или продажу.', 'M16 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m18 0v-2a4 4 0 0 0-3-4m-4-9a3.5 3.5 0 0 1 0 7M13 8a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'],
  ['seo', 'SEO-продвижение', 'Улучшаем видимость сайта в поиске и системно увеличиваем поток целевых клиентов.', 'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-2 4 6 6'],
];

export function renderPromotion({ asset }) {
  return `<section class="promotion" id="projects" aria-labelledby="promotion-title">
  <div class="wrap">
    <h2 id="promotion-title">Услуги продвижения</h2>
    <div class="promotion-grid">
      ${services.map(([id, title, description, icon]) => `<article class="promotion-card">
        <div class="promotion-art"><img src="${asset('assets/promotion/' + id + '.webp')}" width="374" height="330" loading="lazy" decoding="async" alt="${id === 'target' ? 'Смартфон со значками ВКонтакте, Telegram и Instagram' : ''}"></div>
        <div class="promotion-content">
          <span class="promotion-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${icon}"/></svg></span>
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
