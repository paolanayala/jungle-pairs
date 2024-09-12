//DEPENDENCIES
const flashcards = document.querySelectorAll(".flashcard");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let Time = 0;

document.querySelector(".score").textContent = score;

//DATA - Get Data From Json
fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

//Shuffle Card Function

//Generate Card Function

//Flip Card Function

//Check for Match Function

//Remove Pair Function

//Unflip Card Function

//Reset Function

//Restart Function

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

