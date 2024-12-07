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

// TODO: Find a way to simplify function.
function preventTimeForOverwhelming(smaller, bigger) {
  if (smaller / 59 == 1) {
    smaller = 0
    bigger += 1
  }

  return [smaller, bigger]
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
    // I am still not proud of the solution. D:
    secondsPassed = preventTimeForOverwhelming(secondsPassed, minutesPassed)[0]
    minutesPassed = preventTimeForOverwhelming(secondsPassed, minutesPassed)[1]

    minutesPassed = preventTimeForOverwhelming(minutesPassed, hoursPassed)[0]
    hoursPassed = preventTimeForOverwhelming(minutesPassed, hoursPassed)[1]

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
