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
        try{
            const res = await fetch(formName.action,{
                method: 'POST',
                headers: { "Content-type":"application/json"},
                body: JSON.stringify(getData(formName))
            });

            const body = await res.json()

            if(res.ok){
                alert(body)

                if(res.redirected){
                    location.href = res.url;
                }
            } else {
                alert('Failure in response')
            }
        } catch(e){
            alert(e);
        }
    }

    // trial with from 
    document.forms[0].addEventListener('submit',(e)=>{
        //e.preventDefault();
        sendDataToServer(e.target);
    })
})()