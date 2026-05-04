export async function loadQuestions() {

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

    /* Good api:s:
    https://restcountries.com/
    https://www.apicountries.com/docs
    http://api-ninjas.com/api/country
    */
}