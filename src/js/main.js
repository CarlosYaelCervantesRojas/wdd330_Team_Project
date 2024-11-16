import ProducData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProducData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductListing("Tents", dataSource, element);

productList.init();
