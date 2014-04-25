var express = require('express')
  , app     = express()
  , http    = require('http')
  , server  = http.createServer(app)
  , io      = require('socket.io').listen(server);


var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000

// listen for new web clients:
server.listen(port);

app.use(express.static(__dirname + '/'));


console.log('http server listening on %d', port);

var users = {};
var usersSockets = {};

console.log('websocket server created');

io.sockets.on('connection', function (socket) {


  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });


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
        console.log('connect user ' + data.nick);
        socket.broadcast.emit('user_added', {logged_user : data.nick});
    });

    socket.on('position_update', function(data) {
         console.log(data);
         if(data.latitude && data.longitude) {
           
           var socketUser = socket.user;
           
           console.log('socketUster ' + socketUser);
           if(socketUser) { 
            socket.broadcast.emit('position_update', { 
            						"user" : socket.user,
                                    "position" : {
                                    "lat" : data.latitude,
                                    "long" : data.longitude
                                 }});

           } else {
            console.log('ERROR: Problem with userssocket');
           }
         } 
     });

});
