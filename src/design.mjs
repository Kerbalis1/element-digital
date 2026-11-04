export function renderDesign({ asset, link, cta, heading, projects, process }) {
  const choose=(value,label)=>`<a class="button" href="#contact" data-design-service="${value}">${label}<span aria-hidden="true">↗</span></a>`;
  return `
  <section class="design-intro wrap" aria-labelledby="design-title">
    <nav class="design-breadcrumb" aria-label="Хлебные крошки">${link('', 'Главная')}<span aria-hidden="true">/</span><span aria-current="page">Дизайн сайтов</span></nav>
    <div class="design-hero">
      <div class="design-copy">
        <p class="eyebrow"><span class="design-dot" aria-hidden="true"></span> ELEMENT DIGITAL / WEB DESIGN</p>
        <h1 id="design-title">Дизайн сайтов<br><em>с вашим<br>характером.</em></h1>
        <p class="design-lead">Создаём выразительные сайты с нуля и переосмысливаем существующие. Соединяем визуальный образ бренда, удобство интерфейса и задачи бизнеса.</p>
        <div class="actions">${cta('Обсудить проект')}<a class="design-work-link" href="#design-work">Смотреть работы <span aria-hidden="true">↗</span></a></div>
        <div class="design-index"><a href="#design-formats">Дизайн с нуля</a><a href="#design-redesign">Редизайн</a><a href="#design-formats">Сайт под ключ</a></div>
      </div>
      <figure class="design-art">
        <div class="design-image-wrap"><picture><source media="(max-width: 640px)" srcset="${asset('assets/design-leonardo-mobile.webp')}"><img src="${asset('assets/design-leonardo.webp')}" width="1100" height="1375" alt="Леонардо да Винчи в фиолетовых очках с розовой жвачкой, витрувианский человек и геометрические формы на розовом фоне" fetchpriority="high"></picture><span class="design-image-label" aria-hidden="true">КЛАССИКА.<br>НОВЫЙ ВЗГЛЯД. ↗</span></div>
        <figcaption><span>Искусство создавать впечатление.</span><span>e↗</span></figcaption>
        <div class="palette-picker" role="group" aria-label="Цвет оформления"><button type="button" data-palette="rose" aria-label="Розовое оформление" aria-pressed="true"></button><button type="button" data-palette="violet" aria-label="Фиолетовое оформление" aria-pressed="false"></button><span>Выберите акцент</span></div>
      </figure>
    </div>
    <div class="design-navigation" aria-label="Разделы страницы"><a href="#design-formats">Форматы работы <span>01</span></a><a href="#design-work">Демонстрации <span>02</span></a><a href="#design-process">Этапы <span>03</span></a><a href="#design-faq">Вопросы <span>04</span></a></div>
  </section>
  <section class="section wrap design-formats" id="design-formats">
    ${heading('01 / ОТ ЗАДАЧИ К ФОРМАТУ','Какой сайт нужен<br><em>вашему бизнесу?</em>','От самостоятельного дизайн-макета до готового сайта. Состав работ согласуем до старта.')}
    <div class="design-format-grid">
      <article><span class="format-number">01 / НОВЫЙ ПРОЕКТ</span><h3>Дизайн с нуля</h3><p>Для нового бренда, продукта или услуги, которым нужен собственный визуальный язык.</p><ul><li>Анализ задачи и аудитории</li><li>Структура и прототип</li><li>Визуальная концепция</li><li>Макеты для разных экранов</li><li>Компоненты и состояния интерфейса</li></ul><div class="format-result"><span>Результат</span><strong>Дизайн, готовый к разработке</strong><small>Оценка — после обсуждения задачи</small></div>${choose('Дизайн с нуля','Обсудить дизайн')}</article>
      <article class="format-featured"><span class="format-number">02 / НОВЫЙ УРОВЕНЬ</span><h3>Редизайн сайта</h3><p>Для работающего бизнеса, чей сайт уже не отражает качество продукта и масштаб компании.</p><ul><li>Разбор текущего сайта</li><li>Проверка пути к обращению</li><li>Обновление структуры и подачи</li><li>Новый дизайн и мобильные макеты</li><li>Сохранение полезного контента</li></ul><div class="format-result"><span>Результат</span><strong>Новая подача вашего бизнеса</strong><small>Оценка — после анализа сайта</small></div>${choose('Редизайн сайта','Обсудить редизайн')}</article>
      <article><span class="format-number">03 / ОТ ИДЕИ ДО ЗАПУСКА</span><h3>Сайт под ключ</h3><p>Когда нужен один понятный процесс: от первых набросков до работающего сайта.</p><ul><li>Структура, контент и дизайн</li><li>Адаптивная разработка</li><li>Формы и согласованные интеграции</li><li>Техническая SEO-подготовка</li><li>Проверка и запуск на домене</li></ul><div class="format-result"><span>Результат</span><strong>Готовый сайт для вашего бизнеса</strong><small>Бюджет и этапы фиксируем в предложении</small></div>${choose('Сайт под ключ','Обсудить запуск')}</article>
    </div>
  </section>
  <section class="section design-redesign" id="design-redesign"><div class="wrap split"><div><p class="eyebrow">ПОРА ПЕРЕСМОТРЕТЬ САЙТ?</p><h2>Бизнес вырос.<br><em>А сайт — ещё нет.</em></h2><p>Редизайн начинается с разбора того, что мешает клиенту понять предложение и связаться с вами.</p>${choose('Редизайн сайта','Разобрать мой сайт')}</div><ul class="redesign-checklist"><li><span>01</span>На телефоне неудобно читать и оставлять заявку</li><li><span>02</span>Услуги изменились, а структура осталась прежней</li><li><span>03</span>Визуальный стиль не передаёт уровень компании</li><li><span>04</span>Важная информация теряется среди лишних блоков</li><li><span>05</span>Путь от первого экрана до обращения слишком сложный</li></ul></div></section>
  <section class="section wrap design-work" id="design-work">
    ${heading('02 / ПОСМОТРЕТЬ И ПОПРОБОВАТЬ','Разные задачи.<br><em>Выразительные решения.</em>','Три авторских демопроекта. Это работающие примеры интерфейсов, а не клиентские заказы или подтверждённые бизнес-результаты.')}
    ${projects()}<div class="section-end">${link('portfolio','Все демонстрации','text-link')}</div>
  </section>
  <section class="section design-benefits"><div class="wrap">
    ${heading('НА ЧЁМ СТРОИТСЯ ХОРОШИЙ ДИЗАЙН','Впечатление — с первого экрана.<br><em>Удобство — на каждом шаге.</em>')}
    <div class="design-benefit-grid">
      <article><span>01 / СМЫСЛ</span><h3>Начинаем с бизнеса</h3><p>Изучаем продукт, аудиторию и то, какие действия человек должен совершить на сайте.</p></article>
      <article><span>02 / ХАРАКТЕР</span><h3>Свой визуальный образ</h3><p>Подбираем графику, типографику и композицию под ваш бренд и содержание.</p></article>
      <article><span>03 / СЦЕНАРИИ</span><h3>Ясный путь к действию</h3><p>Продумываем навигацию, формы, подсказки и состояния элементов интерфейса.</p></article>
      <article><span>04 / АДАПТИВНОСТЬ</span><h3>Внимание к мобильному</h3><p>Проверяем, как меняются чтение, расположение элементов и взаимодействие на телефоне.</p></article>
      <article><span>05 / ПЕРЕДАЧА</span><h3>Понятные материалы</h3><p>Готовим макеты, компоненты и пояснения, с которыми удобно переходить к разработке.</p></article>
      <article><span>06 / РАЗВИТИЕ</span><h3>Система для будущего</h3><p>Собираем согласованный визуальный язык, который можно развивать вместе с бизнесом.</p></article>
    </div>
  </div></section>
  <div class="design-process" id="design-process">${process()}</div>
  <section class="section design-estimate"><div class="wrap"><p class="eyebrow">ОБСУДИМ БЮДЖЕТ ПРЕДМЕТНО</p><h2>Сколько стоит<br><em>ваша задача?</em></h2><div><p>Объём зависит от структуры, количества уникальных страниц, сложности сценариев и готовности материалов. Пришлите описание или адрес сайта — подготовим состав работ и оценку.</p>${cta('Получить оценку')}</div></div></section>
  <section class="section wrap design-delivery"><div class="split"><div><p class="eyebrow">ЧТО ОСТАНЕТСЯ У ВАС</p><h2>Всё для запуска.<br><em>И следующего шага.</em></h2><p>Передаём согласованные исходные материалы, объясняем решения и помогаем подготовиться к следующему этапу.</p></div><ul class="deliverables"><li>Визуальная концепция и адаптивные макеты</li><li>Типографика, палитра и правила применения</li><li>Компоненты и состояния интерфейса</li><li>Исходные файлы и пояснения для разработчика</li><li>Работающий сайт — при разработке под ключ</li></ul></div><div class="design-related"><article><span>ВИЗУАЛЬНАЯ СИСТЕМА</span><h3>Айдентика</h3><p>Логотип, фирменный стиль и рекомендации по применению.</p></article><article><span>ПРОДУКТОВЫЙ ПОДХОД</span><h3>UX/UI</h3><p>Прототипы и интерфейсы сайтов, магазинов и сервисов.</p></article><article><span>ЕДИНЫЙ ОБРАЗ</span><h3>Коммуникации</h3><p>Графика для соцсетей, презентаций и рекламы.</p></article></div></section>
  <section class="section wrap design-faq" id="design-faq">${heading('04 / ВОПРОСЫ ПЕРЕД СТАРТОМ','Обсудим важное<br><em>до начала работы.</em>')}<div class="faq-list">
    <details><summary>Можно заказать только дизайн?<span aria-hidden="true">+</span></summary><p>Да. Подготовим согласованные макеты и материалы для передачи вашему разработчику. Если нужна разработка, можно включить её в общий состав работ.</p></details>
    <details><summary>Что понадобится от меня?<span aria-hidden="true">+</span></summary><p>Описание бизнеса и задачи, адрес текущего сайта, если он есть, логотип и доступные материалы. На первом обсуждении уточним, чего не хватает и кто это подготовит.</p></details>
    <details><summary>Как определяются сроки и стоимость?<span aria-hidden="true">+</span></summary><p>После обсуждения структуры, функций и материалов. Объём, этапы, сроки, стоимость и порядок согласования фиксируем в предложении и договоре.</p></details>
    <details><summary>Что будет с контентом и адресами при редизайне?<span aria-hidden="true">+</span></summary><p>Сначала разбираем существующие страницы и материалы. При разработке составляем план переноса, сохранения полезного контента и обработки изменившихся адресов.</p></details>
    <details><summary>Как согласовываем правки?<span aria-hidden="true">+</span></summary><p>Последовательно: структура, визуальная концепция, макеты и разработка. Число итераций и границы работ обсуждаем до старта. Новые задачи оцениваем отдельно.</p></details>
  </div></section>`;
}
