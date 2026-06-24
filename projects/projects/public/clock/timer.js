/* Startign with the time elements */
const hourEl = document.querySelector(".hour");
const minutesEL = document.querySelector(".minutes");
const periodEl = document.querySelector(".period");
const secondsEl = document.querySelector('.seconds');

/* For the calander Elements */
const dayNameEl = document.querySelector(".day-name");
const monthEl = document.querySelector(".month-name");
const dayEL = document.querySelector(".day-number");
const yearEL = document.querySelector(".year");

/* The month and days of the week */
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sartuday"];
const months = ["January", "February", "March", "April", "May", "June","July","August","September","October", "November", "December"];

/* Starting with the seconds setting */
function setTime() {
    const now = new Date();

    // Get the hour
    const hour = now.getHours();

    // The hour components
    periodEl.textContent = hour < 12 ? "AM": "PM";
    hourEl.textContent = (hour < 12 ? hour: hour - 12).toString().padStart(2, "0");

    // Set it in the html DOcument
    secondsEl.textContent = now.getSeconds().toString().padStart(2, "0"); // Set the seonds
    minutesEL.textContent = now.getMinutes().toString().padStart(2, "0");
}

setTime();

/* Set the calander, and since it is not running for every, jusr one when the user loads th page, tno propagation function */
function setCalander() {
    const now = new Date();
    dayNameEl.textContent = days[now.getDay()];
    monthEl.textContent = months[now.getMonth()];
    dayEL.textContent = now.getDate();
    yearEL.textContent = now.getFullYear();
}

setCalander(); // ONvoke the function

// Function to update the seconds
function updateTime() {
    setInterval(setTime, 1000); // Update the seconds
}
updateTime(); // Invoking the function