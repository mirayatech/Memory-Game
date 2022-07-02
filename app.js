// Selectors
const popUp = document.querySelector(".popup");
const cards = document.querySelectorAll(".card"); // all cards
const retryBox = document.querySelector(".retry");
const replayBox = document.querySelector(".replay");
const cardsWrapper = document.querySelector(".wrapper");
const popUpButton = document.querySelector(".popup button");
const retryButton = document.querySelector(".retry button");
const replayButton = document.querySelector(".replay button");
const playerLivesCount = document.querySelector(".playerLivesCount");
let playerLives = 6;
let matchedCard = 0;
let cardOne, cardTwo; // Select two card
let disableDeck = false;

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

popUpButton.onclick = () => {
  popUp.classList.add("hide");
  cardsWrapper.classList.add("show");
};

function flipCard(e) {
  let clickedCard = e.target; // getting user clicked card

  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector("img").src;
    cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++; //increment matched value by 1
    if (matchedCard == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 500);
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
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function restartGame() {
  if (playerLives === 0) {
    cardsWrapper.classList.remove("show");
    retryBox.classList.add("show");
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
  }
}

matchedCard = 0;
cardOne = cardTwo = "";
cards.forEach((card) => {
  card.classList.remove("flip");
  card.addEventListener("click", flipCard);
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
});


retryButton.onclick = () => {
  cardsWrapper.classList.add("show");
  retryBox.classList.remove("show");
};

function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = "";
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
  });

  setTimeout(() => {
    cardsWrapper.classList.remove("show");
    replayBox.classList.add("show");
  }, 1000);
}

replayButton.onclick = () => {
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  replayBox.classList.remove("show");
  popUp.classList.remove("hide");
};
