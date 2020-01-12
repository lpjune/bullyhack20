function createCourse(){
  let newId = firebase.database().child('courses').push().key;
  let databaseRef = firebase.database().ref('/courses/'+newId);

  let courseCode = document.getElementById("courseCodeInput").value;
  let courseName = document.getElementById("courseNameInput").value;
  let instructorName = document.getElementById("instructorNameInput").value;

  databaseRef.set({
    id: courseCode,
    name: courseName,
    teacher: instructorName
  })
}

function cancel(){
  window.history.back();
}