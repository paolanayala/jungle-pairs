//DEPENDENCIES
const flashcards = document.querySelectorAll(".flashcard");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let Time = 0;

document.querySelector(".score").textContent = score;

//DATA - Get Data From Json
fetch("./assets/data/cards.json")
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

