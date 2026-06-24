/* We are doing a question application, I would try to prevent async */

// The DOM
const numberQuestion = document.getElementById("posquest");
const scoreEL= document.getElementById("score");
const formQuestions = document.forms.questions;
const questionPlaceholder = document.querySelector('legend');
const inputEL = document.getElementsByTagName('input');
const spanEL = document.querySelectorAll('.cont1');

// To set the visibleity 
const visibleResponseEl = document.getElementById("reaction");
const responseEl = document.querySelector('#reaction p');

// The counter of the question and score
let score = 0, count = 0;
let isChecked = false;
let correctAnswer;

/* Function and all that stuff */

// Function to get the question
async function getQuestion(pos) {
    
    await fetch(`http://localhost:3000/question/${pos}`).
    then(async(res)=>{
        const data = await res.json();
        questionPlaceholder.textContent = data.question;
        correctAnswer = data.correctAnswer;

        addInputs(data.choices);
    }).
    finally(()=>{

    }).catch((error)=>{
        alert('Error in fetching questions!');
    })
}

// an array to loop it through
function addInputs(data) {

    for(let i = 0; i < inputEL.length; i++) {
        if(inputEL[i].checked) inputEL[i].checked = false;
        inputEL[i].value = data[i];
        spanEL[i].textContent = data[i];
    }
}

// function to check the answer and append the answer part where it is removed by clicking the next buttob
function checkAnswer(userAnswer) {
    if(userAnswer ===correctAnswer) {
        responseEl.textContent = "Your answer is correct!";
        responseEl.classList.replace('wrong','correct');
        score+=10;
    } else {
        responseEl.textContent = "Your answer is wrong!";
        responseEl.classList.replace('correct', 'wrong');
    }

    // Make the container visible
    visibleResponseEl.classList.remove('hide');
    // change the text content of the button
    formQuestions.btn.textContent = "Next"
    //setTimeout(()=> formQuestions.btn.textContent = "Next",1000);
    // Add the score
    scoreEL.textContent = score;
    count++; // Increase the count
}

// Function to handle the nextquestion
function nextQuestion(){
    getQuestion(count);
    numberQuestion.textContent = count;

    // If the question has the cout of 10
    if(count === 10) {
        // Remove the buttonthere and the 
        formQuestions.btn.remove();

        // Send to the server the message you are done
        redirectPage();
        return;
    }

    // Change the textconten
    formQuestions.btn.textContent = "Check";
    visibleResponseEl.classList.add('hide');

}

async function redirectPage() {
    fetch('http://localhost:3000/redirect').
    then((res)=>{
        alert('redirecting');
    }).finally(()=>{
        location.href = "http://localhost:3000/html/thankyou.html";
    })
    .catch(err=>{
        alert(`Error occured: ${err}`);
    })
}


//Let's start with submitting the form
function submitForm(e) {
    e.preventDefault();

    // Get the value of the checked
    let choiceUser;
    let IsAnyChecked = false;
    for(let i = 0; i <inputEL.length; i++) {
        if(inputEL[i].checked) {
            choiceUser = inputEL[i].value;
            IsAnyChecked = true;
        }
    }

    if(IsAnyChecked){
        // This choice is sent into the check answer function to ccheck if the answer ic correct

        
        if(!isChecked) {
            checkAnswer(choiceUser); 
            isChecked = true;// check the answer if 
        }
        else{
            nextQuestion(); 
            isChecked = false;// check the answer if 
        } 
    }
}

/* Event Lisnteners and invoking functions */
getQuestion(0);
formQuestions.addEventListener('submit',submitForm);