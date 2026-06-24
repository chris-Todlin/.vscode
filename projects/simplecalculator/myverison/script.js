/* 
               A SIMPLE CALCULATOR WITH BASIC FUNCTIONALIT
    => What are the buttons of concern
        -> tow input display
        -> buttons and their textcontent
*/

const expressionEl = document.getElementById("expression"); // the expression
const answerEl = document.getElementById("answer"); //  the answer entry
const buttonsEl = document.querySelectorAll('button'); // All the buttons

// The state of the question
let currentInput = "", previousInput = "", operator = "";

function calculateResult() {
    const num1 = parseInt(previousInput);
    const num2 = parseInt(currentInput);

    // If there are number the go on
    if(!isNaN(num1) && !isNaN(num2)){
        switch(operator) {
            case '+':
                currentInput = num1 + num2;
                break;
            case '-':
                currentInput = num1 - num2;
                break;
            case 'x':
                currentInput = num1 * num2;
                break;
            case '/':
                currentInput = num1 / num2;
                break;
            default:
                break;
        }
    }
}

function handleOperator(op) {
    // If there is an operator and the next number, then the previous 
    if(operator && currentInput) {
        calculateResult();
        previousInput = currentInput;
        currentInput = "";
    } else {
        previousInput = currentInput;
        currentInput = "";
    }

    operator = op;

    console.log(operator);
    console.log(previousInput);
    console.log(currentInput);
}

// Our first task is to make the button to print on the screen
function handleButtonClick(e) {
    const buttonValue = e.target.textContent;

    // If the button is AC then clear the input field and set the result to 0
    if(buttonValue === "AC") {
        // CLear all the stuff in there
        answerEl.value = 0;
        expressionEl.value = "";
        currentInput = "";
        previousInput = "";

        // close it
        return;
    }

    else if(!isNaN(buttonValue)) {
        currentInput += buttonValue;
    } else if(buttonValue === "=") {
        calculateResult();
        answerEl.value = previousInput;
        return;
    } else {
        handleOperator(buttonValue); // Function to handle the operator
    }

    expressionEl.value += buttonValue;
}

buttonsEl.forEach(btn => btn.addEventListener('click', handleButtonClick));