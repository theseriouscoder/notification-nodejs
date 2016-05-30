var app = require('express')();
var url = "http://localhost/hemant-service/servicedata.js";
var http = require('http').Server(app);
var http1=require('http');
var io = require('socket.io')(http);
io.on('connection', function(socket){
    socket.on('id',function(id1){//receive message
        console.log('a user connected with id '+id1);
        var request = http1.get(url, function (response) {  
                    var buffer = "", 
                             data,
                             route;
                    response.on("data", function (chunk) {
                            buffer += chunk;
                    }); 
                    response.on("end", function (err) {
                            data = JSON.parse(buffer);
                            route = data.cust[id1-1];
                            var id=route.id;
                            var name=route.name;
                            console.log("ID: " + id);
                            console.log("Name: " + name);
                            io.emit('check1'+id1,id1);
                             io.emit('notification'+id1,id1);
                            io.emit('custdata'+id1,{id:id,name:name});
                    });
                    
                    /*response.on("end", function (err) {
                            
                            data = JSON.parse(buffer);
                            route = data.routes[id1];
                            console.log("Walking Distance: " + route.legs[0].distance.text);
                            console.log("Time: " + route.legs[0].duration.text);
                    });  */
        }); 
    });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});