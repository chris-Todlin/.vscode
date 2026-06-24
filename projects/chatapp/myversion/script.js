/* We are under the real world application with websocket */
const chat = document.forms.chat;
const interfaceEl = document.getElementById('interface');

// NOw the new websocket version
const ws = new WebSocket("ws://localhost:3000");

// On openning the ws
ws.addEventListener('open',()=> console.log("Connected to server", "bot"));
ws.addEventListener('close', ()=> console.log("Disconnected from server, bot"));

// function to append the bot message
function appendBotBody(e) {
    // Now create a p
    const p = document.createElement('p');
    // add the clas
    p.classList.add('mess-bot');

    // the Span for the body
    const span1 = document.createElement('span');
    span1.classList.add('bot', 'body');
    span1.textContent = JSON.parse(e.data);

    // The span for the subseection
    const span2 = document.createElement('span');
    span2.textContent = "Bot";
    span2.classList.add('sender2');

    // append then into the p
    p.append(span1, span2);

    // append in the body of the div onctainer
    interfaceEl.append(p);

    // set the scroll hieght to that
    interfaceEl.scrollTop = interfaceEl.scrollHeight;
}
ws.addEventListener('message', appendBotBody);

// Function to append the user body message
function appendUserBody() {
    // Now create a p
    const p = document.createElement('p');
    // add the clas
    p.classList.add('mess-me');

    // the Span for the body
    const span1 = document.createElement('span');
    span1.classList.add('me', 'body');
    span1.textContent = chat.message.value;

    // The span for the subseection
    const span2 = document.createElement('span');
    span2.textContent = "Me";
    span2.classList.add('sender1');

    // append then into the p
    p.append(span1, span2);

    // append in the body of the div onctainer
    interfaceEl.append(p);

    // set the scroll hieght to that
    interfaceEl.scrollTop = interfaceEl.scrollHeight;
}

// Function to handle the form
function handleForm(e) {
    e.preventDefault();

    if(chat.message.value === "") return;

    // append the body of the user message
    appendUserBody();

    sendMessage();
}

// function too send the message
function sendMessage() {
    const message = chat.message.value.trim();
    if(message === "") return;

    // Alese send it to the websockedt
    ws.send(JSON.stringify(message));
    chat.message.value = "";
}

chat.addEventListener('submit',handleForm);