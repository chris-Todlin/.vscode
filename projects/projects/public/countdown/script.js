/* We are diving into the countdown, we start with the seconds then mins the hours */

// Get the buttons for control
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

// Now the place to append the time and min and seconds
const secEl = document.getElementById("sec");
const minEl = document.getElementById("min");
const hourEl = document.getElementById("hour");

// The variable that are going to change and affected by the stop
let min = 0, hour = 0, sec = 0;
let timerInterval;

// function to render timer
function renderTimer() {
    // render it in the browser
    secEl.textContent = sec.toString().padStart(2,'0');
    minEl.textContent = min.toString().padStart(2,'0');
    hourEl.textContent = hour.toString().padStart(2,'0');
}

// function to update the timee
function updateTimer() {
    sec++; // update the seconds

    // Change the seconds when the seconds turn 60
    if(sec === 60) {
        sec = 0;
        min++;
    } 

    if(min == 60) {
        min = 0;
        hour++;
    }

    renderTimer();
}

// function to reset the timer to o
function resetTimer() {
    sec = 0;
    min = 0;
    hour = 0;

    renderTimer();
    stopTimer(); // After reseting, stop the timer
}

// function to stop timer
function stopTimer() {
    clearInterval(timerInterval); // Stops the timer
}

// Function to startTimer
function startTimer(){
    if(!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

// Attaching the eventlisteners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// tEster function
/* setTimeout(stopTimer, 4000);
setTimeout(updateTimer, 7000); */

/* BUG */
// Clicking the start button more than once results to a quicky behaviour