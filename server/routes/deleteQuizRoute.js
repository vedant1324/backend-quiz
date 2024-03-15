// deleteQuizRoute.js

const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// DELETE a quiz by ID
router.delete('/:quizId',  async (req, res) => {
    const { quizId } = req.params;
    const userId = req.user.id;

    try {
        // Find the quiz by ID
        const quiz = await Quiz.findById(quizId);

        // Check if the quiz exists
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }

        // Check if the user is the creator of the quiz
        if (quiz.creator.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this quiz." });
        }

        // Delete the quiz
        await quiz.remove();

        res.json({ message: "Quiz deleted successfully." });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
