const mongoose = require('../db');

const questionSchema = new mongoose.Schema({
    text: String,
    options: [String],
    correctAnswers: [Number], // indexes of correct options
    type: String, // 'single' or 'multi'
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
