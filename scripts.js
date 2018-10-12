
// DOM variables
var cardcontainer = document.getElementsByClassName("card-container");
var topCard = document.getElementsByClassName("top_card");
var opponentCard = document.getElementsByClassName("opponent_card");
var backOfCards = document.getElementsByClassName("back_of_cards");
var backOfCardsInitial = document.getElementsByClassName("back_of_cards_initial");
var scoreContainer = document.getElementsByClassName("score-container");
var cards = document.getElementsByClassName("card");

//Array variables
var myDeck = [];
var opponentDeck = [];
var uniqueRandomNumber = [];

//General variables
var isVisible = false;

//Create 2 deck for each player on page load
window.onload = createDecks();

// Shuffling
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// Place used cards to the end of one of the decks
function usedCards(a){
  a.push(a[0]);
  a.splice(0,1);
}

// Creates 2 decks for both players
function createDecks(){
  // array of all cards
  var deck = [
    [2, "PNG/2C.png"],
    [2, "PNG/2D.png"],
    [2, "PNG/2H.png"],
    [2, "PNG/2S.png"],
    [3, "PNG/3C.png"],
    [3, "PNG/3D.png"],
    [3, "PNG/3H.png"],
    [3, "PNG/3S.png"],
    [4, "PNG/4C.png"],
    [4, "PNG/4D.png"],
    [4, "PNG/4H.png"],
    [4, "PNG/4S.png"],
    [5, "PNG/5C.png"],
    [5, "PNG/5D.png"],
    [5, "PNG/5H.png"],
    [5, "PNG/5S.png"],
    [6, "PNG/6C.png"],
    [6, "PNG/6D.png"],
    [6, "PNG/6H.png"],
    [6, "PNG/6S.png"],
    [7, "PNG/7C.png"],
    [7, "PNG/7D.png"],
    [7, "PNG/7H.png"],
    [7, "PNG/7S.png"],
    [8, "PNG/8C.png"],
    [8, "PNG/8D.png"],
    [8, "PNG/8H.png"],
    [8, "PNG/8S.png"],
    [9, "PNG/9C.png"],
    [9, "PNG/9D.png"],
    [9, "PNG/9H.png"],
    [9, "PNG/9S.png"],
    [10, "PNG/10C.png"],
    [10, "PNG/10D.png"],
    [10, "PNG/10H.png"],
    [10, "PNG/10S.png"],
    [11, "PNG/JC.png"],
    [11, "PNG/JD.png"],
    [11, "PNG/JH.png"],
    [11, "PNG/JS.png"],
    [12, "PNG/QC.png"],
    [12, "PNG/QD.png"],
    [12, "PNG/QH.png"],
    [12, "PNG/QS.png"],
    [13, "PNG/KC.png"],
    [13, "PNG/KD.png"],
    [13, "PNG/KH.png"],
    [13, "PNG/KS.png"],
    [14, "PNG/AC.png"],
    [14, "PNG/AD.png"],
    [14, "PNG/AH.png"],
    [14, "PNG/AS.png"]
  ];

  // array of unique numbers from 0 to 51
  for(i=0;i<52;i++){
    uniqueRandomNumber.push(i);
  }

  //shuffle the array of unique numbers
  uniqueRandomNumber = shuffle(uniqueRandomNumber);

  //creating a deck of 26 cards for Player 1 from the deck of all cards
  for(i=0; i<26;i++){
    randomNumber = uniqueRandomNumber[i];
    myDeck.push(deck[randomNumber]);
    delete deck[randomNumber];
  }

  //creating a deck of 26 cards for Player 2 from the rest of the cards
  for(i=0; i<52;i++){
    if(typeof deck[i] != 'undefined'){
      opponentDeck.push(deck[i]);
    }
  }
}

// Toggles the visibility of first cards in both decks
function toggleVisibility() {
          if(isVisible ==false){
            isVisible = true;
          } else {
            isVisible = false;
          }

          getNextCard(myDeck,topCard);
          getNextCard(opponentDeck,opponentCard);

          topCard[0].classList.add('flippedFront');
          backOfCards[0].classList.add('flippedBack');

          setTimeout(function(){
            opponentCard[0].classList.add('flippedFront');
            backOfCards[1].classList.add('flippedBack');
          },500);

          setTimeout(function(){
            //cardcontainer[0].style.pointerEvents = "none";
            topCard[0].classList.remove('flippedFront');
            opponentCard[0].classList.remove('flippedFront');
            backOfCards[0].classList.remove('flippedBack');
            backOfCards[1].classList.remove('flippedBack');
          },1500);


}


//Gets next card from both decks
function getNextCard(array,cardArray){
  cardSource = array[0];
  cardArray[0].src = cardSource[1];
}

// Getting value of my opened card
function getMyCardValue() {

      for(i=0; i<myDeck.length; i++){
          if (topCard[0].src.includes(myDeck[i][1])){
            var cardValue = myDeck[i][0];
          }
      }

    return cardValue

}

// Getting value of opened opponents card
function getOpponentCardValue(){

    for(i=0; i<opponentDeck.length; i++){
        if(opponentCard[0].src.includes(opponentDeck[i][1])){
          var cardValue = opponentDeck[i][0];
        }
    }

  return cardValue
}

// Actions when one of the players wins
function whoWins (e) {
  var firstPlayer = getMyCardValue();
  var secondPlayer = getOpponentCardValue();

  if(myDeck.length===0){
    myDeck = [];
    opponentDeck = [];
    createDecks();
  } else if (myDeck.length===52) {
    myDeck = [];
    opponentDeck = [];
    createDecks();
  }

    if (firstPlayer > secondPlayer){
      for(i=0; i<opponentDeck.length; i++){
        if(opponentCard[0].src.includes(opponentDeck[i][1])){
          myDeck.push(opponentDeck[i]);
          usedCards(myDeck);
          opponentDeck.splice(i,1);
        }
      }

    } else if(firstPlayer == secondPlayer){
        usedCards(myDeck);
        usedCards(opponentDeck);
    } else {
      for(i=0; i<myDeck.length; i++){
        if(topCard[0].src.includes(myDeck[i][1])){
          opponentDeck.push(myDeck[i]);
          usedCards(opponentDeck);
          myDeck.splice(i,1);
        }
      }
    }


  //Updating the score of each player
  scoreContainer[0].innerHTML = "Score: " + myDeck.length;
  scoreContainer[1].innerHTML = "Score: " +opponentDeck.length;
}



// Writing the score of each player
scoreContainer[0].innerHTML = "Score: " + myDeck.length;
scoreContainer[1].innerHTML = "Score: " + opponentDeck.length;

//Setting up initial cards
shuffle(myDeck);
topCardSource = myDeck[0];
topCard[0].src = topCardSource[1];
shuffle(opponentDeck);
opponentCardSource = opponentDeck[0];
opponentCard[0].src = opponentCardSource[1];


// Event listeners
cardcontainer[0].addEventListener("click", toggleVisibility);
cardcontainer[0].addEventListener("click", getMyCardValue);
cardcontainer[0].addEventListener("click", getOpponentCardValue);
cardcontainer[0].addEventListener("click", whoWins);
//cardcontainer[0].addEventListener("click", flipCards);

// function flipCards(){
//   topCard[0].style.display = "block";
//   opponentCard[0].style.display = "block";
//   topCard[0].classList.add("front");
//   backOfCards[0].classList.add("back");
// }
