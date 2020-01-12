

function createCourse() {
  let courseCode = document.getElementById("courseCodeInput").value;
  let courseName = document.getElementById("courseNameInput").value;
  let instructorName = document.getElementById("instructorNameInput").value;

  postCourse(courseCode, courseName, instructorName)
}

function cancel(){
  window.history.back();
}