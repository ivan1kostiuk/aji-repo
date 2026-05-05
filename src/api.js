export async function loadQuestions() {
    const data = await fetchData();

    const questions = generateQuestions(data, 10);

    return questions;
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

// Converts data into questions
// Currently only contains questions about countries' capitals
function generateQuestions(countries, numberOfQuestions){
    // Filter out countries without capitals
    const validCountries = countries.filter(
        country => country.capital && country.capital.length > 0
    );

    const shuffledCountries = shuffle(validCountries);
    const questions = [];

    // Total number of questions cannot exceed number of valid countries
    const questionCount = Math.min(numberOfQuestions, shuffledCountries.length);

    // Generate a question for random countries stored in shuffledCountries
    for (let i = 0; i < questionCount; i++){
        const country = shuffledCountries[i];

        // Generate wrong options
        const remainingCountries = shuffledCountries.filter(
            currentCountry => currentCountry !== country
        );
        const wrongOptions = shuffle(remainingCountries);
        
        // Fill in questions
        questions.push({
            question: `What's the capital of ${country.name.common}?`,
            options: [
                country.capital[0], 
                wrongOptions[0].capital[0],
                wrongOptions[1].capital[0],
                wrongOptions[2].capital[0],
            ],
            answer: 0
        });
    }

    return questions;
}

// Helper function for generating random int 
// between min (inclusive) and max (exclusive)
function getRandomInt(min, max){
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
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