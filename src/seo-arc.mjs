const solutions = [
 ['Стратегия и позиционирование','Уточняем, кому и какую ценность даёт компания. Фиксируем приоритеты.','compass'],
 ['Разработка цифровых продуктов','Проектируем сайты, сервисы и инструменты для клиентов и команды.','cube'],
 ['Маркетинг и привлечение клиентов','Подбираем каналы, связываем рекламу с посадочными страницами и аналитикой.','growth'],
 ['Развитие и сопровождение','После запуска отслеживаем результаты, исправляем узкие места и планируем развитие.','cycle'],
];
const icons = {
 compass:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-4-6 2-6 6-2-2 6-6 2Z',
 cube:'M12 2 22 8v9l-10 5-10-5V8L12 2Zm0 10v10M2 8l10 4 10-4',
 growth:'M2 3v19h20M6 17l6-7 4 3 6-8',
 cycle:'M21 9a9 9 0 1 0 0 7M21 3v6h-6',
};
const approach = [
 ['Бизнес-цели','Что должно измениться'],
 ['Стратегия','На чём сосредоточиться'],
 ['Дизайн','Что увидит клиент'],
 ['Технологии','Как это будет работать'],
 ['Маркетинг','Как привлечь аудиторию'],
];
const projects = [
 ['Сайт компании','Сайт для сложной услуги','Объяснить предложение и сократить путь от первого визита до заявки.'],
 ['Аналитика','Дашборд для руководителя','Собрать ключевые данные в одном экране для регулярных решений.'],
 ['Внутренний сервис','Сервис обработки заявок','Разделить задачи по этапам и дать команде общий обзор работы.'],
];
const roles = [
 ['Руководитель стратегии','Бизнес-цели и приоритеты'],
 ['Арт-директор','Визуальная система и качество'],
 ['Руководитель разработки','Архитектура и реализация'],
 ['Руководитель маркетинга','Каналы и аналитика'],
];
const process = [
 ['Погружаемся в бизнес','Разбираем задачу, ограничения и критерии успеха.'],
 ['Формируем стратегию','Фиксируем приоритеты, этапы и состав работ.'],
 ['Реализуем решения','Проектируем, проверяем и запускаем согласованное.'],
 ['Анализируем и развиваем','Смотрим на данные, уточняем и планируем следующий шаг.'],
];
const index = i => String(i + 1).padStart(2,'0');
const intro = (label, title, description = '') => `<div class="arc-intro"><div><p class="arc-label">${label}</p><h2>${title}</h2></div>${description ? `<p class="arc-aside">${description}</p>` : ''}</div>`;
const imageWindow = (src, viewBox, width, height) =>
 `<svg class="arc-photo" viewBox="${viewBox}" aria-hidden="true" focusable="false"><image href="${src}" width="${width}" height="${height}"/></svg>`;

export function renderSeoArc({ asset, cta }) {
 return `<section class="arc-hero">
  <img class="arc-hero-art" src="${asset('assets/seo-gold-king.webp')}" width="1320" height="880" alt="" fetchpriority="high">
  <div class="wrap arc-hero-inner">
   <p class="arc-label">Стратегическое сопровождение</p>
   <h1>Для тех, кто<br><span>создаёт масштаб.</span></h1>
   <p class="arc-lead">Стратегия, дизайн и цифровые решения для собственников и руководителей бизнеса. Объединяем технологии и маркетинг вокруг задач компании.</p>
   <div class="arc-actions">${cta('Обсудить стратегию')}<a class="arc-secondary" href="#approach">Наш подход <span aria-hidden="true">→</span></a></div>
   <p class="arc-hero-caption">Для собственников и руководителей</p>
  </div>
 </section>
 <section class="arc-band arc-paper" id="solutions"><div class="wrap">
  ${intro('01 / Решения для бизнеса','Одна стратегия.<br>Сильные решения.','Определяем, что важно для бизнеса, и собираем нужных специалистов вокруг общей задачи.')}
  <div class="arc-grid arc-four">${solutions.map(([title,description,icon],i)=>`<article class="arc-solution"><div class="arc-card-top"><span class="arc-label">${index(i)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[icon]}"/></svg></div><h3>${title}</h3><p>${description}</p></article>`).join('')}</div>
 </div></section>
 <section class="arc-band arc-dark" id="approach"><div class="wrap">
  ${intro('02 / Подход','Не набор услуг.<br>Система развития.','Начинаем с бизнес-цели и связываем с ней каждое решение. Данные после запуска подсказывают, что улучшать дальше.')}
  <ol class="arc-flow">${approach.map(([title,description],i)=>`<li><span class="arc-label">${index(i)}</span><h3>${title}</h3><p>${description}</p></li>`).join('')}</ol>
  <p class="arc-feedback arc-label">Данные и обратная связь</p>
 </div></section>
 <section class="arc-band arc-projects arc-paper" id="projects"><div class="wrap">
  ${intro('03 / Проекты','Решения, за которыми<br>стоит задача.','Три демонстрационные задачи с примерами цифровых решений.')}
  <div class="arc-grid arc-three">${projects.map(([label,title,description],i)=>`<article class="arc-project">${imageWindow(asset('assets/seo-projects.webp'),`${i*520} 144 520 230`,1560,520)}<div><p class="arc-label">${label}</p><h3>${title}</h3><p>${description}</p></div></article>`).join('')}</div>
 </div></section>
 <section class="arc-band arc-dark" id="team"><div class="wrap">
  ${intro('04 / Команда','Люди, которые отвечают<br>за результат.','Пример распределения ролей в проекте. Иллюстративные портреты.')}
  <div class="arc-grid arc-four">${roles.map(([title,description],i)=>`<article class="arc-role">${imageWindow(asset('assets/seo-roles.webp'),`${(i%2)*560} ${Math.floor(i/2)*560+45} 560 445`,1120,1120)}<h3>${title}</h3><p>${description}</p></article>`).join('')}</div>
 </div></section>
 <section class="arc-band arc-paper" id="process"><div class="wrap">
  ${intro('05 / Процесс','От задачи руководителя —<br>к работающему решению.')}
  <ol class="arc-grid arc-four arc-timeline">${process.map(([title,description],i)=>`<li><p class="arc-label">${index(i)}</p><h3>${title}</h3><p>${description}</p></li>`).join('')}</ol>
 </div></section>`;
}
