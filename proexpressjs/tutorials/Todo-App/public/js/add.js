// the function  to handle the data here in our application
(function(){
    "use strict"; // to ensure no collision of names and free the space for others
    /* The document conteainer we are going to extensively use */
    const messageDiv = document.getElementById("message");
    const messageEl = document.querySelector(".mess");
    const formAdd = document.forms.add; // the form for addign the task
    const todoSect = document.getElementById("todo"); // where the list is for the rendering of the todos

    // function to get the input and print it in the message sesction
    function getInputData(e){
        e.preventDefault();
        const name = formAdd.name.value; // the input content

        // try the message 
        saveTodo(name);
        // clear the input
        formAdd.name.value = "";
    }

    // send the data to the server
    async function saveTodo(todo){
        try {
            const res = await fetch("/",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({name: todo})
            });

            // get the json out 
            const body = await res.json();
            if(res.ok && body){

                // if the body is no naem provide 
                if(body === "No name is provided"){
                    formAdd.name.focus(); // focus it
                    displayMessage(body, true);
                    return;
                }

                displayMessage(body);
                getAllTodos();
            }
        } catch (error) {
            console.error(error);
            // sisplay the mess 
            displayMessage("We encontered a problem while saving todo",true);
        }
    }

    // function to diplay the message
    function displayMessage(message, err = false){
        // now apply the remove of the classlist
        messageDiv.classList.remove("hide");

        // if it is an err, apply the one on the selected
        if(err){
            messageDiv.classList.replace("success","error");
        } else {
            messageDiv.classList.replace("error","success");
        }

        //add it to the messageDiv
        messageEl.textContent = message;
    }

    // function to get the data from server
    async function getAllTodos(){
        // send teh request to the server
        try {
            // fetcth teh data from the server
            const res = await fetch("/tasks");
            const data = await res.json(); // get the data
            // render the tods
            renderTodos(data);
        } catch (error) {
            // say there was an error in getting the data theres in 
            console.error(error);
            todoSect.textContent = "There was an error in fetching data.";
        }
    }

    // function to render data
    function renderTodos(data){
        if(data.length){
            // clear the inner html
            todoSect.innerHTML = "";
            // render the task 
            // for each tot create the li and add the data there in
            data.forEach(todo => {
                // create the li 
                const li = document.createElement("li");

                li.classList.add("list-item");

                // add the data there in 
                li.innerHTML = `
                    <form action="/todo/${todo._id}" method="post">
                        <input type="checkbox" class = "completeCheck"  name="completed" id="${todo._id}" title="Mark as complete">
                    </form>
                    <span class="content">${todo.name}</span>
                `;

                if(data.completed){
                    console.log("hre")
                    document.querySelector(".completeCheck").checked = true;
                }

                // append the function 
                todoSect.append(li);

                // attach the event listner here 
                document.querySelectorAll(".completeCheck").forEach(checkBx=>{
                    checkBx.addEventListener("change",(e)=>{
                        setCompletedTodo(e.target.id);
                    })
                })
            });
            return;
        }

        // else tell the user no tasks there in
        todoSect.textContent = "No saved Todo!";
    }

    // function to toggle the completed to true in the section
    async function setCompletedTodo(id){
        try {
            // send the data to the server
            const res = await fetch(`/todo/${id}`,{
                method: "PUT"
            });

            const data = await res.json();
            displayMessage(data);
        } catch (error) {
            displayMessage("Encountered an error!", true);
        }
    }

    // function to remove the message div on the button close
    function closeMessageDiv(){
        messageDiv.classList.add("hide"); // shold go off
    }

    // when the body load get the data onside
    document.addEventListener("DOMContentLoaded",getAllTodos); // fetch them

    // attach the event lister
    document.getElementById("message-close").addEventListener("click",closeMessageDiv);

    // attach the eventlistener
    formAdd.addEventListener("submit",getInputData); // hope it works
})()