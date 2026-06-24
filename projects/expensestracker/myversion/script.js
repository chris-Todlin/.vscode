/* DOM to use for me */
const balanceEl = document.getElementById('balance');
const listEl = document.getElementById('listul');
const descriptionEl = document.getElementById('desc');
const amountEl = document.getElementById("amount");
let balance = 0;

// The array for the person
const infoPersonal = [];
const money = [];

// function to find the balance
function findBalance() {
    balance = money.reduce((acc,ne)=>acc+ne);
    balanceEl.textContent = balance;
}

// function to check there is an input in the amount and desc
function validateInput() {
    const desc = descriptionEl.value.trim();
    const amount = amountEl.value.trim();

    if(isNaN(parseInt(amount)) || parseInt(amount) <= 0 || desc === "") {
        alert("Check your inputs!");
        return false;
    }

    return true;
}

// function to render the list well
function renderTracker() {
    if(infoPersonal) {

        // clear the inner html
        listEl.innerHTML = "";
        infoPersonal.forEach(mon=>{
            if(mon.type === 'income') appendIncome(mon.Desc, mon.Amount);
            else appendExpense(mon.Desc, mon.Amount);
        })
    }
}

// Funnction to handle the income one
function handleIcome() {
    // You need the amoutna and desc
    const flagGo = validateInput();

    if(!flagGo) {
        console.log('There was an error');
        return;
    }

    // Have the input there for us
    const desc = descriptionEl.value.trim();
    const amount = amountEl.value.trim();

    // save the income
    infoPersonal.push({Desc: desc, Amount: amount, type: 'income'});
    money.push(parseInt(amount));

    // function to append the data inside
    renderTracker()
    findBalance();

    // clear the input
    amountEl.value = "";
    descriptionEl.value = "";
}

// function append income
function appendIncome(desc, amount) {
    const li = document.createElement('li');
    li.classList.add('income'); // add the class

    // create span two and one
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');

    // set the text content
    span1.textContent = desc;
    span2.textContent = `+Ksh. ${amount}`;

    // append them into the li
    li.append(span1, span2);

    // append the li into the ul
    listEl.append(li);
}

document.getElementById('income').addEventListener('click', handleIcome);

// Funnction to handle the expense one
function handleExpense() {
    // You need the amoutna and desc
    const flagGo = validateInput();

    if(!flagGo) {
        console.log('There was an error');
        return;
    } 

    // Have the input there for us
    const desc = descriptionEl.value.trim();
    const amount = amountEl.value.trim();

    if(amount > balance) {
        alert(`You have insufficient balance. You're balance is ${balance}.`);
        amountEl.focus();
        return;
    }

    // save the expenses
    infoPersonal.push({Desc: desc, Amount: amount, type: 'expense'});
    money.push(-parseInt(amount));

    // function to append the data inside
    renderTracker();
    findBalance();

    // clear the input
    amountEl.value = "";
    descriptionEl.value = "";
}

// function append income
function appendExpense(desc, amount) {
    const li = document.createElement('li');
    li.classList.add('expense'); // add the class

    // create span two and one
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');

    // set the text content
    span1.textContent = desc;
    span2.textContent = `-Ksh. ${amount}`;

    // append them into the li
    li.append(span1, span2);

    // append the li into the ul
    listEl.append(li);
}

document.getElementById('expense').addEventListener('click', handleExpense);