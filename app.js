// Selectors
const playerLivesCount = document.querySelector(".playerLivesCount");
let playerLives = 6;
// const retry
const replayBox = document.querySelector(".replay");
const replayButton = document.querySelector(".replay button");
const popUpButton = document.querySelector(".popup button");
const popUp = document.querySelector(".popup");
const cardsWrapper = document.querySelector(".wrapper");
const cards = document.querySelectorAll(".card"); // all cards
let matchedCard = 0;
let cardOne, cardTwo; // Select two card
let disableDeck = false;

// Hide pop up and show Memory Game
popUpButton.onclick = () => {
  popUp.classList.add("hide");
  cardsWrapper.classList.add("show");
};

//Fucntion - Flip Card
function flipCard(e) {
  let clickedCard = e.target; // getting user clicked card

  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip"); // If clicked, adds the class name flip
    //  Player lose player live

    if (!cardOne) {
      return (cardOne = clickedCard); //retrun the cardOne value to clickedCard
    }
    cardTwo = clickedCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector("img").src;
    cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

// Function Match Card
function matchCards(img1, img2) {
  // if two card matches eachother
  if (img1 === img2) {
    matchedCard++; //increment matched value by 1
    // if matched value is 8, user has matched all cards
    if (matchedCard == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 500); //clalling shuffelCard after 1sec
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = ""; //setting both card value to blank
    return (disableDeck = false);
  }
  // if two card not matched
  setTimeout(() => {
    playerLives--;
    playerLivesCount.textContent = playerLives;
    restartGame();
  }, 500);

  setTimeout(() => {
    // adding shake class to both after 400ms
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    // romoving shake class and flip it back after 1.2sec
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; //setting both card value to blank
    disableDeck = false;
  }, 1200);
}

// If player lose all lives
function restartGame() {
  if (playerLives === 0) {
    cardsWrapper.classList.remove("show");
  }
}
// Shuffle Cards
function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = "";
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });

  setTimeout(() => {
    cardsWrapper.classList.remove("show");
    replayBox.classList.add("show");
  }, 1000);
}

// Adding click event to all cards
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

// Replay Game

replayButton.onclick = () => {
  replayBox.classList.remove("show");
  popUp.classList.remove("hide");
};
