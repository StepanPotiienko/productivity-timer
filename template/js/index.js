let secondsPassed = 0;
let minutesPassed = 0;
let hoursPassed = 0;

let isRunning = false;
let periods = getLocalStorage("periods") || [];

function updateLocalStorage(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function populatePeriodsList() {
  const list = document.querySelector("#periods-list ul");
  list.innerHTML = ""; // Clear the list before populating

  periods.forEach(([title, timeData]) => {
    const periodItem = document.createElement("li");
    periodItem.classList.add("period-item");

    periodItem.innerHTML = `
      <div class="period">
        <span>${title || "Unnamed Period"}<br>${formatTime(timeData.hours)}:${formatTime(timeData.minutes)}:${formatTime(timeData.seconds)}</span>
      </div>
    `;

    list.appendChild(periodItem);
  });
}

function addPeriod() {
  const title = document.getElementById("title-entry").value.trim() || "Unnamed Period";
  const periodData = createPeriodData(secondsPassed, minutesPassed, hoursPassed);

  const list = document.querySelector("#periods-list ul");
  const periodItem = document.createElement("li");
  periodItem.classList.add("period-item");

  periodItem.innerHTML = `
    <div class="period">
      <span>${title}<br>${formatTime(periodData.hours)}:${formatTime(periodData.minutes)}:${formatTime(periodData.seconds)}</span>
    </div>
  `;

  list.appendChild(periodItem);
  periods.push([title, periodData]);
  updateLocalStorage("periods", periods);
}

function updateState() {
  isRunning = !isRunning;
}

function display(passed, id) {
  document.getElementById(id).innerText = formatTime(passed);
}

function updateTimer() {
  if (isRunning) {
    if (secondsPassed === 60) {
      secondsPassed = 0;
      minutesPassed += 1;
    }

    if (minutesPassed === 60) {
      minutesPassed = 0;
      hoursPassed += 1;
    }

    display(secondsPassed, "seconds");
    display(minutesPassed, "minutes");
    display(hoursPassed, "hours");

    secondsPassed += 1;
  }
}

function createPeriodData(seconds, minutes, hours) {
  return { seconds, minutes, hours };
}

function resetTimer() {
  addPeriod();

  secondsPassed = 0;
  minutesPassed = 0;
  hoursPassed = 0;
  isRunning = false;

  display(secondsPassed, "seconds");
  display(minutesPassed, "minutes");
  display(hoursPassed, "hours");
}

function formatTime(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

// Call populatePeriodsList on page load
document.addEventListener("DOMContentLoaded", () => {
  populatePeriodsList();
});

setInterval(updateTimer, 1000);
