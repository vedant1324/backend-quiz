const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    result: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizResult', required: true },
    feedback: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        feedback: { type: String, required: true }
    }]
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
