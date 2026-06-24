/* 
    This function is going to test the operation and emulate the newton-raphson method.
    It is at most base where teh f(x) and f'(x) are given.
    The initial guess is also given.
    All needed to be done is to get the final answer is the diffrence is less than 0.001 or 3dp
    Log all the iteration you have so far made and final answer

    The one in question is f(x) = x2 + x - 1;
*/

// function to relpace the x with the number
function replaceXInString(str){
    let newStr = str.replaceAll('x', 1);
    console.log("The string %s has changes to %s",str, newStr);
}
replaceXInString("x2 + x - 1");

function newtonRaphson(guess){
    // initialise the diff
    let diff = guess, count = 1;
    console.log('\nStarting iteration with guess as %d', guess);
    while(Math.abs(diff)> 0.001){
        diff = guess;
        guess -= (Math.pow(guess,3) + guess - 1)/((3*Math.pow(guess,2) + 1)); // this is the equation
        console.log('Iteration %d - x%d -- %d', count,count, guess);

        // the diff rene now is 
        diff = diff - guess;
        count++;
    }

    // console log the result of the iteration
    console.log("Final root: %d",guess);
}

newtonRaphson(1);
newtonRaphson(-1);
newtonRaphson(0);
newtonRaphson(0.5);