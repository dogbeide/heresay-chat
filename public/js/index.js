var socket = io();

var timeLog = function (msg) {
  var now = Date().toString();
  console.log(msg, now);
};

socket.on('connect', function () {
  timeLog('Connected to server:');
});

socket.on('disconnect', function () {
  timeLog('Disconnected from server:');
});

socket.on('newMessage', function(msg) {
  console.log(msg);
});



// socket.on('newEmail', function (email) {
//   timeLog('New email: ');
//   console.log(email);
// });
