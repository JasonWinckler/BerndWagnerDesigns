import { bookingConfig } from './config.js';

document.documentElement.classList.add('js');

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const form = $('[data-booking-form]');
const dateInput = form.elements.date;
const calendarGrid = $('[data-calendar-grid]');
const calendarLabel = $('[data-calendar-label]');
const selectedDateLabel = $('[data-selected-date]');
const status = $('[data-status]');
const summary = $('[data-summary]');
const dateFormatter = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
const monthFormatter = new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' });

$('[data-year]').textContent = new Date().getFullYear();

const revealItems = $$('[data-reveal]');
if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const minimumDate = addDays(startOfDay(new Date()), bookingConfig.minimumLeadDays);
const maximumDate = new Date(minimumDate.getFullYear(), minimumDate.getMonth() + bookingConfig.maximumMonthsAhead + 1, 0);
let visibleMonth = new Date(minimumDate.getFullYear(), minimumDate.getMonth(), 1);

function renderCalendar() {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = (visibleMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstWeekday }, () => '<span class="calendar-empty" aria-hidden="true"></span>');

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const value = isoDate(date);
    const unavailable = date < minimumDate || date > maximumDate;
    const selected = value === dateInput.value;
    const today = value === isoDate(startOfDay(new Date()));
    cells.push(`<button type="button" role="gridcell" data-date="${value}"${unavailable ? ' disabled' : ''}${selected ? ' class="selected" aria-selected="true"' : ' aria-selected="false"'}${today ? ' aria-current="date"' : ''} aria-label="${dateFormatter.format(date)}">${day}</button>`);
  }

  calendarGrid.innerHTML = cells.join('');
  calendarLabel.textContent = monthFormatter.format(visibleMonth);
  const firstAllowedMonth = minimumDate.getFullYear() * 12 + minimumDate.getMonth();
  const lastAllowedMonth = maximumDate.getFullYear() * 12 + maximumDate.getMonth();
  const currentMonth = year * 12 + month;
  $('[data-calendar-prev]').disabled = currentMonth <= firstAllowedMonth;
  $('[data-calendar-next]').disabled = currentMonth >= lastAllowedMonth;
}

function changeMonth(offset) {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + offset, 1);
  renderCalendar();
}

$('[data-calendar-prev]').addEventListener('click', () => changeMonth(-1));
$('[data-calendar-next]').addEventListener('click', () => changeMonth(1));
calendarGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-date]');
  if (!button || button.disabled) return;
  dateInput.value = button.dataset.date;
  selectedDateLabel.textContent = `Ausgewählt: ${dateFormatter.format(parseIsoDate(button.dataset.date))}`;
  renderCalendar();
  updateErrors(false);
  updateSummary();
});

$('[data-time-slots]').innerHTML = bookingConfig.timeSlots.map((time) => `
  <label>
    <input type="radio" name="time" value="${time}" required>
    <span>${time} Uhr</span>
  </label>
`).join('');

const messages = {
  date: 'Bitte wählen Sie einen Wunschtag.',
  time: 'Bitte wählen Sie eine Wunschuhrzeit.',
  name: 'Bitte geben Sie Ihren Namen ein.',
  email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  message: 'Bitte beschreiben Sie kurz Ihr Anliegen.',
  privacy: 'Bitte bestätigen Sie die Datenschutzerklärung.'
};

function fieldIsValid(name) {
  if (name === 'date') return Boolean(dateInput.value);
  if (name === 'time') return Boolean(form.querySelector('[name="time"]:checked'));
  return form.elements[name].validity.valid;
}

function updateErrors(showAll = true) {
  let valid = true;
  Object.entries(messages).forEach(([name, message]) => {
    const error = $(`#error-${name}`);
    const fieldValid = fieldIsValid(name);
    valid &&= fieldValid;
    if (showAll || error.textContent) error.textContent = fieldValid ? '' : message;
    if (name !== 'date' && name !== 'time') form.elements[name].setAttribute('aria-invalid', String(!fieldValid));
  });
  return valid;
}

function formData() {
  return Object.fromEntries(new FormData(form).entries());
}

function requestText() {
  const data = formData();
  const date = data.date ? dateFormatter.format(parseIsoDate(data.date)) : '-';
  return [
    'Terminanfrage · Private Atelier Session',
    '',
    `Wunschtermin: ${date}`,
    `Wunschuhrzeit: ${data.time ? `${data.time} Uhr` : '-'}`,
    `Name: ${data.name || '-'}`,
    `E-Mail: ${data.email || '-'}`,
    `Telefon: ${data.phone || '-'}`,
    `Erfahrungsniveau: ${data.experience || '-'}`,
    `Schwerpunkt: ${data.focus || '-'}`,
    '',
    'Nachricht:',
    data.message || '-'
  ].join('\n');
}

function updateSummary() {
  const data = formData();
  const date = data.date ? dateFormatter.format(parseIsoDate(data.date)) : 'Termin noch offen';
  const time = data.time ? `${data.time} Uhr` : 'Uhrzeit noch offen';
  summary.textContent = `${date} · ${time}`;
}

function configured(value) {
  return Boolean(value && !value.includes('{{'));
}

form.addEventListener('input', () => {
  updateErrors(false);
  updateSummary();
});
form.addEventListener('change', () => {
  updateErrors(false);
  updateSummary();
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!updateErrors(true)) {
    status.textContent = 'Bitte prüfen Sie die markierten Pflichtfelder.';
    const firstError = Object.keys(messages).find((name) => !fieldIsValid(name));
    if (firstError === 'date') calendarGrid.querySelector('button:not(:disabled)')?.focus();
    else if (firstError === 'time') form.querySelector('[name="time"]')?.focus();
    else form.elements[firstError]?.focus();
    return;
  }
  if (formData().website) return;

  const submit = $('[data-submit]');
  const payload = requestText();
  if (configured(bookingConfig.form.endpoint)) {
    submit.disabled = true;
    status.textContent = 'Ihre Anfrage wird übermittelt …';
    try {
      const response = await fetch(bookingConfig.form.endpoint, {
        method: bookingConfig.form.method,
        body: new FormData(form)
      });
      if (!response.ok) throw new Error('Request failed');
      status.textContent = 'Vielen Dank. Ihre Terminanfrage wurde übermittelt.';
      form.reset();
      dateInput.value = '';
      selectedDateLabel.textContent = 'Bitte wählen Sie Ihren Wunschtag.';
      renderCalendar();
      updateSummary();
    } catch {
      status.textContent = 'Die Übermittlung ist fehlgeschlagen. Bitte kopieren Sie Ihre Anfrage und senden Sie sie per E-Mail.';
    } finally {
      submit.disabled = false;
    }
    return;
  }

  if (configured(bookingConfig.recipientEmail)) {
    status.textContent = 'Ihr E-Mail-Programm wird mit der vorbereiteten Anfrage geöffnet.';
    window.location.href = `mailto:${bookingConfig.recipientEmail}?subject=${encodeURIComponent('Terminanfrage · Private Atelier Session')}&body=${encodeURIComponent(payload)}`;
    return;
  }

  status.textContent = 'Die Empfängeradresse ist noch nicht konfiguriert. Sie können die vollständige Anfrage bereits als Text kopieren.';
});

$('[data-copy]').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(requestText());
    status.textContent = 'Die Anfrage wurde in die Zwischenablage kopiert.';
  } catch {
    status.textContent = 'Kopieren ist in diesem Browser nicht verfügbar.';
  }
});

renderCalendar();
updateSummary();
