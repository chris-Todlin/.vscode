/* 

 => bmi = weight/ math.pow(height, 2);
 => bmi < 18.5 underwieght
 => bmi < 24.9 nomral 
 => bmi < 29.9 overwieght
 => bmi < obese
*/

//The DOm needed
const formBmi = document.forms.bmi;
const heightEl = formBmi.height;
const weightEl = formBmi.weight;
const resultEl = document.getElementById("results");

// Function for the submit form
function resolveForm(e) {
    e.preventDefault();
    // Always clear the bmi index to prevent 
    if(!resultEl.classList.contains('view')) resultEl.classList.add('view');
    validateInput();
}

// Validate the inputs if they have anything
function validateInput() {
    if(weightEl.value === "" || heightEl.value ==="") {
        if(heightEl.value === "") heightEl.focus();
        else weightEl.focus();

        return false;
    }

    // Now if the input is nums of not
    const weight = weightEl.value;
    const height = heightEl.value;

    if(isNaN(weight)) weightEl.focus();
    else if(isNaN(height)) heightEl.focus();
    else {
        // calulate the bmi
        resultEl.textContent = `Your BMI is: ${bmiCalculate(weight, height).toFixed(2)}.
        Results: ${findRange(bmiCalculate(weight, height))}`;
        resultEl.classList.remove('view')

        // Clear the inputs
        weightEl.value = "";
        heightEl.value = "";
    }
}

// calculate bmi
function bmiCalculate(wei, hei) {
    return wei / Math.pow(hei/100, 2);
}

// function to return the value of the thing plus the bmi
function findRange(func) {
    const bmiIndex = func;

    //If statements
    if(bmiIndex < 18.5) return "underweight";
    else if(bmiIndex < 24.9) return "Normal weight";
    else if(bmiIndex < 29.9) return "Overweight";
    else return "Obese";
}

formBmi.addEventListener('submit', resolveForm);