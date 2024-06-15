document.addEventListener('DOMContentLoaded', () => {
    const startButtonStandard = document.getElementById('start-button-standard');
    const timerDisplayStandard = document.getElementById('timer-standard');
    const stopButtonStandard = document.getElementById('stop-button-standard');
    const todoListStandard = document.getElementById('todo-list-standard');

    const startButtonLit = document.getElementById('start-button-lit');
    const timerDisplayLit = document.getElementById('timer-lit');
    const stopButtonLit = document.getElementById('stop-button-lit');
    const todoListLit = document.getElementById('todo-list-lit');

    const toggleButton = document.getElementById('toggle-button');
    const standardVersion = document.getElementById('standard-version');
    const litVersion = document.getElementById('lit-version');

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

    toggleButton.addEventListener('click', () => {
        if (standardVersion.style.display === 'none') {
            standardVersion.style.display = 'flex';
            litVersion.style.display = 'none';
            toggleButton.textContent = 'Switch to Lit Version';
        } else {
            standardVersion.style.display = 'none';
            litVersion.style.display = 'flex';
            toggleButton.textContent = 'Switch to Standard Version';
        }
    });

    function startGame(todoList, timerDisplay, startButton, stopButton) {
        itemsInCart = [];
        itemsToBuy = todoList.getItems();
        timeLeft = 0;
        startButton.disabled = true;
        stopButton.disabled = false;
        timer = setInterval(() => updateTimer(timerDisplay), 100);

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
});
