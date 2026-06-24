const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

wss.on('connection', (ws) => {
    console.log("Client connected");

    let messageCount = 0;

    ws.on('message', (data) => {
        const message = data.toString();
        console.log("Received:", message);

        if (messageCount < 5) {
            if (message.toLowerCase().includes("hello")) {
                ws.send("hello user");
            } else {
                ws.send("Bot received: " + message);
            }
        }

        messageCount++;
    });

    ws.on('close', () => {
        console.log("Client disconnected");
    });
});