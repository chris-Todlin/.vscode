/* This is the functin to handle temprature conversion in all dimensions */

/* 
    The first step is to get the switch righ for the choice of the unit from
    -> Since there are two versions of the game, then convert to the rest using another function
    -> return accordingly the result
    -> Would need refactor and optimisation since it would be cumbersome of long for main values
    -> Start with the one we know as we expound on it now. 

    -> Simple version using if's and switch case
*/

// Function that acts as the controll of path setter
function controlPath(value,from, to/* from this unit to the other */){
    // sanitize the value
    const magnitude = parseFloat(value);
    const unitFrom = from.toLowerCase();
    const unitTo = to.toLowerCase();

    if(isNaN(magnitude)){
        return undefined; // let's end here
    }
    // Now get the from into the switch case
    switch(unitFrom){
        case "celcius":
            convertCel(magnitude, unitTo);
            break;
        case "kelvin":
            convertK(magnitude, unitTo);
            break;
        default: 
            convertFah(magnitude, unitTo);
            break;
    }
}

// function to handle the conversion from celcios view
function convertCel(value, to){
    // The two scenarios
    if(to === "kelvin") {
        return convertCelToK(value);
    }else {
        return convertCelToFah(value);
    }
}

// function to convert Fah to any
function convertFah(value, to){
    if(to === "celcius"){
        return convertFahToCel(value);
    } else {
        return convertCel(convertFahToCel(value),"kelvin"); // convert to cel then kelvin
    }
}

function convertK(value, to){
    if(to === "celcius"){
        return convertKToCel(value);
    } else {
        return convertCel(convertKToCel(value), "fahreinheit"); // convert to cel then fah
    }
}

// conversion to fah 
function convertCelToFah(value){
    return (value * 9)/5 + 32;
}

// convert cel to k
function convertCelToK(value){
    return 273 + value;
}

// convert fah to cel
function convertFahToCel(value){
    return (value -32) * 5/9;
}

// convert K to Cel
function convertKToCel(value){
    return value - 273;
}

// Export them for the tests to be done on them
module.exports.convertCel = convertCel;
module.exports.convertCelToFah = convertCelToFah;
module.exports.convertFahToCel = convertFahToCel;
module.exports.convertKToCel = convertKToCel;
module.exports.convertCelToK = convertCelToK;
module.exports.convertCel = convertCel;
module.exports.convertFah = convertFah;
module.exports.convertK = convertK;
module.exports.controlPath = controlPath;