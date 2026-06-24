/* Get the input field to check on */
const celEl = document.getElementById('cel');
const kelEl = document.getElementById('kel');
const fahEl = document.getElementById('fah');

// Function to sterialize the input
function modifyInput(inputVal) {
    // Convert to number type first
    const val = parseInt(inputVal);

    // If the value exist 
    if(!isNaN(val)) {
        return val;
    } else {
        // Throw an error 
        const errorVal = new Error("The input is not a value");
        throw errorVal;
    }
}

/* The conversion functions for the temprature playing */
function convertCelToKel(cel) {return cel + 273; }
function convertKelToCel(kel){return 273 - kel;}
function convertCelToFah(cel) {return (5/9 + (cel - 32));}
function convertFahToCel(fah) {return (((9*fah)/5) + 32);}
function convertFahToKel(fah){
    return convertCelToKel(convertFahToCel(fah));
}
function convertFahToKel(fah){
    return convertCelToKel(convertFahToCel(fah));
}
function convertKelToFah(kel) {
    return convertCelToFah(convertKelToCel(kel));
}

// Add the change EventListener on the two input
celEl.addEventListener('change',function(){
    kelEl.value = convertCelToKel(modifyInput(celEl.value)).toFixed(0); // Converting it
    fahEl.value = convertCelToFah(modifyInput(celEl.value)).toFixed(0);
});

kelEl.addEventListener('change',function(){
    celEl.value = convertKelToCel(modifyInput(kelEl.value)).toFixed(0); // Converting it
    fahEl.value = convertKelToFah(modifyInput(kelEl.value)).toFixed(0);
});

fahEl.addEventListener('change',function(){
    celEl.value = convertFahToCel(modifyInput(fahEl.value)).toFixed(0); // Converting it
    kelEl.value = convertFahToKel(modifyInput(fahEl.value)).toFixed(0);
});