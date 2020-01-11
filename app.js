/* jshint esversion: 6 */
const express = require('express');
const app = express();
var partials = require('express-partials');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let hostname = '127.0.0.1';
let port = 3000;



// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'))

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/createCourse', function(req, res){
  res.render(__dirname + '/views/pages/createCourse.ejs');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(port);
console.log(port + ' is the magic port');


io.on('connection', function(socket){
    console.log('a user connected');
    
    socket.on('something', () => { 
        console.log('something');
        let data = "hello world";
        socket.emit('somethingElse', data);
    });
});
