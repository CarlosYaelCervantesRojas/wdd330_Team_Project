let utility = {}
let catalog = {}

function updateTiming(element) {
    const _now = new Date();
    const _hours = _now.getHours();
    const _minutes = _now.getMinutes();
    const _seconds = _now.getSeconds();

    element.textContent = `${_hours}:${_minutes}:${_seconds}`
}

utility.loadTemplate = async (path) => {
    try {
        const res = await fetch(path);
        if (!res.ok) {
            throw new Error(`Error to upload the template: ${res.statusText}`);
        }
        const template = await res.text();
        return template;
    } catch (error) {
        console.error("Error :", error);
        return '';
    }
}


utility.renderWithTemplate = (template, parentElement, data, callback) => {
    if (!template) {
        console.error("the template is empty");
        return;
    }

    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
        callback(data);
    }
}

utility.loadHeader = async () => {
    const headerTemplate = await utility.loadTemplate("../../../project_eeou/public/partials/header_eo.html");
    if (headerTemplate) {
        const headerElement = document.querySelector("header");
        utility.renderWithTemplate(headerTemplate, headerElement);
    }

}

// utility.getParam = (param) => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const product = urlParams.get(param);
//     return product;
// }

utility.hambutton = () => {

    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("#navMenu");

    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}

utility.loadFooter = async () => {
    const footerTemplate = await utility.loadTemplate("../../../project_eeou/public/partials/footer.html");
    if (footerTemplate) {
        const footerElement = document.querySelector("footer");
        utility.renderWithTemplate(footerTemplate, footerElement)
    }
    const footerElement = document.querySelector(".realTime")
    setInterval(() => updateTiming(footerElement), 1000);

    updateTiming(footerElement);

}

// utility.readTextFile = async (_file, element) => {
//     const respone = await fetch(_file);
//     if (!respone.ok) throw new Error(`Error: al leer el archivo ${_file}`);

//     const content = await response.text();

//     element.htmlcou
// }

utility.setLocalStorageJSON = (key, data) => {
    // Check if there is already a value in localStorage
    const existingData = localStorage.getItem(key);

    if (existingData) {
        try {
            // Parse the existing JSON data
            const parsedData = JSON.parse(existingData);

            // Check if the existing data is an array
            if (Array.isArray(parsedData)) {
                // Append the new data to the array
                parsedData.push(data);
                localStorage.setItem(key, JSON.stringify(parsedData));
            } else {
                // If not an array, convert it into an array and add the new data
                const newData = [parsedData, data];
                localStorage.setItem(key, JSON.stringify(newData));
            }
        } catch (error) {
            console.error("Error parsing existing JSON:", error);
            // If the existing data is not valid JSON, overwrite it with the new data as an array
            localStorage.setItem(key, JSON.stringify([data]));
        }
    } else {
        // If no data exists, save the new data as an array
        localStorage.setItem(key, JSON.stringify([data]));
    }
};

utility.setLocalStorageVariable = (key, item) => {
    localStorage.setItem(key, item)
}

utility.getLocalStorage = (key) => {
    const _item = localStorage.getItem(key);
    try {
        return JSON.parse(_item);
    } catch (error) {
        return _item
    }
}

utility.convertToJson = async (res) => {
    const data = await res.json();
    if (res.ok) {
        return data;
    } else {
        throw { name: "Error" }
    }
}



export default utility;
export { catalog };