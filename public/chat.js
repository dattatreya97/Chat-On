$(function(){
    //for client to create new socket and connect to it,at localhost 
    var old_username="";
    var socket = io.connect("localhost:3000");
    var message = $("#message");
    var username = $("#username");
    
    var send_username = $("#send_username");
    var send_message = $("#send_message");
    var chatroom = $("#chatroom");

    //Change username
    send_username.click(function(){             
        socket.emit('change_username',{username:username.val()});
        var result = "<p>";
        if(old_username){
            result = result + old_username;
        }else{
            result = result + "Guest";
        }
        result = result +" changed to "+username.val() +"</p>";
        chatroom.append(result);
        old_username = username.val();
    });

    
    send_message.click(function(){        
        socket.emit('new_message',{message:message.val()});
        message.val() = "";
    });

    //When you receive a message, just display it
    socket.on('new_message',function(data){
        var result = "<p><b>"+data.username+"</b> : "+data.message +"</p>";
        chatroom.append(result);
    });

    
});