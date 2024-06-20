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

    const customHr = document.querySelectorAll('.customHr');

    let userName = '';
    let randomNumber = 0;
    let attempts = 0;

    // Colocar foco no input de nome ao carregar a página
    document.getElementById('name').focus();

    nameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        userName = document.getElementById('name').value;
        if (userName) {
            startGame();
        }
    });

    guessButton.addEventListener('click', processGuess);
    guessInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            processGuess();
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
        guessInput.focus(); // Colocar foco no input de adivinhação
    }

    function processGuess() {
        const guess = parseInt(guessInput.value, 10);
        if (!isNaN(guess) && guess >= 1 && guess <= 100) {
            attempts++;
            let difference = Math.abs(randomNumber - guess);
            if (guess === randomNumber) {
                showResult();
            } else if (guess < randomNumber) {
                if (difference <= 10) {
                    feedback.textContent = 'O número é maior.';
                    feedback.style.color = 'red'; // próximo
                } else {
                    feedback.textContent = 'O número é maior.';
                    feedback.style.color = 'blue'; // distante
                }
            } else {
                if (difference <= 10) {
                    feedback.textContent = 'O número é menor.';
                    feedback.style.color = 'red'; // próximo
                } else {
                    feedback.textContent = 'O número é menor.';
                    feedback.style.color = 'blue'; // distante
                }
            }
        } else {
            feedback.textContent = 'Por favor, insira um número válido entre 1 e 100.';
            feedback.style.color = 'black'; // cor padrão
        }
    }

    function showResult() {
        resultName.textContent = userName;
        correctNumberDisplay.textContent = randomNumber;
        scoreDisplay.textContent = attempts;
        switchScreen(gameScreen, resultScreen);
    }

    function resetGame() {
        switchScreen(resultScreen, welcomeScreen);
        document.getElementById('name').focus(); // Colocar foco no input de nome
    }

    function switchScreen(hideScreen, showScreen) {
        hideScreen.style.display = 'none';
        showScreen.style.display = 'block';
    }

    function changeHrColor(color) {
        customHr.forEach(hr => hr.style.backgroundColor = color);
    }

    // Alterar cor das linhas hr ao carregar a página
    document.addEventListener('DOMContentLoaded', function() {
        changeHrColor('blue');
    });
});
