// scoreRoutes.js

const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

// Endpoint to get quiz scores for a specific user
router.get('/scores/:userId', async (req, res) => {

    console.log("userscore");
    const { userId } = req.params;

    try {
        // Find all quiz results associated with the specified userId
        const quizResults = await QuizResult.find({ user: userId });

        res.json({ quizResults });
    } catch (error) {
        console.error("Error fetching quiz scores:", error);
        res.status(500).json({ message: "Error fetching quiz scores. Please try again later." });
    }
});

module.exports = router;
