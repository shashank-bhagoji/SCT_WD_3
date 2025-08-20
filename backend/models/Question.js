const mongoose = require('../db');

const questionSchema = new mongoose.Schema({
    text: String,
    options: [String],            // empty for fill-in
    correctAnswers: [mongoose.Schema.Types.Mixed], // can be number for choices or string for fill-in
    type: String,                // 'single', 'multi', 'fill'
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
