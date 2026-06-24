/* This file is to render the the task in the manner of th all gotern right */
(function(){
    // get the article to control
    const renderArticle = document.querySelector(".tasks");

    // function to get the task 
    async function getTasks(){
        try {
            const res = await fetch("/task/alltasks");

            const resTasks = await res.json();

            const tasks = resTasks.tasks; // this are the saved tasks

            if(tasks.length){
                // function to render the tasks
                renderTasks(tasks);
            } else {
                renderArticle.innerHTML = ""; // clear it first 
                
                const p = document.createElement("h2");

                p.classList.add("text-center");
                p.textContent = "No saved Tasks";

                renderArticle.append(p);
            }
        } catch (error) {
            console.error("Unable to connect");
        }
    }

    // function to render the tasks
    function renderTasks(data){
        renderArticle.innerHTML = ""; // clear it first 

        // now for each of the taks
        data.forEach(el => {
            // create the div and append the data
            const section = document.createElement("section");
            section.classList.add("card");
            section.setAttribute("id", el._id);
            section.setAttribute("title", "To open task, double click on it");

            section.innerHTML = `
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h3>${el.title}</h3>
                    <span class="badge bg-danger">${el.category}</span>
                </div>
                <div class="card-body">
                    ${el.description}
                </div>
            `;

            // append all of them
            renderArticle.append(section);

            // try it out
            findSect(); // now it is planted
        });
    }

    // function to take in the section on the page
    function findSect(){
        const sections = document.querySelectorAll("section.card");
        console.log(sections); // see if it if responding to the DOM function

        // now let's go right into it
        sections.forEach(el=>{
            // add the eventlisteer
            el.addEventListener("dblclick",(e)=>{
                console.log(el.id);
                // render the new view or redirect to the new location
                location.href = `/task/viewtask/${el.id}`;
            })
        })
    }

    // function to get all the task on board
    getTasks();
})();