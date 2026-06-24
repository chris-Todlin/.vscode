/* Javascript file for the client side validation */

const signUpForm = document.forms.signup;
const pass = signUpForm.password;
const repass = signUpForm.repass;
const username = signUpForm.username;
const infoDiv = document.querySelector(".divMessage");

/* Our main interset is the pass and the reppass are they equals if not then flag it */

// function to check if the password are equals or not
function isSamePass(){
    if(pass.value === repass.value){
        // continue with where ou are going
        sendData(username.value, pass.value)
        return; // close the flow
    }

    // if that has not happened
    repass.focus();
    displayMessage("Passwards do not match");
}

// function to set the message
function displayMessage(message/* String */){
    // append the data after clearing the div

    infoDiv.innerHTML = "";

    // add the data
    infoDiv.innerHTML = `
        <button type="button" class="btn-close closeit" data-bs-dismiss="alert"></button>
        <p class="error">${message}</p>
    `;
    // remove the hidden class on it
    infoDiv.classList.remove("notshowing");
}

// function to send the data to the server
async function sendData(username,password){
    try {
        // the data in question
        const data = {
            username: username,
            password: password
        };

        const response = await fetch("/signup",{
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.ok && response.url === "http://localhost:3000/"){
            displayMessage("Signed Up!");
            setTimeout(()=>{
                location.href = response.url;
            },2000);
        } else {
            // the message to display
            const message = await response.json();
            displayMessage(message.message || "Unable to process your request");
        }
    } catch (error) {
        displayMessage("Error in sending data to the server. Check of you are online?");
    }
}

// function to stop form submission
function submitForm(e){
    e.preventDefault();
    
    // the function
    isSamePass();
}

// add the eventlistner to it
signUpForm.addEventListener("submit",submitForm); // now it is activated