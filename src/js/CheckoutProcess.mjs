import { getLocalStorage, qs } from "./utils.mjs";

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
}