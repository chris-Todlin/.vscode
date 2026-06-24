/* To Do List App - Script */

// These are the elements we want to control in the html file
const btnEl = document.getElementById("add-btn");
const listEl = document.getElementById("todo_list");
const inputEl = document.getElementById("taskInput"); // The input element and access to the html bit

// Function to add the taks
/* 
            ACTION
    => The user click the button, eventListener fires up
    => Get the input of the user
    => Check if the user input as some dirt on it to continue
    => Else alert the user
    => Extract the value of the input
    => Create the li and add the value of the above its textContent
    => AppendChild to the listEl
*/

function addTask(){
    const li = document.createElement('li'); // Our dear li

    // If there is some dirt, continue
    if(inputEl.value){
        // This is where we would work on\
        li.textContent = inputEl.value.trim(); // trim the whitespace there in
        listEl.appendChild(li);
    } else {
        alert("Please enter a valid value"); // Give the user some feedback instead of silent response to it
        inputEl.focus();
    }

    // Clear the input after all stufff
    inputEl.value = "";
}

// The button is my main event part as it is where my click event listener would sit
btnEl.addEventListener('click', addTask);

/* Challange: The ser should able to use the Enter key */

// The event listener is now on the input instead of the button
function enterDetect(e){
    if(e.key === "Enter") addTask();
    return;
}

// The event listener
inputEl.addEventListener('keyup', enterDetect);