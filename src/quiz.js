export class Quiz {

    constructor(questions) {

        this.questions = questions;
        this.currentQuestion = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestion];
    }

    checkAnswer(index) {

        const correct =
            index === this.getCurrentQuestion().answer;

        if (correct) {
            this.score++;
        }

        return correct;
    }

    nextQuestion() {
        this.currentQuestion++;
    }

    hasMoreQuestions() {
        return this.currentQuestion < this.questions.length;
    }
}