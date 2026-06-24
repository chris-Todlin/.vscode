/* Sample car rental */
const carListEl = document.querySelector('.carlist');
const bookForm = document.forms.book;

// functinon to fetch the cars
async function fetchCars() {
    await fetch(`${location.href}rentcars`).
    then(async(res)=>{
        const data = await res.json();
        displayCars(data);
        populateSelect(data);
    }).catch((err)=>{
        carListEl.innerHTML = "";

        const p = document.createElement('p');
        p.textContent = "Coulnd't fetch the cars. Reload to try again!";
        carListEl.append(p);
    });
}
function displayCars(cars){
    carListEl.innerHTML = "";
        
    cars.forEach((car)=>{
        const div = document.createElement('div');
        div.classList.add('car');
        div.setAttribute('id', car.id);

        div.innerHTML = `
            <img src="${car.image}" alt="${car.name}">

            <h3>${car.name}</h3>
            <p>Price : $<span id="price">${car.price}</span>/day</p>
            <button>Rent Now</button>
        `;

        carListEl.append(div);
    })
}

// Function to populate the select
function populateSelect(data) {
    const selectEl = document.querySelector("#carName");
    const names = data.map((car)=>({
        name: car.name,
    }));
    names.forEach(name=>{
        const option = document.createElement('option');
        option.value = name.name;
        option.textContent = name.name;
        selectEl.append(option);
    })
}

fetchCars();

/* Form Handling to rent a car */
function bookCar(e){
    e.preventDefault();
    const pickDate = bookForm.pickdate;
    const returnDate = bookForm.returndate;

    validateDate(pickDate, returnDate);
    
}
// Validate the date entered not of the past nor the return to be greater than the pickup
function validateDate(pickDate, returnDate){
    const pickupDate = new Date(pickDate.value);
    const returnupDate = new Date(returnDate.value);

    const now = new Date();

    if(pickupDate.getMonth() < now.getMonth()&&pickupDate.getFullYear() < now.getFullYear() || returnupDate.getMonth() < now.getMonth()&&returnupDate.getFullYear() < now.getFullYear()) {
        (pickupDate.getMonth() < now.getMonth()&&pickupDate.getFullYear() < now.getFullYear()) ? pickDate.focus() : returnDate.focus();
        return;
    }

    if(pickupDate.getTime() >= returnupDate.getTime()) {
        pickDate.focus();
        return;
    }
}
bookForm.addEventListener('submit', bookCar);