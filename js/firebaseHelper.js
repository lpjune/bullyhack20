/* jshint esversion: 6 */
console.log("test");

function getMessageFromCourseId(id){
    let ref = firebase.database().ref('/chats/' + id);    
    ref.once('value').then((snapshot)=>{
        console.log(snapshot.val());
        
        //Returns an object with all of the chats
        return (snapshot.val());
    });
}

function createMessageWithCourseId(messageText, courseId){
    let id = firebase.database().child('chats').push().key;
    let ref = firebase.database().ref('/chats/' + id);
    
    ref.set({
        messageText: messageText,
        courseId: courseId
      });
}