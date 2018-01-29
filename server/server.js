const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const PUBLIC_PATH = path.join(__dirname, '../public');
const port = process.env.PORT || 8000;

var app = express();
// var server = http.createServer((req, res) => {});
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(PUBLIC_PATH)); // where to find public files

io.on('connection', (socket) => {
  var now = Date().toString();
  console.log('New user connected: '+now);

  // socket.emit('newEmail', {
  //   from: 'testdev@spacebearchat.com',
  //   text: 'Welcome to Spacebear!',
  //   createdAt: Date().toString()
  // });

  // socket.on('createEmail', (address) => {
  //   console.log('createEmail', address);
  // });

  socket.emit('newMessage', {
    from: 'Spacebear',
    text: 'Hello, welcome to Spacebear',
    createdAt: now
  });

  socket.on('createMessage', (msg) => {
    console.log('createMessage', msg);
  });

  socket.on('disconnect', () => {
    var now = Date().toString();
    console.log('User has disconnected: '+now);
  });
});

// Listen endlessly
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
