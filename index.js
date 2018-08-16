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
    
    //this means a new connection! Add an event to notify 
    socket.on('new_connection',function(data){
        io.sockets.emit('new_connection');
    })


    socket.username = "Guest";
    socket.on('change_username',function(data){
        socket.username = data.username;
    });

    socket.on('update_username',function(data){
        socket.broadcast.emit('update_username',{data_old:data.data_old,data_new:data.data_new});
    });

    socket.on('new_message',function(data){
        io.sockets.emit('new_message',{
            message:data.message,
            username:socket.username
        });
    });
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',{username:socket.username});
    });


    socket.on('new_file_message',function(data){
        socket.broadcast.emit('new_file_message',{file_message:data.file_message});
    });
});