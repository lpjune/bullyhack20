function askQuestion(id) {
    let question = document.getElementById("questionInput").value;
    console.log(id);
    console.log(question);

    let pattern = /\w+/g;
    if (pattern.test(question)) {
        postQuestionToCourse(id, question);
    }
}
