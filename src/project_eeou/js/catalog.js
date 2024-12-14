import utility from "../../project_eeou/js/utilities.mjs";
import { templateTopMovie } from "./Source.mjs";

document.addEventListener("DOMContentLoaded", () => {
    utility.loadHeader().then(() => {
        utility.hambutton()
    })

    const container = document.querySelector("main"); // The container where data will be displayed
    const key = "favorites"; // Change this to the key you want to fetch from localStorage

    const _item = utility.getLocalStorage(key);
    console.log(_item)

    _item.forEach(element => {
        const movieElement = document.createElement("div");
        movieElement.innerHTML = templateTopMovie(element);

        container.appendChild(movieElement);
    });

})

utility.loadFooter();