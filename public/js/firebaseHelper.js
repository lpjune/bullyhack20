/* jshint esversion: 6 */
console.log("test");

// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "AIzaSyDTAhixj2O8Ny5gRIWK8DQcSTcJMImDPhA",
    authDomain: "bullyhack20.firebaseapp.com",
    databaseURL: "https://bullyhack20.firebaseio.com",
    projectId: "bullyhack20",
    storageBucket: "bullyhack20.appspot.com",
    // messagingSenderId: "8373032571",
    // appId: "1:8373032571:web:092b74f947433e1f30b4de",
    // measurementId: "G-6484FT1EB9"
};
// Initialize Firebase
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function getCourse(id) {
    let ref = firebase.database().ref("/demo/" + id);
    ref.once("value").then(snapshot => {
        console.log(snapshot.val());
        //Returns an object with course
        return snapshot.val();
    });
}

function postCourse(courseName, teacherName) {
    let id = firebase
        .database()
        .child("demo")
        .push().key;
    let ref = firebase.database().ref("/demo/" + id);

    ref.set({
        name: courseName,
        teacher: teacherName
    });
}

// getQuestion


// postQuestion
