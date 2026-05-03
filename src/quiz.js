// Represents a quiz session (state + logic)
export class Quiz {

    constructor(questions) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestion];
    }

    // Checks if the given answer index is correct
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