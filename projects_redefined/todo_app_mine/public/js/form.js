(function(){
    const form = document.forms.signin; // the sin in form
    const messageEl = document.querySelector(".mess");

    // function to send the data to the server
    async function sendData(){
        try {
            const data = await fetch(form.action, {
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({username: form.username.value, password:form.password.value})
            });

            // get the data
            const res = await data.json();
            displayMessage(res.message);
            console.log(res);
        } catch (error) {
            displayMessage("There was an error. Try again!");
        }
    }

    // function to ssubmit form 
    function submitForm(e){
        e.preventDefault();
        sendData();
    }

    // function to display message
    function displayMessage(mess){
        document.getElementById("spanMessage").textContent = mess;
        messageEl.style.opacity = 1;
    }

    const btnClose = document.querySelectorAll(".messBtn");
    document.querySelector(".btnClose").addEventListener("click",(e)=>{
        messageEl.style.opacity = 0;
    });

    if(btnClose.length){
        // only if there are there
        btnClose.forEach(btn =>{
            btn.addEventListener("click",(e)=>{
                e.target.parentElement.remove(); // remove the parent Element
            })
        });
    }

    //form.addEventListener("submit", submitForm);
})()