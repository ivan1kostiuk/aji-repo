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
let currentMode = null;
let currentDifficulty = "easy";

// Listens for changes in difficulty dropdown
document.getElementById("difficulty").addEventListener("change", (e) => {
    currentDifficulty = e.target.value;
});


const menu =
    document.getElementById("menu");

const quizContainer =
    document.getElementById("quiz");

const quizScreen = 
    document.getElementById("quizScreen");

const nextBtn =
    document.getElementById("nextBtn");

const playAgainBtn =
    document.getElementById("playAgainBtn");

const higherLowerLayout =
    document.getElementById("higherLowerLayout");

const higherBtn =
    document.getElementById("higherBtn");

const lowerBtn =
    document.getElementById("lowerBtn");

// Attach click handlers to difficulty buttons
document
    .getElementById("mode1")
    .onclick = () => startGame("capital");

document
    .getElementById("mode2")
    .onclick = () => startGame("flag");

document
    .getElementById("mode3")
    .onclick = () => startGame("population");

document
    .getElementById("mode4")
    .onclick = () => startGame("higherLower");

// Starts a new game
async function startGame(mode) {
    
    currentMode = mode;
    
    // Fetch questions from API
    const questions =
        await loadQuestions(mode, currentDifficulty);

    quiz = new Quiz(questions);

    document.getElementById("score").innerText = "Score: 0";
    playAgainBtn.style.display = "none";
    nextBtn.style.display = "";


    menu.style.display = "none";
    quizContainer.style.display = "block";

    if (mode === "higherLower") {

        quizScreen.style.display = "none";
        higherLowerLayout.style.display = "flex";

    } else {

        quizScreen.style.display = "block";
        higherLowerLayout.style.display = "none";
    }

    loadQuestion();
}

// Loads and displays the current question
function loadQuestion() {
        // If no more questions → show final score
    if (!quiz.hasMoreQuestions()) {

        quizScreen.style.display = "block";
        higherLowerLayout.style.display = "none";
        playAgainBtn.style.display = "";
        nextBtn.style.display = "none";
        document.getElementById("currentQuestion").innerHTML = "";
        document.getElementById("score").innerHTML = "";
        document.getElementById("question")
            .innerText =
            `Finished! Score: ${quiz.score}/${quiz.questions.length}`;

        document.getElementById("answers")
            .innerHTML = "";

        document.getElementById("result").innerText = "";



        playAgainBtn.style.display = "inline-block";

        return;
    }
    // Disable "Next" button until user answers
    nextBtn.disabled = true;
    document.getElementById("currentQuestion").innerText = `Question ${quiz.currentQuestion +1}`;



const currentQuestion =
    quiz.getCurrentQuestion();

// Depending on game mode, render question differently
if (currentMode === "higherLower") {

    renderHigherLowerQuestion(
        currentQuestion
    );

} else {

    showQuestion(
        currentQuestion,
        handleAnswer
    );
}
}

// Called when user selects an answer
function handleAnswer(index) {

    const correct =
        quiz.checkAnswer(index);

    showResult(correct);
    
    document.getElementById("score").innerText = `Score: ${quiz.score}`;

    // Enable "Next" button after answering
    nextBtn.disabled = false;

    if (currentMode === "higherLower") {
        // color feedback
        if (index === 0) {
            higherBtn.style.backgroundColor =
                correct ? "green" : "red";

        } else {
            lowerBtn.style.backgroundColor =
                correct ? "green" : "red";

        }
        
        higherBtn.disabled = true;
        lowerBtn.disabled = true;


        setTimeout(() => {

            quiz.nextQuestion();
            loadQuestion();

        }, 1000); // small delay so user sees result
    }
}


function goToMenu() {

    menu.style.display = "block";
    quizContainer.style.display = "none";
}


function renderHigherLowerQuestion(q) {
    document.getElementById("leftCountryName").innerText =
        q.currentCountry;

    document.getElementById("leftPopulation").innerText =
        q.currentPopulation.toLocaleString();

    document.getElementById("rightCountryName").innerText =
        q.opponentCountry;


    // resets colors
    higherBtn.style.backgroundColor = "";
    lowerBtn.style.backgroundColor = "";

    // re-enables buttons
    higherBtn.disabled = false;
    lowerBtn.disabled = false;


    higherBtn.onclick = () => handleAnswer(0);
    lowerBtn.onclick = () => handleAnswer(1);
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

playAgainBtn.onclick = () => {
// text resets
    if (currentMode) {
        startGame(currentMode);
    }
};
