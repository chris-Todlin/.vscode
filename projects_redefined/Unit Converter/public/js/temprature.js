/* A general purpose one to confirm there is a value of the  */
(function(){

    /// There is a problem in the selection to the select input field
    const tempForm = document.forms.temprature;

    const resultSection = document.querySelector(".secthid");

    // The values we have is the magnitude
    const val = tempForm.magnitude;
    const fromUnit = tempForm.from;
    const toUnit = tempForm.to;
    let state = true; // The form is hidden

    const from = returnSelected(fromUnit).toString().toLowerCase();
    const to = returnSelected(toUnit).toString().toLowerCase();

    // function to manipulate all of them
    function handleForm(e){
        e.preventDefault(); // prevent Submission

        validateNumber(from,to, val);
    }

    /* This is the DOM manipulation Js file for the temprature shit */

    // finding the selected itme in the to ans the other one
    function returnSelected(el){
        let toVal = "";
        for(let i = 0; i < el.length; i++) {
            if(el[i].selected){
                toVal = el[i].value;
            }
        }

        return toVal ? toVal : "";
    }

        // function to validate the form
        function validateNumber(from, to, val){
            const valNumber = parseFloat(val.value); // The converted number
            if(!isNaN(valNumber) && valNumber >= 0 && from !== to){
                const data = PopulateData(valNumber);

                // the next is to send the data
                sendData(data);
                return;
            }

            // Else -> prints a feeedback then focus the input of the val
            //message = "Number must be a number and greater than 0";
            return val.focus();
        }

        // function t validate the thwo string are in the array or else return 
        function PopulateData(value){
            // return 
            return {
                from: from,
                value: value,
                to: to
            };
        }

        // function to sendDat
        async function sendData(data){
            try {
                const response = await fetch(tempForm.action,{
                    "method": "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                const dataResponse = await response.json();

                appendData(dataResponse);
                setView();
            } catch (error) {
                console.error("There was an error");
                return;
            }
        }

        // function to now set the view of the hidden section on and the other one off
        function setView(){
            if(state){
                // remove the visibility of the class
                tempForm.classList.add("hidden");
                resultSection.classList.remove("hidden");
                state = false;
            } else {
                // remove the visibility of the class
                tempForm.classList.remove("hidden");
                resultSection.classList.add("hidden");
                state = true;
            }
        }

        // function to append the data
        function appendData(responseData){
            resultSection.innerHTML = "";

            resultSection.innerHTML = `
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Conversion Results</h3>
                        </div>
                        <div class="card-body">
                            <p class="card-text displayresult">
                                ${responseData.value} ${responseData.from} = ${responseData.result} ${responseData.to}
                            </p>
                        </div>
                        <div class="card-footer d-grid">
                            <button type="button" id="resetBtn" class="btn btn-primary">Reset</button>
                        </div>
                </div>
            `;

            // the button to sett he view offf
            document.getElementById("resetBtn").addEventListener("click", setView); // removes the view
        }

        // what of the temprature one
        tempForm.addEventListener("submit",handleForm);
})();