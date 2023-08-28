const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 },()=>{
  console.log("Server is running on localhost:8080");
});


wss.on('connection', ws => {
    console.log('WebSocket connection established.');
    ws.send("connected")

    ws.on('close', () => {
      console.log('WebSocket connection closed.'); // Print "disconnected" when a client disconnects
  });
    ws.on('message', message => {
        console.log(`Received: ${message}`);
        ws.send(`${message}`);
        console.log(wss.clients);
        // Iterate through connected clients and send the message to each client
        wss.clients.forEach(client => {
          
          if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message.toString());
          }
      });
    });
});

