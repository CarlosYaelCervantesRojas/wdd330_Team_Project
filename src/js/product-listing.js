import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
console.log(category)

const dataSource = new ProductData();
console.log(dataSource)

const listElement = document.querySelector(".product-list")

const myList = new ProductListing(category, dataSource, listElement);

myList.init();