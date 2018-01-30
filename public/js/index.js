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

// Receive a message
socket.on('newMessage', function(msg) {
  console.log(msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#chatlog').append(li);
});

// Send location
socket.on('newLocationMessage', function (msg) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Location (Google Maps)</a>');

  li.text(`${msg.from}: `);
  a.attr('href', msg.url);

  li.append(a);
  jQuery('#chatlog').append(li);
});


// Send a message
jQuery('#msg-form').on('submit', function (e) {
  e.preventDefault();

  var msgText = jQuery('[name=msg-text]')

  socket.emit('createMessage', {
    from: 'user1',
    text: msgText.val()
  }, function () {
    msgText.val('');
  });
});


// Geolocation
var geoBtn = jQuery('#send-geo');
geoBtn.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }

  geoBtn.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    geoBtn.removeAttr('disabled').text('Send location');
  }, function () {
    alert('Unable to fetch location data');
    geoBtn.removeAttr('disabled').text('Send location');
  });
});
