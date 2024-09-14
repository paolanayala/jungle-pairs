//DEPENDENCIES -------------------------------------------------------------------------------->
const flashcards = document.querySelectorAll(".flashcard");
// let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let Time = 0;
let matchedPairs = 0; //Declare matchedPairs at the top level
let timeLeft = 60;
const timerElement = document.getElementById('time');
let gameRunTime;


//DATA ------------------------------------------------------------------------------------------>
console.log(cards)


//User Interaction------------------------------------------------------------------------------->
flashcards.forEach(card => card.addEventListener('click', flipCard));



//Functions--------------------------------------------------------------------------------------->
function shuffleCards() {
    const createBox = document.querySelector('.create-box');
    for (let i = createBox.children.length; i >= 0; i--) {
        createBox.appendChild(createBox.children[Math.random() * i | 0]);
    }
}

function flipCard() {
    if (lockBoard) return; // Prevent clicking if the board is locked
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
        const firstCardBack = firstCard.dataset.animal
        const secondCardBack = secondCard.dataset.animal
    let isMatch = firstCardBack === secondCardBack;
    //console.log(firstCardBack);
    //console.log(secondCardBack);
    console.log("Checking for match:");
    console.log("First card:", firstCardBack);
    console.log("Second card:", secondCardBack);
    console.log("Match found:", isMatch);

    if (isMatch) {
        matchedPairs++; // If it's a match, hide the cards
        hidePair();
        if  (matchedPairs === flashcards.length / 2) {
            //displayMessage('Congratulations! You won!'); //Display win message
            clearInterval(gameRunTime); // Stop the timer
            displayMessage(`Congratulations! You won! <br> Time Taken: ${60 - timeLeft} seconds`);
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

// Function to display a message
function displayMessage(message) {
    setTimeout(() => {
        alert(message); // Use alert or replace with a custom modal/dialog if needed
    }, 100); // Slight delay to ensure it shows after other actions
}

// Timer Function
function startTimer() {
    gameRunTime = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = timeLeft;
        } else {
            clearInterval(gameRunTime);
            displayMessage('Out of time! Game Over');
        }
    }, 1000);
}

// Restart Function
function restart() {
    flashcards.forEach(card => {
        card.classList.remove('flipped', 'hidden');
        if (!card.parentElement) {
            document.querySelector('.create-box').appendChild(card);
        }
    });

    matchedPairs = 0; // Reset matched pairs
    shuffleCards();
    timeLeft = 60; // Reset the timer back to 60 seconds
    timerElement.textContent = timeLeft;
    clearInterval(gameRunTime); // Clear any existing interval
    startTimer(); 
    console.log("Games restarted");// Restart the timer
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
        restart(); // Restart the game when "Play Again" is clicked
    });
    
    messageContent.appendChild(playAgainButton);
    messageContainer.appendChild(messageContent);
    document.body.appendChild(messageContainer);
    
    console.log("Message displayed:", message);
}

//Initialization-------------------------------------------------------------------------------->
// Call the shuffle function on page load 
shuffleCards();
startTimer();
