import { qs, renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
    constructor(cartItems, listElement) {
        this.cartItems = cartItems;
        this.listElement = listElement;
    }
    init() {
        this.renderContents(this.cartItems);
    }
    renderContents(cartItems) {
        if (cartItems) {
            renderListWithTemplate(cartItemTemplate, this.listElement, cartItems)
            
            const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0).toFixed(2);
            const totalHtml = totalTemplate(total);

            renderWithTemplate(totalHtml, this.listElement, "afterend", showTotal)
        } else {
            const noArticlesHtml = noArticlesTemplate();
            renderWithTemplate(noArticlesHtml, this.listElement)
        }

    }
}

function showTotal() {
    const totalLabel = qs(".cart-footer");

    totalLabel.classList.remove("hide");
}

function cartItemTemplate(item) {
    const newItem = `
    <li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img
                src="${item.Image}"
                alt="${item.Name}"
            />
        </a>
        <a href="#">  
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
  
    return newItem;
}

function noArticlesTemplate() {
    return `
    <div>
      <p>There are no products yet.</p>
    </div>`;
}

function totalTemplate(total) {
    return `
    <div class="cart-footer hide">
        <p class="cart-total">Total: $${total}</p>
    </div>`;
}