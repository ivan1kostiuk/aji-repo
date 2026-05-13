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

const GAME_MODES = ["capital", "flag"];

// Starts a new game
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

// Ask user for gamemode 
function chooseGameMode() {
    console.log("Choose game mode: ");
    GAME_MODES.forEach((mode, index) => {
        console.log(`${index}. ${mode}`);
    });

    rl.question("> ", (answer) => {
        // Parse input
        const gameMode = parseMode(answer);

        // Validate input
        if (gameMode){
            startGame(gameMode);
        } else {
            console.log("Invalid input. Please enter a number or a mode name.");
            chooseGameMode();
        }
    });
}

// Parse user input for gamemode choice
function parseMode(input) {
    const trimmed = input.trim().toLowerCase();

    // If input is a number
    if (!isNaN(trimmed)){
        const index = Number(trimmed);

        // Validate index
        if (index >= 0 && index < GAME_MODES.length){
            return GAME_MODES[index];
        }
        return null;
    }

    if (GAME_MODES.includes(trimmed)){
        return trimmed;
    }

    return null;
}

chooseGameMode();