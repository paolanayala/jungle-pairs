//DEPENDENCIES -------------------------------------------------------------------------------->
const flashcards = document.querySelectorAll(".flashcard");
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0; //Declare matchedPairs at the top level
let timeLeft;
let gameRunTime;
let gameStarted = false; // Flag to check if the game has started

const timerElement = document.getElementById('time');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

//DATA ------------------------------------------------------------------------------------------>
const fastestTimeKey = 'fastestTime'; // Key to store fastest time in localStorage
let fastestTime = localStorage.getItem(fastestTimeKey);

//User Interaction------------------------------------------------------------------------------->
flashcards.forEach(card => card.addEventListener('click', flipCard));
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
document.querySelector('.btn-danger').addEventListener('click', () => setDifficulty(30));
document.querySelector('.btn-warning').addEventListener('click', () => setDifficulty(40));
document.querySelector('.btn-success').addEventListener('click', () => setDifficulty(60));

//Functions--------------------------------------------------------------------------------------->
function setDifficulty(seconds) {
    timeLeft = seconds;
    timerElement.textContent = timeLeft;
    startButton.disabled = false; // Enable the start button after selecting a difficulty
    console.log(`Difficulty set to ${seconds} seconds`);
}

function shuffleCards() {
    const createBox = document.querySelector('.create-box');
    for (let i = createBox.children.length; i >= 0; i--) {
        createBox.appendChild(createBox.children[Math.random() * i | 0]);
    }
}

function flipCard() {
    if (!gameStarted || lockBoard) return; // Prevent clicking if the game is not started or the board is locked
    if (this === firstCard) return; // Prevent double-clicking the same card

    this.classList.add('flipped');

    if (!firstCard) {
        // If it's the first card of the pair
        firstCard = this;
        return;
    }

    // If it's the second card
    secondCard = this;
    lockBoard = true; // Lock the board

    checkForMatch();
}

function checkForMatch() {
    const firstCardBack = firstCard.dataset.animal;
    const secondCardBack = secondCard.dataset.animal;
    let isMatch = firstCardBack === secondCardBack;
    console.log("Checking for match:");
    console.log("First card:", firstCardBack);
    console.log("Second card:", secondCardBack);
    console.log("Match found:", isMatch);

    if (isMatch) {
        matchedPairs++; // If it's a match, hide the cards
        hidePair();
        if (matchedPairs === flashcards.length / 2) {
            clearInterval(gameRunTime); // Stop the timer
            const timeTaken = timeLeft; // Time remaining when the game is won

            if (!fastestTime || timeTaken > fastestTime) {
                fastestTime = timeTaken;
                localStorage.setItem(fastestTimeKey, fastestTime);
            }

            displayMessage(`Congratulations! You won! Time Taken: ${60 - timeLeft} seconds\nFastest Time: ${60 - fastestTime} seconds`);
        }

    } else {
        unflipCards(); // If they don't match, unflip the cards
    }
}

// Funtion to hide matched pairs
function hidePair() {
    setTimeout(() => {
        // Add a 'hidden' class to hide the matched cards
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        resetBoard();
        console.log("Pair hidden");
    }, 500); // Adjust delay if needed to show the cards briefly before hiding them
}

// Function to unflip non-matching cards
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
        console.log("Cards unflipped");
    }, 1000); // Adjust the delay to control how long the cards stay visible before flipping back
}

// Function to reset the board state
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Timer Function
function startTimer() {
    gameRunTime = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = timeLeft;
        } else {
            clearInterval(gameRunTime);
            displayMessage(`Out of time! Game Over\nFastest Time: ${fastestTime ? 60 - fastestTime + ' seconds' : 'No fastest time yet'}`);
        }
    }, 1000);
}

function startGame() {
    if (!timeLeft) {
        alert("Please select a difficulty level first!");
        return;
    }
    gameStarted = true; // Allow the cards to be flipped
    shuffleCards();
    startTimer();
    startButton.style.display = 'none';
    restartButton.style.display = 'block';
    console.log("Game started");
}

// Restart Function
function restartGame() {
    gameStarted = false; // Prevent the cards from being flipped until the game starts
    flashcards.forEach(card => {
        card.classList.remove('flipped', 'hidden');
        if (!card.parentElement) {
            document.querySelector('.create-box').appendChild(card);
        }
    });

    matchedPairs = 0; // Reset matched pairs
    shuffleCards();
    timerElement.textContent = timeLeft; // Reset the timer display
    clearInterval(gameRunTime); // Clear any existing interval
    startGame(); // Restart the game
    console.log("Game restarted");
}

// Function to display a message with "Play Again" button
function displayMessage(message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.innerHTML = `<p>${message}</p>`;

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', () => {
        document.body.removeChild(messageContainer);
        restartGame(); // Restart the game when "Play Again" is clicked
    });

    messageContent.appendChild(playAgainButton);
    messageContainer.appendChild(messageContent);
    document.body.appendChild(messageContainer);

    console.log("Message displayed:", message);
}

//Initialization-------------------------------------------------------------------------------->
// Initialize the game with shuffle but don't allow interaction until start button is clicked
shuffleCards();
startButton.disabled = true; // Disable the start button initially
restartButton.style.display = 'none'; // Hide the restart button initially
window.onload = function() {
    
    alert("Welcome to Jungle Pairs! Please select a difficulty and press the start button when you're ready to play. Good luck!");
        return;
};