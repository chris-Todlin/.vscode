(function(){

    "use strict";

    /* Doing a web Socket Project */
    const reciever = document.getElementById('reciever');
    const messsage = document.getElementById('messsage');
    const sendBtn = document.getElementById('send');

    // Create the wesocket
    let socket = new WebSocket('ws//localhost:3001');

    socket.addEventListener('open',(e)=>{
        alert('"[open] Connection established');
        alert('Sending to server');
        socket.send('My name is john');
    });

    socket.addEventListener('message',(e)=>{
        console.log(e.data);
    });

    socket.addEventListener('error',(e)=>{
        console.log('error'+ e);
    });

    // On close
    socket.addEventListener('close', (e)=>{
        if(e.wasClean){
            console.log('[close] Connection closed');
        } else {
            console.log('[close] Connection died');
        }
    })
})();