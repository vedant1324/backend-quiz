const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

router.post('/', async (req, res) => {
    const quiz = new Quiz(req.body);
    try {
        const savedQuiz = await quiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
