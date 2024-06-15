const listTemplate = document.createElement('template');
listTemplate.innerHTML = `
    <style>
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
    </style>
    <div>
        <h2></h2>
        <p>Esta es una lista de tareas.</p>
        <input type="text" placeholder="">
        <button>Añadir tarea</button>
        <ul></ul>
    </div>
`;

class TodoList extends HTMLElement {
    static get observedAttributes() {
        return ['item1', 'item2', 'item3', 'prompt', 'titulo', 'placeholder'];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(listTemplate.content.cloneNode(true));

        this.shadowRoot.querySelector('button').addEventListener('click', this.addTask.bind(this));

        this.shadowRoot.querySelector('input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }

    connectedCallback() {
        this.updateTitle();
        this.updatePrompt();
        this.updatePlaceholder();
        this.updateItems();
    }

    attributeChangedCallback(name) {
        switch(name) {
            case 'item1':
            case 'item2':
            case 'item3':
                this.updateItems();
                break;
            case 'prompt':
                this.updatePrompt();
                break;
            case 'titulo':
                this.updateTitle();
                break;
        }
    }

    updateTitle() {
        const title = this.getAttribute('titulo') || 'Lista de tareas';
        this.shadowRoot.querySelector('h2').textContent = title;
    }

    updatePrompt() {
        const prompt = this.getAttribute('prompt') || 'Nueva tarea';
        this.shadowRoot.querySelector('p').textContent = prompt;
    }

    updatePlaceholder() {
        const placeholder = this.getAttribute('placeholder') || 'Escribe una tarea';
        this.shadowRoot.querySelector('input').setAttribute('placeholder', placeholder);
    }

    updateItems() {
        const ul = this.shadowRoot.querySelector('ul');
        ul.innerHTML = '';

        for (let i = 1; i <= 3; i++) {
            const item = this.getAttribute(`item${i}`);
            if (item) {
                const todoItem = document.createElement('todo-item');
                todoItem.setAttribute('text', item);
                ul.appendChild(todoItem);
            }
        }
    }

    addTask() {
        const input = this.shadowRoot.querySelector('input');
        const task = input.value.trim();

        if (task) {
            const todoItem = document.createElement('todo-item');
            todoItem.setAttribute('text', task);
            this.shadowRoot.querySelector('ul').appendChild(todoItem);
            input.value = '';
        }
    }

    getItems() {
        const items = [];
        this.shadowRoot.querySelectorAll('todo-item').forEach(item => {
            items.push(item.getAttribute('text'));
        });
        return items;
    }
}

customElements.define('todo-list', TodoList);



