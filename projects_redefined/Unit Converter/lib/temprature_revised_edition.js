/* This is an improved function ot the temprature conversion and is not much optimised */

/* 
    This is the improved version of the temprature function
    It has the following feaurters

        -> Instead of doing a duplicate and heavy decision making, just employ a classt odo so.
        -> If you are to go to cel then fak
            temprature.cel.fah -> convertTemprature('cel',0,'fah')
        -> for complicated ones like the fah to kel or iverse
            temprature.fah.cel -> convertTemprature('fah',0,'cel')
            temprature.cel.kelvin -> convertTemprature('cel',val,'kelvin') val is the result of the first operation
*/

// This function make things even more funner
function convertTemprature(from, value = 0, to){
    // the predefined of none is set
    if(!from || !to){
        from = "celcius";
        to = "kelvin"
    }
    
    // Our temorature body - Though a class would be more funner
    const temprature = {
        "celcius": {
            "kelvin": 273 + value,
            "fah": convertCelToFah(value)
        },
        "kelvin": {
            "celcius": value - 273,
        },
        "fah": {
            "celcius": convertFahToCel(value)
        }
    };
    try {
        return temprature[from][to];
    } catch (error) {
        return "error";
    }
}

// conversion to fah 
function convertCelToFah(value){
    return (value * 9)/5 + 32;
}

// convert fah to cel
function convertFahToCel(value){
    return (value -32) * 5/9;
}

// adding the functionalit for the kelvin to fah 
function convertKelToFah(value){
    return convertTemprature("celcius", convertTemprature("kelvin",value, "celcius"),"fah");
}

// adding the functionalit for the fah to kelvin 
function convertFahToKel(value){
    return convertTemprature("celcius", convertTemprature("fah",value, "celcius"),"kelvin");
}
// The import section of the file
module.exports.convertTemprature = convertTemprature;
module.exports.convertKelToFah  = convertKelToFah;
module.exports.convertFahToKel  = convertFahToKel;