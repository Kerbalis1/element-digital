const categories = [
  ['all', 'Вся коллекция'],
  ['cups', 'Чашки'],
  ['vases', 'Вазы'],
  ['vessels', 'Кувшины и сосуды'],
  ['plates', 'Тарелки и чаши'],
  ['decor', 'Декор'],
];

const products = [
  ['cup', 'sand', 'cups', 'Чашка «Утро»', 1800, 'Тёплый песочный оттенок и округлая ручка. 280 мл.'],
  ['pitcher', 'olive', 'vessels', 'Кувшин «Травы»', 3900, 'Оливковая глазурь, широкий носик и удобная ручка. 900 мл.'],
  ['vase', 'sand', 'vases', 'Ваза «Линия»', 3200, 'Матовая поверхность и плавный силуэт. Высота 23 см.'],
  ['jar', 'clay', 'vessels', 'Сосуд «Терра»', 3600, 'Округлый сосуд с крышкой для чая или специй. 650 мл.'],
  ['plate', 'sand', 'plates', 'Тарелка «Круг»', 2400, 'Широкий край и спокойный песочный тон. Диаметр 24 см.'],
  ['bowl', 'olive', 'plates', 'Чаша «Лист»', 2600, 'Глубокая чаша для завтраков и подачи. Диаметр 17 см.'],
  ['bud', 'milk', 'vases', 'Ваза «Тишина»', 2900, 'Узкое горлышко для одной ветки или сухоцветов. Высота 19 см.'],
  ['candle', 'clay', 'decor', 'Подсвечник «Искра»', 1900, 'Рельефное основание для тонкой столовой свечи. Высота 10 см.'],
  ['pendant', 'milk', 'decor', 'Подвеска «Луна»', 1200, 'Керамический полумесяц на льняном шнуре. Высота 8 см.'],
];

export function renderForma() {
  return `<section class="forma-intro wrap">
    <p class="eyebrow">ФОРМА / КЕРАМИКА ДЛЯ ДОМА</p>
    <h1>Простые вещи.<br><em>Особое чувство.</em></h1>
    <p>Посуда, сосуды и небольшие детали для дома в оттенках песка, глины и оливы.</p>
    <a class="button" href="#forma-catalog">Смотреть коллекцию <span aria-hidden="true">↓</span></a>
  </section>
  <section class="section wrap forma-catalog" id="forma-catalog" aria-labelledby="forma-catalog-title">
    <div class="forma-catalog-head">
      <div><p class="eyebrow">КОЛЛЕКЦИЯ / ТИХИЕ ОТТЕНКИ</p><h2 id="forma-catalog-title">Керамика на каждый день</h2></div>
      <a class="text-link" href="#forma-cart">К корзине ↓</a>
    </div>
    <div class="catalog-tools" role="group" aria-label="Категория товаров">
      ${categories.map(([id,label]) => `<button type="button" data-filter="${id}" aria-pressed="${id === 'all'}">${label}</button>`).join('')}
    </div>
    <div class="product-grid">
      ${products.map(([shape, tone, category, name, price, description]) => `<article data-category="${category}">
        <div class="ceramic-scene forma-tone-${tone}" aria-hidden="true"><div class="ceramic ceramic-${shape}"></div></div>
        <div class="forma-product-info">
          <h3>${name}</h3><p>${description}</p>
          <div class="forma-product-bottom">
            <div><strong>${price.toLocaleString('ru-RU')} ₽</strong><small>Демо-цена</small></div>
            <button class="button" type="button" data-add="${name}" data-price="${price}" aria-label="В корзину: ${name}">В корзину <span aria-hidden="true">+</span></button>
          </div>
        </div>
      </article>`).join('')}
    </div>
    <aside class="cart" id="forma-cart" aria-labelledby="forma-cart-title">
      <h2 id="forma-cart-title">Ваша корзина</h2>
      <ul id="cart-items"><li>Корзина пока пуста</li></ul>
      <p id="cart-total" role="status" aria-live="polite">Итого: 0 ₽</p>
      <button class="button" id="demo-checkout" type="button" disabled>Проверить оформление</button>
      <p id="checkout-status" role="status"></p>
    </aside>
  </section>`;
}
