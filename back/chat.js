var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/chat",  function(req, res){
    res.sendFile(__dirname + '../front/chat.js');
})

//écoute les connexions:
io.on('connection', function(socket){
    console.log("A USER IS CONNECTED")
    //écoute les déconnexions:
    socket.on('disconnect', function(){
        console.log("A USER IS DISCONNECTED");
    })
    //écoute les msg reçu:
    socket.on('chat message', function(msg){
        console.log('Message reçu: ' + msg);
    })
})

http.listen(3000, function(){
    console.log("Server running on 3000")
})