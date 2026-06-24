/* 
    This is the function to check whether our answers are wrong or correct
    It is the trapezoidal archetypal one where the array of the value is provided with the interval
    From there the firs and the last item are popped and unshifted from their position
    The resest are reeduce adn multiplied by two
    If the array has only one or two element no need for the reduce
*/

function trapeziodalRule(h,...number){
    const ends = number.pop() + number.shift();
    let middles = 0;
    console.log("The ends got are: %d",ends);

    if(number.length){
        middles = 2 * number.reduce((pre,current)=> (pre + current),0);
        console.log("The middles got are: %d",middles);
    }

    const total = h/2 * (ends + middles);
    console.log("The trapezoidal rule yields : %d",total);
}

trapeziodalRule(4,49.12,42.90,31.32,19.83,13.87,10.58,7.25)