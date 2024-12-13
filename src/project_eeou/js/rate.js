import utility from "../../project_eeou/js/utilities.mjs";

document.addEventListener("DOMContentLoaded", () => {
    utility.loadHeader().then(() => {
        utility.hambutton()
    })
})

utility.loadFooter();