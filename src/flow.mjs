const stages = [
  ['new', 'Новые'],
  ['work', 'В работе'],
  ['proposal', 'Предложение'],
  ['won', 'Закрыты'],
];

export function renderFlow() {
  const options = stages.map(([id, label]) => `<option value="${id}">${label}</option>`).join('');
  return `<section class="wrap flow-crm" id="flow-crm" aria-labelledby="flow-title">
    <div class="flow-crm-head">
      <div><p class="eyebrow">ПОТОК / ДЕМО CRM</p><h1 id="flow-title">Сделки под контролем</h1>
      <p>Ведите заявки от первого обращения до закрытия сделки. Попробуйте на примерах или создайте свою тестовую заявку.</p></div>
      <button class="button" type="button" id="flow-add">Новая заявка <span aria-hidden="true">+</span></button>
    </div>
    <dl class="flow-metrics">
      <div><dt>Открытые заявки</dt><dd id="flow-open">—</dd></div>
      <div><dt>Сумма в работе</dt><dd id="flow-pipeline">—</dd></div>
      <div><dt>Закрыто на сумму</dt><dd id="flow-won">—</dd></div>
    </dl>
    <div class="flow-controls">
      <div><label for="flow-search">Поиск по заявкам</label><input type="search" id="flow-search" placeholder="Заявка, компания или ответственный"></div>
      <div><label for="flow-filter">Этап воронки</label><select id="flow-filter"><option value="">Все этапы</option>${options}</select></div>
    </div>
    <p class="flow-results" id="flow-results" role="status"></p>
    <div class="flow-pipeline" aria-label="Воронка продаж">
      ${stages.map(([id,label])=>`<section class="flow-stage" data-flow-stage="${id}" aria-labelledby="flow-stage-${id}"><h2 id="flow-stage-${id}">${label} <span>0</span></h2><div class="flow-cards"></div></section>`).join('')}
    </div>
    <p class="flow-storage" id="flow-storage">Изменения сохраняются в этом браузере. Используйте вымышленные данные.</p>
    <noscript><p>Для работы демо включите JavaScript.</p></noscript>
  </section>
  <dialog class="flow-dialog" id="flow-dialog" aria-labelledby="flow-dialog-title">
    <form id="flow-edit" method="dialog">
      <div class="flow-dialog-head"><h2 id="flow-dialog-title">Новая заявка</h2><button type="button" id="flow-close" aria-label="Закрыть">×</button></div>
      <div class="flow-fields">
        <div class="flow-wide"><label for="flow-name">Название заявки</label><input id="flow-name" name="title" maxlength="100" required></div>
        <div><label for="flow-company">Компания</label><input id="flow-company" name="company" maxlength="80"></div>
        <div><label for="flow-owner">Ответственный</label><input id="flow-owner" name="owner" maxlength="80"></div>
        <div><label for="flow-amount">Сумма, ₽</label><input type="number" id="flow-amount" name="amount" min="0" max="999999999" step="1" placeholder="0"></div>
        <div><label for="flow-stage">Этап</label><select id="flow-stage" name="stage">${options}</select></div>
        <div class="flow-wide"><label for="flow-note">Следующий шаг</label><textarea id="flow-note" name="note" maxlength="300" rows="3" placeholder="Например, отправить предложение в четверг"></textarea></div>
      </div>
      <button class="button" type="submit">Сохранить заявку</button>
    </form>
  </dialog>`;
}
