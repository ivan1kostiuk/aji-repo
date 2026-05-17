export async function loadQuestions(gameMode) {
    const data = await fetchData();

    const mode = gameModes[gameMode];

    if (mode.customGenerateQuestions){
        return mode.customGenerateQuestions(data, 10);
    } 

    return generateQuestions(data, 10, mode);
}

// Fetches data and handles errors
async function fetchData() {
    const url = 
        "https://restcountries.com/v3.1/all?fields=name,capital,flag,population"

    try{
        const response = await fetch(url)
        if (!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json()
        if (!data || data.length === 0){
            throw new Error("No data found");
        }

        return data;    

    } catch (error){
        console.error("Failed to fetch:", error);
        throw error;
    }
}

const gameModes = {
    capital: {
        // Filter out countries without capitals
        validate: country => country.capital && country.capital.length > 0,
        getQuestion: country => ({ 
            text: `What's the capital of ${country.name.common}?` 
        }),
        getCorrectAnswer: country => country.capital[0],
        getWrongAnswer: country => country.capital?.[0]
    },

    flag: {
        validate: country => country.flag && country.flag.length > 0,
        getQuestion: country => ({
            text: 'Which country does this flag belong to?',
            flag: country.flag
        }),
        getCorrectAnswer: country => country.name.common,
        getWrongAnswer: country => country.name.common
    },

    population: {
        validate: country => country.population,
        getQuestion: () => ({ 
            text: `What country has a bigger population?`
        }),
        customGenerateQuestions: (countries, requestedQuestionCount) => {

            const validCountries = 
                countries.filter(gameModes.population.validate);

            const shuffledCountries = shuffle(validCountries);

            const questions = [];

            // Total number of questions cannot exceed number of valid countries
            const questionCount = 
                Math.min(requestedQuestionCount, shuffledCountries.length);

            // Generate a question for random countries stored in shuffledCountries
            for (let i = 0; i < questionCount; i++){
                const country = shuffledCountries[i];

                const opponent = 
                    shuffle(
                        validCountries.filter(c => c !== country)
                    )[0];

                const correctAnswer = 
                    country.population > opponent.population
                        ? country.name.common
                        : opponent.name.common;

                // Randomize options
                const options = shuffle([
                    country.name.common,
                    opponent.name.common
                ]);

                // Fill in questions
                questions.push({
                    question: gameModes.population.getQuestion(country),
                    options: options,
                    answer: options.indexOf(correctAnswer)
                });
            }

            return questions;
        }
    },

    higherLower: {

    validate: country => country.population,

    customGenerateQuestions: (
        countries,
        requestedQuestionCount
    ) => {

        const validCountries =
            countries.filter(
                gameModes.higherLower.validate
            );

        const questions = [];

        let currentCountry =
            shuffle(validCountries)[0];

        for (
            let i = 0;
            i < requestedQuestionCount;
            i++
        ) {

            const opponent =
                shuffle(
                    validCountries.filter(
                        c => c !== currentCountry
                    )
                )[0];

            const correctAnswer =
                opponent.population >
                currentCountry.population
                    ? 0
                    : 1;

            questions.push({

                currentCountry:
                    currentCountry.name.common,

                currentPopulation:
                    currentCountry.population,

                opponentCountry:
                    opponent.name.common,

                opponentPopulation:
                    opponent.population,

                answer: correctAnswer
            });

            // IMPORTANT
            currentCountry = opponent;
        }

        return questions;
    }
}
}

// Converts data into questions
function generateQuestions(countries, requestedQuestionCount, mode){
    
    //Filter out invalid countries depending on game mode
    const validCountries = countries.filter(mode.validate);

    const shuffledCountries = shuffle(validCountries);
    const questions = [];

    // Total number of questions cannot exceed number of valid countries
    const questionCount = Math.min(requestedQuestionCount, shuffledCountries.length);

    // Generate a question for random countries stored in shuffledCountries
    for (let i = 0; i < questionCount; i++){
        const country = shuffledCountries[i];

        const correctAnswer = mode.getCorrectAnswer(country);

        // Generate wrong options by shuffling remaining valid countries
        const wrongOptions = shuffle(
            validCountries
                .filter(c => c !== country)
                .map(mode.getWrongAnswer)
                .filter(Boolean)
        ).slice(0, 3); // Take first 3 wrong options

        // Randomize options
        const options = shuffle([
            correctAnswer,
            ...wrongOptions
        ]);

        // Fill in questions
        questions.push({
            question: mode.getQuestion(country),
            options: options,
            answer: options.indexOf(correctAnswer)
        });
    }

    return questions;
}

// Helper function for shuffling an array
// Deep copy using Fisher-Yates shuffle algorithm
function shuffle(array){
    const arrCopy = [...array];

    // Shuffle from end to start
    for (let i = arrCopy.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }

    return arrCopy;
}

/* Good api:s:
https://restcountries.com/
https://www.apicountries.com/docs
http://api-ninjas.com/api/country
*/