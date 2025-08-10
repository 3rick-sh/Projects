const EMOJIS = ['❤️', '	💙', '💚', '💛', '🤍', '💜', '🤎', '🖤']
const CARDS = [...EMOJIS, ...EMOJIS];

const gameBoard = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const starStopBtn = document.getElementById('star-stop-btn');
const gameInfoElement = document.getElementById('game-info');


let gameState = {
    flippedCards: [],
    move: 0,
    score: 0,
    timer: 0,
    intervalId: null,
    isGameRunning: false,
};


const shuffleArray = (array) => {
    for(let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


const createCard = (emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

flipCard = (card) => {
    if(!gameState.isGameRunning || gameState.flippedCards.length >= 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    gameState.flippedCards.push(card);

    if (gameState.flippedCards.length === 2) {
        gameState.move++;
        updateMovesDisplay();
        setTimeout(checkMatch, 500);
    }
}


const checkMatch = () => {
    const [card1, card2] = gameState.flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        gameState.score += 10;
        updateMovesDisplay();
        if (document.querySelectorAll('.flipped').length === CARDS.length) {
            endGame();
        }
    } else {
        [card1,card2].forEach((card) => {
            card.classList.remove('flipped');
            card.textContent = ''
        })
    }
    gameState.flippedCards = [];
}

const updateMovesDisplay = () => movesElement.textContent = `Movimientos: ${gameState.move}`;
const updateScoreDisplay = () => scoreElement.textContent = `Puntuación: ${gameState.score}`;
const updateTimerDisplay = () => timerElement.textContent = `Tiempo: ${gameState.timer}`;


const startTimer = () => {
    gameState.intervalId = setInterval(() => {
        gameState.timer++;
        updateTimerDisplay();
    },  1000);
}


const startGame = () => {
    gameState = {...gameState, flippedCards:[], moves:0, timer:0, isGameRunning: true };
    shuffleArray(CARDS);
    gameBoard.innerHTML = '';
    CARDS.forEach((emoji) => gameBoard.appendChild(createCard(emoji)));
    updateMovesDisplay();
    updateScoreDisplay();
    updateTimerDisplay();
    startTimer();

    starStopBtn.textContent = 'Detener juego';
    gameInfoElement.classList.remove('hidden');

    gameBoard.classList.remove('hidden', 'fade-out');
}

const stopGame = () => {
    gameState.isGameRunning = false,
    clearInterval(gameState.intervalId);
    starStopBtn.textContent = 'Iniciar juego';
    
    gameInfoElement.classList.add('hidden');
    gameBoard.classList.add('fade-out');
    setTimeout(() => gameBoard.classList.add('hidden', 500));
}

const endGame = () => {
    clearInterval(gameState.intervalId);
    const finalScore = gameState.score + Math.max(0, 1000 - gameState.timer * 10 - gameState.move * 5);
    alert(`¡Juego Terminado! Puntuacion final:${finalScore}`);
    stopGame();
}


const startStopGame = () => gameState.isGameRunning ? stopGame() : startGame();

starStopBtn.addEventListener('click', startStopGame);

document.getElementById('start-stop-btn').addEventListener('click', () => {
    gameInfoElement.classList.remove('hidden');
    startGame();
})
