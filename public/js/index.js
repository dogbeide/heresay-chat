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

socket.on('newLocationMessage', function (msg) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Location (Google Maps)</a>');

  li.text(`${msg.from}: `);
  a.attr('href', msg.url);

  li.append(a);
  jQuery('#chatlog').append(li);
});

jQuery('#msg-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'user1',
    text: jQuery('[name=msg-text]').val()
  }, function () {

  });
});

var geoBtn = jQuery('#send-geo');
geoBtn.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unabe to fetch location data');
  });
});
