import { qs, renderListWithTemplate, renderWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
            <img
            src="${product.Images.PrimaryMedium}"
            alt="Image of ${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}

export default class ProductListing {
    constructor (category, dataSource, listElement, sortElemet){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.sortElemet = sortElemet;
    }
    async init(){
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        this.renderCategoryHeading();
        this.sortElemet.addEventListener("change", (e) => this.sortList(e, list))
    }
    renderList(list){
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
    renderCategoryHeading(){
        const headingElement = qs("h2");
        renderWithTemplate(`: ${this.category.toUpperCase()}`, headingElement, "beforeend");
    }
    sortList(e, list){
        const selectedValue = e.target.value;
        if (selectedValue === "name") {
            const orderedByName = list.sort((product, product2) => product.Name.localeCompare(product2.Name));
            renderListWithTemplate(productCardTemplate, this.listElement, orderedByName, undefined, true);
        } if (selectedValue === "price") {
            const orderedByPrice = list.sort((product, product2) => product.FinalPrice - product2.FinalPrice);
            renderListWithTemplate(productCardTemplate, this.listElement, orderedByPrice, undefined, true);
        }
    }
}