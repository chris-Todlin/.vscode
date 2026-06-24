// Weather application
(()=>{
    /* API Details */
    const apiKey = "166ab4233db5802fde57d87f62b9ea6e";
    const renderSection =document.querySelector('.output');
 
    // Function to fetch the weather
    async function fetchWeather(city){
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).
        then(async(res)=>{
            // console log the reesponse
            const data = await res.json();
            if(!res.ok){
                displayError('Error in loading data!');
            }
            appendData(data)
        }).catch(err=>{
            console.log(err);
        })
    }

    // funntion to attach the data
    function appendData(data){
        const {humidity, temp} = data.main;
        const {name} = data;
        const {description, icon} = data.weather[0];
        const {speed} = data.wind;

        // clear the innerHTMl
        renderSection.innerHTML = "";

        // now add the body
        renderSection.innerHTML = `
            <p class="city">${name}</p>
            <p id="temp">${temp}&deg;C</p>
            <p id="rain"><img id="icon" src="https://openweathermap.org/img/wn/${icon}.png"/>${description}</p>
            <p id="hum"><b>Humidity:</b> ${humidity}&percnt;</p>
            <p id="widn"><b>Wind Speed:</b> ${speed}&nbsp; Km/h</p>
        `;
    }

    fetchWeather('nairobi');

    //  NOw when the user click the serach
    const searchBtn = document.getElementById('search');
    const city = document.getElementById('town');

    // function to get weather
    function getWeather(){
        if(city.value){
            fetchWeather(city.value); // fetch the weather
        } else {
            //display error message
            displayError('Check your input');
        }
    }

    // function to display error
    function displayError(message){
        renderSection.innerHTML = "";

        renderSection.innerHTML = `
            <img src="./icons8-error-handling-50.png" alt="error">
            <p>${message}</p>
        `;
    }

    searchBtn.addEventListener('click', getWeather);
    city.addEventListener('keydown',(e)=>{
        if(e.key === 'Enter'){
            return getWeather(); // fetch the weathers
        }
    })
})();