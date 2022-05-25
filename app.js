// Slectors
const cards = document.querySelectorAll(".card"); // all cards
let matchedCard = 0;
let cardOne, cardTwo; // Select two card
let disableDeck = false;

//Fucntion - Flip Card
function flipCard(e) {
  let clickedCard = e.target; // getting user clicked card

  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip"); // If clicked, adds the class name flip
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
