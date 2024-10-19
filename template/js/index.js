// TODO: Add hours (+display).
// TODO: Think of a better way of displaying seconds and minutes.
let secondsPassed = 0
let minutesPassed = 0

let displaySeconds = new String() 
let displayMinutes = new String() 

let isRunning = false

function updateState() {
  isRunning = !isRunning
}

function preventTimeForOverwhelming() {
  if (secondsPassed / 59 == 1) {
    secondsPassed = 0
    minutesPassed += 1
  }
}

function displayData() {
  displaySeconds = `0${secondsPassed}`
  displayMinutes = `0${minutesPassed}`

  if (secondsPassed >= 10) {
    displaySeconds = `${secondsPassed}`
  }

  if (minutesPassed >= 10) {
    displayMinutes = `${minutesPassed}`
  }

  document.getElementById("seconds").innerText = displaySeconds 
  document.getElementById("minutes").innerText = displayMinutes 
}

function updateTimer() {
  if (isRunning) {
    preventTimeForOverwhelming()
    displayData()
    secondsPassed += 1
  }
}

function resetTimer() {
  secondsPassed = 0
  minutesPassed = 0
  isRunning = false
  
  displayData()
} 

// Update timer every second
setInterval(updateTimer, 1000)
