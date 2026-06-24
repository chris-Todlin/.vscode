// get the response and render it
async function getResponse() {
    const qouteEl = document.getElementById('qoute');
    try {
            const headers= {
            AccessControlAlowwOrigin: true,
        }

        // Set the color to normal 
        qouteEl.style.color = "";
        
        // Get the response via the fetch await
        const response = await fetch("http://localhost:3000/api/qoute", headers);

        const data = await response.json();

        // the place to render our qoute
        qouteEl.textContent = data.text;

    } catch(error) {
        console.log('Failed to get data!');
        qouteEl.textContent = "Failed to fetch qoute. Please connect to internet to get one!";
        qouteEl.style.color = "red";
    }

    function randomQuote() {
    fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then(result => {
            quoteText.innerText = result.content;
            document.body.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        });
}
}

getResponse();

// If the button is clicked it should get another one
document.getElementById("genQoute").addEventListener('click', getResponse);