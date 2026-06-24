/* Form to handle the [ressure] */
const form = document.forms.signup;

// function to handle the form
function signUpUser(e){
    e.preventDefault();
    const name = form.name.value; // The name entered by the user
    signUser(form.action, name); // Handle the submission
}

// Async function to send the data to the server
async function signUser(url,name) {
    await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: name})
    })
    .then(async(res)=>{
        if(res.ok) {
            if(res.redirected) location.href = res.url;
        }
    }).catch((err)=>{
        return;
    })
}

form.addEventListener('submit',signUpUser); // the sumit handler