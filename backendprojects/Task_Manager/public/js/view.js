/* This is to monitor the behaviour of the file when the back button is clicked */
(function(){
    // get the id of task
    const id = location.href.substring(location.href.lastIndexOf("/"));
    // get the button on the edit
    document.getElementById("edit").addEventListener("click", ()=>{
        location.href = `/task/edittask${id}`;
    });

    // get the span
    const spanEl = document.querySelector("span");

    // function to toggle the wa it looks
    function toggleComplete(){
        if(spanEl.textContent = "Mark as Complete") {
            spanEl.classList.add("bg-success");
            spanEl.classList.remove("bg-info");
            spanEl.textContent = "Completed";
        } else if(spanEl.textContent = "Completed") {
            console.log("I am here")
            spanEl.classList.remove("bg-success");
            spanEl.classList.add("bg-info");
            spanEl.textContent = "Mark as Complete";
        }
    }

    spanEl.addEventListener("click", toggleComplete); // done now
})();