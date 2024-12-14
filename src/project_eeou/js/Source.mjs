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

export function templateTopMovie(movie) {
    // Verify
    if (!movie || movie.Response === "False") {
        return `<p>Sorry we didn't find your movie.</p>`;
    }

    const htmlTemplate = `
        <div class="movie">
            <h1>${movie.Title} (${movie.Year})</h1>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Gender:</strong> ${movie.Genre}</p>
            <p><strong>Cast:</strong> ${movie.Actors}</p>
            <p><strong>Synopsis:</strong> ${movie.Plot}</p>
            <p><strong>Calification IMDb:</strong> ${movie.imdbRating}</p>
            <p><strong>Rewards:</strong> ${movie.Awards}</p>
            <img src="${movie.Poster}" alt="Poster ${movie.Title}">
        </div>
    `;
    return htmlTemplate;
}
