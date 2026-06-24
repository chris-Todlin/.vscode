/* 
    Is the square matrix a Sator Matrix of not
    Use the description below to decribe and drive the system to see if it works
    The Square
    is a two-dimentional palindrome
    observing rotational symmetry,
    made from words of equal length
    that can be read in these 4 ways:

        1)    left-to-right    (across)
        2)    top-to-bottom    (down)
        3)    bottom-to-top    (up)
        4)    right-to-left    (reverse)
    An Example
    Considering this square:

        B A T S
        A B U T
        T U B A
        S T A B
    Here are the four ways a word (in this case "TUBA") can be read:

                            down
                            ↓
            B A T S    B A T S    B A T S    B A T S
            A B U T    A B U T    A B U T    A B U T ← reverse
    across → T U B A    T U B A    T U B A    T U B A
            S T A B    S T A B    S T A B    S T A B
                                    ↑
                                    up
    IMPORTANT:

    In a true Sator Square, ALL of its words can be read in ALL four of these ways.
    If there is any deviation, it would be false to consider it a Sator Square.
    Some Details
    tablet (square) dimensions range from 2x2 to 33x33 inclusive
    all characters used will be upper-case alphabet letters
    there is no need to validate any input
    Input
    an N x N (square) two-dimentional matrix of uppercase letters
    Output
    boolean true or false whether or not the tablet is a Sator Square
*/

// let's start by dealign with the matrix first and teh access issues
/* function trialMatrix(matrix){
    matrix.forEach((row, index)=>{
        // we can get the row of the matric
        console.log("The row %d is: %s",index,row);
        // now dealing with the column
        let column = matrix.map(row=>row[index]);
        console.log("The column %d is: %s",index,column);
    })
    console.log(matrix);
} */
// then we would compare the matric in the access informarion 
function trialMatrix(matrix){
    let state = [];
    matrix.forEach((row, index)=>{
        // comparison
        state.push((index,row.join('') === matrix.map(row=>row[index]).join('')) ? true : false);
    })

    // return  the output
    console.log(state);
    return state.every(item=> item === true);
}
function trialMatrix2(matrix){
    let state = [];
    matrix.forEach((row, index)=>{
        // comparison
        console.log("The row %d is: %s",index,row.reverse());
        let column = matrix.map(row=>row[index]).reverse();
        console.log("The column %d is: %s",index,column);
        //state.push((index,row.join('') === matrix.map(row=>row[index]).join('')) ? true : false);
    })

    // return  the output
    console.log(state);
    return state.every(item=> item === true);
}
// the return the output 
// refactor when it is all good to go

// testing
trialMatrix([ ['P', 'A', 'R', 'T'],
              ['A', 'G', 'A', 'R'],
              ['R', 'A', 'G', 'A'],
              ['T', 'R', 'A', 'M']
            ]);
trialMatrix2([ ['P', 'A', 'R', 'T'],
              ['A', 'G', 'A', 'R'],
              ['R', 'A', 'G', 'A'],
              ['T', 'R', 'A', 'M']
            ]);