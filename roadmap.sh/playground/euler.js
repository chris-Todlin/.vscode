/* 
    This stuff is very hot in the oven.
    Though simple and easy to make, it takes courage to do so.
    This implements the euler method, though at a higher abstraction level
    I have the dy/dx = f(x) = xy + 1.
    The limit or h = 0.1,
    the value of the y(0) = 1;
    It would generate a table in the formart
    | x | y | all that is there in
    A variable y and the interval would play a huge role in the iteration 
    Since it is boring to iterate them by the load of the hand

*/

function eulerMethod(y0,target, h){
    let x = 0, y = y0;
    console.log('\nStarting the operation with euler');
    console.log('| x\t\t| y\t\t|');

    while(x <= target){

        console.log('| %d | %d|', x.toFixed(5), y.toFixed(5));
        y += h * (x + y); // this is the main driver of the equation
        x += h;
    }
    console.log("Done with Euler with h = %d\n",h);
}

eulerMethod(1, 1, 0.2);