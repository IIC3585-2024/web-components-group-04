import { LitElement, html, css } from 'lit';

export class TodoList extends LitElement {
    static properties = {
        items: { type: Array },
        prompt: { type: String },
        titulo: { type: String },
        placeholder: { type: String }
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
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        p {
            color: #333;
        }
        input {
            padding: 8px;
            margin-right: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        input:focus {
            outline: none;
        }
        button {
            padding: 8px 16px;
            background-color: #333;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        ul {
            list-style: none;
            padding: 0;
        }
    `;

    constructor() {
        super();
        this.items = [];
        this.prompt = 'Nueva tarea';
        this.titulo = 'Lista de tareas';
        this.placeholder = 'Escribe una tarea';
    }

    render() {
        return html`
            <div>
                <h2>${this.titulo}</h2>
                <p>${this.prompt}</p>
                <input type="text" placeholder="${this.placeholder}" @keypress=${this._handleKeyPress}>
                <button @click=${this._addTask}>Añadir tarea</button>
                <ul>
                    ${this.items.map(item => html`<todo-item-lit text="${item}" @remove=${this._removeItem}></todo-item-lit>`)}
                </ul>
            </div>
        `;
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this._addTask();
        }
    }

    _addTask() {
        const input = this.shadowRoot.querySelector('input');
        const task = input.value.trim();

        if (task) {
            this.items = [...this.items, task];
            input.value = '';
        }
    }

    _removeItem(e) {
        const itemToRemove = e.detail;
        this.items = this.items.filter(item => item !== itemToRemove);
    }

    getItems() {
        return this.items;
    }
}

customElements.define('todo-list-lit', TodoList);
