let secondsPassed = 0
let minutesPassed = 0
let hoursPassed = 0

let isRunning = false


document.getElementById("start-btn").addEventListener("click", function () {
  SendNotification("Starting intense work period.")
})

function updateState() {
  isRunning = !isRunning
}

function Display(passed, id) {
  let buffer = "0" + passed.toString()

  if (passed >= 10) {
    buffer = `${passed}`
  }

  document.getElementById(id).innerText = buffer
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

    Display(secondsPassed, "seconds")
    Display(minutesPassed, "minutes")
    Display(hoursPassed, "hours")

    secondsPassed += 1
  }
}

function resetTimer() {
  secondsPassed = 0
  minutesPassed = 0
  hoursPassed = 0
  isRunning = false

  Display(secondsPassed, "seconds")
  Display(minutesPassed, "minutes")
  Display(hoursPassed, "hours")
}

// Update timer every second
setInterval(updateTimer, 1000)
