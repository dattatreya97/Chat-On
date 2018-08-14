var express = require('express');
var app = express();
var port = 3000;


app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render("index");
});

server = app.listen(port);

const io = require('socket.io')(server);


io.on('connection', function(socket){
    
    socket.username = "Guest";
    socket.on('change_username',function(data){
        
        socket.username = data.username;
    });

    socket.on('new_message',function(data){
        io.sockets.emit('new_message',{
            message:data.message,
            username:socket.username
        });
    })
});