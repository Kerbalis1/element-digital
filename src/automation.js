const demo = document.querySelector('[data-automation-demo]');

if (demo) {
  const controls = demo.querySelector('[data-demo-controls]');
  const run = demo.querySelector('[data-demo-run]');
  const source = demo.querySelector('#automation-source');
  const status = demo.querySelector('[data-demo-status]');
  const record = demo.querySelector('[data-demo-record]');
  const recordSource = record.querySelector('[data-record-source]');
  const recordNotice = record.querySelector('[data-record-notice]');
  const nodes = [...demo.querySelectorAll('.auto-flow li')];
  const messages = [
    'Проверили обязательные поля и назначили тестового ответственного.',
    'Создали тестовую карточку заявки и привязали ответственного.',
    'Сформировали уведомление для менеджера. Тестовый сценарий завершён.',
  ];
  let timer;

  function reset() {
    clearTimeout(timer);
    nodes.forEach(node => {
      delete node.dataset.state;
      node.removeAttribute('aria-current');
    });
    record.hidden = true;
    run.disabled = false;
  }

  function showStep(index, channel) {
    nodes.forEach((node, i) => {
      if (i <= index) node.dataset.state = i === index ? 'current' : 'complete';
      if (i === index) node.setAttribute('aria-current', 'step');
      else node.removeAttribute('aria-current');
    });
    if (index >= 2) {
      recordSource.textContent = channel;
      recordNotice.textContent = index === nodes.length - 1 ? 'Подготовлено в демо' : 'В очереди';
      record.hidden = false;
    }
    status.textContent = index === 0 ? `Тестовая заявка принята. Источник: ${channel}.` : messages[index - 1];
    if (index < nodes.length - 1) {
      timer = setTimeout(() => showStep(index + 1, channel), 900);
    } else {
      run.disabled = false;
    }
  }

  source.addEventListener('change', () => {
    reset();
    status.textContent = 'Источник выбран. Можно запустить новую тестовую заявку.';
  });
  run.addEventListener('click', () => {
    reset();
    run.disabled = true;
    showStep(0, source.selectedOptions[0].textContent);
  });
  controls.hidden = false;
}
