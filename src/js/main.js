import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { qs, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSourse = new ProductData("tents");
const productList = qs(".product-list");
const productsList = new ProductListing("Tents", dataSourse, productList);

productsList.init();
