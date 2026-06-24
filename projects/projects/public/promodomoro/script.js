/* Our dear noble DOM */
const minuteEl = document.getElementById('min');
const secondEl = document.getElementById('sec');

// The details of our timer
let minute = 25, second = 0, timerInterval;
let secondAll = 60;

// Function to update timer
function updateTimer(){
    secondEl.textContent = second.toString().padStart(2,'0');
    minuteEl.textContent = minute.toString().padStart(2,'0');
}

// Function to start the timer
function startDetails() {
    // Get the number of seconds and reduce with timer
    secondAll === 0 ? secondAll = 60 : secondAll--;

    // Get the number of seconds and append them
    second = (secondAll === 60)? 0: secondAll;
    if(secondAll === 59) minute--;

    if(minute == 0 && second === 0) resetTimer();

    updateTimer();
    // If the min / 3600 has no rem
}

// Function to start the timer
function startTimer(){
    if(!timerInterval) {
        timerInterval = setInterval(startDetails, 1000)
    }
}

// Function to stop the timer
function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// function to reset the timer
function resetTimer() {
    secondAll = 60;
    minute = 25;
    second = 0;

    pauseTimer();
    updateTimer();
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);