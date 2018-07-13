const express = require('express');
const SocketServer = require('ws');
// Generates a unique message Id
const uuidv4 = require('uuid/v4');

// Sets the port to 3001
const PORT = 3001;

// s a new express server
const server = express()
   // Makes the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Creates the WebSockets server
const wss = new SocketServer.Server({ server });

// Sets up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// Broadcast messages to users
broadcast = message => {
  wss.clients.forEach (client => {
    if(client.readyState === SocketServer.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

wss.on('connection', (ws) => {
  // Broadcast number of online users to all connected users
  let onlineUsers = {};
  onlineUsers['counter'] = wss.clients.size;
  onlineUsers['type'] = 'numberOfUsers';
  onlineUsers = JSON.stringify(onlineUsers);
  wss.clients.forEach (client => {
    client.send(onlineUsers);
  })
  
  console.log(`Client connected`);

  ws.on('message', (message) => {
    // Broadcast to everyone
    const parsedMessage = JSON.parse(message);
    switch(parsedMessage.type) {
      case 'postNotification':
        parsedMessage.type = 'incomingNotification';
        parsedMessage['id'] = uuidv4();
        broadcast(parsedMessage);
      break;

      case 'postMessage':
        parsedMessage.type = 'incomingMessage';
        parsedMessage['id'] = uuidv4();
        broadcast(parsedMessage);
      break;
      // show an error in the console if the message type is unknown
      default:
        throw new Error(`Unknown event type: ${ parsedMessage.type }`);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    // Updates number of online users counter
    let onlineUsers = {};
    onlineUsers['counter'] = wss.clients.size;
    onlineUsers['type'] = 'numberOfUsers';
    onlineUsers = JSON.stringify(onlineUsers);
    wss.clients.forEach (client => {
      client.send(onlineUsers);
    })
    console.log(`Client disconnected`)
  });
});