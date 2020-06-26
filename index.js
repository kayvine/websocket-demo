const express = require('express');
const WebSocket = require('ws');

const PORT = 3000;
const server = express();
let user = {
  firstName: 'Bob',
  firstName: 'Ross',
  email: 'bob@ross.com',
}

const wss = new WebSocket.Server({ server, port: 5000, path: '/foo' });

wss.on('connection', (ws, request) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

server.use(express.static('client'));

server.get('/confirm', (req, res) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(user.email);
    }
  });
  res.send('email confirmed')
});

server.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
