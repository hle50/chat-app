var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
app.use(express.static(__dirname + '/public'));
var clientInfo = {};
io.on('connection', function (socket) {
    console.log('User connected via socket.io');

    socket.on('disconnect', function(){
        if(typeof clientInfo[socket.id] !== 'undefined'){
            var userData = clientInfo[socket.id];
            socket.leave(userData.room);
            io.to(userData.room).emit('message',{
                name: 'System',
                text: userData.name + ' ' + 'has left the room!',
                timestamp: moment().valueOf()
            });
            delete  clientInfo[socket.id];
        }
    });

    socket.on('joinRoom', function (req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' ' + 'has joined!',
            timestamp: moment().valueOf()
        })
    });

    socket.on('message', function (message) {
        console.log('Message receive: ' + message.text);
        //emit will not show not on my own
        //socket.broadcast.emit('message', message);
        message.timestamp = moment().valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message);
    });

    socket.emit('message', {
        name: 'System',
        text: 'Server: Welcome to the chat application',
        timestamp: moment().valueOf()
    });
});


http.listen(PORT, function () {
    console.log('Server started');
});