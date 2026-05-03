// Import quiz logic (state + rules)
import { Quiz } from "./quiz.js";

// Import UI functions
import {
    showQuestion,
    showResult
} from "./terminalIO.js";

// Import API function (fetches questions)
import {
    loadQuestions
} from "./api.js";

import { rl } from "./terminalIO.js";

let quiz;

// Starts a new game
// mode = "easy" or "hard"
async function startGame(mode) {
    // Fetch questions from API
    const questions =
        await loadQuestions(mode);

    quiz = new Quiz(questions);

    loadQuestion();
}

// Loads and displays the current question
function loadQuestion() {
    // If no more questions → show final score
    if (!quiz.hasMoreQuestions()) {
        console.log("Finished! Score: %d/%d", quiz.score, quiz.questions.length);
        // No more input
        rl.close()
        return;
    }

    // handleAnswer is called after answering
    showQuestion(
        quiz.getCurrentQuestion(),
        handleAnswer
    );
}

// Right/wrong & load next question
function handleAnswer(index) {

    const correct =
        quiz.checkAnswer(index);

    showResult(correct);

    quiz.nextQuestion();
    loadQuestion();
}

startGame();