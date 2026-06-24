// The code to activate without an button
const rainEl = document.getElementById("rain");
const tempEl = document.getElementById('temp');
const windEl = document.getElementById('wind');

// Function to get the geolocaton of the user
function success(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    
    fetchWeatherDate(lat,long);
}

function errorCallback(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.error("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.error("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.error("An unknown error occurred.");
      break;
  }
}

// NOw function for the deploment
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, errorCallback);
    } else {
        alert('Allow geolocation');
    }
}

async function fetchWeatherDate(lat,long) {
    let data;

    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m,rain`).
    then(async(response)=>{
        data =  await response.json();
    }).finally(()=>{
        // Are for the collection of the data on the wind rainand temprature
        windEl.textContent = `${data.current.wind_speed_10m} km/h`;
        rainEl.textContent = `${data.current.rain} mm`;
        tempEl.textContent = `${data.current.temperature_2m} °C`;
    })
    .catch((err)=>{
        const errorEl = document.querySelector('.error');
        errorEl.classList.remove('visible');

        // clearing
        setTimeout(()=> errorEl.classList.add('visible'), 4000);
    })
}

getLocation();