let secondsPassed = 0;
let minutesPassed = 0;
let hoursPassed = 0;

let isRunning = false;
let periods = [];

document.getElementById("start-btn").addEventListener("click", function () {
  sendNotification("Starting intense work period.");
});

function addPeriod() {
  const title = document.getElementById("title-entry").value.trim();
  const periodData = createPeriodData(secondsPassed, minutesPassed, hoursPassed);

  const displayTitle = title || "Unnamed Period";

  const periodList = document.querySelector("#periods-list ul"); // Ensure we target the correct <ul>
  const periodItem = document.createElement("li");
  periodItem.classList.add("period-item");

  periodItem.innerHTML = `
    <div class="period">
      <span>${displayTitle} - ${formatTime(periodData.hours)}:${formatTime(periodData.minutes)}:${formatTime(periodData.seconds)}</span>
    </div>
  `;

  periodList.appendChild(periodItem);
}

function updateState() {
  isRunning = !isRunning;
}

function display(passed, id) {
  document.getElementById(id).innerText = formatTime(passed); // Reuse formatTime
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

function sendNotification(message) {
  console.log(message);
}

setInterval(updateTimer, 1000);

