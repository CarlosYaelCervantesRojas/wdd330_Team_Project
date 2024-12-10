let utility = {}

utility.loadTemplate = async (path) => {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}


utility.renderWithTemplate = (template, parentElement, data, callback) => {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
        callback(data);
    }
}

utility.loadHeaderFooter = async () => {
    const headerTemplate = await this.renderWithTemplate("../partials/header.html");
    const headerElement = document.querySelector("header");

    this.renderWithTemplate(headerTemplate, headerElement);

}


module.exports = utility