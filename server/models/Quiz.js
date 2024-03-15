const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: String,
    description: String,
    questions: [{
        questionText: String,
        answerOptions: [{
            answerText: String,
            isCorrect: Boolean
        }]
    }]
});

module.exports = mongoose.model('Quiz', QuizSchema);
