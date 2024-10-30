let secondsPassed = 0 
let minutesPassed = 0 
let hoursPassed = 0 

let isRunning = false

function updateState() {
  isRunning = !isRunning
}

// TODO: Find a way to simplify function.
function preventTimeForOverwhelming() {
  if (secondsPassed / 59 == 1) {
    secondsPassed = 0
    minutesPassed += 1
  }

  if (minutesPassed / 59 == 1) {
    minutesPassed = 0
    hoursPassed += 1
  }
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
    preventTimeForOverwhelming()

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
  
  displayData()
} 

// Update timer every second
setInterval(updateTimer, 1000)
