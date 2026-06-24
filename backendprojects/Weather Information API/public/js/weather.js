/* The DOM manipulator */
(function(){
    // get the fomr with the name of the weather
    const weatherForm = document.forms.weather;
    const divEl = document.getElementById("div");

    // function to prevent it default behaviour
    function handleForm(e){
        e.preventDefault();
        const city = weatherForm.city;
        // asign this to the div

        setSpinner(); // set it to spin
        fetchWeather(city);
    }

    // function to fetch the weather
    async function fetchWeather(city) {
        try {
            const response = await fetch(`/weather/${city.value}`);

            const data = await response.json();
            if(data !== undefined && !data.message) {
                renderData(data);
            } else {
                divEl.innerHTML = ""; //clear it 

                divEl.innerHTML = `<p class= "text-center text-info" style="font-size: 1.25rem; font-weight: bold;">${data.message}</p>`;
            }

            // clear the input
            city.value = "";
        } catch (error) {
            console.error(error);
            divEl.innerHTML = ""; //clear it 

            divEl.innerHTML = '<p class= "text-center text-danger" style="font-size: 1.25rem; font-weight: bold;">There was a problem connection to the weather API</p>'
        }
    }

    // function to append the spinneer
    function setSpinner(){
        divEl.innerHTML = ""; //clear it 

        const p = document.createElement("p");
        p.classList.add("d-grid", "text-center");


        p.innerHTML = `
            <span class=" spinner pl-3 loading-spinner spinner-border text-primary"></span>
        `;
        divEl.append(p);
    }

    // function to render the data
    function renderData(data){
        // cear the inner htl
        divEl.innerHTML = "";

        const card = document.createElement("div");
        const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

        card.innerHTML = `
            <div class="card text-center shadow-lg" style="width: 22rem; border-radius: 15px;">
                <div class="card-body">
                <img id="weather-icon" src="${iconUrl}" alt="weather icon" class="my-2 card-img-top">
                <h5 class="card-title">${data.name}</h5>
                <h6 class="text-muted mb-3">${data.description}</h6>

                <h1 class="display-4 fw-bold">${data.temp}°C</h1>

                <div class="d-flex justify-content-around mt-4">
                    <div>
                    <p class="mb-1 fw-semibold">Humidity</p>
                    <p class="text-primary">${data.humidity}%</p>
                    </div>
                    <div>
                    <p class="mb-1 fw-semibold">Wind</p>
                    <p class="text-primary">${data.speed} km/h</p>
                    </div>
                </div>
                </div>
            </div>
        </section>
        `;

        // append the bod
        divEl.append(card);
    }

    weatherForm.addEventListener("submit",handleForm);
})()