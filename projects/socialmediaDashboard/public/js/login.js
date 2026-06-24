/* Get te data */
const loginForm = document.forms.login;

// function to ectract the dta
function extractDate(){
    return {name: loginForm.username.value, password: loginForm.userpass.value};
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
        const response =  await res.json();
        displayMessage(response.message);

        if(response.message == "Logged in"){
            location.href = `${response.urlDirect}/${data.name}`;
        }
    }).catch(err=>{

    })
}

// Function to respond to error or message
function displayMessage(message){
    const div = document.querySelector('.error');

    div.innerHTML = ""; // clear it first

    if(message == "Logged in") div.style.backgroundColor = "green";
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
    const userData = extractDate();
    sendData(loginForm.action, userData);
}

loginForm.addEventListener('submit', checkPass);