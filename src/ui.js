// Displays a question and its answer options in the UI
// onAnswer is a callback function that handles answer
export function showQuestion(question, onAnswer) {

    // Removes previous answer feedback
    const result = document.getElementById("result");
    result.innerText = "";
    // Get HTML elements from the page by their IDs
    const questionElement =
        document.getElementById("question");

    const answersElement =
        document.getElementById("answers");

    // Set the question text in the UI
    const rawQuestion = question.text || question.question || "";
    const questionText = typeof rawQuestion === "object"
        ? rawQuestion.text
        : rawQuestion;
    const flag = question.flag || (typeof rawQuestion === "object" ? rawQuestion.flag : undefined);

    if (flag) {
        questionElement.innerHTML = `${questionText}<br><span class="flagEmoji">${flag}</span>`;
    } else {
        questionElement.innerText = questionText;
    }

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


            const isCorrect =
                index === question.answer;

            // Shows what answer was correct
            answersElement
            .querySelectorAll("button")
            .forEach((btn, i) => {
                if (i === question.answer) {
                    btn.style.backgroundColor = "lightgreen";
                }
            });
            
            
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
        correct ? "✅ Correct!" : "❌ Incorrect!";
}