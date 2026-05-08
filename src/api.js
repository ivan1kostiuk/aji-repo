export async function loadQuestions(gameMode) {
    const data = await fetchData();

    const questions = generateQuestions(data, 10, gameMode);

    return questions;
}

// Fetches data and handles errors
async function fetchData() {
    const url = 
        "https://restcountries.com/v3.1/all?fields=name,capital,flag,population"

    try {
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
    capital : {
        // Filter out countries without capitals
        validate: country => country.capital && country.capital.length > 0,
        getQuestion: country => ({ text: `What's the capital of ${country.name.common}?` }),
        getCorrectAnswer: country => country.capital[0],
        getWrongAnswer: country => country.capital?.[0]
    },

    flag : {
        validate: country => country.flag,
        getQuestion: country => ({
            text: 'Which country does this flag belong to?',
            flag: country.flag
        }),
        getCorrectAnswer: country => country.name.common,
        getWrongAnswer: country => country.name.common
    }
}

// Converts data into questions
// Currently only contains questions about countries' capitals
function generateQuestions(countries, numberOfQuestions, gameMode){
    
    const mode = gameModes[gameMode];
    
    //Filter out invalid countries depending on game mode
    const validCountries = countries.filter(mode.validate);

    const shuffledCountries = shuffle(validCountries);
    const questions = [];

    // Total number of questions cannot exceed number of valid countries
    const questionCount = Math.min(numberOfQuestions, shuffledCountries.length);

    // Generate a question for random countries stored in shuffledCountries
    for (let i = 0; i < questionCount; i++){
        const country = shuffledCountries[i];

        const correctAnswer = mode.getCorrectAnswer(country);
        
        // Handle countries with several capitals.
        //if (gameMode === 'capital') {
        //    const correctAnswer = country.capital[0];
        //}

        // Generate wrong options by shuffling remaining valid countries
        const wrongOptions = shuffle(
            validCountries
                .filter(currentCountry => currentCountry !== country)
                .map(mode.getWrongAnswer)
                .filter(Boolean)
        ).slice(0, 3); // Take first 3 wrong options

        // Randomize options
        const options = shuffle([
            correctAnswer,
            ...wrongOptions
        ])

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