import { Quiz } from "./quiz.js";

import {
    showQuestion,
    showResult
} from "./ui.js";

import {
    loadQuestions
} from "./api.js";

let quiz;

const menu =
    document.getElementById("menu");

const quizScreen =
    document.getElementById("quiz");

document
    .getElementById("easyBtn")
    .onclick = () => startGame("easy");

document
    .getElementById("hardBtn")
    .onclick = () => startGame("hard");

async function startGame(mode) {

    menu.style.display = "none";

    quizScreen.style.display = "block";

    const questions =
        await loadQuestions(mode);

    quiz = new Quiz(questions);

    loadQuestion();
}

function loadQuestion() {

    nextBtn.disabled = true;

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

function handleAnswer(index) {

    const correct =
        quiz.checkAnswer(index);

    showResult(correct);

    nextBtn.disabled = false;
}

document
    .getElementById("nextBtn")
    .onclick = () => {

        quiz.nextQuestion();

        loadQuestion();

    };