/* This is the js file to submit the form of the sign up data */

(function(){
    // function to get the form and strip off the data in it
    function getData(formName){
        // get the data from the form in questions
        const data = {
            username: formName.username.value || '',
            password: formName.password.value || '',
            userpass: formName.repass.value || ''
        };

        // Check for the empty data in anycase
        for(name in data){
            if(!data[name]){
                alert("Empty inputs!!!")
                return;
            }
        }

        // check if the userpass is equale to the passowrd
        if(!(data.password === data.userpass)){
            const messageEL = document.getElementById("message")
            messageEL.textContent = "Passwords do not match";
            messageEL.style.display = "block";

            setTimeout(()=>messageEL.style.display = "none",3000);
            // then return 
            return;
        } 

        return data;
    }

    // function to submit the data 
    async function sendDataToServer(formName){
        const messageEL = document.getElementById("message");
        const data = getData(formName);

        if(!data){
            return;
        }

        try{
            const res = await fetch(formName.action,{
                method: 'POST',
                headers: { "Content-type":"application/json","Accept":"application/json" },
                body: JSON.stringify(data)
            });

            const body = await res.json();
            const message = body?.message || body || 'Unexpected response';
            const success = res.ok && body?.success !== false;

            messageEL.textContent = message;
            messageEL.className = success ? 'message success' : 'message error';
            messageEL.style.display = 'block';

            if(success){
                setTimeout(() => {
                    messageEL.style.display = 'none';
                    if(body.redirect){
                        location.href = body.redirect;
                    }
                }, 2400);
            } else {
                setTimeout(() => {
                    messageEL.style.display = 'none';
                }, 3000);
            }
        } catch(e){
            const messageEL = document.getElementById("message");
            messageEL.textContent = 'Unable to submit signup form. Please try again.';
            messageEL.className = 'message error';
            messageEL.style.display = 'block';
            setTimeout(() => messageEL.style.display = 'none', 3000);
        }
    }

    // trial with from 
    document.forms[0].addEventListener('submit',(e)=>{
        e.preventDefault();
        sendDataToServer(e.target);
    })
})()