const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const today = new Date();

var displayedMonth = new Date().getMonth();
var displayedYear = new Date().getFullYear();
var displayedDates = getDaysOfMonth(displayedMonth, displayedYear);

window.onload = function () {
  initUI()
};

function initUI() {
  initControls();
  loadDaysToCalendar();
  paintFestivesDays();
  loadYearsSelector();
}

function initControls() {
  document.getElementById('next').addEventListener('click', loadNextMonth);
  document.getElementById('previous').addEventListener('click', loadPreviousMonth);
  document.getElementById('month-selector').addEventListener('change', changeMonth);
  document.getElementById('month-selector').selectedIndex = today.getMonth().toString();
  document.getElementById('year-selector').addEventListener('change', changeYear);
}

function loadDaysToCalendar() {
  clearGrid();
  var indexToInsert = displayedDates[0].weekday;
  displayedDates.forEach(date => {
    document.getElementById(`day-${indexToInsert}`).textContent = date.day;
    indexToInsert++;
  });

  if (displayedMonth == today.getMonth() && displayedYear == today.getFullYear())
    paintCurrentDay();
}

function loadYearsSelector() {
  let firstYear = displayedYear - 50;
  let lastYear = displayedYear + 10;

  for (let i = firstYear; i < lastYear; i++) {
    let option = document.createElement('option');
    option.text = i;
    option.value = i;
    document.getElementById('year-selector').appendChild(option);
  }
  document.getElementById('year-selector').value = today.getFullYear().toString();
}

function getDaysOfMonth(month, year) {
  var date = new Date(year, month, 1);
  var daysOfMonth = [];
  while (date.getMonth() == month) {
    daysOfMonth.push({
      day: new Date(date).getDate(),
      month: new Date(date).getMonth(),
      year: new Date(date).getFullYear(),
      weekday: new Date(date).getDay(),
    })
    date.setDate(date.getDate() + 1)
  }
  return daysOfMonth;
}

function clearGrid() {
  for (let i = 0; i < 42; i++) {
    document.getElementById(`day-${i}`).textContent = '';
    document.getElementById(`day-${i}`).className = 'item'
  }
}

function loadNextMonth() {
  displayedMonth == 11 ?
    (displayedMonth = 0,
      displayedYear++) :
    displayedMonth++;

  displayedDates = getDaysOfMonth(displayedMonth, displayedYear);
  updateDisplayedValues();
  loadDaysToCalendar();
  paintFestivesDays();
}

function loadPreviousMonth() {
  displayedMonth == 0 ?
    (displayedMonth = 11,
      displayedYear--) :
    displayedMonth--;

  displayedDates = getDaysOfMonth(displayedMonth, displayedYear);
  updateDisplayedValues();
  loadDaysToCalendar();
  paintFestivesDays();
}

function changeMonth() {
  displayedMonth = document.getElementById('month-selector').selectedIndex;
  displayedDates = getDaysOfMonth(displayedMonth, displayedYear);
  updateDisplayedValues();
  loadDaysToCalendar();
  paintFestivesDays();
}

function changeYear() {
  debugger;
  displayedYear = parseInt(document.getElementById('year-selector').value);
  displayedDates = getDaysOfMonth(displayedMonth, displayedYear);
  updateDisplayedValues();
  loadDaysToCalendar();
  paintFestivesDays();
}

function updateDisplayedValues() {
  document.getElementById('month-selector').selectedIndex = displayedMonth;
  document.getElementById('year-selector').value = displayedYear;
}

function paintFestivesDays() {
  getFestivesDayOfTheYear(displayedYear).then(festives => {
    Object.entries(festives[displayedMonth]).forEach(festiveDay => {
      let indexOfFestiveDay = displayedDates[0].weekday + parseInt(festiveDay[0]) - 1;
      document.getElementById(`day-${indexOfFestiveDay}`).classList.add('festive');
    });
  })
}

function getFestivesDayOfTheYear(year) {
  let url = `http://nolaborables.com.ar/api/v2/feriados/${year}?formato=mensual`;
  return fetch(url).then(res => res.json()).then(json => {
    return json
  });
}


function paintCurrentDay() {
  let indexOfCurrentDay = (displayedDates[0].weekday + today.getDate()) - 1;
  document.getElementById(`day-${indexOfCurrentDay}`).classList.add('current-day');
}

// function createFestiveDayToggle(festiveDayName) {
//   let toggleContainer = document.createElement('div');
//   toggleContainer.className = 'tooltip';

//   let toggle = document.createElement('span');
//   toggle.textContent = festiveDayName;
//   toggle.className = 'tooltiptext'

//   toggleContainer.appendChild(toggle);
//   return toggleContainer;
// }