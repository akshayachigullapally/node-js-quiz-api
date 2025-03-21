const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection (optional, or use an array for questions)
mongoose.connect("mongodb://localhost:27017/quizDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define Quiz Schema
const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String,
});

const Question = mongoose.model("Question", questionSchema);

// Sample Questions (for non-database use)
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correctAnswer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars",
    },
];

// ** GET API to fetch a random question **
app.get("/api/question", async (req, res) => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    res.json({ question: randomQuestion.question, options: randomQuestion.options });
});

// ** POST API to submit an answer **
app.post("/api/submit", async (req, res) => {
    const { question, answer } = req.body;
    const questionObj = questions.find((q) => q.question === question);

    if (questionObj) {
        if (questionObj.correctAnswer === answer) {
            return res.json({ correct: true, message: "Correct Answer! 🎉" });
        } else {
            return res.json({ correct: false, message: "Wrong Answer. Try Again! ❌" });
        }
    }
    res.status(404).json({ message: "Question not found" });
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Quiz API running on http://localhost:${PORT}`);
});
