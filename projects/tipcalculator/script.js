/* Getting the form and detaling with the details of it */
const formTip = document.forms.tipDetails; // Thee form
const amount = formTip.billAmount;
const percent = formTip.tipPercentage;

// On form sunmission, find the 
formTip.addEventListener('submit',(e)=>{
    // Prevent the default behaviour of the page which causes it to reload
    e.preventDefault();
    
    // The data to handle for us
    const amountVal = parseInt(amount.value);
    const percentVal = parseInt(percent.value);
    // Check if the input hass all the data
    if(!isNaN(amountVal)&&!isNaN(percentVal)) {
        // Calculate the total amount
        document.getElementById('amount-total').textContent = amountVal*((percentVal+100)/100);

        // Clear the outputs
        amount.value = "";
        percent.value = "";
    }
})