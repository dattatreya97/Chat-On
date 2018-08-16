$(function(){
    //for client to create new socket and connect to it,at localhost 
    var old_username="";
    var socket = io.connect("localhost:3000");
    var message = $("#message");
    var file_message  =$("#file_message");
    var username = $("#username");
    var event_in_chat  = $("#event_in_chat"); 
    var send_username = $("#send_username");
    var send_message = $("#send_message");
    var chatroom = $("#chatroom");
    var colors = ["red","blue","black","darkgreen"];
    var min=0;
    var max=3; 

    //Change username
    send_username.click(function(){             
        socket.emit('change_username',{username:username.val()});
        var result = "<p>";
        
        //send a get request to server, server will emit, event is update_username
        socket.emit('update_username',{
            data_old:(old_username?old_username:"Guest"),
            data_new:username.val()
        });
        old_username = username.val();
    });

    message.keypress(function(){
        socket.emit('typing');
    });

    socket.on('update_username',function(data){
        result = data.data_old +" changed to "+data.data_new +"</p>";
        chatroom.append(result);
    });



    socket.on('typing',function(data){
        var result = "<p><i>" + data.username  + " is typing something ...</i></p>";
        event_in_chat.html(result);
    });
    
    send_message.click(function(){     
        if(message.val()){   
            socket.emit('new_message',{message:message.val()});
            message.html(' ');
        }
        //trying file upload
        if(file_message.files.length!=0){
            socket.emit('new_file_message',{file_message:file_message.file()});
        }
    });

    //When you receive a message, just display it
    socket.on('new_message',function(data){
        var random =Math.floor(Math.random() * (+max - +min)) + +min;
        var result = '<p><b style = "color: '+colors[random]+'">'+data.username+'</b> : '+data.message +'</p>';
        chatroom.append(result);
    });


    socket.on('new_connection',function(data){
        var result = '<p><b>new connection joined</b></p>';
        chatroom.append(result);
    });

    socket.on('new_file_message',function(data){
        
    });
    
});