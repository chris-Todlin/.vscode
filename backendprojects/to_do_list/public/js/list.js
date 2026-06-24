/* This is the functional js file to send the list item and get the list items in the fromentded */

(function(){
    "use strict"; // enforce and reduce errors

    const todoForm = document.forms.todo;
    const editForm = document.forms.edit;
    const renderEl = document.querySelector(".render");
    const sectionMessage = document.querySelector(".sectMess");
    const contElMessage = document.querySelector(".bod");

    window.addEventListener("DOMContentLoaded", appendData);// append the data after the window has loaded

    // function on submission of the form
    function submitTodo(e){
        e.preventDefault();
        sendData(e.target);
    }

    // Function to get the data on boards
    async function sendData(todoForm){
        const task = todoForm.todo; // The element

        if(!task.value){
            // then do not continue with the execution of the program
            return;
        }

        // get the data on the list 
        const data = {task: task.value.trim()}

        try {
            // now send the data to the server
            const response = await fetch(todoForm.action,{
                "method": "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            // clear the inner html for the input
            //location.href = "/";
            task.value = "";

            if(response.ok){
                // append  the data to the ul
                appendData();


                const res = await response.json();

                messageAppend(res.message);
                if(todoForm === "editForm"){
                    location.href = response.url
                }
            } else {
                alert('There was a problem data response');
            }
        } catch (error) {
            alert("There was an error sending the data");
            console.error(error);
        }
    }

    // Function to append the data
    function appendLi(data){
        const li =  document.createElement("li");

        // add the classes on the list
        li.classList.add("card");
        li.innerHTML = `
            <p class="card-body">
                    ${data.todo}
            </p>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <a href="/edit/${data.id}" class="btn btn-primary">Edit Todo</a>
                <a href="/delete/${data.id}" class="btn btn-danger">Delete Todo</a>
            </div>
        `;

        // then appen it in the body
        renderEl.append(li);
    }

    // function to get the data from the tasks and then append them on the li
    async function appendData(){
        try {
            const res = await fetch("/tasks",{
                method: "GET"
            });

            if(res.ok){
                // getting the bod
                const tasks = await res.json();

                // clear the inner html of the ul
                renderEl.innerHTML = "";

                if(tasks.length){
                    tasks.forEach(el => {
                        appendLi(el);
                    });
                } else {
                    renderEl.innerHTML = `
                        <p class = "text-center">No saved Todos</p>
                    `;
                }
            } else {
                renderEl.innerHTML = `
                        <p class = "text-center">No saved Todos</p>
                    `;
            }
        } catch (error) {
            alert("There was an getting data");
            console.error(error);
        }
    }

    // function to appen message
    function messageAppend(message){
        const p = document.createElement("p");

        p.textContent = message;

        contElMessage.innerHTML = "";

        contElMessage.append(p);

        sectionMessage.classList.remove("hide");

        setTimeout(()=> sectionMessage.classList.add("hide"), 2000);
    }

    // attach the event lisnete
    if(todoForm){
        todoForm.addEventListener("submit",submitTodo);
    } else {
        editForm.addEventListener("submit",submitTodo);
    }
})();