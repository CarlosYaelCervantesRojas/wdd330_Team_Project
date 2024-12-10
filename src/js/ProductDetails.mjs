import { alertMessage, qs, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor (productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails(this.product);
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    qs("#addToCart")
    .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    setLocalStorage("so-cart", this.product);
    alertMessage(`${this.product.NameWithoutBrand} added!`);
  }
  renderProductDetails(product) {
    const title = qs("title");
    const main = qs("main");
      
    title.textContent += ` ${product.Name}`;

    const productDetailsHtml = `
      <section class="product-detail">
        <h3>${product.Brand.Name}</h3>
          
        <h2 class="divider">${product.Name}</h2>
          
        ${
          product.Images.ExtraImages
          ?
          `
          <section class="carousel">
            <div class="sliderContainer">
              <div class="slider">
              ${product.Images.ExtraImages.map(function(image, i) {return `<img id="img-${i + 1}" class="divider" src="${image.Src}" alt="${image.Title}"/>`}).join("")}
              </div>
              <div class="slider-nav">
              ${product.Images.ExtraImages.map(function(image, i) {return `<a href="#img-${i + 1}"></a>`}).join("")}
              </div>
            </div>
          </section>
          `
          :
          `<img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.Name}"/>`
        }
          
        <p class="product-card__price">$${product.FinalPrice}</p>
          
        <p class="product__color">${product.Colors[0].ColorName}</p>
          
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
          
        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>`;

    main.innerHTML = productDetailsHtml;
  }
}
