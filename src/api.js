export async function loadQuestions() {

    const url = 
        "https://restcountries.com/v3.1/all?fields=name,capital,flag,population"

    const response = await fetch(url)
    const data = await response.json()

    return data;

    /* Good api:s:
    https://restcountries.com/
    https://www.apicountries.com/docs
    http://api-ninjas.com/api/country
    */
}