function productCardTemplate() {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=">
        <img src="" alt="Image of ">
        <h3 class="card__brand"></h3>
        <h2 class="card__name"></h2>
        <p class="product-card__price">$</p>
    </a>
    </li>`;
}

export default class ProductListing {
    constructor(category, datasource, listElement) {
        this.category = category;
        this.dataSource = datasource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
    }

    renderList(list) {
        rederListWithTemplate(productCardTemplate, this.listElement, list);
    }

    // renderList(list) {
    //     const htmlStrings = list.map(productCardTemplate);
    //     this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    // }
}