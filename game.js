document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const timerDisplay = document.getElementById('timer');
    const stopButton = document.getElementById('stop-button');
    const todoList = document.querySelector('todo-list');
    let timeLeft = 60;
    let timer;

    
    stopButton.disabled = true;

    let itemsToBuy = [];
    let itemsInCart = [];

    startButton.addEventListener('click', startGame);

    stopButton.addEventListener('click', () => {
        clearInterval(timer);
        stopButton.disabled = true;
        checkGameResult();
    });


    function startGame() {
        itemsInCart = [];
        itemsToBuy = todoList.getItems();
        timeLeft = 0;
        startButton.disabled = true;
        stopButton.disabled = false;
        timer = setInterval(updateTimer, 100);

        document.querySelectorAll('sell-item').forEach(item => {
            item.addEventListener('add-to-cart', addItemToCart);
        });
    }

    function updateTimer() {
        timeLeft = Math.round((timeLeft + 0.1) * 10) / 10;
        timerDisplay.textContent = `Time: ${timeLeft}`;
    }

    function addItemToCart(event) {
        const itemTitle = event.target.getAttribute('title');
        if (!itemsInCart.includes(itemTitle)) {
            itemsInCart.push(itemTitle);
        }
    }

    function checkGameResult() {
        if (itemsToBuy.every(item => itemsInCart.includes(item))) {
            alert('Ganaste!' + timeLeft + ' segundos');
            resetGame();
        }
        else{
            alert('Te Faltaron cosas!');
            resetGame();
        }
    }

    function resetGame() {
        clearInterval(timer);
        startButton.disabled = false;
        timerDisplay.textContent = 'Time: 0';
        document.querySelectorAll('sell-item').forEach(item => {
            item.removeEventListener('click', addItemToCart);
        });
    }
});
