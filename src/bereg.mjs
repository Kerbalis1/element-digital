const cabins = [
  {
    id: 'forest', name: 'Лесной дом', guests: 2, features: 'Одна спальня · терраса',
    description: 'Камерный домик среди сосен для выходных вдвоём.',
    colors: ['#e0d2ad', '#83917a', '#4e6655'],
    art: '<path d="M94 157 176 50l82 107v16H94Z" fill="#2f3931"/><path d="m112 154 64-84 64 84v19H112Z" fill="#aa7d58"/><path d="M151 155v-34l25-32 25 32v34Z" fill="#e8b575"/><path d="M176 91v65m-25-26h50" stroke="#3c4438" stroke-width="3"/>',
  },
  {
    id: 'shore', name: 'Дом у воды', guests: 4, features: 'Две спальни · вид на воду',
    description: 'Семейный дом с панорамным окном и местом для завтрака на террасе.',
    colors: ['#d7ded5', '#8aaba9', '#546b62'],
    art: '<path d="M85 159h198v18H85Z" fill="#594735"/><path d="M104 112h153v53H104Z" fill="#977454"/><path d="m93 117 41-53 128 26 9 27Z" fill="#344943"/><path d="M128 124h104v36H128Z" fill="#e4be86"/><path d="M163 124v36m35-36v36" stroke="#4d564a" stroke-width="3"/>',
  },
  {
    id: 'group', name: 'Большой дом', guests: 6, features: 'Три спальни · общая гостиная',
    description: 'Просторный дом для компании с большим столом и отдельными спальнями.',
    colors: ['#e8c6a4', '#a39680', '#756e5b'],
    art: '<path d="M70 156h218v21H70Z" fill="#594634"/><path d="M86 103h180v66H86Z" fill="#aa7c58"/><path d="m72 109 64-54 64 54h78v13H72Z" fill="#3e4036"/><path d="M102 127h66v38h-66Zm92 5h52v30h-52Z" fill="#edc088"/><path d="M135 127v38m85-33v30" stroke="#594c3f" stroke-width="3"/>',
  },
];

function cabinArt({ id, colors: [sky, hills, ground], art }) {
  return `<svg class="bereg-cabin-art" viewBox="0 0 360 208" aria-hidden="true" focusable="false">
   <rect width="360" height="208" fill="${sky}"/>
   <circle cx="286" cy="46" r="23" fill="#faf0d1"/>
   <path d="M0 110 72 66l45 29 57-40 78 48 40-31 68 47v89H0Z" fill="${hills}"/>
   <path d="M0 141q80-23 169-6t191-14v87H0Z" fill="${ground}"/>
   ${id === 'shore' ? '<path d="M0 184q96-15 190-4t170-5v33H0Z" fill="#9bb7b3"/><path d="M19 196h82m145-4h88" stroke="#d3e0d6" stroke-width="2"/>' : ''}
   <path d="m38 78-22 49h12L13 158h50l-15-31h12Zm282 15-18 38h10l-14 27h44l-13-27h9Z" fill="#364d40"/>
   ${art}
  </svg>`;
}

export function renderBereg() {
  return `<section class="bereg-hero wrap">
   <div><p class="eyebrow">БЕРЕГ / ЗАГОРОДНЫЙ ОТДЫХ</p>
    <h1>Ближе к природе.<br><em>Ближе к себе.</em></h1>
    <p>Утро среди сосен, вечер у воды или выходные с друзьями. Подберите домик под свою поездку.</p>
    <a class="button" href="#cabins">Выбрать домик <span aria-hidden="true">↓</span></a>
   </div>
   <div id="house-demo"></div>
  </section>
  <section class="section wrap bereg-section" id="cabins" aria-labelledby="bereg-cabins-title">
   <p class="eyebrow">01 / РАЗМЕЩЕНИЕ</p>
   <h2 id="bereg-cabins-title">Выберите свой домик</h2>
   <p class="bereg-section-intro">Сравните варианты. Выбранный домик появится в форме ниже.</p>
   <div class="bereg-cabins">
    ${cabins.map(cabin => `<article class="bereg-cabin">
     ${cabinArt(cabin)}
     <div class="bereg-cabin-content">
      <p class="bereg-capacity">До ${cabin.guests} гостей</p>
      <h3>${cabin.name}</h3><p>${cabin.description}</p><p class="bereg-features">${cabin.features}</p>
      <button class="button outline" type="button" data-cabin="${cabin.id}" aria-label="Выбрать «${cabin.name}»">Выбрать домик <span aria-hidden="true">↘</span></button>
     </div>
    </article>`).join('')}
   </div>
  </section>
  <section class="section wrap bereg-section" aria-labelledby="bereg-booking-title">
   <div class="bereg-booking">
    <div>
     <p class="eyebrow">02 / БРОНИРОВАНИЕ</p>
     <h2 id="bereg-booking-title">Попробуйте запрос на бронирование</h2>
     <p>Выберите домик, даты и количество гостей. Форма покажет, как будет выглядеть запрос.</p>
     <p class="bereg-demo-note">Демонстрация. Доступность дат не проверяется, запрос никуда не отправляется.</p>
    </div>
    <form id="bereg-booking-form">
     <div class="bereg-field"><label for="cabin">Домик</label><select id="cabin" required>
      <option value="" selected disabled>Выберите домик</option>
      ${cabins.map(cabin => `<option value="${cabin.id}" data-guests="${cabin.guests}">${cabin.name}</option>`).join('')}
     </select></div>
     <div class="bereg-dates">
      <div class="bereg-field"><label for="arrival">Заезд</label><input type="date" id="arrival" required></div>
      <div class="bereg-field"><label for="departure">Выезд</label><input type="date" id="departure" required></div>
     </div>
     <div class="bereg-field"><label for="bereg-guests">Гости</label><input type="number" id="bereg-guests" min="1" max="6" value="2" required></div>
     <button class="button" type="submit">Сформировать запрос <span aria-hidden="true">↗</span></button>
     <p id="booking-status" role="status" aria-live="polite"></p>
    </form>
   </div>
  </section>`;
}
