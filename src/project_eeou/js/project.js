import utility from "./utilities.mjs";
import fetchMovie from "./Source.mjs";

//variables
const movie = document.querySelector("#seek").value;
console.log(movie);

let movieInfo;

await utility.loadHeader();
utility.hambutton();

// document.querySelector("button").addEventListener(
//     "click", async () => {
//         movieInfo = await fetchMovie("batman");
//     }
// )

movieInfo = await fetchMovie("Back to the future");

console.log(movie)

document.querySelector("#poster").innerHTML = templateTopMovie(movieInfo);


utility.loadFooter();


function templateTopMovie(movie) {
    // Verifica que la película tenga datos válidos
    if (!movie || movie.Response === "False") {
        return `<p>No se encontró la película.</p>`;
    }

    // Crear el HTML para mostrar los datos de la película
    const htmlTemplate = `
        <div class="movie">
            <h1>${movie.Title} (${movie.Year})</h1>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Género:</strong> ${movie.Genre}</p>
            <p><strong>Reparto:</strong> ${movie.Actors}</p>
            <p><strong>Sinopsis:</strong> ${movie.Plot}</p>
            <p><strong>Calificación IMDb:</strong> ${movie.imdbRating}</p>
            <p><strong>Premios:</strong> ${movie.Awards}</p>
            <img src="${movie.Poster}" alt="Poster de ${movie.Title}">
        </div>
    `;
    return htmlTemplate;
}
