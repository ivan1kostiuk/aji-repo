export function showQuestion(question, onAnswer) {

    const questionElement =
        document.getElementById("question");

    const answersElement =
        document.getElementById("answers");

    questionElement.innerText = question.question;

    answersElement.innerHTML = "";

    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.innerText = option;

        button.onclick = () => {

            // lock ONLY quiz buttons
            answersElement
                .querySelectorAll("button")
                .forEach(btn => btn.disabled = true);

            onAnswer(index);
        };

        answersElement.appendChild(button);
    });
}

export function showResult(correct) {

    const result =
        document.getElementById("result");

    result.innerText =
        correct ? "✅ Correct!" : "❌ Wrong!";
}