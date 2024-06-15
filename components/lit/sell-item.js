import {
    html,
    css,
    LitElement,
  } from "https://cdn.jsdelivr.net/gh/lit/dist@2.4.0/core/lit-core.min.js";

export class SellItem extends LitElement {
    static properties = {
        imgSrc: { type: String, attribute: 'img-src' },
        title: { type: String },
        price: { type: Number },
        discountPrice: { type: Number, attribute: 'discount-price' },
        discount: { type: String },
        rating: { type: Number },
    };

    static styles = css`
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
            color: #FA991C;
        }
        .discount {
            color: #FA991C;
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
            background-color: #FA991C;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    `;

    constructor() {
        super();
        this.imgSrc = '';
        this.title = '';
        this.price = 0;
        this.discountPrice = 0;
        this.discount = '';
        this.rating = 0;
    }

    render() {
        return html`
            <div class="image-container">
                <img src="${this.imgSrc}" alt="Product Image">
            </div>
            <div class="details">
                <div class="title">${this.title}</div>
                <div class="price-container">
                    <span class="price">$${this.price}</span>
                    <span class="discount-price">$${this.discountPrice}</span>
                </div>
                <div class="discount">${this.discount}</div>
                <div class="rating">
                    <div class="stars">${this.getStars(this.rating)}</div>
                    <span class="rating-value">(${this.rating})</span>
                </div>
                <button class="add-to-cart-button" @click=${this.addToCart}>Add to Cart</button>
            </div>
        `;
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
        const event = new CustomEvent('add-to-cart', {
            detail: {
                title: this.title
            }
        });
        this.dispatchEvent(event);
    }
}

customElements.define('sell-item-lit', SellItem);
