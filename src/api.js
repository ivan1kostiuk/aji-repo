export async function loadQuestions() {

    return [
        {
            question: "Whats the capital of Sweden",
            options: ["Stockholm", "Oslo", "Gothenburg", "Malmö"],
            answer: 0
        },

        {
            question: "What color is the sky?",
            options: ["Green", "Blue", "Red", "Yellow"],
            answer: 1
        }
    ];

    /* Good api:s:
    https://restcountries.com/
    https://www.apicountries.com/docs
    http://api-ninjas.com/api/country
    */
}