const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const today = new Date();

var displayedMonth = new Date().getMonth();
var displayedYear = new Date().getFullYear();

window.onload = function () {
  initUI()
};

function initUI() {
  document.getElementById('month').textContent = monthNames[today.getMonth()];
  document.getElementById('year').textContent = today.getFullYear();
  document.getElementById('next').addEventListener('click', loadNextMonth);
  document.getElementById('previous').addEventListener('click', loadPreviousMonth);

  loadDaysToCalendar(today.getMonth(), today.getFullYear());
}

function getDaysOfMonth(month, year) {
  var date = new Date(year, month, 1);
  var getDaysOfMonth = [];
  while (date.getMonth() == month) {
    getDaysOfMonth.push(new Date(date));
    date.setDate(date.getDate() + 1)
  }
  return getDaysOfMonth;
}

function loadDaysToCalendar(month, year) {
  clearGrid();
  var daysOfMonth = getDaysOfMonth(month, year);
  var indexToInsert = daysOfMonth[0].getDay();
  daysOfMonth.forEach(day => {
    document.getElementById(`day-${indexToInsert}`).textContent = day.getDate();
    indexToInsert++;
  });
  loadFestiveDays();
  paintCurrentDay();
}

function clearGrid() {
  for (let i = 0; i < 42; i++) {
    document.getElementById(`day-${i}`).textContent = '';
  }
}

function loadNextMonth() {
  if (displayedMonth == 11) {
    displayedMonth = 0;
    displayedYear++;
  } else {
    displayedMonth++;
  }
  updateDisplayedValues();
  loadDaysToCalendar(displayedMonth, displayedYear);
}

function loadPreviousMonth() {
  if (displayedMonth == 0) {
    displayedMonth = 11;
    displayedYear--;
  } else {
    displayedMonth--;
  }
  updateDisplayedValues();
  loadDaysToCalendar(displayedMonth, displayedYear);
}

function updateDisplayedValues() {
  document.getElementById('month').textContent = monthNames[displayedMonth];
  document.getElementById('year').textContent = displayedYear;
}

function loadFestiveDays() {

}

function paintCurrentDay() {

}