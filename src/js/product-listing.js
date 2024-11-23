import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { qs, loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSourse = new ProductData();
const listElement = qs(".product-list");
const productsList = new ProductListing(category, dataSourse, listElement);

productsList.init();
