import { qs, getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cartItems = getLocalStorage("so-cart");
const listElement = qs(".product-list");

const shoppingCart = new ShoppingCart(cartItems, listElement);
shoppingCart.init();
