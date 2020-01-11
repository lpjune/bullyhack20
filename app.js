/* jshint esversion: 6 */
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let hostname = '127.0.0.1';
let port = 3000;

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('something', () => { 
        console.log('something');
        let data = "hello world";
        socket.emit('somethingElse', data);
    });
});

http.listen(process.env.PORT || 3000, function(){
    console.log('Server running at http://${hostname}:${port}/', hostname, port);
});