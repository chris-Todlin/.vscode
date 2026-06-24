// Import the websocket module inside
const webSocket = require('ws');

// Set the port of the server
const wss = new webSocket.Server({port: 3000}); // Set up the server of websocket

// Tell the user or log out that the server is up and running
// We use ws:// instead of http://
console.log('WebSocket server running on ws://localhost:3000');

// If the server websocket is on
function webSocketOn(ws) {
    console.log('Client connected!');

    // A trail of array with the response to use
    const repsosesBot = ['Hello User', 'How are you doing?', 'How was your day?', 'How did the exam place ou mentally?', 'How are you enjoing you birthda?'];
    let count = 0;

    // If the ws is on
    ws.on('message', (data)=>{
        const message = JSON.parse(data);

        // console.log
        console.log(`RECIEVED: ${message}`);

        count < repsosesBot.length? count: count = 0;
        ws.send(JSON.stringify(repsosesBot[count])); // Send the data
        count++;
    });

    // When the websocket is disconnected
    ws.on('close',()=> console.log("Client Disconnected!"));
}
wss.on('connection',webSocketOn);