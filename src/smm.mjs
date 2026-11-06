const services = [
  ['analysis', 'Анализ', 'Изучаем рынок, аудиторию и конкурентов. Выясняем, какие темы интересуют ваших клиентов и где с ними лучше общаться.', 'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-2 4 6 6M7 11l2-2 2 1 2-3'],
  ['content', 'Стратегия и контент', 'Собираем план продвижения, создаём визуальный стиль, пишем посты и готовим сценарии для коротких видео.', 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h4'],
  ['ads', 'Таргетированная реклама', 'Подбираем аудиторию, готовим объявления и проверяем, какие предложения и форматы приводят к обращениям.', 'M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 12l8-8m-4 0h4v4'],
  ['search', 'SEO-продвижение соцсетей', 'Дорабатываем названия, описания и содержание публикаций, чтобы вас было легче найти через поиск внутри площадок.', 'M4 20h16M5 17v-4m5 4V9m5 8v-6m5 6V5M4 9l6-5 5 2 5-4'],
];
const stages = ['Анализ и постановка задач', 'Стратегия и план действий', 'Контент и оформление', 'Запуск и ведение', 'Аналитика и развитие'];
const results = [
  ['Узнаваемость', 'Охваты, просмотры и отклик на рубрики.'],
  ['Целевая аудитория', 'Подписки, переходы и интерес к услугам.'],
  ['Обращения', 'Сообщения и заявки, которые можно связать с продвижением.'],
  ['План развития', 'Что сработало, что меняем и что проверим дальше.'],
];

const platformIcons = [
  '<path fill="currentColor" d="M12.8 17.1c-5.6 0-8.7-3.8-8.8-10.2h2.8c.1 4.7 2.1 6.7 3.8 7.1V6.9h2.6v4c1.6-.2 3.3-2 3.9-4h2.6c-.4 2.5-2.3 4.3-3.6 5.1 1.3.6 3.4 2.2 4.2 5.1h-2.9c-.6-1.9-2.2-3.4-4.2-3.6v3.6z"/>',
  '<path fill="currentColor" d="M20.4 4.7 3.9 11.1c-1.1.4-1.1 1.1-.2 1.4l4.2 1.3 9.8-6.2c.5-.3.9-.1.5.3l-7.9 7.1-.3 4.2c.4 0 .6-.2.9-.4l2-2 4.2 3.1c.8.5 1.4.2 1.6-.8l2.8-13.2c.2-1-.4-1.5-1.1-1.2Z"/>',
  '<rect x="3.5" y="3.5" width="17" height="17" rx="4.7" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.1" cy="6.9" r="1.15" fill="currentColor"/>',
  '<path fill="currentColor" fill-rule="evenodd" d="M20.8 7.4c-.2-.9-.9-1.6-1.8-1.8C17.4 5.2 12 5.2 12 5.2s-5.4 0-7 .4c-.9.2-1.6.9-1.8 1.8C2.8 9 2.8 12 2.8 12s0 3 .4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 7 .4 7 .4s5.4 0 7-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.6.4-4.6s0-3-.4-4.6Zm-10.6 7.5 4.9-2.9-4.9-2.9v5.8Z"/>',
];

export function renderSmm({ asset, cta, faq }) {
  return `<section class="smm-hero">
    <div class="wrap smm-hero-grid">
      <div class="smm-intro">
        <p class="smm-label">УСЛУГИ / SMM</p>
        <h1>SMM, который развивает <em>ваш бизнес</em></h1>
        <p class="smm-lead">Продвигаем бизнес в соцсетях. Разрабатываем стратегию, создаём контент, ведём сообщества и оцениваем, что приводит к обращениям.</p>
        <div class="actions">${cta('Обсудить продвижение')}<a class="smm-secondary" href="#smm-services">Посмотреть услуги <span aria-hidden="true">↓</span></a></div>
      </div>
      <figure class="smm-hero-art">
        <img src="${asset('assets/smm/hero.webp?v=aqua1')}" width="1080" height="810" fetchpriority="high" alt="Два смартфона с лентой публикаций и коротким видео, рядом значки ВКонтакте, Telegram, Instagram и YouTube">
        <div class="smm-platforms" aria-hidden="true">
          ${platformIcons.map(icon=>`<span class="smm-platform"><svg viewBox="0 0 24 24">${icon}</svg></span>`).join('')}
        </div>
      </figure>
    </div>
    <div class="wrap"><ul class="smm-highlights"><li>Узнаваемость бренда</li><li>Целевая аудитория</li><li>Регулярный контент</li><li>Работа с обращениями</li><li>Понятная отчётность</li></ul></div>
  </section>
  <section class="smm-section" id="smm-services">
    <div class="wrap">
      <div class="smm-section-head">
        <div><p class="smm-label">/ НАШИ УСЛУГИ</p><h2>Комплексное SMM-продвижение</h2></div>
        <p>Берём на себя весь цикл или подключаемся к отдельной задаче вашей команды.</p>
      </div>
      <div class="smm-service-grid">
        ${services.map(([id, title, description, path]) => `<article class="smm-service">
          <div class="smm-service-copy">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>
            <h3>${title}</h3><p>${description}</p>
          </div>
          <img src="${asset('assets/smm/' + id + '.webp?v=aqua1')}" width="512" height="512" alt="" loading="lazy" decoding="async">
        </article>`).join('')}
      </div>
    </div>
  </section>
  <section class="smm-section" id="smm-process">
    <div class="wrap">
      <div class="smm-section-head"><div><p class="smm-label">/ ЭТАПЫ РАБОТЫ</p><h2>Как мы работаем</h2></div><p>До старта согласуем площадки, форматы и задачи на первый период.</p></div>
      <ol class="smm-stages">${stages.map((title,i)=>`<li><span aria-hidden="true">0${i+1}</span>${title}</li>`).join('')}</ol>
    </div>
  </section>
  <section class="smm-section" id="smm-results">
    <div class="wrap smm-results">
      <div><p class="smm-label">/ РЕЗУЛЬТАТ</p><h2>Что вы сможете оценить</h2></div>
      <div class="smm-result-grid">${results.map(([title,description])=>`<article><h3>${title}</h3><p>${description}</p></article>`).join('')}</div>
    </div>
  </section>
  <section class="smm-section" id="smm-start">
    <div class="wrap smm-start-grid">
      <div><p class="smm-label">/ ПЕРЕД СТАРТОМ</p><h2>Что важно<br>согласовать</h2></div>
      <div>${faq([
        ['Что нужно для первого разговора?', 'Пришлите ссылки на ваши страницы, если они уже есть. Расскажите, какие услуги хотите продвигать и кто обычно к вам обращается. Обсудим площадки, форматы и задачи на первый период.'],
        ['Как согласуем публикации?', 'Определим, кто утверждает материалы и сколько времени нужно на обратную связь. Вы заранее видите темы и тексты. Срочные публикации обсуждаем отдельно.'],
        ['От чего зависит стоимость?', 'От количества площадок, частоты публикаций, форматов и объёма работы с комментариями. Состав работ фиксируем в предложении. Съёмку, рекламные расходы и дополнительные материалы согласуем отдельно.'],
      ])}</div>
    </div>
    <div class="wrap"><div class="smm-cta"><h2>Развивайте бренд в соцсетях с Element Digital</h2><p>Обсудим ваши цели, предложим форматы и план на первый период.</p>${cta('Получить консультацию')}</div></div>
  </section>`;
}
