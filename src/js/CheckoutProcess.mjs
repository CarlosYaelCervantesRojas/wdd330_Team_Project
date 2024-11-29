import { getLocalStorage, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init(){
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    const subtotalElement = qs(this.outputSelector + " #cartTotal");
    const numItemsElement = qs(this.outputSelector + " #num-items");

    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0).toFixed(2);

    subtotalElement.innerText = `$${this.itemTotal}`;
    numItemsElement.innerText = this.list.length;
  }
  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = 10 + ((this.list.length - 1) * 2);
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.shipping) +
        parseFloat(this.tax)
    ).toFixed(2);
    // display the totals.
    this.displayOrderTotals();
  }
  
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const shippingElement = qs(this.outputSelector + " #shipping");
    const taxElement = qs(this.outputSelector + " #tax");
    const orderTotalElement = qs(this.outputSelector + " #orderTotal");
    
    shippingElement.innerText = `$${this.shipping}`;
    taxElement.innerText = `$${this.tax}`;
    orderTotalElement.innerText = `$${this.orderTotal}`;
  }
  async checkout() {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const formElement = document.forms["checkout"];
    // call the checkout method in our ExternalServices module and send it our data object.
    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    
    const services = new ExternalServices();
    try {
      const res = await services.checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  
  }
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simplifiedItems = items.map((item) => ({
    id: item.Id, 
    name: item.Name, 
    price: item.FinalPrice, 
    quantity: 1
  }));

  return simplifiedItems;
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  
  let convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}