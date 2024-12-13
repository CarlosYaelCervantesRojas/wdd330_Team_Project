const keyId = "8c0c3b7f"
const baseURL = "http://www.omdbapi.com/";

async function fetchMovie(title) {
    try {
        const response = await fetch(`${baseURL}?apiKey=${keyId}&t=${encodeURIComponent(title)}`);
        if (!response) throw new Error("Error when obtainn data");
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export default fetchMovie