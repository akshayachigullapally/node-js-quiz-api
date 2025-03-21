const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/quizDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String,
});

const Question = mongoose.model("Question", questionSchema);

const questions = [
   {
        question: "Which element has the chemical symbol 'Hg'?",
        options: ["Mercury", "Hydrogen", "Magnesium", "Helium"],
        correctAnswer: "Mercury",
    },
    {
        question: "Who painted the 'Starry Night'?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctAnswer: "Vincent van Gogh",
    },
    {
        question: "What is the smallest planet in our solar system?",
        options: ["Mercury", "Mars", "Venus", "Pluto"],
        correctAnswer: "Mercury",
    },
    {
        question: "Which ancient wonder was located in Babylon?",
        options: ["Hanging Gardens", "Colossus of Rhodes", "Great Pyramid", "Temple of Artemis"],
        correctAnswer: "Hanging Gardens",
    },
    {
        question: "Which programming language is often associated with web development?",
        options: ["Python", "JavaScript", "C++", "Swift"],
        correctAnswer: "JavaScript",
    },
];

app.get("/api/question", async (req, res) => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    res.json({ question: randomQuestion.question, options: randomQuestion.options });
});

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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Quiz API running on http://localhost:${PORT}`);
});
