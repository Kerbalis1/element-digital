const $ = selector => document.querySelector(selector);
const storageKey = 'element-digital:flow-crm:v1';
const columns = [...document.querySelectorAll('[data-flow-stage]')];
const stageIds = new Set(columns.map(column => column.dataset.flowStage));
const initialDeals = [
  { id: 'site', title: 'Сайт для базы отдыха', company: 'Северный берег', owner: 'Анна', amount: 95000, stage: 'new', note: 'Уточнить, как сейчас принимают бронирования.' },
  { id: 'catalog', title: 'Каталог спецтехники', company: 'Таёжный транспорт', owner: 'Илья', amount: 120000, stage: 'work', note: 'Согласовать фильтры и карточку техники.' },
  { id: 'crm', title: 'Автоматизация заявок', company: 'Маяк Сервис', owner: 'Анна', amount: 49900, stage: 'proposal', note: 'Обсудить предложение после встречи.' },
  { id: 'design', title: 'Дизайн промостраницы', company: 'Линия', owner: 'Илья', amount: 45000, stage: 'won', note: 'Макет передан заказчику.' },
];
const dialog = $('#flow-dialog');
const form = $('#flow-edit');
const fields = ['title', 'company', 'owner', 'amount', 'stage', 'note'];
const search = $('#flow-search');
const filter = $('#flow-filter');
const addButton = $('#flow-add');
const money = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
let editingId = null;
let opener = null;

function loadDeals() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(saved) && saved.every(deal =>
      deal && ['id', 'title', 'company', 'owner', 'note'].every(key => typeof deal[key] === 'string') &&
      Number.isSafeInteger(deal.amount) && deal.amount >= 0 && stageIds.has(deal.stage)
    )) return saved;
  } catch {
    // An inaccessible or invalid saved copy can be replaced by the demo examples.
  }
  return initialDeals;
}

let deals = loadDeals();

function createCard(deal) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'flow-deal';
  button.dataset.dealId = deal.id;
  const details = [
    ['strong', deal.title],
    ['span', deal.company || 'Компания не указана'],
    ['b', deal.amount ? money.format(deal.amount) : 'Сумма не указана'],
    ['span', deal.owner ? `Ответственный · ${deal.owner}` : 'Ответственный не назначен'],
  ];
  if (deal.note) details.push(['small', deal.note]);
  for (const [tag, value] of details) {
    const element = document.createElement(tag);
    element.textContent = value;
    button.append(element);
  }
  button.addEventListener('click', () => openDeal(deal, button));
  return button;
}

function render() {
  const query = search.value.trim().toLocaleLowerCase('ru-RU');
  const visible = deals.filter(deal =>
    (!filter.value || deal.stage === filter.value) &&
    [deal.title, deal.company, deal.owner, deal.note].join(' ').toLocaleLowerCase('ru-RU').includes(query)
  );
  let open = 0;
  let pipeline = 0;
  let won = 0;
  for (const deal of deals) {
    if (deal.stage === 'won') won += deal.amount;
    else {
      open += 1;
      pipeline += deal.amount;
    }
  }
  $('#flow-open').textContent = open;
  $('#flow-pipeline').textContent = money.format(pipeline);
  $('#flow-won').textContent = money.format(won);
  $('#flow-results').textContent = `Заявок на доске: ${visible.length}`;
  for (const column of columns) {
    const stage = column.dataset.flowStage;
    column.hidden = Boolean(filter.value && filter.value !== stage);
    const stageDeals = visible.filter(deal => deal.stage === stage);
    column.querySelector('h2 span').textContent = stageDeals.length;
    const cards = column.querySelector('.flow-cards');
    if (stageDeals.length) cards.replaceChildren(...stageDeals.map(createCard));
    else {
      const empty = document.createElement('p');
      empty.textContent = query ? 'Ничего не найдено' : 'Пока нет заявок';
      cards.replaceChildren(empty);
    }
  }
}

function openDeal(deal, trigger) {
  editingId = deal?.id ?? null;
  opener = trigger;
  form.reset();
  if (deal) for (const key of fields) form.elements.namedItem(key).value = deal[key];
  $('#flow-dialog-title').textContent = deal ? 'Редактировать заявку' : 'Новая заявка';
  dialog.showModal();
  form.elements.namedItem('title').focus();
}

addButton.addEventListener('click', () => openDeal(null, addButton));
$('#flow-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { (opener?.isConnected ? opener : addButton).focus(); });
search.addEventListener('input', render);
filter.addEventListener('change', render);

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const title = data.get('title').trim();
  if (!title) {
    form.elements.namedItem('title').value = '';
    form.reportValidity();
    return;
  }
  const deal = {
    id: editingId ?? crypto.randomUUID(),
    title,
    company: data.get('company').trim(),
    owner: data.get('owner').trim(),
    amount: Number(data.get('amount')),
    stage: data.get('stage'),
    note: data.get('note').trim(),
  };
  deals = editingId ? deals.map(item => item.id === editingId ? deal : item) : [deal, ...deals];
  try {
    localStorage.setItem(storageKey, JSON.stringify(deals));
  } catch {
    $('#flow-storage').textContent = 'Браузер не сохранил данные. Изменения доступны до обновления страницы.';
  }
  // Keep the saved deal visible even when its stage or searchable text changes.
  search.value = '';
  filter.value = '';
  render();
  opener = [...document.querySelectorAll('[data-deal-id]')].find(card => card.dataset.dealId === deal.id);
  dialog.close();
});

render();
