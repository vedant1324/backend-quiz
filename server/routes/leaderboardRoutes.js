// leaderboardRoutes.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const QuizResult = require('../models/QuizResult');

// Endpoint to get the leaderboard for a specific quiz
router.get('/leaderboard/:quizId', async (req, res) => {
    const { quizId } = req.params;

    try {
        // Check if quizId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: "Invalid quiz ID." });
        }

        // Convert quizId to ObjectId
        const quizObjectId = new mongoose.Types.ObjectId(quizId);

        // MongoDB aggregation pipeline to find the leaderboard for a specific quiz, ranked by score
        const leaderboard = await QuizResult.aggregate([
            { $match: { quiz: quizObjectId } }, // Match quizId
            { $group: { _id: "$user", maxScore: { $max: "$score" } } }, // Group by user and find max score
            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } }, // Lookup users
            { $unwind: "$user" }, // Unwind user array
            { $project: { username: "$user.username", score: "$maxScore", _id: 0 } }, // Project fields
            { $sort: { score: -1 } }, // Sort by score in descending order
            { $group: { _id: "$username", score: { $first: "$score" } } } // Group by username and select the first score
        ]);

        res.json(leaderboard);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: "Error fetching leaderboard. Please try again later." });
    }
});

module.exports = router;
