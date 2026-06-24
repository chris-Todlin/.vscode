// Create the websocket object
const wsUri = "ws://localhost:8080";
const websocket = new WebSocket(wsUri); // create the websocket
let pingInterval, counter = 0;

// Listening for an open event
function listenOpen() {
    console.log("Connected");
    pingInterval = setInterval(() => {
        console.log(`SENT: ping ${counter}`);
        websocket.send(JSON.stringify(message));
    }, 1000);
}
websocket.addEventListener('open',listenOpen);

// Listening for an error evetn
websocket.addEventListener("error", (e) => {
  console.log(`ERROR: ${e}`);
});

websocket.addEventListener("message", (e) => {
  const message = JSON.parse(e.data);
  console.log(`RECEIVED: ${message.iteration}: ${message.content}`);
  counter++;
});

websocket.addEventListener("close", () => {
  console.log("DISCONNECTED");
  clearInterval(pingInterval);
});