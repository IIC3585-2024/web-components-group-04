import {
    html,
    css,
    LitElement,
  } from "https://cdn.jsdelivr.net/gh/lit/dist@2.4.0/core/lit-core.min.js";

export class TodoItem extends LitElement {
    static properties = {
        text: { type: String }
    };

    static styles = css`
        :host {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 8px 0;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background-color: white;
        }
        button {
            background-color: #FA991C;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            padding: 4px 8px;
        }
    `;

    constructor() {
        super();
        this.text = '';
    }

    render() {
        return html`
            <span>${this.text}</span>
            <button @click=${this._removeItem}>-</button>
        `;
    }

    _removeItem() {
        this.remove();
    }
}

customElements.define('todo-item-lit', TodoItem);
