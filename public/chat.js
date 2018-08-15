$(function(){
    //for client to create new socket and connect to it,at localhost 
    var old_username="";
    var socket = io.connect("localhost:3000");
    var message = $("#message");
    var username = $("#username");
    var event_in_chat  = $("#event_in_chat"); 
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
        event_in_chat.append(result);
        old_username = username.val();
    });

    message.keypress(function(){
        socket.emit('typing');
    });

    socket.on('typing',function(data){
        var result = "<p><i>" + data.username  + " is typing something ...</i></p>";
        event_in_chat.html(result);
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