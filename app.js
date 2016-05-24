
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){
  
  socket.on('id',function(id1){//receive message
  		console.log('a user connected with id '+id1);
  		io.emit('id',id1);//broadcast message
  });
  socket.on('custdata',function(id1){
      console.log('data sent to user with id '+id1.id);
      var id2=id1.id;
      io.emit('custdata'+id2,id1);
  });
  socket.on('check1', function(id1){
    console.log('Correct login by user with id ' +id1);
    	io.emit('check1'+id1,id1);
  });
  socket.on('check2', function(id1){
    console.log('Invalid login by user with id ' +id1);
    	io.emit('check2'+id1,id1);
  });
  socket.on('check3', function(id1){
    console.log('Invalid logged by user with id ' +id1);
      io.emit('check3'+id1,id1);
  });
  socket.on('logout', function(id1){
    console.log('user logged out with id ' +id1);
    	io.emit('logout',id1);
  });
  socket.on('success', function(id1){
    console.log('notification successfully received by id ' +id1);
    	io.emit('success',id1);
  });
  socket.on('disconnect', function(id1){
    console.log('window closed');
  });
  socket.on('notification',function(id1){
         io.emit('notification'+id1, id1);//sends to everyone
      });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});