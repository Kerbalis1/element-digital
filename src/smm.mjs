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
        <img src="${asset('assets/smm/hero.webp')}" width="1080" height="810" fetchpriority="high" alt="Два смартфона с лентой публикаций и коротким видео">
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
          <img src="${asset('assets/smm/' + id + '.webp')}" width="512" height="512" alt="" loading="lazy" decoding="async">
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
