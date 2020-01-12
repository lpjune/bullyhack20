function searchForCourse(){
  let searchQuery = document.getElementById("search").value;
  $.ajax({ url: 'localhost:3000/search?search='+searchQuery
      , type: 'GET'
      , dataType: 'html'
    })
  .done(function(data) {
    console.log(data);
  })
  .fail(function() {
    console.log("Something went wrong!");
  });
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