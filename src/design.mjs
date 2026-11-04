export function renderDesign({ asset, link, cta, heading, projects, process }) {
  return `
  <section class="design-intro wrap" aria-labelledby="design-title">
    <div class="design-edition"><span>ELEMENT DIGITAL / DESIGN</span><span>ИСКУССТВО БЫТЬ СОБОЙ ↗</span></div>
    <div class="design-hero">
      <div class="design-copy">
        <p class="eyebrow"><span class="design-dot" aria-hidden="true"></span> СТУДИЯ ДИЗАЙНА И ВИЗУАЛЬНЫХ РЕШЕНИЙ</p>
        <h1 id="design-title">Придаём<br>идеям<br><em>характер.</em></h1>
        <p class="design-lead">Соединяем смелую эстетику и ясную логику. Создаём бренды, сайты и интерфейсы, в которых узнают вас.</p>
        <div class="actions">${cta('Обсудить дизайн')}<a class="design-work-link" href="#design-work">Посмотреть работы <span aria-hidden="true">↗</span></a></div>
        <div class="design-index" aria-label="Направления дизайна"><span>01 / Айдентика</span><span>02 / Интерфейсы</span><span>03 / Коммуникации</span></div>
      </div>
      <figure class="design-art">
        <div class="design-image-wrap">
          <picture><source media="(max-width: 640px)" srcset="${asset('assets/design-leonardo-mobile.webp')}"><img src="${asset('assets/design-leonardo.webp')}" width="1100" height="1375" alt="Коллаж: Леонардо да Винчи в фиолетовых очках с розовой жвачкой, витрувианский человек и геометрические формы на розовом фоне" fetchpriority="high"></picture>
          <span class="design-image-label" aria-hidden="true">КЛАССИКА.<br>НОВЫЙ ВЗГЛЯД.</span>
        </div>
        <figcaption><span>Там, где встречаются искусство и digital.</span><span aria-hidden="true">↗</span></figcaption>
        <div class="palette-picker" role="group" aria-label="Цвет оформления"><button type="button" data-palette="rose" aria-label="Розовое оформление" aria-pressed="true"></button><button type="button" data-palette="violet" aria-label="Фиолетовое оформление" aria-pressed="false"></button><span>Ваше настроение</span></div>
      </figure>
    </div>
  </section>
  <div class="design-ribbon" aria-hidden="true"><span>СМЫСЛ</span><span>✦</span><span>ФОРМА</span><span>✦</span><span>ХАРАКТЕР</span><span>↗</span></div>
  <section class="design-manifesto section wrap">
    <p class="eyebrow">01 / НАША ТОЧКА ЗРЕНИЯ</p>
    <div><h2>Эстетика привлекает.<br><em>Смысл остаётся.</em></h2><p>За каждым визуальным решением — ваш бизнес, аудитория и задача. Находим идею, которая выражает суть бренда, и превращаем её в последовательный визуальный язык.</p></div>
  </section>
  <section class="section wrap design-capabilities" id="design-services">
    ${heading('02 / ЧТО СОЗДАЁМ', 'От первого впечатления<br>до каждого взаимодействия.', 'Один характер бренда. Разные способы его выразить.')}
    <div class="design-capability-grid">
      <article><div class="design-capability-top"><span>01 / BRAND IDENTITY</span><span aria-hidden="true">↗</span></div><h3>Айдентика</h3><p>Логотип, палитра, типографика и правила применения. Визуальная система, которая собирает образ бренда в одно целое.</p><div class="design-tags"><span>Логотип</span><span>Фирменный стиль</span><span>Гайдлайн</span></div><div class="identity-specimen" aria-hidden="true"><span>Aa</span><span>e↗</span><i></i><i></i><i></i></div></article>
      <article><div class="design-capability-top"><span>02 / DIGITAL EXPERIENCE</span><span aria-hidden="true">↗</span></div><h3>UX/UI-дизайн</h3><p>Сценарии, прототипы и адаптивные макеты. Продумываем навигацию, доступность и все состояния интерфейса.</p><div class="design-tags"><span>Исследование</span><span>Прототип</span><span>UI-система</span></div><div class="interface-specimen" aria-hidden="true"><div><b>Ваша идея.<br>Её новая форма.</b><span>Начать ↗</span></div><i></i></div></article>
      <article><div class="design-capability-top"><span>03 / VISUAL COMMUNICATION</span><span aria-hidden="true">↗</span></div><h3>Коммуникации</h3><p>Графика для соцсетей, презентаций и рекламных кампаний. Узнаваемая подача в каждом контакте с аудиторией.</p><div class="design-tags"><span>Соцсети</span><span>Презентации</span><span>Креативы</span></div><div class="communication-specimen" aria-hidden="true"><span>ЕСТЬ<br><em>ИДЕЯ.</em></span><span>↗</span></div></article>
    </div>
    <p class="design-specimen-note">Графические этюды иллюстрируют направления работы.</p>
  </section>
  <section class="section design-work" id="design-work"><div class="wrap">
    ${heading('03 / ОТ ИДЕИ К ИНТЕРФЕЙСУ', 'Смотреть.<br><em>Пробовать. Чувствовать.</em>', 'Авторские демопроекты. Откройте интерфейсы и попробуйте сценарии — это демонстрации, а не клиентские кейсы.')}
    ${projects()}
    <div class="section-end">${link('portfolio', 'Все демонстрации', 'text-link')}</div>
  </div></section>
  <section class="section design-delivery"><div class="wrap split">
    <div><p class="eyebrow">04 / РЕЗУЛЬТАТ РАБОТЫ</p><h2>Ваш характер.<br><em>В каждой детали.</em></h2><p>Передаём материалы, с которыми удобно работать дальше: развивать бренд, собирать сайт и создавать новые коммуникации.</p></div>
    <ul class="deliverables"><li>Концепция с объяснением решений</li><li>Макеты для согласованных экранов</li><li>Компоненты и состояния интерфейса</li><li>Исходные файлы и правила применения</li><li>Подготовка к передаче в разработку</li></ul>
  </div></section>
  <div class="design-process">${process()}</div>`;
}
