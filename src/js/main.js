import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSourse = new ProductData("tents");
const element = document.querySelector(".product-list");
const productsList = new ProductListing("Tents", dataSourse, element);

productsList.init();