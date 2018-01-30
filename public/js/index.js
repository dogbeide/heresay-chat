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
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#chatlog').append(li);
});

// socket.emit('createMessage', {
//   from: 'user1',
//   text: 'pls respond'
// }, function (data) {
//   console.log('Message received', data);
// });

jQuery('#msg-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'user1',
    text: jQuery('[name=msg-text]').val()
  }, function () {

  });
});
