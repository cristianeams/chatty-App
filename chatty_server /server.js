const express = require('express');
const SocketServer = require('ws');
// Generates a unique message Id
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


broadcast = message => {
  wss.clients.forEach (client => {
    if(client.readyState === SocketServer.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};


wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Broadcast to everyone
    const parsedMessage = JSON.parse(message);
    switch(parsedMessage.message.type) {
      case 'postNotification':
        parsedMessage.message.type = 'incomingNotification';
        parsedMessage.message['id'] = uuidv4();
        broadcast(parsedMessage);
      break;

      case 'postMessage':
        parsedMessage.message.type = 'incomingMessage';
        parsedMessage.message['id'] = uuidv4();
        broadcast(parsedMessage);
      break;
      // show an error in the console if the message type is unknown
      default:
        throw new Error(`Unknown event type: ${ parsedMessage.message.type }`);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
  });
});
