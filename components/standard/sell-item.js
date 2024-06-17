const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: block;
            font-family: Arial, sans-serif;
            border: 1px solid #ccc;
            padding: 16px;
            margin: 16px;
            border-radius: 8px;
            background-color: #f9f9f9;
            width: 200px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .image-container {
            width: 100%;
            height: 150px;
            overflow: hidden;
        }
        .image-container img {
            width: 100%;
            height: auto;
        }
        .details {
            padding: 8px 0;
        }
        .title {
            font-size: 1.2em;
            margin-bottom: 8px;
        }
        .price {
            text-decoration: line-through;
            color: #999;
        }
        .discount-price {
            font-size: 1.2em;
            color: #324FFF;
        }
        .discount {
            color: #324FFF;
            font-weight: bold;
        }
        .rating {
            display: flex;
            align-items: center;
            flex-direction: column;
        }
        .stars {
            color: gold;
        }
        .add-to-cart-button {
            margin-top: 10px;
            padding: 8px 16px;
            background-color: #00ffffde;
            color: #121212;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
    <div class="image-container">
        <img src="" alt="Product Image">
    </div>
    <div class="details">
        <div class="title"></div>
        <div class="price-container">
            <span class="price"></span>
            <span class="discount-price"></span>
        </div>
        <div class="discount"></div>
        <div class="rating">
            <div class="stars"></div>
            <span class="rating-value"></span>
        </div>
        <button class="add-to-cart-button">Add to Cart</button>
    </div>
`;

class SellItem extends HTMLElement {
    static get observedAttributes() {
        return ['img-src', 'title', 'price', 'discount-price', 'discount', 'rating'];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.updateComponent();
        this.shadowRoot.querySelector('.add-to-cart-button').addEventListener('click', () => this.addToCart());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.add-to-cart-button').removeEventListener('click', () => this.addToCart());
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateComponent();
    }

    updateComponent() {
        const imgSrc = this.getAttribute('img-src');
        const title = this.getAttribute('title');
        const price = this.getAttribute('price');
        const discountPrice = this.getAttribute('discount-price');
        const discount = this.getAttribute('discount');
        const rating = parseFloat(this.getAttribute('rating'));

        this.shadowRoot.querySelector('img').src = imgSrc;
        this.shadowRoot.querySelector('.title').textContent = title;
        this.shadowRoot.querySelector('.price').textContent = `$${price}`;
        this.shadowRoot.querySelector('.discount-price').textContent = `$${discountPrice}`;
        this.shadowRoot.querySelector('.discount').textContent = discount;

        const starsContainer = this.shadowRoot.querySelector('.stars');
        starsContainer.innerHTML = this.getStars(rating);

        this.shadowRoot.querySelector('.rating-value').textContent = `(${rating})`;
    }

    getStars(rating) {
        const fullStar = '★';
        const emptyStar = '☆';
        const roundedRating = Math.round(rating);
        let stars = '';

        for (let i = 0; i < 5; i++) {
            stars += i < roundedRating ? fullStar : emptyStar;
        }

        return stars;
    }

    addToCart() {
        const title = this.getAttribute('title');
        const event = new CustomEvent('add-to-cart', {
            detail: {
                title: title
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}

customElements.define('sell-item', SellItem);
