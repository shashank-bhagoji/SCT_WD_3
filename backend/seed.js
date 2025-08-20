const mongoose = require('./db');
const Question = require('./models/Question');

const seed = async () => {
    await Question.deleteMany({});
    await Question.create([
        {
            text: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "London"],
            correctAnswers: [2],
            type: "single"
        },
        {
            text: "Select all prime numbers.",
            options: ["2", "3", "4", "5"],
            correctAnswers: [0, 1, 3],
            type: "multi"
        }
    ]);
    console.log("DB seeded!");
    mongoose.disconnect();
};

seed();
