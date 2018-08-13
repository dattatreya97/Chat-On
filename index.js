var express = require('express');
var app = express();
var port = process.env.port||3000;


app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',function(req,res){
    res.send("Yo");
});

server = app.listen(port);

const io = require('socket.io')(server);

io.on('connection', function(){
    console.log("New user");
});