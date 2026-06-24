/* Use to get the computer choice */
function generateRandomNumber(max) {
    /* Between 1 and max */

    return Math.floor((Math.random() * max) + 1);
}

/* function to set the max depending on the string mode */
function compChoice(mode = ""){
    let max = ""; // for the max of the generate Randmom nuber

    switch(mode.toLowerCase()){
        case "hard":
            max = 100;
            break
        case "medium": 
            max = 50;
            break;
        default: 
            max = 10;
            break;
    }

    return generateRandomNumber(max);
}

module.exports = compChoice;