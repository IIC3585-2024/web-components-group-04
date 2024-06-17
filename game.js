document.addEventListener('DOMContentLoaded', () => {
    const startButtonStandard = document.getElementById('start-button-standard');
    const timerDisplayStandard = document.getElementById('timer-standard');
    const stopButtonStandard = document.getElementById('stop-button-standard');
    const todoListStandard = document.getElementById('todo-list-standard');
    const cartListStandard = document.getElementById('cart-list-standard');

    const startButtonLit = document.getElementById('start-button-lit');
    const timerDisplayLit = document.getElementById('timer-lit');
    const stopButtonLit = document.getElementById('stop-button-lit');
    const todoListLit = document.getElementById('todo-list-lit');
    const cartListLit = document.getElementById('cart-list-lit');

    const toggleButton = document.getElementById('toggle-button');
    const standardVersion = document.getElementById('standard-version');
    const litVersion = document.getElementById('lit-version');

    const productsContainerStandard = standardVersion.querySelector('.products-container');
    const productsContainerLit = litVersion.querySelector('.products-container');

    const root = document.documentElement;

    let timeLeft = 60;
    let timer;
    let itemsToBuy = [];
    let itemsInCart = [];

    stopButtonStandard.disabled = true;
    stopButtonLit.disabled = true;

    startButtonStandard.addEventListener('click', () => startGame(todoListStandard, timerDisplayStandard, startButtonStandard, stopButtonStandard));
    startButtonLit.addEventListener('click', () => startGame(todoListLit, timerDisplayLit, startButtonLit, stopButtonLit));

    stopButtonStandard.addEventListener('click', () => stopGame(timer, startButtonStandard, stopButtonStandard));
    stopButtonLit.addEventListener('click', () => stopGame(timer, startButtonLit, stopButtonLit));

    todoListStandard.addEventListener('item-added', (event) => addNewItem(event.detail, 'standard'));
    todoListLit.addEventListener('item-added', (event) => addNewItem(event.detail, 'lit'));

    toggleButton.addEventListener('click', () => {
        if (standardVersion.style.display === 'none') {
            standardVersion.style.display = 'flex';
            litVersion.style.display = 'none';
            toggleButton.textContent = 'Switch to Lit Version';
            root.setAttribute('data-theme', 'standard');
        } else {
            standardVersion.style.display = 'none';
            litVersion.style.display = 'flex';
            toggleButton.textContent = 'Switch to Standard Version';
            root.setAttribute('data-theme', 'lit');
        }
    });

    function startGame(todoList, timerDisplay, startButton, stopButton) {
        itemsInCart = [];
        itemsToBuy = todoList.getItems();
        timeLeft = 0;
        startButton.disabled = true;
        stopButton.disabled = false;
        timer = setInterval(() => updateTimer(timerDisplay), 100);

        cartListStandard.clearTasks();
        cartListLit.clearTasks();

        document.querySelectorAll('sell-item').forEach(item => {
            item.addEventListener('add-to-cart', addItemToCart);
        });

        document.querySelectorAll('sell-item-lit').forEach(item => {
            item.addEventListener('add-to-cart', addItemToCart);
        });
    }

    function updateTimer(timerDisplay) {
        timeLeft = Math.round((timeLeft + 0.1) * 10) / 10;
        timerDisplay.textContent = `Time: ${timeLeft}`;
    }

    function addItemToCart(event) {
        const itemTitle = event.target.getAttribute('title');
        if (!itemsInCart.includes(itemTitle)) {
            itemsInCart.push(itemTitle);

            cartListStandard.addTask(itemTitle);
            cartListLit.addTask(itemTitle);
        }
    }

    function stopGame(timer, startButton, stopButton) {
        clearInterval(timer);
        stopButton.disabled = true;
        checkGameResult();
        resetGame(startButton, timerDisplayStandard, stopButtonStandard);
        resetGame(startButton, timerDisplayLit, stopButtonLit);
    }

    function checkGameResult() {
        if (itemsToBuy.every(item => itemsInCart.includes(item))) {
            alert('Ganaste! ' + timeLeft + ' segundos');
        } else {
            alert('Te Faltaron cosas!');
        }
    }

    function resetGame(startButton, timerDisplay, stopButton) {
        clearInterval(timer);
        startButton.disabled = false;
        timerDisplay.textContent = 'Time: 0';
        document.querySelectorAll('sell-item').forEach(item => {
            item.removeEventListener('add-to-cart', addItemToCart);
        });
        document.querySelectorAll('sell-item-lit').forEach(item => {
            item.removeEventListener('add-to-cart', addItemToCart);
        });
    }

    function addNewItem(itemTitle, version) {
        const newItemStandard = document.createElement('sell-item');

        const price = Math.floor(Math.random() * 1000) + 1;
        const discount = Math.floor(Math.random() * 100) + 1;
        const rating = Math.floor(Math.random() * 5) + 1;

        newItemStandard.setAttribute('img-src', `./assets/food.png`);
        newItemStandard.setAttribute('title', itemTitle);
        newItemStandard.setAttribute('price', price);
        newItemStandard.setAttribute('discount-price', Math.floor(price - price * discount / 100));
        newItemStandard.setAttribute('discount', `${discount}%`);
        newItemStandard.setAttribute('rating', rating); 

        const newItemLit = document.createElement('sell-item-lit');

        newItemLit.setAttribute('img-src', `./assets/food.png`);
        newItemLit.setAttribute('title', itemTitle);
        newItemLit.setAttribute('price', price);
        newItemLit.setAttribute('discount-price', Math.floor(price - price * discount / 100));
        newItemLit.setAttribute('discount', `${discount}%`);
        newItemLit.setAttribute('rating', rating); 

        productsContainerStandard.appendChild(newItemStandard);
        productsContainerLit.appendChild(newItemLit);
    }
});
