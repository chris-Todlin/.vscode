/* Function to get the filtered tasks on the list of */

/* This file is to render the the task in the manner of th all gotern right */
(function(){
    // get the article to control
    const renderArticle = document.querySelector(".tasks");
    const cat = document.getElementById("cat");

    // function to get the task 
    async function getTasks(filter){
        try {
            const res = await fetch(`/task/filter/${filter}`);

            const resTasks = await res.json();

            const tasks = resTasks.filteredTasks; // this are the saved tasks


            if(tasks.length){
                // function to render the tasks
                renderTasks(tasks);
            } else {
                renderArticle.innerHTML = ""; // clear it first 
                
                const p = document.createElement("h2");

                p.classList.add("text-center");
                p.textContent = `No ${filter} Tasks!!!`;

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
            section.classList.add("card","sect");
            section.setAttribute("id", el._id);

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
        });
    }

    // function to get the selectedValue right
    function selectedValue(){
        const selectedOpt = document.querySelectorAll(".cat option");
        let selectedVal;

        selectedOpt.forEach(el=>{
            if(el.selected) {
                selectedVal = el.value;
            }
        });

        return selectedVal; // return it
    }

    // an event listener to the cat incase of the 
    cat.addEventListener("change",(e)=>{
        // get the filter value
        const filter = selectedValue(); // do it

        // then run the function to append the data
        getTasks(filter);
    });
})();