function searchForCourse(){
  let searchQuery = document.getElementById("search").value;

  let pattern = /\w+/g;
  if (!pattern.test(searchQuery)) {
    return;
  }
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    document.getElementById("mainContent").innerHTML = this.responseText;
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