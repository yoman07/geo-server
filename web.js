var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);


var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000

// listen for new web clients:
server.listen(port);

app.use(express.static(__dirname + '/'));


console.log('http server listening on %d', port);

var users = {};
var usersSockets = {};

console.log('websocket server created');

io.sockets.on('connection', function (socket) {



    console.log('connection start');

    socket.on('reset', function (data) {
      status = "War is imminent!";
      io.sockets.emit('status', { status: status });
    });

      socket.on('close', function() {
        console.log('websocket connection close');
    });

    socket.on('connect', function(data) {
        socket.user = data.nick;
        console.log('connect user' + data.nick);
        socket.send("user_added", function() {} );
    });
    socket.on('position_update', function(data) {
         console.log(data);
         if(data.x && data.y) {
           
           var socketUser = socket.user;
           
           console.log('socketUster ' + socketUser);
           if(socketUser) { 
            socket.broadcast.emit('position_update', { "user" : socket.user,
                                    "position" : {
                                    "x" : data.x,
                                    "y" : data.y
                                 }});

           } else {
            console.log('ERROR: Problem with userssocket');
           }
         } 
     });

});



