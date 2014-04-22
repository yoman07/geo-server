var express = require('express'),
    app = express(),
    io = require('socket.io').listen(app);

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
app.listen(port, function() {
  console.log("Express server listening");
});


app.use(express.static(__dirname + '/'));


console.log('http server listening on %d', port);

var users = {};
var usersSockets = {};

console.log('websocket server created');

io.sockets.on('connection', function (socket) {
  io.sockets.emit('status', { status: status }); // note the use of io.sockets to emit but socket.on to listen
  socket.on('reset', function (data) {
    status = "War is imminent!";
    io.sockets.emit('status', { status: status });
  });

      socket.on('close', function() {
        console.log('websocket connection close');
    });

    socket.on('connect', function(data) {
        socket.user = data.nick;
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



