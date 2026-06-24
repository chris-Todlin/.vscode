/* Form elements */
const form = document.forms.currency;
const amount = form.amount;
const from = form.from;
const to = form.to;
const resultEl = document.getElementById("result");

// function to prevent default
function handleForm(e) {
    e.preventDefault();

    // Check of the val entered is anumber and the number is greater than 0
    const amountVal = parseInt(amount.value);

    if(isNaN(amountVal)) {
        alert('Please enter a real number');
        amount.focus();
        return;
    }

    // If the amount is lessthan 0
    if(amountVal <= 0) {
        alert('Please enter a number greater than 0');
        amount.focus();
        return;
    }
    // now print form done
    convertCurrency()

    amount.value = "";
}

// function to handle the request
async function convertCurrency() {
    // The variable to use today
    let convertedAmount;
    // Now send the response to the server
    await fetch(`http://localhost:5000/convert/${from.value}/${to.value}/${amount.value}`,).
    then(async(response)=> {
       const responseBody = await response.json();
       convertedAmount = responseBody.convertedAmount; // The converted amount
    })
    .finally(()=>{
        resultEl.textContent = convertedAmount;
    })
    .catch((err)=> {
        alert(err);
    });
}

// the event listener
form.addEventListener('submit', handleForm);