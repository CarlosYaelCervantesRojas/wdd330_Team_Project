import utility from "./utilities.mjs";
import fetchMovie from "./Source.mjs";
import { templateTopMovie } from "./Source.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    // load header
    await utility.loadHeader();
    utility.hambutton();
    utility.loadFooter();

    let movieInfo;

    document.querySelector("#seek").addEventListener("click", async () => {

        const movie = document.querySelector("#movie").value.trim();


        //verify the input
        if (movie === "") {
            document.querySelector("#poster").innerHTML = "<p>Please try again.</p>";
            return;
        }

        movieInfo = await fetchMovie(movie);

        document.querySelector("#poster").innerHTML = templateTopMovie(movieInfo);

        return movieInfo
    });


    const buttonFavorites = document.querySelector("#addCatalog")

    buttonFavorites.addEventListener("click", () => {
        console.log(movieInfo);
        utility.setLocalStorageJSON("favorites", movieInfo)
    })

});



//adding the favories movies
