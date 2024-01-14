const {Answer} = require("../models/answer");
const answers = [];

function isValidAnswer(answer) {
    return typeof answer === 'string' && answer.length === 1 && ['a', 'b', 'c', 'd'].includes(answer);
}

function saveAnswer(newAnswerData) {
    const newAnswer = new Answer(newAnswerData);

    if (
        isValidAnswer(newAnswer.question1) &&
        isValidAnswer(newAnswer.question2) &&
        isValidAnswer(newAnswer.question3) &&
        isValidAnswer(newAnswer.question4) &&
        isValidAnswer(newAnswer.question5) &&
        isValidAnswer(newAnswer.question6)
    ) {
        answers.push(newAnswer);
        return newAnswer;
    } else {
        throw new Error('Invalid answers.');
    }
}

function getAllAnswers() {
    return answers;
}

function getAnswersByName(name) {
    return answers.filter((answer) => answer.name === name);
}

module.exports = {
    saveAnswer,
    getAllAnswers,
    getAnswersByName,
};