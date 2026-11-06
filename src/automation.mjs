const icons = {
  inbox: 'M4 5h16v14H4zM4 13h5l1 2h4l1-2h5M8 9h8',
  route: 'M5 4v16m0-11h8l5-4m-5 4 5 4m-13 3h8l5 4',
  crm: 'M4 7c0-2 4-3 8-3s8 1 8 3-4 3-8 3-8-1-8-3Zm0 0v10c0 2 4 3 8 3s8-1 8-3V7M4 12c0 2 4 3 8 3s8-1 8-3',
  notify: 'M6 16h12l-2-3V9a4 4 0 0 0-8 0v4l-2 3Zm4 3a2 2 0 0 0 4 0',
  report: 'M4 20h16M7 16v-4m5 4V8m5 8V4',
  plane: 'm3 10 18-7-5 18-4-7-9-4Zm9 4 9-11',
  chat: 'M5 5h14v11H9l-4 4v-4H3V7a2 2 0 0 1 2-2Zm3 5h1m3 0h1m3 0h1',
  check: 'M4 4h16v16H4zM8 12l3 3 5-6',
  bolt: 'm13 2-9 12h7l-1 8 10-12h-7l1-8Z',
  link: 'M10 13a3 3 0 0 0 4 0l4-4a3 3 0 0 0-4-4l-2 2m0 4a3 3 0 0 0-4 0l-4 4a3 3 0 0 0 4 4l2-2',
  sync: 'M20 8a8 8 0 0 0-14-2L4 9m0-5v5h5m-5 7a8 8 0 0 0 14 2l2-3m0 5v-5h-5',
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${icons[name]}"/></svg>`;
const flow = [
  ['inbox', 'Заявка', 'Входящее обращение'],
  ['route', 'Обработка', 'Проверка и назначение'],
  ['crm', 'CRM', 'Создание карточки'],
  ['notify', 'Уведомление', 'Следующий шаг менеджера'],
];
const solutions = [
  ['inbox', 'Сбор заявок', 'Заявки с сайта и согласованных каналов попадают в один список. У каждой видны источник и время поступления.'],
  ['crm', 'CRM и продажи', 'Создаём карточки, назначаем ответственных по правилам и напоминаем о задачах, которые ещё не закрыты.'],
  ['sync', 'Рутинные операции', 'Связываем системы, чтобы команда меньше переносила данные вручную. Например, синхронизируем статусы и отправляем напоминания.'],
  ['report', 'Отчётность', 'Собираем отчёт по заявкам, источникам и этапам сделки. Руководителю видно, где обращения застревают.'],
];
const industries = [
  {
    title: 'Продажа спецтехники',
    workflow: 'Собираем запросы по технике в CRM, распределяем их по менеджерам и напоминаем, когда нужно отправить предложение или вернуться к клиенту.',
    benefit: 'Видите, кто ведёт каждый запрос, где задержалось коммерческое предложение и какие модели чаще спрашивают.',
    metric: 'Время до отправки предложения и запросы без следующего шага.',
  },
  {
    title: 'Базы отдыха и отели',
    workflow: 'Собираем запросы с сайта и из мессенджеров, фиксируем даты и тип размещения, напоминаем администратору о неподтверждённой брони.',
    benefit: 'Видите путь гостя от первого сообщения до брони и понимаете, какие каналы приносят прямые бронирования.',
    metric: 'Время ответа гостю, доля подтверждённых и прямых броней.',
  },
  {
    title: 'Бухгалтерские компании и отделы',
    workflow: 'Ведём список ожидаемых документов, напоминаем о сроках и создаём задачу для проверки, когда документы получены.',
    benefit: 'Понимаете, у кого не хватает документов и какие задачи могут просрочиться. Команда тратит меньше времени на напоминания.',
    metric: 'Просроченные задачи и время на сбор документов.',
  },
  {
    title: 'Сервисные компании',
    workflow: 'Направляем заявки диспетчеру или мастеру, сохраняем историю обращений и напоминаем о согласованном визите.',
    benefit: 'Видите загрузку команды, обращения без ответа и заказы, по которым клиент ждёт решения.',
    metric: 'Время до назначения мастера и доля завершённых заказов.',
  },
  {
    title: 'Интернет-магазины',
    workflow: 'Передаём заказы в учётную систему и выделяем исключения, например задержку оплаты или отсутствие товара.',
    benefit: 'Видите проблемные заказы отдельно. Команда может связаться с покупателем до того, как он сам начнёт искать ответ.',
    metric: 'Время обработки заказа и число отмен.',
  },
  {
    title: 'Оптовые поставщики',
    workflow: 'Собираем запросы на цены и наличие, назначаем ответственного и напоминаем о повторном контакте после отправки предложения.',
    benefit: 'Видите, какие предложения ждут ответа, и можете разобрать причины, по которым сделки задерживаются или закрываются.',
    metric: 'Сделки без следующего шага и доля предложений, ставших заказами.',
  },
];

const prices = [
  ['Один сценарий', '29 900', 'Один источник заявок, запись в CRM и уведомление ответственному.'],
  ['Заявки и продажи', '49 900', 'Несколько источников, правила распределения, задачи и напоминания в CRM.'],
  ['Связка систем', '79 900', 'Обмен данными между системами, журнал ошибок и сводный отчёт.'],
];
const steps = [
  ['Диагностика', 'Разбираем один процесс на реальных примерах и определяем, где теряется время.'],
  ['Проектирование', 'Согласуем правила, доступы, исключения и критерии приёмки.'],
  ['Тест и запуск', 'Проверяем обычные и проблемные ситуации на тестовых данных. Запускаем согласованный объём.'],
  ['Передача', 'Передаём документацию и показываем команде, что делать при сбое. Поддержку согласуем отдельно.'],
];
const orbit = [
  [['crm', 'CRM'], ['plane', 'Telegram'], ['chat', 'Сообщения']],
  [['report', 'Аналитика'], ['check', 'Задачи'], ['link', 'Интеграции'], ['bolt', 'Автоматизация']],
];
const benefits = [
  ['inbox', 'Заявки в одном месте', 'Собираем обращения из подключённых каналов.'],
  ['crm', 'Интеграции с CRM', 'Связываем сайт, мессенджеры и CRM.'],
  ['bolt', 'Меньше ручной работы', 'Передаём повторяющиеся действия сценариям.'],
  ['report', 'Прозрачная аналитика', 'Показываем, откуда приходят заявки и сделки.'],
];

const renderOrbit = i => `<div class="auto-orbit auto-orbit-${i+1}" aria-hidden="true">${orbit[i].map(([symbol,label])=>`<div>${icon(symbol)}<span>${label}</span></div>`).join('')}</div>`;

export function renderAutomation({ cta }) {
  return `<section class="auto-hero">
    <div class="wrap auto-hero-inner">
      <p class="auto-kicker">AI / n8n / CRM</p>
      <h1>Автоматизируем <span>бизнес-процессы</span></h1>
      <p class="auto-lead">Автоматизируем заявки, работу с CRM, коммуникации и рутинные задачи, чтобы бизнес экономил время и тратил меньше ресурсов.</p>
      <div class="actions auto-actions">${cta('Обсудить автоматизацию')}<a class="button outline" href="#automation-solutions">Смотреть решения <span aria-hidden="true">↓</span></a></div>
      <div class="auto-stage">
      ${renderOrbit(0)}
      <section class="auto-workflow" data-automation-demo aria-labelledby="automation-demo-title">
        <div class="auto-window-bar">
          <span class="auto-window-brand" aria-hidden="true"><i></i> ELEMENT <b>/</b> DIGITAL</span>
          <h2 id="automation-demo-title">Обработка заявок</h2>
          <span class="auto-env">Тестовый режим</span>
        </div>
        <div class="auto-console">
        <div class="auto-console-rail" aria-hidden="true">
          ${[['inbox','Обзор'],['route','Сценарии'],['link','Интеграции'],['report','Аналитика'],['check','Задачи']].map(([symbol,label])=>`<span>${icon(symbol)}${label}</span>`).join('')}
        </div>
        <div class="auto-console-main">
        <ol class="auto-flow">
          ${flow.map(([symbol,title,description])=>`<li>${icon(symbol)}<strong>${title}</strong><span>${description}</span></li>`).join('')}
        </ol>
        <div class="auto-branches" aria-hidden="true">
          <span>${icon('check')} Назначение менеджера</span><span>${icon('notify')} Уведомление команды</span>
        </div>
        <div class="auto-demo-control" data-demo-controls hidden>
          <label for="automation-source">Источник тестовой заявки</label>
          <div><select id="automation-source"><option value="site">Форма на сайте</option><option value="telegram">Сообщение в Telegram</option></select><button type="button" class="button" data-demo-run>Запустить заявку <span aria-hidden="true">→</span></button></div>
        </div>
        <dl class="auto-demo-record" data-demo-record hidden>
          <div><dt>Тестовая карточка</dt><dd>TEST-001</dd></div>
          <div><dt>Источник</dt><dd data-record-source></dd></div>
          <div><dt>Ответственный</dt><dd>Менеджер отдела продаж</dd></div>
          <div><dt>Уведомление</dt><dd data-record-notice></dd></div>
        </dl>
        <p class="auto-demo-status" data-demo-status role="status" aria-atomic="true">Сценарий использует тестовые данные. Реальная CRM и отправка уведомлений здесь отключены.</p>
        </div></div>
      </section>
      ${renderOrbit(1)}
      </div>
      <ul class="auto-benefits" aria-label="Что получает бизнес">${benefits.map(([symbol,title,description])=>`<li>${icon(symbol)}<div><strong>${title}</strong><p>${description}</p></div></li>`).join('')}</ul>
    </div>
  </section>
  <section class="wrap auto-section" id="automation-solutions" aria-labelledby="automation-solutions-title">
    <p class="auto-section-label">01 / Решения</p><h2 id="automation-solutions-title">Наши решения для автоматизации</h2>
    <div class="auto-solutions">${solutions.map(([symbol,title,description])=>`<article>${icon(symbol)}<h3>${title}</h3><p>${description}</p></article>`).join('')}</div>
  </section>
  <section class="wrap auto-section" id="automation-industries" aria-labelledby="automation-industries-title">
    <p class="auto-section-label">02 / По отраслям</p>
    <h2 id="automation-industries-title">Что получает собственник</h2>
    <p class="auto-section-intro">Начинаем с конкретного процесса, где заявки теряются, задачи застревают или команда тратит время на ручную работу.</p>
    <div class="auto-industry-grid">
      ${industries.map(({title,workflow,benefit,metric})=>`<article>
        <h3>${title}</h3>
        <dl>
          <div><dt>Что автоматизируем</dt><dd>${workflow}</dd></div>
          <div><dt>Выгода собственнику</dt><dd>${benefit}</dd></div>
          <div><dt>Что измеряем</dt><dd>${metric}</dd></div>
        </dl>
      </article>`).join('')}
    </div>
    <div class="actions auto-industry-actions">${cta('Обсудить процесс в моём бизнесе')}</div>
  </section>
  <section class="wrap auto-section" aria-labelledby="automation-price-title">
    <p class="auto-section-label">03 / Стоимость</p><h2 id="automation-price-title">Сколько стоит внедрение</h2>
    <p class="auto-section-intro">Ориентиры для типовых задач. Состав и стоимость фиксируем после диагностики. Подписки на внешние сервисы согласуем отдельно.</p>
    <div class="auto-price">${prices.map(([title,amount,description])=>`<article><h3>${title}</h3><p class="auto-amount">от ${amount} ₽</p><p>${description}</p></article>`).join('')}</div>
  </section>
  <section class="wrap auto-section" aria-labelledby="automation-process-title">
    <p class="auto-section-label">04 / Этапы</p><h2 id="automation-process-title">Как проходит внедрение</h2>
    <ol class="auto-steps">${steps.map(([title,description],i)=>`<li><span class="auto-section-label" aria-hidden="true">0${i+1}</span><h3>${title}</h3><p>${description}</p></li>`).join('')}</ol>
  </section>
  <section class="wrap auto-section" aria-labelledby="automation-tools-title">
    <div class="auto-tools"><div><p class="auto-section-label">05 / Интеграции</p><h2 id="automation-tools-title">Связываем то, чем пользуется команда</h2></div>
    <p>Подбираем решение под ваш процесс: n8n для сценариев, API и вебхуки для обмена данными, CRM для заявок и сделок. Перед внедрением проверяем доступные интеграции и согласуем права доступа.</p></div>
  </section>`;
}
