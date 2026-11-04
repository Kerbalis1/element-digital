const $ = s => document.querySelector(s);
const config = JSON.parse($('#site-config').textContent);
const menu = $('#mobile-nav'), toggle = $('.menu-toggle');
function closeMenu(focus=false){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть меню');if(focus)toggle.focus();}
toggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden)closeMenu(true);});
document.addEventListener('click',e=>{if(!menu.hidden&&!e.target.closest('.header'))closeMenu();});
menu.addEventListener('focusout',()=>{queueMicrotask(()=>{if(!menu.hidden&&!$('.header').contains(document.activeElement))closeMenu();});});
matchMedia('(min-width: 901px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const motion=$('#motion-toggle'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
function setMotion(off){document.documentElement.dataset.motion=off?'off':'on';if(motion){motion.setAttribute('aria-pressed',String(off));motion.textContent=off?'Включить облака':'Остановить облака';}}
setMotion(reduced.matches);reduced.addEventListener('change',e=>setMotion(e.matches));
motion?.addEventListener('click',()=>setMotion(document.documentElement.dataset.motion!=='off'));
document.addEventListener('visibilitychange',()=>{document.querySelectorAll('.cloud').forEach(el=>el.style.animationPlayState=document.hidden?'paused':'');});
// Never include contact data or free text in analytics events.
function track(event){if(window.ym&&config.analyticsId)window.ym(config.analyticsId,'reachGoal',event);}
const form=$('#brief-form');
if(form){
 form.addEventListener('input',()=>track('brief_started'),{once:true});
 const submit=form.querySelector('[type=submit]'),status=$('#form-status');let submitting=false;
 const setStatus=(text,state='')=>{status.textContent=text;status.dataset.state=state;};
 function prepare(fields){
  const text=`Здравствуйте! Хочу обсудить проект с Element Digital.\n\nИмя: ${fields.name}\nКонтакт: ${fields.contact}\n\nЗадача:\n${fields.description}`;
  $('#prepared-text').value=text;
  const target=new URL(config.telegram);target.searchParams.set('text',text);$('#telegram-brief').href=target.href;
  $('#prepared').hidden=false;setStatus('Сообщение подготовлено. Откройте Telegram и отправьте его в чате.','prepared');track('brief_prepared');
 }
 form.addEventListener('input',()=>{if(!submitting){setStatus('');$('#prepared').hidden=true;}});
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(submitting||!form.reportValidity())return;
  const values=new FormData(form);const data=Object.fromEntries(['name','contact','description','website'].map(key=>[key,String(values.get(key)||'').trim()]));
  if(!data.name||!data.contact||!data.description){setStatus('Заполните поля текстом: пробелов недостаточно.','error');return;}
  const projectType=values.get('projectType');
  if(projectType){const prefix='Формат: '+String(projectType)+'\n\n';if(data.description.length+prefix.length>3000){setStatus('Сократите описание: с выбранным форматом допустимо до 3000 символов.','error');return;}data.description=prefix+data.description;}
  data.consent=values.get('consent')==='on';
  if(data.website){setStatus('Не удалось подготовить обращение.','error');return;}
  if(!config.leadsEndpoint){prepare(data);return;}
  submitting=true;submit.disabled=true;form.setAttribute('aria-busy','true');const idle=submit.innerHTML;submit.textContent='Отправляем…';setStatus('Отправляем вашу заявку…');$('#prepared').hidden=true;
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),16000);
  try{
   const response=await fetch(config.leadsEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:controller.signal});
   const result=await response.json();
   if(response.ok&&result.ok===true){form.reset();setStatus('Спасибо! Заявка отправлена. Ответим по указанному контакту.','success');track('brief_sent');return;}
   if(response.status===503){prepare(data);setStatus('Прямая отправка сейчас недоступна. Мы подготовили сообщение для Telegram — отправьте его самостоятельно.','error');return;}
   if(response.status===429){setStatus('Подождите минуту перед повторной отправкой. Введённый текст сохранён.','error');return;}
   if(response.status===422){setStatus('Проверьте поля: имя до 100, контакт до 200, описание до 3000 символов.','error');return;}
   setStatus(result.error==='delivery_unknown'?'Доставку не удалось подтвердить. Заявка могла дойти. Текст сохранён — не спешите отправлять повторно.':'Не удалось отправить заявку. Текст сохранён. Попробуйте позже или напишите в Telegram.','error');
  }catch{setStatus('Доставку не удалось подтвердить. Заявка могла дойти. Текст сохранён — не спешите отправлять повторно.','error');}
  finally{clearTimeout(timer);submitting=false;submit.disabled=false;submit.innerHTML=idle;form.removeAttribute('aria-busy');}
 });
 $('#copy-brief').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#prepared-text').value);setStatus('Текст скопирован. Отправьте его в чате студии.');}catch{$('#prepared-text').focus();$('#prepared-text').select();setStatus('Выделили текст — скопируйте его вручную.');}});
}
const bubble=$('[data-bubble-state]');let bubbleVersion=0,bubbleTimer;
async function setBubble(action){
 if(!bubble)return;const version=++bubbleVersion;clearTimeout(bubbleTimer);
 const after=bubble.querySelector('.bubble-after img');
 try{await after.decode();}catch{return;}
 if(version!==bubbleVersion)return;
 const finish=()=>{if(version!==bubbleVersion)return;bubble.dataset.bubbleState=action==='inflate'?'idle':'popped';$('#bubble-status').textContent=action==='inflate'?'Пузырь надут.':'Хлоп! Пузырь лопнул.';};
 if(reduced.matches){finish();return;}
 bubble.dataset.bubbleState='ready';
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
  if(version!==bubbleVersion)return;
  bubble.dataset.bubbleState=action==='inflate'?'inflating':'popping';
  $('#bubble-status').textContent=action==='inflate'?'Пузырь надувается.':'Хлоп! Пузырь лопнул.';
  bubbleTimer=setTimeout(finish,action==='inflate'?950:700);
 }));
}
document.querySelectorAll('button[data-palette]').forEach(b=>b.addEventListener('click',()=>{document.body.dataset.designPalette=b.dataset.palette;document.querySelectorAll('button[data-palette]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));setBubble(b.dataset.palette==='rose'?'inflate':'pop');}));
document.querySelectorAll('[data-comparison-view]').forEach(button=>button.addEventListener('click',()=>{
 const comparison=$('.design-comparison');if(!comparison)return;
 comparison.dataset.view=button.dataset.comparisonView;
 document.querySelectorAll('[data-comparison-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
}));
const viewer=$('#design-viewer');
if(viewer){
 document.querySelectorAll('[data-design-preview]').forEach(button=>button.addEventListener('click',()=>{
  const source=button.querySelector('img')||button.closest('article').querySelector('.design-comparison img');const image=$('#viewer-image');image.src=source.src;image.alt=source.alt;
  $('#viewer-title').textContent=button.closest('article').querySelector('h3').textContent;
  viewer.showModal();
 }));
 viewer.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());
 viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
}
const seoContent={technical:['ТЕХНИЧЕСКАЯ ОСНОВА','Сайт, доступный поиску.',['Индексация и канонические URL','Скорость и мобильная версия','Структура и внутренние ссылки']],content:['СЕМАНТИКА И СОДЕРЖАНИЕ','Ответы на реальный спрос.',['Карта поисковых запросов','Посадочные страницы по темам','Полезные тексты и метаданные']],measure:['ИЗМЕРЕНИЕ И РАЗВИТИЕ','От наблюдений к решениям.',['Видимость и переходы из поиска','Обращения и целевые действия','Отчёт и следующий план работ']]};
document.querySelectorAll('[data-seo-tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-seo-tab]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const [label,title,items]=seoContent[b.dataset.seoTab];const panel=$('#seo-panel');panel.replaceChildren();const p=document.createElement('p');p.className='console-label';p.textContent=label;const h=document.createElement('h3');h.textContent=title;const ul=document.createElement('ul');ul.className='console-checks';for(const item of items){const li=document.createElement('li');li.textContent=item;const span=document.createElement('span');span.textContent='↗';li.append(span);ul.append(li);}panel.append(p,h,ul);}));
if($('#house-demo')){import('./house.js').then(({renderHouse,initHouses})=>{$('#house-demo').innerHTML=renderHouse('demo-house');initHouses();}).catch(()=>{$('#house-demo').textContent='Иллюстрация временно недоступна. Вы можете выбрать домик ниже.';});}
if($('#booking-demo')){
 const arrival=$('#arrival'),departure=$('#departure');const today=new Date();const date=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;arrival.min=date;
 arrival.addEventListener('input',()=>{if(arrival.value){const d=new Date(arrival.value+'T12:00:00');d.setDate(d.getDate()+1);departure.min=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}});
 document.querySelectorAll('[data-cabin]').forEach(b=>b.addEventListener('click',()=>{$('#cabin').value=b.dataset.cabin;arrival.focus();$('#booking-demo').scrollIntoView({block:'center'});}));
 $('#booking-demo').addEventListener('submit',e=>{e.preventDefault();const valid=arrival.value>=date&&departure.value>arrival.value;$('#booking-status').textContent=valid?`Демо: выбран ${$('#cabin').value}, ${arrival.value} — ${departure.value}. Сценарий завершён. Реальная бронь не создана.`:'Выберите заезд не раньше сегодняшней даты и выезд позже заезда.';});
}
if($('#cart-items')){
 const cart=new Map();
 const money=n=>n.toLocaleString('ru-RU')+' ₽';
 function renderCart(){const list=$('#cart-items');list.replaceChildren();let total=0;for(const [name,{price,count}]of cart){const li=document.createElement('li'),text=document.createElement('span'),button=document.createElement('button');text.textContent=`${name} × ${count} — ${money(price*count)}`;button.type='button';button.textContent='Убрать';button.dataset.remove=name;button.setAttribute('aria-label','Убрать '+name);li.append(text,button);list.append(li);total+=price*count;}if(!cart.size){const li=document.createElement('li');li.textContent='Корзина пока пуста';list.append(li);}$('#cart-total').textContent='Итого: '+money(total);$('#demo-checkout').disabled=!cart.size;$('#checkout-status').textContent='';}
 document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>{const item=cart.get(b.dataset.add)||{price:Number(b.dataset.price),count:0};item.count++;cart.set(b.dataset.add,item);renderCart();}));
 $('#cart-items').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){const item=cart.get(b.dataset.remove);item.count--;if(!item.count)cart.delete(b.dataset.remove);renderCart();}});
 $('#demo-checkout').addEventListener('click',()=>{$('#checkout-status').textContent='Демо: корзина готова к оформлению. Реальный заказ не создан, оплата не производится.';});
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('[data-category]').forEach(x=>x.hidden=b.dataset.filter!=='all'&&x.dataset.category!==b.dataset.filter);}));
}
if($('#flow-board')){
 const tasks=[{id:1,title:'Подготовить структуру сайта',status:0},{id:2,title:'Согласовать визуальную концепцию',status:1},{id:3,title:'Собрать материалы проекта',status:2}];let nextId=4;
 const labels=['Новые','В работе','Готово'];
 function renderBoard(){const board=$('#flow-board');board.replaceChildren();const search=$('#task-search').value.toLocaleLowerCase('ru-RU');let visible=0;
  labels.forEach((label,index)=>{const col=document.createElement('section');col.className='flow-column';const h=document.createElement('h2');h.textContent=label;col.append(h);const filtered=tasks.filter(t=>t.status===index&&t.title.toLocaleLowerCase('ru-RU').includes(search));visible+=filtered.length;
   filtered.forEach(t=>{const card=document.createElement('article');card.className='flow-card';const title=document.createElement('h3');title.textContent=t.title;const select=document.createElement('select');select.setAttribute('aria-label','Статус задачи '+t.title);labels.forEach((text,i)=>{const option=document.createElement('option');option.value=i;option.textContent=text;option.selected=i===t.status;select.append(option);});select.addEventListener('change',()=>{t.status=Number(select.value);renderBoard();const updated=board.querySelector(`[data-task-id="${t.id}"] select`);updated?.focus();});card.dataset.taskId=t.id;card.append(title,select);col.append(card);});
   if(!filtered.length){const p=document.createElement('p');p.className='flow-empty';p.textContent='Задач пока нет';col.append(p);}board.append(col);});$('#flow-status').textContent='Показано задач: '+visible;
 }
 $('#flow-form').addEventListener('submit',e=>{e.preventDefault();const title=$('#task-title').value.trim();if(!title)return;if(tasks.length>=50){$('#flow-status').textContent='В демо можно создать до 50 задач. Обновите страницу для сброса.';return;}tasks.push({id:nextId++,title,status:0});$('#task-title').value='';renderBoard();});$('#task-search').addEventListener('input',renderBoard);renderBoard();
}
// Optional analytics is opt-in and never receives form text.
if(config.analyticsId){
 let loaded=false;
 const readConsent=()=>{try{return localStorage.getItem('element-analytics');}catch{return null;}};
 function loadAnalytics(){if(loaded)return;loaded=true;const queue=window.ym=function(){queue.a.push(arguments);};queue.a=[];queue.l=Date.now();const script=document.createElement('script');script.src='https://mc.yandex.ru/metrika/tag.js';script.async=true;document.head.append(script);window.ym(config.analyticsId,'init',{clickmap:false,trackLinks:false,accurateTrackBounce:true,webvisor:false});}
 function choose(value){try{localStorage.setItem('element-analytics',value);}catch{}if(value==='yes')loadAnalytics();else if(loaded){window.ym?.(config.analyticsId,'destruct');loaded=false;location.reload();}$('.analytics-banner')?.remove();}
 function showSettings(){if($('.analytics-banner'))return;const box=document.createElement('aside');box.className='analytics-banner';box.setAttribute('aria-label','Настройки аналитики');const p=document.createElement('p');p.textContent='Разрешить необязательную аналитику посещений? Она помогает улучшать сайт. Тексты обращений не передаются.';const actions=document.createElement('div');actions.className='actions';for(const [label,value]of [['Разрешить','yes'],['Отказаться','no']]){const button=document.createElement('button');button.type='button';button.textContent=label;button.addEventListener('click',()=>choose(value));actions.append(button);}box.append(p,actions);document.body.append(box);}
 document.querySelectorAll('[data-analytics-settings]').forEach(b=>{b.hidden=false;b.addEventListener('click',showSettings);});if(readConsent()==='yes')loadAnalytics();else if(readConsent()===null)showSettings();
}

// Carry the chosen design service into the brief without replacing typed text.
document.querySelectorAll('[data-design-service]').forEach(link=>link.addEventListener('click',()=>{
 const choice=[...document.querySelectorAll('input[name="projectType"]')].find(input=>input.value===link.dataset.designService);
 if(choice)choice.checked=true;
}));

document.addEventListener('click',event=>{if(event.target.closest('a[href^="https://t.me/"]'))track('telegram_click');});
