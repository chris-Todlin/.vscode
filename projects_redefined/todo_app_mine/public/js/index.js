/* This is the main file of the server for the index.ejs */
(function(){
    const addBtn = document.getElementById("addBtn");
    const overlay = document.querySelector(".overla");
    const modal = document.querySelector(".moda");
    const closeBtn = document.querySelector(".closeBtn");
    const divBtn = document.querySelector(".button");
    const btnClose = document.querySelectorAll(".btn-close-me");
    const form = document.forms.form;
    const headH2 = document.querySelector(".head h2");
    const headBtn = document.querySelector("#form button");
    const spinnerEl = document.querySelector(".spi");
    const taskList = document.getElementById("tasksList"); // for the ul of the lists

    // add an event listner that when you scoll the add button should go away
    window.addEventListener("scroll", ()=>{
        addBtn.style.display = "none";
    })

    window.addEventListener("scrollend", ()=>{
        addBtn.style.display = "block";
    })

    if(addBtn){
        addBtn.addEventListener("click",(e)=>{
            overlay.style.display = "flex";
            headH2.textContent = "Add task";
            headBtn.textContent = "Add task";
            form.action = "/task"; // the one for th add 

            addBtn.style.display = "none";
        });
    }

    if(closeBtn){
        closeBtn.addEventListener("click",()=>{
            overlay.style.display = "none";
            addBtn.style.display = "block";
        });
    }

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
            addBtn.style.display = "block";
        }
    });

    // function to get the value of the select 
    async function sendData(){
        try {

            const data = await fetch(form.action,{
                method: "POST", 
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({title: form.title.value,category: form.category.value, description: form.description.value})
            });

            const res = await data.json();

            if(res.message === "Task created!"){
                displayMessage(res.message);
                // clear the inputs and clear it out 
                form.title.value = "";
                form.category.value = "";
                form.description.value = "";

                // disable the modal 
                // return the spinner and the form 
                spinnerEl.style.display = "none";
                modal.style.display = "flex";
                overlay.style.display = "none";
                addBtn.style.display = "block";
                return;
            }

            displayMessage(res.message); // just display the message
        } catch (error) {
            displayMessage("Error in sending data. Try again!")
        }
    }

    // funciton to display a message
    function displayMessage(message){
        const messageEl = document.getElementById("message");

        messageEl.textContent = message;

        messageEl.parentElement.style.display = "flex";
    }

    // this functon is going to append the body of the data 
    // from the server in all the costs
    /* 
        index.js:105 {tasks: Array(1)}
        category: "personal"
        description: "Mwakai is my name\n"
        status: false
        title: "mwakai"
        username: "69fe3ec0b79a8869797a8c1c"
        __v: 0
        _id: "6a003b55d016df080be764a3"

    */
    function renderTasks(data){
        // create the li as per the datalength 
        data.forEach(task=>{
            // create the li
            const li = document.createElement("li");
            li.classList.add("list-item","card"); // the class list needed

            // add te text content of the list
            li.innerHTML = `
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3>${task.description}</h3>
                    <span class="badge">${task.status ? "Completed" : "Pending"}</span>
                </div>
                <div class="card-body">${task.description}</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <div>
                        ${task.category}
                    </div>
                    <div>
                        <button class="menu-btn">⋮</button>
                        <ul class="menu" id="${task._id}">
                            <li>Edit</li>
                            <li>Delete</li>
                        </ul>
                    </div>
                </div>
            `;

            // now append the body of teh li
            taskList.append(li);

            /* 
                This is for the iconic dropdown menu on the lower end
                It is for the clustering of events
            */
            document.querySelectorAll(".menu-btn").forEach(btn=>{
                btn.addEventListener("click",()=>{
                    const menu = btn.nextElementSibling;

                    document.querySelectorAll(".menu").forEach(mnu=>{
                        mnu.style.display = "none";
                    }); // set all of teh to no display

                    // display the click one
                    menu.style.display = "block";
                });
            });

            // Optional: close menu when clicking outside
            document.addEventListener("click", (e) => {
                if (!e.target.classList.contains("menu-btn")) {
                    document.querySelectorAll(".menu").forEach(m => m.style.display = "none");
                }
            });
        });
    }

    // function to get all the data loaded inside the container of the tasks
    async function getTasks(){
        try {
            const res = await fetch("/task/all");
            
            // get the response out
            const data = await res.json();
            const tasks = data.tasks;

            // noe get a function to append the data on boeard
            if(!tasks.length){
                taskList.innerHTML = "";

                // create a p element and attach the message
                const h3 = document.createElement("h3");
                h3.classList.add("text-center");
                h3.textContent = "No Saved Tasks!";
                taskList.append(h3); // add it to the body
            } else {
                renderTasks(data.tasks); // render the tasks
            }

            console.log(tasks); // prin them out for me to see them
        } catch (error) {
            taskList.innerHTML = "";

            // create a p element and attach the message
            const h3 = document.createElement("h3");
            h3.classList.add("text-center");
            h3.textContent = "Error in fetching results";
            taskList.append(h3); // add it to the body
        }
    }

    btnClose.forEach(btn => {
        btn.addEventListener("click",(e)=>{
            e.target.parentElement.style.display = "none";
        })
    });

    // function to send the form 
    function submitData(e){
        e.preventDefault();
        // remove the form
        modal.style.display = "none",
        spinnerEl.style.display = "flex";
        
        setTimeout(()=>{
            sendData();
        },1500);
    }

    // is the body loads it should get the data onboard
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", submitData);

})()