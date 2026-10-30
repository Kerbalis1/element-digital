import { site } from './config.js';
import { initMotion } from './motion.js';
import { renderHouse, initHouses } from './house.js';
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const telegram = /^https:\/\/t\.me\/[A-Za-z0-9_]+\/?$/.test(site.telegram) ? site.telegram : '';
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email) ? site.email : '';
const locationText = [site.city, site.geography].filter(Boolean).join(' ↗ ');
document.querySelectorAll('.location').forEach(el => el.textContent = locationText);
document.querySelectorAll('[data-brand]').forEach(el => el.textContent = site.name);
document.querySelectorAll('.brand>span:last-child').forEach(el => {el.textContent='';site.name.split(' ').forEach((word,i) => {if(i)el.append(document.createElement('br'));el.append(document.createTextNode(word));});});
document.querySelectorAll('[data-hero]').forEach(el => el.textContent = site.hero[el.dataset.hero]);
$('#year').textContent = new Date().getFullYear();
$('#service-list').innerHTML = site.services.map((s,i) => `<details class="service" id="service-${esc(s.id)}"><summary><span class="service-number">${String(i+1).padStart(2,'0')}</span><span class="service-heading"><span class="service-title">${esc(s.title)}</span><span class="service-promise">${esc(s.short)}</span></span><span class="service-short">${s.audience?'<span class="service-audience-label">Кому подходит</span>':''}${s.audienceTags?.length?`<span class="service-audiences">${s.audienceTags.map(label=>`<span class="service-audience-tag">${esc(label)}</span>`).join('')}</span>`:esc(s.audience||s.short)}</span><span class="plus" aria-hidden="true">+</span></summary><dl class="service-details"><div><dt>Кому подходит</dt><dd>${esc(s.for)}</dd></div><div><dt>Что входит</dt><dd>${esc(s.includes)}</dd></div><div><dt>Что получаете</dt><dd>${esc(s.result)}</dd></div>${s.price||s.timeline?`<div class="service-meta">${s.price?`Стоимость: ${esc(s.price)}. `:''}${s.timeline?`Срок: ${esc(s.timeline)}`:''}</div>`:''}</dl></details>`).join('');
$('#service-avatars').innerHTML = site.services.map((s,i)=>`<button type="button" class="avatar-service" data-service="${esc(s.id)}" aria-controls="service-${esc(s.id)}" aria-pressed="false"><span class="avatar-pedestal" aria-hidden="true"><span class="avatar-float${s.avatarAtlas ? ' avatar-sprite' : ''}" style="--avatar-delay:${i*-.7}s;--icon-column:${Math.max(0,Math.min(2,Number(s.avatarColumn)||0))};--icon-row:${Math.max(0,Math.min(1,Number(s.avatarRow)||0))}"><img src="${esc(s.avatar || 'assets/avatars/nodes.svg')}" width="${s.avatarAtlas ? 1536 : 300}" height="${s.avatarAtlas ? 1024 : 300}" alt="" loading="lazy" decoding="async"></span><span class="avatar-orbit"></span></span><span class="avatar-service-name">${esc(s.title)}</span><span class="avatar-service-action" aria-hidden="true">Подробнее <span>↗</span></span></button>`).join('');
$('#service-avatars').addEventListener('click',e=>{const button=e.target.closest('[data-service]');if(!button)return;const detail=document.getElementById('service-'+button.dataset.service);if(!detail)return;detail.open=true;const summary=detail.querySelector('summary');summary.focus({preventScroll:true});detail.scrollIntoView({behavior:document.documentElement.dataset.motion==='off'?'auto':'smooth',block:'start'});});
document.querySelectorAll('.service').forEach(detail=>detail.addEventListener('toggle',()=>{const button=document.querySelector(`[data-service="${detail.id.replace('service-','')}"]`);if(button)button.setAttribute('aria-pressed',String(detail.open));}));
$('#project-list').innerHTML = site.projects.map(p => p.id === 'bereg' ? `<article class="project" data-house-project><div class="project-button" data-project="${esc(p.id)}"><div class="project-image-wrap">${renderHouse('project-image')}<button type="button" class="view-project" data-project="${esc(p.id)}" aria-label="Подробнее о демонстрационном проекте ${esc(p.title)}">Смотреть концепцию <span aria-hidden="true">↗</span></button></div><span class="project-info"><span><span class="project-title" style="display:block">${esc(p.title)}</span><span class="project-type">${esc(p.type)}</span></span><span class="demo-label">Демонстрационный проект</span></span></div></article>` : `<article class="project"><button type="button" class="project-button" data-project="${esc(p.id)}" aria-label="Подробнее о демонстрационном проекте ${esc(p.title)}"><span class="project-image-wrap"><img class="project-image" src="${esc(p.image)}" alt="Авторская концепция: ${esc(p.type)} ${esc(p.title)}" width="${Number(p.imageWidth)||1200}" height="${Number(p.imageHeight)||720}" loading="lazy" decoding="async"><span class="view-project">Смотреть концепцию <span aria-hidden="true">↗</span></span></span><span class="project-info"><span><span class="project-title" style="display:block">${esc(p.title)}</span><span class="project-type">${esc(p.type)}</span></span><span class="demo-label">Демонстрационный проект</span></span></button></article>`).join('');
$('#steps').innerHTML = site.steps.map((s,i)=>`<li><span class="step-number">${String(i+1).padStart(2,'0')}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p><div class="step-result"><b>РЕЗУЛЬТАТ</b>${esc(s[2])}</div></li>`).join('');
$('#faq-list').innerHTML = site.faq.map(f=>`<details class="faq-item"><summary>${esc(f[0])}<span class="plus" aria-hidden="true">+</span></summary><p>${esc(f[1])}</p></details>`).join('');
$('#contact-links').className='contact-links';
$('#contact-links').innerHTML = `${telegram?`<a class="text-link" href="${esc(telegram)}" target="_blank" rel="noopener noreferrer">Написать в Telegram <span aria-hidden="true">↗</span></a>`:`<button class="text-link" id="telegram-pending" type="button">Обсудить в Telegram <span aria-hidden="true">↗</span></button>`}${email?`<a class="text-link" href="mailto:${esc(email)}">${esc(email)} ↗</a>`:''}${!telegram&&!email?'<p class="unconfigured-contact" id="contact-note">Контакты студии пока не добавлены. Подготовьте обращение в форме и сохраните его текст.</p>':''}`;
$('#telegram-pending')?.addEventListener('click',()=>{const note=$('#contact-note');if(note)note.textContent='Telegram студии ещё не указан. Заполните форму — вы сможете скопировать или скачать обращение.';$('#name').focus();});
const toggle=$('.menu-toggle'), mobile=$('#mobile-nav');
function closeMenu(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть меню');mobile.hidden=true;}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');mobile.hidden=!open;});
mobile.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobile.hidden){closeMenu();toggle.focus();}});
document.addEventListener('click',e=>{if(!mobile.hidden&&!e.target.closest('.header'))closeMenu();});
matchMedia('(min-width: 761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
function showDialog(id){$(id).showModal();document.body.classList.add('modal-open');}
document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('close',()=>document.body.classList.remove('modal-open'));d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));
$('#project-list').addEventListener('click',e=>{const b=e.target.closest('[data-project]');if(!b)return;const p=site.projects.find(x=>x.id===b.dataset.project);$('#project-dialog-content').innerHTML=`<span class="dialog-label">Демонстрационный проект</span><h2 id="project-dialog-title">${esc(p.title)}</h2><p class="dialog-type">${esc(p.type)}</p>${p.id === 'bereg' ? renderHouse('dialog-image') : `<img class="dialog-image" src="${esc(p.image)}" alt="${esc(p.title)}: демонстрация интерфейса" width="${Number(p.imageWidth)||1200}" height="${Number(p.imageHeight)||720}">`}<p class="dialog-copy">${esc(p.description)}</p><div class="dialog-details"><div><h3>Задача</h3><p>${esc(p.task)}</p></div><div><h3>Решение</h3><p>${esc(p.solution)}</p></div></div><div class="dialog-tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><p class="dialog-scope">${esc(p.scope)} Это концепция, а не выполненный клиентский заказ.</p><a href="#contact" class="text-link dialog-cta">Обсудить похожую задачу ↗</a>`;$('.dialog-cta').addEventListener('click',()=>$('#project-dialog').close());initHouses($('#project-dialog'));showDialog('#project-dialog');});
const briefForm=$('#brief-form'), submitBrief=briefForm.querySelector('[type="submit"]');
const formStatus=$('#form-status');
function setFormStatus(message,state='') {formStatus.textContent=message;formStatus.dataset.state=state;}
let submitting=false;
briefForm.addEventListener('input',()=>{if(!submitting)setFormStatus('');});
briefForm.addEventListener('submit',async e=>{
  e.preventDefault();if(submitting||!briefForm.reportValidity())return;
  const fields=new FormData(briefForm);
  const name=String(fields.get('name')).trim(),contact=String(fields.get('contact')).trim(),description=String(fields.get('description')).trim();
  if(!name||!contact||!description){setFormStatus('Заполните поля текстом: пробелов недостаточно.','error');return;}
  setFormStatus('');
  submitting=true;submitBrief.disabled=true;briefForm.setAttribute('aria-busy','true');
  const idle=submitBrief.innerHTML;submitBrief.textContent='Отправляем…';setFormStatus('Отправляем вашу заявку…','pending');
  try {
    const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,contact,description,website:String(fields.get('website')||'')}),signal:AbortSignal.timeout(16000)});
    const result=await response.json();
    if(response.ok&&result.ok===true){setFormStatus('Спасибо! Заявка отправлена. Свяжемся по указанному контакту, чтобы обсудить детали.','success');briefForm.reset();return;}
    if(response.status===429){setFormStatus('Пожалуйста, подождите минуту перед повторной отправкой. Введённый текст сохранён.','error');return;}
    if(response.status===422){setFormStatus('Проверьте поля: имя до 100, контакт до 200, описание до 3000 символов. Текст сохранён.','error');return;}
    const messages={
      unavailable:'Отправка временно недоступна. Введённый текст сохранён — попробуйте позже.',
      delivery:'Не удалось отправить заявку. Введённый текст сохранён — попробуйте позже.',
      delivery_unknown:'Не удалось подтвердить доставку. Заявка могла дойти. Текст сохранён — не спешите отправлять повторно.'
    };
    setFormStatus(messages[result.error]||messages.delivery,'error');
  } catch {
    setFormStatus('Не удалось подтвердить доставку. Заявка могла дойти. Введённый текст сохранён.','error');
  } finally {submitting=false;submitBrief.disabled=false;submitBrief.innerHTML=idle;briefForm.removeAttribute('aria-busy');}
});
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.section-heading,.task-list article,.project,.about-content,.steps li').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}

initMotion();
initHouses();
