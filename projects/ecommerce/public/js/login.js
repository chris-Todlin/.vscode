/* Function to log the user */

// Get the form DOM
const loginForm = document.forms.login;

// function to get the data from the form
function getData(){
    return {username: loginForm.username.value, password: loginForm.password.value};
}

// function to submit data
async function submitData(url, data){
    await fetch(url,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(async(res)=>{
        const response = await res.json();

        if(res.ok){
            location.href = response.redirectUrl
        } else {
            displayMessage('There was an error. Try Again!')
        }
    }).catch((err)=>{
        displayMessage('We encountered an error, check if you are online!');
    })
}

// function to display message
function displayMessage(message){
    const div = document.querySelector('.error');

    div.innerHTML = ""; // Clear it

    const p = document.createElement('p');
    p.textContent = message;

    div.append(p);

    // now remove the class
    div.classList.remove('invisible');

    // set it after 3sec
    setTimeout(()=>div.classList.add('invisible'),3000);
}

// function to login the user
function loginUser(e){
    e.preventDefault();
    submitData(loginForm.action, getData());
}

// Add the event listenr
loginForm.addEventListener('submit', loginUser);