const itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
    <style>
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
    </style>
    <span></span>
    <button>-</button>
`;

class TodoItem extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(itemTemplate.content.cloneNode(true));

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            this.remove();
        });
    }

    connectedCallback() {
        this.shadowRoot.querySelector('span').textContent = this.getAttribute('text');
    }
}

customElements.define('todo-item', TodoItem);
