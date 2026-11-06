const $=selector=>document.querySelector(selector);
const booking=$('#bereg-booking-form'), cabin=$('#cabin'), guests=$('#bereg-guests');
const arrival=$('#arrival'), departure=$('#departure'), status=$('#booking-status');
const buttons=[...document.querySelectorAll('[data-cabin]')];
const localDate=date=>new Date(date+'T12:00:00');
const dateValue=date=>[date.getFullYear(),date.getMonth()+1,date.getDate()].map(n=>String(n).padStart(2,'0')).join('-');
const formatDate=new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long',year:'numeric'});
const clearStatus=()=>{status.textContent='';};

function updateDates(){
 arrival.min=dateValue(new Date());
 const earliestDeparture=localDate(arrival.value>=arrival.min?arrival.value:arrival.min);
 earliestDeparture.setDate(earliestDeparture.getDate()+1);
 departure.min=dateValue(earliestDeparture);
}
function updateCabin(){
 guests.max=cabin.selectedOptions[0]?.dataset.guests||'6';
 buttons.forEach(button=>{
  const selected=button.dataset.cabin===cabin.value;
  button.closest('.bereg-cabin').toggleAttribute('data-selected',selected);
  button.firstChild.textContent=selected?'Выбранный домик ':'Выбрать домик ';
 });
 clearStatus();
}

updateDates();
updateCabin();
arrival.addEventListener('input',updateDates);
cabin.addEventListener('change',updateCabin);
booking.addEventListener('input',clearStatus);
buttons.forEach(button=>button.addEventListener('click',()=>{
 cabin.value=button.dataset.cabin;
 updateCabin();
 if(guests.valueAsNumber>Number(guests.max))guests.value=guests.max;
 booking.scrollIntoView({block:'start'});
 arrival.focus({preventScroll:true});
}));
booking.addEventListener('submit',event=>{
 event.preventDefault();
 updateDates();
 if(!booking.reportValidity())return;
 const dates=[arrival.value,departure.value].map(date=>formatDate.format(localDate(date))).join(' — ');
 status.textContent=`Запрос сформирован. ${cabin.selectedOptions[0].textContent}, ${dates}. Количество гостей: ${guests.value}. Демо-запрос не отправлен.`;
});
