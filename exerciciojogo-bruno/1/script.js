document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');

    const nameForm = document.getElementById('name-form');
    const guessInput = document.getElementById('guess');
    const guessButton = document.getElementById('guess-button');
    const playAgainButton = document.getElementById('play-again-button');

    const welcomeMessage = document.getElementById('welcome-message');
    const feedback = document.getElementById('feedback');
    const resultName = document.getElementById('result-name');
    const correctNumberDisplay = document.getElementById('correct-number');
    const scoreDisplay = document.getElementById('score');

    let userName = '';
    let randomNumber = 0;
    let attempts = 0;

    nameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        userName = document.getElementById('name').value;
        if (userName) {
            startGame();
        }
    });

    guessButton.addEventListener('click', function() {
        const guess = parseInt(guessInput.value, 10);
        if (!isNaN(guess) && guess >= 1 && guess <= 100) {
            attempts++;
            if (guess === randomNumber) {
                showResult();
            } else if (guess < randomNumber) {
                feedback.textContent = 'O número é maior.';
            } else {
                feedback.textContent = 'O número é menor.';
            }
        } else {
            feedback.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        }
    });

    playAgainButton.addEventListener('click', function() {
        resetGame();
    });

    function startGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        welcomeMessage.textContent = `Bem-vindo, ${userName}!`;
        feedback.textContent = '';
        guessInput.value = '';
        switchScreen(welcomeScreen, gameScreen);
    }

    function showResult() {
        resultName.textContent = userName;
        correctNumberDisplay.textContent = randomNumber;
        scoreDisplay.textContent = attempts;
        switchScreen(gameScreen, resultScreen);
    }

    function resetGame() {
        switchScreen(resultScreen, welcomeScreen);
    }

    function switchScreen(hideScreen, showScreen) {
        hideScreen.style.display = 'none';
        showScreen.style.display = 'block';
    }
});
