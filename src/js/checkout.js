import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");

myCheckout.init();

qs("#zip").addEventListener(
  "blur",
  myCheckout.calculateOrdertotal.bind(myCheckout),
);

qs("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();

  if (chk_status) {
    myCheckout.checkout();
  }
});
