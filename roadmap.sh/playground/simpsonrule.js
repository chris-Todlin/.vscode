/* 
    This is the function to check whether our answers are wrong or correct
    It is the simpson archetypal one where the array of the value is provided with the interval
    From there the firs and the last item are popped and unshifted from their position
    The resest are reeduce adn multiplied by two
    if length of the array is still there in, we use a loop to jump throught he evens and the odd to find the total fo them
*/

function simpsonRule(h,...number){
    const ends = number.pop() + number.shift();
    let middles = 0;
    console.log("The ends got are: %d",ends);

    if(number.length){
        let odds = 0, evens = 0;
        number.forEach((number, index)=>{
            (index%2 !== 0) ? evens += number : odds += number;
        });

        middles = 4*odds + 2*evens;
        console.log("The middles got are: %d",middles);
    }

    const total = h/3 * (ends + middles);
    console.log("The simpson rule yields : %d",total);
}

simpsonRule(4,49.12,42.90,31.32,19.83,13.87,10.58,7.25)