 
 
 // Create buttons for each animal
 //String[] animals = {"brown bear", "cat", "dog", "elepahnt", "hippo", "hyena" ,"lion", "parrot", "wolf", "zebfra"};
//  String[] soundFiles = {"brown bear.wav", "cat.wav", "dog.wav", "elephant.wav", "hippo.wav", "hyena.wav", "lion", "parrot", "wolf", "zebra"};
 
//  function playSound(soundFile) {
//     // Create a new Audio object
//     const audio = new Audio(`sounds/${soundFile}.mp3`);
//     audio.play(); // Play the sound

//DEPENDENCIES
const flashcards = document.querySelectorAll(".flashcard");
// let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let Time = 0;
let matchedPairs = 0; //Declare matchedPairs at the top level

const timeElement = document.getElementById('time');
const startButton = document.getElementById('startBtn');
const restartButton = document.getElementById('restartBtn');
//DATA - Get Data From Json
console.log(cards)
    shuffleCards();
    // generateCards();

//Shuffle Card Function
// function shuffleCards() {
// let currentIndex = cards.length,
//     randomIndex,
//     temporaryValue;
// while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = cards[currentIndex];
//     cards[currentIndex] = cards[randomIndex];
//     cards[randomIndex] = temporaryValue;
//  }
// }
function shuffleCards() {
    const createBox = document.querySelector('.create-box');
    for (let i = createBox.children.length; i >= 0; i--) {
        createBox.appendChild(createBox.children[Math.random() * i | 0]);
    }
}

//Generate Card Function

//Flip Card Function// Select all flashcards----------------------> Kol input

// Add event listeners to all flashcards
flashcards.forEach(card => card.addEventListener('click', flipCard));

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
    console.log(firstCardBack);
    console.log(secondCardBack);
    //firstCard.querySelector('.flashcard-back').textContent === secondCard.querySelector('.flashcard-back').textContent;

    if (isMatch) {
        matchedPairs++; // If it's a match, hide the cards
        hidePair();
        if  (matchedPairs === flashcards.length / 2) {
            displayMessage('Congratulations! You won!') ; //Display win message
            clearInterval(gameRunTime); // Stop the timer
        }

    } else {
        unflipCards(); // If they don't match, unflip the cards
    }
}

function hidePair() {
    setTimeout(() => {
        // Add a 'hidden' class to hide the matched cards
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        resetBoard();
    }, 500); // Adjust delay if needed to show the cards briefly before hiding them
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000); // Adjust the delay to control how long the cards stay visible before flipping back
}


function resetBoard() {
    // Reset the board state
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Shuffle the cards initially (Optional)
function shuffleCards() {
    const createBox = document.querySelector('.create-box');
    for (let i = createBox.children.length; i >= 0; i--) {
        createBox.appendChild(createBox.children[Math.random() * i | 0]);
    }
}

// USER INTERACTTIONS
// a user clicks a card ...


// INITIALIZATION
// Call the shuffle function on page load------------------------------------>
shuffleCards();
// Call the shuffle function on page load
shuffleCards();
//Check for Match Function

//Remove Pair Function

//Unflip Card Function

//Reset Function
//Restart Function
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
    startTimer(); // Restart the timer
}

// Function to display a message
function displayMessage(message) {
    setTimeout(() => {
        alert(message); // Use alert or replace with a custom modal/dialog if needed
    }, 100); // Slight delay to ensure it shows after other actions
}

// Timer Function
let timeLeft = 60;
const timerElement = document.getElementById('time');
let gameRunTime;

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

// function restart() {
//     flashcards.forEach(card => {
//         card.classList.remove ('flipped', 'removed');
//         if (!card.parentElement) {
//             document.querySelector('.create-box').appendChild(card);
//         }
//     })
// //resetBoard();
// shuffleCards();
// //generateCards();
// // timeLeft = 60; //Reset the timer back to 60secs 
// // timerElement.textContent = timeLeft;
// // }
// // //Timer Function
// // let timeLeft = 60;
// // const timerElement = document.getElementById('time');
// //         ///starts timer when game starts

// // const gameRunTime = setInterval(() => {
// //     if (timeLeft > 0) {
// //         timeLeft--;
// //         timerElement.textContent = timeLeft;
// //     } else {
// //         clearInterval(gameRunTime);
// //         alert('Out of time! Game Over ');
// //     }
// // }, 1000
// // ); console.log(restart);

