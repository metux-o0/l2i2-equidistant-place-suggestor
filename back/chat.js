var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/chat",  function(req, res){
    res.sendFile(__dirname + '../front/chat.js');
})

http.listen(3000, function(){
    console.log("Server running on 3000")
})