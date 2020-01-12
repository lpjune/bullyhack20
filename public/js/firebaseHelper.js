/* jshint esversion: 6 */
console.log("test");

// Set the configuration for your app
// TODO: Replace with your project's config object
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

function getCourse(id) {
    let ref = firebase.database().ref("/courses/" + id);
    ref.once("value").then(snapshot => {
        console.log(snapshot.val());
        //Returns an object with course
        return snapshot.val();
    });
}

function getAllCourses() {
    let ref = firebase.database().ref("/courses/");
    let promise = ref.once("value").then(snapshot => {
        // console.log(snapshot.val());
        return snapshot.val();
    });
    return promise;
}

function postCourse(id, name, teacher) {
    firebase
        .database()
        .ref("courses/" + id)
        .set({
            name: name,
            teacher: teacher
        });
}

function addUser(user) {
    let promise = firebase.database().ref("/users/" + user.uid).once("value").then(snapshot => {
        if (!snapshot.val()) {
            firebase
                .database()
                .ref("users/" + user.uid)
                .set({
                    displayName: user.displayName,
                    email: user.email,
                    courses: []
                });
        }
    });
}

function addCourseToUser(userId, courseId) {
    console.log(userId);
    console.log(courseId);
    firebase
        .database()
        .ref("users/" + userId + "/courses")
        .update({
            [courseId]: true,
        });
}

// postQuestion
function postQuestionToCourse(id, question) {
    var newPostKey = firebase
        .database()
        .ref()
        .child("posts")
        .push().key;
    firebase
        .database()
        .ref("courses/" + id + "/messages/" + newPostKey)
        .set({
            question: question,
            likes: 1
        });
}

function likeQuestion(courseId, questionId) {
    var ref = firebase
        .database()
        .ref("courses/" + courseId + "/messages/" + questionId).child("likes")
    ref.transaction(function (likes) {
        if (likes) {
            likes = likes + 1;
        }
        return likes;
    });
}


