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

var usersSockets = {};

console.log('websocket server created');

io.sockets.on('connection', function (socket) {



    socket.on('close', function() {
        socket.broadcast.emit('close', {"fb_id" : socket.user});
        console.log('websocket connection close');
        if(socket.user != null) {
          delete usersSockets[socket.user];
        }
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('close', {"fb_id" : socket.user});
        console.log('websocket disconnect');
        if(socket.user != null) {
          delete usersSockets[socket.user];
        }
    });

    socket.on('connect', function(data) {
        socket.user = data.fb_id;
        usersSockets[socket.user] = socket;
    });

    socket.on('photo_received', function(data) {
        var receiverId    = data.fb_id
        var base64image   = data.image;
        var locationImage = data.position;

        var myUserId      = socket.user;

        var socketUser  = usersSockets[receiverId];



        socketUser.emit('photo_received',  {"image" : base64image, "fb_id" : myUserId, "position" : locationImage} ); 
    });

    socket.on('position_update', function(data) {
         console.log(data);
         if(data.latitude && data.longitude) {
           
           var socketUser = socket.user;
           
           console.log('socketUster ' + socketUser);
           if(socketUser) { 
              socket.broadcast.emit('position_update', { 
            						            "fb_id" : socket.user,
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
