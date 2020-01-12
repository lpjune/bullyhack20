function searchForCourse(){
  let searchQuery = document.getElementById("search").value;

  let pattern = /\w+/g;
  if (!pattern.test(searchQuery)) {
    return;
  }
  console.log("Good");
  let foundCourses = {};

  let ref = firebase.database().ref("/courses/");
      ref.once('value').then(snapshot => {
          let allCourses = snapshot.val();
          for (const courseKey in allCourses) {
            if (courseMatches(searchQuery, courseKey, allCourses)) {
              foundCourses[courseKey] = allCourses[courseKey];
            }
          }
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