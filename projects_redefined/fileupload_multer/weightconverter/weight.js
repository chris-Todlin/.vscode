/* A weight converter application on the web */
(function(){
    // Get the DOM element to use
    const weightInput = document.getElementById('weight');

    /* 
        ipound = 453.5923g
        ipound = 0.4535923kg
        1pound = 16
    */
    function conversion(val){
        const sectionAppend = document.querySelector('.output');

        // Clear the inner html
        sectionAppend.innerHTML = '';

        // Append the body
        sectionAppend.innerHTML = `
            <div class="grams view">
                <b>Grams:</b>
                <p id="grams">${(val*453.5923).toFixed(4)} g</p>
            </div>
            <div class="kilograms view">
                <b>Kilograms:</b>
                <p id="kilograms">${(val*0.4535923).toFixed(4)} Kg</p>
            </div>
            <div class="ounces view">
                <b>Ounces:</b>
                <p id="ounces">${(val*16).toFixed(4)} Oz</p>
            </div>
        `;

        // animate the messae
        animateMessage('Converted your pounds to [g, Kg, Oz]');
    }

    // function to handle input
    function outputWeight(e){
        const valueInput = parseFloat(weightInput.value);
        if(valueInput){
            conversion(valueInput); // convert
            return;
        }

        // else return that the input is n
        animateMessage('Check your input, less than or zero');
    }

    // function to display a message
    let timeOut; //for the interval
    function animateMessage(message){
        const messageEl =document.querySelector('.message');

        if(message){
            messageEl.style.display = 'block';
            messageEl.innerHTML = `
                ${message}
                <button onclick = "parentElement.style.display = 'none'">X</button>
            `;
            messageEl.classList.add('animate_message');

            // remove after some second
            const time = 3000;
            if(timeOut) time = 3000;
            timeOut = setTimeout(()=> {
                messageEl.classList.remove('animate_message');
                messageEl.style.display = 'none';
            },time);
            return;
        }

        messageEl.style.display = 'none';
    }

    // Add an event listenre for it to coonsolelo the result on change
    animateMessage();
    weightInput.addEventListener('change',outputWeight);
})(); // To prevent global pullotion