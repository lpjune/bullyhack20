function searchForCourse(){
  let searchQuery = document.getElementById("search").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    
    };
  xhttp.open("GET", "search?search="+searchQuery, true);
  xhttp.send();
}

function courseMatches(searchQuery, courseKey, allCourses) {
  if (courseKey.includes(searchQuery)) {
    return true;
  } else {
    let course = allCourses[courseKey];
    if (course.teacher.includes(searchQuery) || course.name.includes(searchQuery)) {
      return true;
    }
  }
  return false;
}