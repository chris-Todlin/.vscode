const allButtons = document.querySelectorAll('.addcart');

//function to fetch the data on id
function sortData(btn){
    const parent = btn.parentElement;
    const price = parent.children[2].children[1].textContent;
    const name = parent.children[1].textContent;
    const id = parent.id;

    return {
        id: id,
        name: name,
        price: price
    };
}

// function to display message
function displayMessage(message){
    const div = document.querySelector('.error');

    div.innerHTML = ""; // Clear it

    const p = document.createElement('p');
    p.textContent = message;

    div.append(p);

    // now remove the class
    div.classList.remove('invisible');

    // set it after 3sec
    setTimeout(()=>div.classList.add('invisible'),3000);
}

// function to add them to cart
async function submitData(url, data){
    await fetch(url,{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(async(res)=>{
        const response = await res.json();

        if(res.ok){
            displayMessage('Added to cart!');
        } else {
            displayMessage('There was an error. Try Again!')
        }
    }).catch((err)=>{
        displayMessage('We encountered an error, check if you are online!');
    })
}

// Attach the event listner
allButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        submitData('http://localhost:3000/add-to-cart', sortData(btn));
    });
});