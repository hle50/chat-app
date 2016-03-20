var socket = io();
socket.on('connect', function () {
    console.log('connected to socket io server');
});

socket.on('message', function (message) {
    console.log('New message:');
    console.log(message.text);
    jQuery('.message').append('<p>' + message.text + '</p>')
});

var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    var message = $form.find('input[name=message]');
    event.preventDefault();
    socket.emit('message', {
        text: message.val()
    });
    message.val('');
});