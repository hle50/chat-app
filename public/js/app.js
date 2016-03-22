var socket = io();
var name = getQueryVariable('name') || 'Anomyous';
var room = getQueryVariable('room') || 'Anomyous';
jQuery('.room-title').text(room);
console.log(name + ' ' + room);
socket.on('connect', function () {
    console.log('connected to socket io server');
    socket.emit('joinRoom', {
        name: name,
        room: room
    })
});

socket.on('message', function (message) {
    var momentTimestamp = moment.utc(message.timestamp);
    var $message = jQuery('.message');
    console.log('New message:');
    console.log(message.text);
    $message.append('<p><strong>' +message.name + ' ' + momentTimestamp.local().format("h:mm a ") +'</strong> </p>')
    //$message.append('<p><strong>' + momentTimestamp.local().format("h:mm a :") + '</strong> ' + message.text + '</p>')
    $message.append('<p>'+message.text+'</p>');
});

var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    var message = $form.find('input[name=message]');
    event.preventDefault();
    socket.emit('message', {
        name: name,
        text: message.val()
    });
    message.val('');
});