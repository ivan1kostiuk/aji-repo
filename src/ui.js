// Displays a question and its answer options in the UI
// onAnswer is a callback function that handles answer
export function showQuestion(question, onAnswer) {


    // Removes prevoius answer feedback
    result.innerText = "";
    // Get HTML elements from the page by their IDs
    const questionElement =
        document.getElementById("question");

    const answersElement =
        document.getElementById("answers");

    // Set the question text in the UI
    questionElement.innerText = question.question;

    // Clear previous answer buttons
    answersElement.innerHTML = "";

    question.options.forEach((option, index) => {
        // Create a new button element for each option
        const button =
            document.createElement("button");

        // Set button text to the answer option
        button.innerText = option;

        button.onclick = () => {
            // Disable all buttons after one is clicked
            // (prevents multiple answers)
            answersElement
                .querySelectorAll("button")
                .forEach(btn => btn.disabled = true);

                answersElement
                .querySelectorAll("button")
                .forEach((btn, i) => {
                    if (i === question.answer) {
                        btn.style.backgroundColor = "lightgreen";
                    }
                });

            const isCorrect =
                index === question.answer;

            button.style.backgroundColor =
                isCorrect ? "lightgreen" : "red";


            // Call handleAnswer function
            onAnswer(index);

        };

        // Add the button to the answers container in the HTML
        answersElement.appendChild(button);
    });
}

// Displays whether the last answer was correct or not
export function showResult(correct) {

    const result =
        document.getElementById("result");

    result.innerText =
        correct ? "✅ Correct!" : "❌ Wrong!";
}