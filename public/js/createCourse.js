// Functions specific to the Create Course page

function createCourse() {
  let courseCodeInput = document.getElementById("courseCodeInput");
  if (!validateCourseCode(courseCodeInput))
    return;
  let courseNameInput = document.getElementById("courseNameInput");
  if (!validateCourseName(courseNameInput))
    return;
  let instructorNameInput = document.getElementById("instructorNameInput");
  if (!validateInstructorName(instructorNameInput))
    return;

  let courseCode = courseCodeInput.value;
  let courseName = courseNameInput.value;
  let instructorName = instructorNameInput.value;

  postCourse(courseCode, courseName, instructorName);
  location.href = '/';
}

function cancel(){
  window.history.back();
}

function validateCourseCode(caller){
  // <2-3 capitals><four digits>-<two digits>
  let pattern = /([A-Z]{2,3})\d{4}-\d{2}\b/g;
  if (pattern.test(caller.value)){
    caller.classList.remove("is-invalid");
    caller.classList.add("is-valid");
    return true;
  }
  caller.classList.add("is-invalid");
  caller.classList.remove("is-valid");
  return false;
}

function validateCourseName(caller){
  // <>
  let pattern = /\w+/g;
  if (pattern.test(caller.value)){
    caller.classList.remove("is-invalid");
    caller.classList.add("is-valid");
    return true;
  }
  caller.classList.add("is-invalid");
  caller.classList.remove("is-valid");
  return false;
}

function validateInstructorName(caller){
  // <title> <FirstName> <LastName>
  let pattern = /\S+[.]?\s\S+\s\S+/gi;
  if (pattern.test(caller.value)){
    caller.classList.remove("is-invalid");
    caller.classList.add("is-valid");
    return true;
  }
  caller.classList.add("is-invalid");
  caller.classList.remove("is-valid");
  return false;
}