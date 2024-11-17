import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const ul = document.querySelector(".product-list");
  const cartItems = getLocalStorage("so-cart");

  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    ul.innerHTML = htmlItems.join("");
    showTotal(total);
  } else {
    const htmlMessage = noArticlesTemplate();
    ul.insertAdjacentHTML("afterend", htmlMessage);
  }
}

function showTotal(total) {
  const totalFooter = document.querySelector(".cart-footer");

  totalFooter.classList.remove("hide");
  totalFooter
    .querySelector("p")
    .insertAdjacentHTML("beforeend", `$${total.toFixed(2)}`);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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

renderCartContents();
