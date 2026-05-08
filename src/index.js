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

async function startGame(mode) {


    const questions = await loadQuestions(mode);


    quiz = new Quiz(questions);


    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("result").innerText = "";
    document.getElementById("playAgainBtn").hidden = true;


    document.getElementById("answers").innerHTML = "";


    document.getElementById("nextBtn").disabled = true;

    quizScreen.style.display = "block";

    menu.style.display = "none";


    loadQuestion();
}

// Loads and displays the current question
function loadQuestion() {
    // Disable "Next" button until user answers
    nextBtn.disabled = true;
    document.getElementById("currentQuestion").innerText = `Question ${quiz.currentQuestion +1}`;

    // Show final result screen with option to play again
    if (!quiz.hasMoreQuestions()) {

    document.getElementById("result")
        .innerText = "";

    document.getElementById("answers")
        .innerHTML = "";
        document.getElementById("nextBtn").replaceWith(document.getElementById("playAgainBtn"));
        document.getElementById("playAgainBtn").hidden = false;


        document.getElementById("question")
            .innerText =
            `Finished! \nScore: ${quiz.score}/${quiz.questions.length}`;

 
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
    location.reload();
}

// Unimplemented function to play again (not working)
function playAgain() {

    startGame("guess_the_country");

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

// Play again button hard resets the game, cound be improved
document
    .getElementById("playAgainBtn")
    .onclick = 
        goToMenu;
