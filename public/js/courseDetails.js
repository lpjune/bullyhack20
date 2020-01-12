function askQuestion(id) {
    let question = document.getElementById("questionInput").value;
    let pattern = /\w+/g;
    if (pattern.test(question)) {
        postQuestionToCourse(id, question);
    }
}
