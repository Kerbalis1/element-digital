const solutions = [
  ['corporate', 'Корпоративные сайты', 'Показываем услуги, проекты и преимущества компании. Помогаем клиенту быстро найти нужное и оставить заявку.', 'development/websites'],
  ['shop', 'Интернет-магазины', 'Делаем каталог, фильтры и корзину. Подключаем оплату, доставку и учёт в согласованном объёме.', '#service-shop'],
  ['landing', 'Лендинги и промо-страницы', 'Собираем страницу для запуска продукта, рекламной кампании или отдельной услуги.', 'development/landing-pages'],
  ['apps', 'Веб-сервисы и личные кабинеты', 'Связываем заявки, CRM и рабочие процессы. Создаём интерфейсы для клиентов и команды.', '#service-apps'],
];

const highlights = [
  ['Фокус на задаче бизнеса', 'M3 21h18M5 17v-4m5 4V9m5 8v-7m5 7V4M5 9l5-5 5 2 5-4'],
  ['UX/UI и адаптивность', 'm12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5'],
  ['Интеграции и автоматизация', 'M9 4h6v5H9zM3 16h6v5H3zm12 0h6v5h-6zM12 9v4m-6 3v-3h12v3'],
  ['Архитектура с запасом на рост', 'm12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10v9M3 8l9 5 9-5'],
  ['Поддержка и развитие', 'm12 3 8 3v6c0 5-3 8-8 10-5-2-8-5-8-10V6l8-3Zm-4 9 3 3 5-6'],
];

const reasons = [
  'Вникаем в бизнес и заранее договариваемся, что должен делать продукт.',
  'Проектируем структуру, дизайн и разработку в одной команде.',
  'Проверяем мобильную версию и ключевые сценарии перед запуском.',
  'Передаём исходники и доступы, согласовываем поддержку после запуска.',
];

export function renderDevelopment({ asset, link, cta, projects, serviceDetails }) {
  return `<section class="dev-hero">
    <div class="wrap dev-hero-grid">
      <div class="dev-hero-copy">
        <p class="dev-kicker">Разработка <span>/</span> Development</p>
        <h1>Создаём цифровые продукты <em>для роста бизнеса</em></h1>
        <p class="dev-lead">Разрабатываем сайты, магазины и веб-сервисы. Продумываем путь клиента от первого экрана до заявки или покупки и помогаем развивать продукт после запуска.</p>
        <div class="actions">${cta('Рассчитать проект')}<a class="button dev-outline" href="#development-projects">Смотреть демо <span aria-hidden="true">↓</span></a></div>
      </div>
      <img class="dev-hero-image" src="${asset('assets/development/hero.webp')}" width="1200" height="800" fetchpriority="high" alt="">
    </div>
  </section>
  <div class="dev-highlights"><ul class="wrap">${highlights.map(([label, path])=>`<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>${label}</li>`).join('')}</ul></div>
  <section class="wrap dev-section" aria-labelledby="dev-solutions-title">
    <h2 class="dev-heading" id="dev-solutions-title">Решения под задачи бизнеса</h2>
    <div class="dev-solutions">${solutions.map(([id, title, description, path])=>`<article class="dev-solution">
      <img src="${asset('assets/development/'+id+'.webp')}" width="600" height="400" loading="lazy" decoding="async" alt="">
      <div class="dev-solution-content">
        <h3>${path.startsWith('#')?`<a href="${path}">${title}</a>`:link(path,title,'dev-solution-link')}</h3>
        <p>${description}</p>
        <span class="dev-arrow" aria-hidden="true">→</span>
      </div>
    </article>`).join('')}</div>
  </section>
  <section class="wrap dev-section dev-reasons" aria-labelledby="dev-reasons-title">
    <div><h2 class="dev-heading" id="dev-reasons-title">Почему выбирают нас</h2>
    <ul>${reasons.map(reason=>`<li>${reason}</li>`).join('')}</ul></div>
    <img src="${asset('assets/development/target.webp')}" width="900" height="600" loading="lazy" decoding="async" alt="">
  </section>
  <section class="wrap dev-section dev-projects" id="development-projects">
    <h2 class="dev-heading">Демопроекты</h2>
    <p class="dev-section-note">Попробуйте сценарии бронирования, покупки и обработки заявок в демонстрационных проектах студии.</p>
    ${projects()}
  </section>
  <section class="wrap dev-section" aria-labelledby="dev-scope-title">
    <h2 class="dev-heading" id="dev-scope-title">Что входит в разработку</h2>
    ${serviceDetails()}
  </section>
  <section class="wrap dev-section" aria-labelledby="dev-estimate-title">
    <div class="dev-estimate">
      <h2 id="dev-estimate-title">Рассчитаем стоимость <em>вашего проекта</em></h2>
      <p>Расскажите о задаче. Предложим состав работ, этапы и сроки.</p>
      ${cta('Получить расчёт')}
    </div>
  </section>`;
}
