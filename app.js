/* jshint esversion: 6 */
const express = require("express");
const app = express();
var partials = require("express-partials");
const firebase = require('firebase');
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let port = 3000;

var config = {
    apiKey: "AIzaSyDTAhixj2O8Ny5gRIWK8DQcSTcJMImDPhA",
    authDomain: "bullyhack20.firebaseapp.com",
    databaseURL: "https://bullyhack20.firebaseio.com",
    projectId: "bullyhack20",
    storageBucket: "bullyhack20.appspot.com"
    // messagingSenderId: "8373032571",
    // appId: "1:8373032571:web:092b74f947433e1f30b4de",
    // measurementId: "G-6484FT1EB9"
};
// Initialize Firebase
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static("public"));

// login page
app.get('/login', function(req, res) {
    res.render('pages/login');
});

// index page
app.get("/", function(req, res) {
    let ref = firebase.database().ref("/courses/");
    let promise = ref.once("value").then(snapshot => {
        // console.log(snapshot.val());
        // return snapshot.val();
        console.log(snapshot.val());
        res.render("pages/index", {values: snapshot.val()});
    });
    // return promise;
});

app.get("/createCourse", function(req, res) {
    res.render(__dirname + "/views/pages/createCourse.ejs");
});

// about page
app.get("/about", function(req, res) {
    res.render("pages/about");
});

app.listen(port);
console.log(port + " is the magic port");

io.on("connection", function(socket) {
    console.log("a user connected");

    socket.on("something", () => {
        console.log("something");
        let data = "hello world";
        socket.emit("somethingElse", data);
    });
});
