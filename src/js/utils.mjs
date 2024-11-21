// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  // localStorage.setItem(key, JSON.stringify([data]));
  const dataList = getLocalStorage("so-cart") || [];

  dataList.push(data)

  localStorage.setItem(key, JSON.stringify(dataList));
}
// get the product id parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get(param);
  return productId;
}
// get param from URL
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}
// function to take a list of objects and a template and insert the objects as HTML into the DOM
export function renderListWithTemplate(templateCallback, parentElement, list, position = "afterbegin", clear = false) {
  const LiHtmlStrings = list.map(templateCallback);
  
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, LiHtmlStrings.join(""));
}
// 
export function renderWithTemplate(template, parentElement, position = "afterbegin", callback) {  
  parentElement.insertAdjacentHTML(position, template);
  if (callback) {
    callback();
  }
}
// 
export async function loadHeaderFooter() {
  const mainHeader = document.getElementById("main-header");
  const mainFooter = document.getElementById("main-footer");

  const headerHtml = await loadTemplate("../partials/header.html");
  const footerHtml = await loadTemplate("../partials/footer.html");

  renderWithTemplate(headerHtml, mainHeader);
  renderWithTemplate(footerHtml, mainFooter);
}
// 
async function loadTemplate(path) {
  const res = await fetch(path);
  const html = await res.text();

  return html;
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}