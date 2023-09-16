const { json } = require('express');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 },()=>{
  console.log("Server is running on localhost:8080");
});


wss.on('connection', ws => {
    console.log('WebSocket connection established.');
    ws.send("connected")
    // console.log(ws);
    ws.on('close', () => {
      console.log('WebSocket connection closed.'); // Print "disconnected" when a client disconnects
  });
  // send client connected message 
  wss.clients.forEach(client => {
    if(client !== ws && client.readyState === WebSocket.OPEN) {
      client.send("Client connected");
      
     }
  });

    ws.on('message', message => {
      msg = JSON.parse(message).header.type;
      if(msg == "webgl connected"){
        // send unity this message and ask it to instantiate camera
        // this will be only accepted by main unity client
        // Iterate through connected clients and send the message to each client
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
          }
      });
      }
      else if(msg=="webgl disconnected"){
        // send it to unity and ask it to destroy the camera with same ID.
        // this will be only accepted by main unity client
        // Iterate through connected clients and send the message to each client
        wss.clients.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message.toString());
            }
        });
      }
      else if(msg=="transforms"){
        // console.log(`Received: ${JSON.parse(message).header.type}`);
        // check the uid and sent this to the client with same uid.
        // will not be accepted by main unity client
        // Iterate through connected clients and send the message to each client
        wss.clients.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message.toString());              
            }
        });
      }
        // ws.send(`${message}`);
    });
});

