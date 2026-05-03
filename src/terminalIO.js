import readline from "readline";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Displays a question and answer options
export function showQuestion(question, onAnswer) {
    console.log(question.question);
    
    question.options.forEach((option, index) => {
        console.log(`${index}. ${option}`);
    });

    // User input
    rl.question("> ", (givenAnswer) => {
        const index = Number(givenAnswer);

        // Ask again if not a number
        if (Number.isNaN(index)) {
            console.log("Please enter a number");
            return showQuestion(question, onAnswer);
        }

        onAnswer(index);
    });
}

// Displays whether the last answer was correct or not
export function showResult(correct) {
    correct ? console.log("✅ Correct!") : console.log("❌ Wrong!");
}