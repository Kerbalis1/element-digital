const icons = {
  inbox: 'M4 5h16v14H4zM4 13h5l1 2h4l1-2h5M8 9h8',
  route: 'M5 4v16m0-11h8l5-4m-5 4 5 4m-13 3h8l5 4',
  crm: 'M4 7c0-2 4-3 8-3s8 1 8 3-4 3-8 3-8-1-8-3Zm0 0v10c0 2 4 3 8 3s8-1 8-3V7M4 12c0 2 4 3 8 3s8-1 8-3',
  notify: 'M6 16h12l-2-3V9a4 4 0 0 0-8 0v4l-2 3Zm4 3a2 2 0 0 0 4 0',
  report: 'M4 20h16M7 16v-4m5 4V8m5 8V4',
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
const waves = `<svg class="auto-waves" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
  <defs><linearGradient id="auto-wave"><stop stop-color="#39dfff"/><stop offset=".48" stop-color="#725cff"/><stop offset="1" stop-color="#ed64ff"/></linearGradient></defs>
  <g fill="none" stroke="url(#auto-wave)">${Array.from({length:16},(_,i)=>`<path opacity="${0.16+i*.014}" d="M-80 ${-130+i*22} C${250+i*11} ${48+i*7} ${74+i*10} 315 ${-25+i*17} 470 S${66+i*19} ${810+i*6} ${330+i*22} 810 S${1150+i*12} ${550+i*9} 1500 ${740+i*8}"/>`).join('')}</g>
</svg>`;

export function renderAutomation({ cta }) {
  return `<section class="auto-hero">
    ${waves}
    <div class="wrap auto-hero-inner">
      <p class="auto-kicker">Element Digital / Business Automation</p>
      <h1>Автоматизируем <span>бизнес-процессы</span></h1>
      <p class="auto-lead">Автоматизируем рутинные процессы, чтобы ваш бизнес работал быстрее и тратил меньше ресурсов. Заявки, CRM и уведомления работают по понятным правилам.</p>
      <div class="actions auto-actions">${cta('Обсудить автоматизацию')}<a class="button outline" href="#automation-solutions">Смотреть решения <span aria-hidden="true">↓</span></a></div>
      <section class="auto-workflow" data-automation-demo aria-labelledby="automation-demo-title">
        <div class="auto-window-bar">
          <div><p class="auto-window-label"><span aria-hidden="true"></span> Интерактивная демонстрация</p><h2 id="automation-demo-title">Что происходит после заявки</h2></div>
          <span class="auto-env">Тестовый режим</span>
        </div>
        <ol class="auto-flow">
          ${flow.map(([symbol,title,description])=>`<li>${icon(symbol)}<strong>${title}</strong><span>${description}</span></li>`).join('')}
        </ol>
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
      </section>
    </div>
  </section>
  <section class="wrap auto-section" id="automation-solutions" aria-labelledby="automation-solutions-title">
    <p class="auto-section-label">01 / Решения</p><h2 id="automation-solutions-title">Где автоматизация снимает ручную работу</h2>
    <div class="auto-solutions">${solutions.map(([symbol,title,description])=>`<article>${icon(symbol)}<h3>${title}</h3><p>${description}</p></article>`).join('')}</div>
  </section>
  <section class="wrap auto-section" aria-labelledby="automation-price-title">
    <p class="auto-section-label">02 / Стоимость</p><h2 id="automation-price-title">Сколько стоит внедрение</h2>
    <p class="auto-section-intro">Ориентиры для типовых задач. Состав и стоимость фиксируем после диагностики. Подписки на внешние сервисы согласуем отдельно.</p>
    <div class="auto-price">${prices.map(([title,amount,description])=>`<article><h3>${title}</h3><p class="auto-amount">от ${amount} ₽</p><p>${description}</p></article>`).join('')}</div>
  </section>
  <section class="wrap auto-section" aria-labelledby="automation-process-title">
    <p class="auto-section-label">03 / Этапы</p><h2 id="automation-process-title">Как проходит внедрение</h2>
    <ol class="auto-steps">${steps.map(([title,description],i)=>`<li><span class="auto-section-label" aria-hidden="true">0${i+1}</span><h3>${title}</h3><p>${description}</p></li>`).join('')}</ol>
  </section>
  <section class="wrap auto-section" aria-labelledby="automation-tools-title">
    <div class="auto-tools"><div><p class="auto-section-label">04 / Интеграции</p><h2 id="automation-tools-title">Связываем то, чем пользуется команда</h2></div>
    <p>Подбираем решение под ваш процесс: n8n для сценариев, API и вебхуки для обмена данными, CRM для заявок и сделок. Перед внедрением проверяем доступные интеграции и согласуем права доступа.</p></div>
  </section>`;
}
