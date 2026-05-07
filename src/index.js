// Import quiz logic (state + rules)
import { Quiz } from "./quiz.js";

// Import UI functions
import {
    showQuestion,
    showResult
} from "./ui.js";

// Import API function (fetches questions)
import {
    loadQuestions
} from "./api.js";

let quiz;

const menu =
    document.getElementById("menu");

const quizScreen =
    document.getElementById("quiz");

// Attach click handlers to difficulty buttons
document
    .getElementById("mode1")
    .onclick = () => startGame("guess_the_capital");

document
    .getElementById("mode2")
    .onclick = () => startGame("mode2");

document
.getElementById("mode3")
.onclick = () => startGame("mode3");

// Starts a new game
// mode = "easy" or "hard"
async function startGame(mode) {
    document.getElementById("score").innerText = "Score: 0";


    // Hide menu, show quiz screen
    menu.style.display = "none";
    quizScreen.style.display = "block";

    // Fetch questions from API
    const questions =
        await loadQuestions(mode);

    quiz = new Quiz(questions);

    loadQuestion();
}

// Loads and displays the current question
function loadQuestion() {
    // Disable "Next" button until user answers
    nextBtn.disabled = true;
    document.getElementById("currentQuestion").innerText = `Question ${quiz.currentQuestion}`;

    // If no more questions → show final score
    if (!quiz.hasMoreQuestions()) {

        document.getElementById("question")
            .innerText =
            `Finished! Score: ${quiz.score}/${quiz.questions.length}`;

        document.getElementById("answers")
            .innerHTML = "";

        return;
    }

    showQuestion(
        quiz.getCurrentQuestion(),
        handleAnswer
    );
}

// Called when user selects an answer
function handleAnswer(index) {

    const correct =
        quiz.checkAnswer(index);

    showResult(correct);
    
    document.getElementById("score").innerText = `Score: ${quiz.score}`


    // Enable "Next" button after answering
    nextBtn.disabled = false;
}


function goToMenu() {

    menu.style.display = "block";
    quizScreen.style.display = "none";
}

// Proceed to next question when clicked "Next"
document
    .getElementById("nextBtn")
    .onclick = () => {
        quiz.nextQuestion();
        loadQuestion();
    };

document
    .getElementById("menuBtn")
    .onclick = 
        goToMenu;
