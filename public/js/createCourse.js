function createCourse(){
  let newId = firebase.database().child('courses').push().key;
  let databaseRef = firebase.database().ref('/courses/'+newId);

  databaseRef.set({
    code: ,
    name: ,
    teacher: 
  })
}