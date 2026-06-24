/* This is the file to handle the search of the file */
(function(){
    // get the search btn and input
    const searchBtn = document.getElementById("searchbtn");
    const searchInput = document.getElementById("searchinput");
    const searchEl = document.querySelector(".search");
    const resultEl = document.querySelector(".res");
    const favList = document.querySelector(".favlist");
    const saveBtns = document.querySelectorAll(".saveTask");

    // function to display an error message
    function displayMessage(message){
        const p = document.createElement("p");

        p.classList.add("alert","alert-danger","text-center", "mess");
        p.style.fontSize = "1.2rem"

        p.textContent = message;

        searchEl.append(p);
    }

    // function to search Movie
    async function searchMovie() {
        // get the input message
        const movieName = searchInput.value;
        const messageEl = document.querySelector(".mess");

        if(messageEl){
            messageEl.remove();
        }

        if(movieName){
            // set the spinner on
            resultEl.innerHTML = "";

            resultEl.innerHTML = `
                <div class="load text-center">
                    <span class="loading loading-spinner spinner-border py-1 text-success"></span>
                </div>
            `;
            searchMovieName(movieName);

            // clear it
            searchInput.value = "";
        } else {
            searchInput.focus(); // focus the input
            displayMessage("Enter movie name");
        }
    }

    // function to send and render the response and deal witt it
    async function searchMovieName(movieName) {
        try {
            const res = await fetch(`/movie/search/${movieName}`);
            const data = await res.json();

            if(!res.ok){
                resultEl.innerHTML = `
                    <div class="message message-block text-center text-danger-emphasis">
                        <h2>Sorry, unable to connect!</h2>
                    </div>
                `;
            } else if(data){
                resultEl.innerHTML = "";

                data.Search.forEach(el => {
                    resultEl.innerHTML += `
                        <div class="card" id ="${el.imdbID}-${el.Type}">
                            <div class="card-img-top">
                                <img src="${el.Poster}" alt="image">
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                <div class="d-flex gap-1">
                                    <h3 class="card-title">${el.Title} :</h3>
                                    <h3>${el.Year}</h3>
                                </div>
                                <div class="butt">
                                    <button id="${el.Title}" class="fav btn">Favourite</button>
                                    <button class="saveTask btn">Save As Task</button>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }

            // add the event listenr if there is a fa
            const favBtns = document.querySelectorAll(".fav");
            const saveBtns = document.querySelectorAll(".saveTask");
            if(favBtns){
                favBtns.forEach(el=>{
                    el.addEventListener("click",setFav);
                })
            }
            // if the buttons are all good so that no error are genrate 
            if(saveBtns){
                saveBtns.forEach(el=>{
                    el.addEventListener("click",saveTask);
                })
            }

        } catch (error) {
            resultEl.innerHTML = `
                <div class="message message-block text-center text-danger-emphasis">
                    <h2>Sorry, unexpected error occured</h2>
                </div>
            `;
        }
    }

    // function to print out the parentElement title of that movie
    async function setFav(e){
        const title = e.target.id; // title of the favorite 

        //send it to the server
        const res = await fetch("/movie/favorite",{
            method: "POST",
            body: JSON.stringify({title: title}),
            headers: {
                "Content-Type" :"application/json"
            }
        })

        const response = await res.json();

        if(res.ok && response.message  === "saved"){
            favoriteFetch();
        }
    }

    // add an event listenr
    searchBtn.addEventListener("click",searchMovie);

    // for my dear enter lover
    searchInput.addEventListener("keydown",(e)=>{
        if(e.key === "Enter"){
            searchMovie(); // do it there
        }
    });

    // function to render the body of the favs
    async function favoriteFetch() {
        const res = await fetch("/movie/fetchfav");

        const data = await res.json();

        // clear the f
        favList.innerHTML = "";

        if(data.favs.length){
            data.favs.forEach(el=>{
                // create the p and attach it 
                const li = document.createElement("li");

                li.setAttribute("id",el._id); // id

                li.classList.add("list-group-item", "d-flex", "justify-content-between");

                li.innerHTML = `
                    <h3 class="title">${el.title}</h3>
                    <p class="link link-info"><a href="https://google.com/search?q=${el.title} movie" target="_blank">View Movie</a></p>
                `;

                favList.append(li);
            })
        } else {
            favList.innerHTML = "<h3 class= 'text-center'>No Favorites</h3>";
        }
    }

    // function to save the As the Task 
    async function saveTask(e){
        console.log(e.target);
    }

    if(saveBtns){
                saveBtns.forEach(el=>{
                    el.addEventListener("click",saveTask);
                })
            }


    favoriteFetch();
})();