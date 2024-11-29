import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary")

myCheckout.init();

qs("#zip").addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));