var socket = io();
var APIkey = 'AIzaSyD26io7VMD9ahsNhCNP6PKx71pRm27CzEU';

var timeLog = function (msg) {
  var now = Date().toString();
  console.log(msg, now);
};

// // Create a message element for chatlog
// var formatMsgLi = function (who, what, when) {
//   var li = jQuery('<li></li>');
//
//   var spanWho = jQuery('<span></span>').text(who+" ").attr("class", "msg-who");
//   when = moment(when).format('h:mm a');
//   var spanWhen = jQuery('<span></span>').text(`${when}: `).attr("class", "msg-when");
//   var spanWhat = jQuery('<span></span>').text(what).attr("class", "msg-what");
//
//   li.append(spanWho);
//   li.append(spanWhen);
//   li.append(spanWhat);
//
//   return li;
// };
//
// // Create a location message element for chatlog
// var formatLocLi = function (who, where, when) {
//   var li = jQuery('<li></li>');
//
//   var spanWho = jQuery('<span></span>').text(who+" ").attr("class", "msg-who");
//   when = moment(when).format('h:mm a');
//   var spanWhen = jQuery('<span></span>').text(`${when}: `).attr("class", "msg-when");
//   var divWhere = jQuery('<div></div>').attr("class", "msg-where");
//
//   var a = jQuery('<a target="_blank">My Location (Google Maps)</a>');
//   a.attr("href", where);
//   divWhere.append(a);
//
//   li.append(spanWho);
//   li.append(spanWhen);
//   li.append(divWhere);
//
//   return li;
// };

socket.on('connect', function () {
  timeLog('Connected to server:');
});

socket.on('disconnect', function () {
  timeLog('Disconnected from server:');
});

// Receive a message
socket.on('newMessage', function(msg) {
  // var msg = formatMsgLi(msg.from, msg.text, msg.createdAt);
  // jQuery('#chatlog').append(msg);

  var template = jQuery('#msg-text-template').html();
  var html = Mustache.render(template, {
    who: msg.from,
    when: moment(msg.createdAt).format('h:mm a'),
    what: msg.text
  });

  jQuery('#chatlog').append(html);
});

// Send location
socket.on('newLocationMessage', function (msg) {
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My Location (Google Maps)</a>');
  //
  // var msg = formatLocLi(msg.from, msg.url, msg.createdAt);
  // jQuery('#chatlog').append(msg);
  var template = jQuery("#msg-loc-template").html();
  var toInject = Mustache.render(template, {
    who: msg.from,
    when: moment(msg.createdAt).format('h:mm a'),
    where: msg.url
  });
  jQuery('#chatlog').append(toInject);
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
