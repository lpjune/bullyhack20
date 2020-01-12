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
  xhttp.open("GET", "/search/"+searchQuery.toLowerCase(), true);
  xhttp.send();
}

function keyPressEvent() {
  let key = window.event.keyCode;

  // If the user has pressed enter
  if (key === 13) {
    searchForCourse();
    window.event.preventDefault();
    return false;
  }
  return true;
}