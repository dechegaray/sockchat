/*
var express = require('express');
var socketio = require('socket.io');

var app = express();
var port = 3003;

app.use(express.static('./public'))

var server = app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

var io = socketio(server);

io.on('connect', function (socket) {
    console.log('User connected to the websocket');

    socket.on('chatter', function (msg) {
        console.log('NEW MESSAGE: ', msg);
    });
});
*/

var CHAT_CHANNEL = 'chatter';
var USERS_CHANNEL = 'user-channel';

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = 3003;
var connections = [];
var users = [];

app.use(express.static('./public'))

http.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

io.on('connect', function (socket) {
    connections.push(socket);
    console.log('User connected to the websocket. Users: ' + connections.length);
    
    socket.on('disconnect', function() {
        connections.splice(connections.indexOf(socket), 1);
        users = users.filter(function(user){
            return user.id !== socket.id;
        })

        console.log('user disconnected');
        io.emit(USERS_CHANNEL, users);
    });

    socket.on(CHAT_CHANNEL, function (payload) {
        console.log('NEW MESSAGE FROM FRONTEND: ', payload);

        io.emit(CHAT_CHANNEL, payload);
    });

    socket.on(USERS_CHANNEL, function (user) {
        console.log('NEW USER CONNECTED: ', user);

        users.push(user);
        io.emit(USERS_CHANNEL, users);
    });
});