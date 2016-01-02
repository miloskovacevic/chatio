var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');

server.listen(process.env.PORT || 3000, function(){
    console.log("Server is listening on port 3000 or " + process.env.PORT);
});

app.use(express.static(path.join(__dirname, 'public')));
//ukljuciti bower_components
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function(socket){
    //send message
    socket.on('send message', function (data) {
        io.sockets.emit('new message', {msg: data});
    });
});