/* Get te data */
const signupForm = document.forms.signup;

// Check of the pass are the same
function checkPassword(){
    const pass = signupForm.userpass.value;
    const passReenter = signupForm.userrepass.value;

    if(passReenter !== pass){
        displayMessage('Passwords do not match!')
        return;
    } else {
        displayMessage("All good");
    }
}

// function to ectract the dta
function extractDate(){
    return {name: signupForm.username.value, password: signupForm.userpass.value};
}

// Function to send the data
async function sendData(url,data){
    await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async(res)=>{
        if(res.redirected){
            location.href = res.url;
        }
    }).catch(err=>{

    })
}

// Function to respond to error or message
function displayMessage(message){
    const div = document.querySelector('.error');

    div.innerHTML = ""; // clear it first

    if(message === "All good") div.style.backgroundColor = "green";
    else div.style.backgroundColor = "brown";

    div.innerHTML = `
        <p>${message}</p>
    `;

    div.classList.replace('invisible', 'visible');

    // Attach an event listner to fire
    setTimeout(()=> div.classList.replace('visible', 'invisible'), 2000);
}

// Function to check padd
function checkPass(e){
    e.preventDefault();
    checkPassword();
    const userData = extractDate();
    console.log(userData)
    sendData(signupForm.action, userData); 
}

signupForm.addEventListener('submit', checkPass);