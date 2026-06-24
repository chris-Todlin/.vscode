/* This is to handle a lof of things */
(function(){
    // get the form we are going to user
    const bookForm = document.forms.book;
    const messageEl = document.querySelector(".message");

    // get the data ina json file 
    function serializeData(){
        return {
            ISBN: bookForm.ISBN.value,
            title: bookForm.title.value,
            author: bookForm.author.value,
            genre: bookForm.genre.value
        };
    }

    // function to print a message with the delete btn 
    function printMessage(message, err = false){
        messageEl.innerHTML = ""; // clear it first 
        const p = document.createElement("p");

        if(err){
            p.classList.remove("alert-info");
            p.classList.add("alert-danger");
        } else {
            p.classList.add("alert-info");
            p.classList.remove("alert-danger");
        }

        p.classList.add("d-flex","align-items-center" ,"justify-content-between", "text-center", "alert");
        p.style.fontSize = "1.2rem"
        
        // now add the new html
        p.innerHTML = `
            <span>${message}</span>
            <button class="btn-close"></button>
        `;

        messageEl.append(p);

        // when the close btn is close 
        document.querySelector(".btn-close").addEventListener("click",(e)=>{
            e.target.parentElement.remove();
        });
    }

    // function to submit the form 
    async function submitFormData(e){
        try {
            e.preventDefault();
            
            const res = await fetch(bookForm.action,{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(serializeData())
            });

            // get the message 
            const resBody = await res.json();

            if(resBody === "Error in saving book"){
                printMessage(resBody,true);
                return; // nothing much 
            }

            // else 
            printMessage(resBody);
            // clear the inputs
            bookForm.ISBN.value = "";
            bookForm.title.value = "";
            bookForm.author.value = "";
            bookForm.genre.value = "";
            renderData(); // even here
        } catch (error) {
            printMessage("There was an error - unable to communicate with the server",true);
        }
    }

    // function to get the data and do the rest
    const renderEl = document.querySelector(".bold");

    // get the data from the book 
    async function renderData(){
        try {
            renderEl.classList.remove("text-center");
            // clear the innerHTML
            renderEl.innerHTML = "";
            // fetch the data 
            const res = await fetch("/book/books");

            // check the message
            const resBody = await res.json();
            console.log(resBody);

            // check of the body s okay 
            if(resBody === "No saved Books"){
                renderEl.textContent = resBody;
                renderEl.classList.add("text-center");
            } else {
                resBody.forEach(el => {
                    renderEl.innerHTML += `
                        <div class=" list-group-item d-flex justify-content-between align-items-center">
                            <p class="d-flex flex-column">
                                <span class="d-flex gap-3">
                                    <span>${el.title}</span>
                                    <span>${el.genre}</span>
                                </span>
                                <span>By ${el.author}</span>
                            </p>
                            <p class="d-flex flex-column gap-2" id = "${el._id}">
                                <button class="btn btn-primary btn-sm">Edit</button>
                                <button class="btn btn-primary btn-sm">Delete</button>
                            </p>
                        </div>
                    `;
                });
            }
        } catch (error) {
            renderEl.textContent = "Error in displaying data";
            renderEl.classList.add("text-center");
        }
    }

    // set the event listner
    bookForm.addEventListener("submit",submitFormData);
    document.addEventListener("DOMContentLoaded",renderData);
})();