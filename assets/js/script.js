 
 
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

//Flip Card Function

//Check for Match Function

//Remove Pair Function

//Unflip Card Function

//Reset Function

//Restart Function
function restart() {
resetBoard();
shuffleCards();
generateCards();
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
);

