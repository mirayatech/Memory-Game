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
