const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit answers and calculate score
router.post('/submit', async (req, res) => {
    const { answers } = req.body;
    let score = 0;

    for (const ans of answers) {
        const q = await Question.findById(ans.questionId);
        if (!q) continue;
        const correct = JSON.stringify(ans.selectedOptions.sort()) === JSON.stringify(q.correctAnswers.sort());
        if (correct) score += 1;
    }
    res.json({ score, total: answers.length });
});

module.exports = router;
