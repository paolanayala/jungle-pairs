 
 
 // Create buttons for each animal
 //String[] animals = {"brown bear", "cat", "dog", "elepahnt", "hippo", "hyena" ,"lion", "parrot", "wolf", "zebfra"};
//  String[] soundFiles = {"brown bear.wav", "cat.wav", "dog.wav", "elephant.wav", "hippo.wav", "hyena.wav", "lion", "parrot", "wolf", "zebra"};
 
//  function playSound(soundFile) {
//     // Create a new Audio object
//     const audio = new Audio(`sounds/${soundFile}.mp3`);
//     audio.play(); // Play the sound

//DEPENDENCIES
const flashcards = document.querySelectorAll(".flashcard");
const startButtonEl = document.querySelector('#startButtonEl')
const startModalEl = document.querySelector('#startModalEl')
// let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let Time = 0;

//DATA - Get Data From Json
console.log(cards)
    shuffleCards();
    // generateCards();

//Shuffle Card Function
function shuffleCards() {
let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
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
        removePair(); // If it's a match, remove the cards
    } else {
        unflipCards(); // If they don't match, unflip the cards
    }
}

function removePair() {
    setTimeout(() => {
        // Optionally add an animation before removal
        firstCard.classList.add('removed');
        secondCard.classList.add('removed');

        // Actually remove the cards from the DOM
        setTimeout(() => {
            firstCard.remove();
            secondCard.remove();
            resetBoard();
        }, 500); // Adjust delay as needed for a smoother removal animation
    }, 500); // Adjust delay if you want to show the cards for a brief moment before removal
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
//shuffleCards();
// Call the shuffle function on page load
//shuffleCards();
//Check for Match Function

//Remove Pair Function

//Unflip Card Function

//Reset Function
//Restart Function
function restart() {
//resetBoard();
shuffleCards();
//generateCards();
}
//Timer Function
let timeLeft = 60;
const timerElement = document.getElementById('time');
        ///starts timer when game starts

const gameRunTime = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = timeLeft;
    } else {
        clearInterval(gameRunTime);
        alert('Out of time! Game Over ');
    }
}, 1000
); console.log(restart);

startButtonEl.addEventListener('click', () => {
resetBoard()
shuffleCards
startModalEl.style.display = 'none'
})