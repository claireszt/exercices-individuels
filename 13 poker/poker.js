let allCards

const cardsOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const cardsColors = ['spade', 'club', 'heart', 'diamond']

const playerCardsDiv = document.querySelector('.playerCards')
playerCardsDiv.innerHTML = ''
const flopDiv = document.querySelector('.flop')
const winGame = document.querySelector('.win')
winGame.style.display = 'none'
const computerCardsDiv = document.querySelector('.computerCards')

document.querySelector('.endgame').style.display = 'none'

const createDeck = () => {
    const orderedDeck = []
    for (let card of cardsOrder) {
        for (let color of cardsColors) {
            const toPush = { 'type': card, 'color': color }
            orderedDeck.push(toPush)
        }
    }

    const shuffledDeck = orderedDeck.sort((a, b) => 0.5 - Math.random());
    allCards = shuffledDeck
    return allCards
}

const deck = createDeck()

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const deal = (num) => {
    const deal = []

    for (let i = 0; i < num; i++) {
        const rand = getRandomInt(deck.length)
        deal.push(deck.splice(rand, 1))
    }

    return deal.flat()
}

let playerCards = deal(2)
let computerCards = deal(2)

const generateFlop = () => {
    const cards = []

    deal(1)
    cards.push(deal(1))
    cards.push(deal(1))
    cards.push(deal(1))
    
    deal(1)
    cards.push(deal(1))
    
    deal(1)
    cards.push(deal(1))

    return cards.flat()
}

const showdown = (playerCards, flop) => {
    const storage = {};
    const duplicates = [];

    const cardsOnTable = playerCards.concat(flop)

    for (const card of cardsOnTable) {
        const objStr = card.type

        if (storage[objStr]) {
            duplicates.push(card.type);
        } else {
            storage[objStr] = true;
        }
    }

    console.log(cardsOnTable)
    console.log(duplicates);

    if (duplicates.length == 1) { console.log(`1 paire (${duplicates[0]})`) }
    if (duplicates.length == 2 && duplicates[0] == duplicates[1]) { console.log(`brelan (${duplicates[0]})`) }
    if (duplicates.length == 2 && duplicates[0] != duplicates[1]) { console.log(`2 paires (${duplicates[0]} & ${duplicates[1]})`) }
    if (duplicates.length == 3 && duplicates[0] == duplicates[2]) { console.log(`carré (${duplicates[0]})`) }
    if (duplicates.length == 3 && duplicates[0] != duplicates[2]) { console.log(`full (${duplicates[0]} & ${duplicates[2]})`) }

}

const createCard = (card) => {
    let textColor

    if (card.color == 'heart' || card.color == 'diamond') {
        textColor = '#ff0000'
    }

    const innerHTML = `<div class="card" onclick="toggleFlip(this)">
        <div class="card-inner">
            <div class="card-front">
                <img src="images/back.jpeg">   
            </div>
            <div class="card-back">
                <h1 class="cardType" style="color:${textColor}">${card.type}</h1>
                <img src="images/${card.color}.png">
                <h1 class="cardType" style="color:${textColor}">${card.type}</h1>
            </div>
        </div>
    </div>
    `

    return innerHTML
}

const drawPlayerCards = (player) => {
    let innerHTML = ''
    for (let card of player) {
        innerHTML += createCard(card)
    }
    return innerHTML
}

playerCardsDiv.innerHTML = drawPlayerCards(playerCards)

const drawFlop = (turn) => {
    if (turn == 1) {
        for (let i = 0 ; i < 3 ; i++)
            document.querySelector('.turn1').innerHTML += createCard(flop[i])
    }
    else if (turn == 2) {
        document.querySelector('.turn2-3').innerHTML += createCard(flop[3])
    }
    else if (turn == 3) {
        document.querySelector('.turn2-3').innerHTML += createCard(flop[4])
    }
    
}

const flop = generateFlop()

const toggleFlip = (card) => {
    card.classList.toggle('flipped');
}

let turn = 0

const foldBtn = document.querySelector('#fold')
foldBtn.addEventListener("click", () => {
    location.reload()
    turn = 0
})


const playBtn = document.querySelector('#play')
if (turn < 3) {
    playBtn.addEventListener("click", () => {
        turn += 1
        let turnTxt

        if (turn == 1) { turnTxt = '1st turn' }
        else if (turn == 2) { turnTxt = '2nd turn' }
        else if (turn == 3) { turnTxt = '3rd turn'; winGame.style.display = 'flex' ; document.querySelector('#play').style.display = 'none'}
        else {turnTxt = '3rd turn'}

        document.querySelector('#turn').innerHTML = turnTxt

        drawFlop(turn)
    })
}

// const showComputerCards = document.querySelector('.showComputerCards')
// showComputerCards.addEventListener("click", () => {
//     document.querySelector('.computerCards').innerHTML = drawPlayerCards(computerCards)
// })

function getBestHand(cards) {
    if (cards.length !== 7) {
      throw new Error('Exactly 7 cards are required');
    }
  
    const suits = ['heart', 'spade', 'club', 'diamond'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
    // Create a map to count the occurrences of each card type
    const valueCounts = new Map();
    for (const card of cards) {
      const { type } = card;
      if (!valueCounts.has(type)) {
        valueCounts.set(type, 0);
      }
      valueCounts.set(type, valueCounts.get(type) + 1);
    }
  
    // Function to check if a hand has a flush
    function hasFlush() {
      for (const suit of suits) {
        const flushCards = cards.filter((card) => card.color === suit);
        if (flushCards.length >= 5) {
          return `Flush (${flushCards[0].color})`;
        }
      }
      return null;
    }
  
    // Function to check if a hand has a straight
    function hasStraight() {
      const uniqueValues = Array.from(valueCounts.keys()).sort((a, b) => values.indexOf(a) - values.indexOf(b));
      let straightCount = 0;
      let straightCards = [];
  
      for (let i = 0; i < uniqueValues.length - 1; i++) {
        const currentValueIdx = values.indexOf(uniqueValues[i]);
        const nextValueIdx = values.indexOf(uniqueValues[i + 1]);
        if (nextValueIdx - currentValueIdx === 1) {
          straightCount++;
          straightCards.push(uniqueValues[i]);
  
          if (straightCount >= 4) {
            straightCards.push(uniqueValues[i + 1]);
            return `Straight (${straightCards.join(', ')})`;
          }
        } else {
          straightCount = 0;
          straightCards = [];
        }
      }
      return null;
    }
  
    // Check for a flush first
    const flushResult = hasFlush();
    if (flushResult) {
      return flushResult; // Flush is the best hand
    }
  
    // Check for a straight
    const straightResult = hasStraight();
    if (straightResult) {
      return straightResult; // Straight is the second-best hand
    }
  
    // Check for four of a kind
    for (const [type, count] of valueCounts) {
      if (count === 4) {
        return `Four of a Kind (${type})`;
      }
    }
  
    // Check for a full house
    let threeOfAKindType = null;
    let pairType = null;
    for (const [type, count] of valueCounts) {
      if (count === 3) {
        threeOfAKindType = type;
      } else if (count === 2) {
        pairType = type;
      }
    }
    if (threeOfAKindType && pairType) {
      return `Full House (${threeOfAKindType} and ${pairType})`;
    }
  
    // Check for three of a kind
    for (const [type, count] of valueCounts) {
      if (count === 3) {
        return `Three of a Kind (${type})`;
      }
    }
  
    // Check for two pairs
    let firstPairType = null;
    let secondPairType = null;
    for (const [type, count] of valueCounts) {
      if (count === 2) {
        if (!firstPairType) {
          firstPairType = type;
        } else {
          secondPairType = type;
        }
      }
    }
    if (firstPairType && secondPairType) {
      return `Two Pair (${firstPairType} and ${secondPairType})`;
    }
  
    // Check for one pair
    for (const [type, count] of valueCounts) {
      if (count === 2) {
        return `One Pair (${type})`;
      }
    }
  
    // If no other hand, return the highest card
    const sortedCards = cards.sort((a, b) => values.indexOf(b.type) - values.indexOf(a.type));
    return `High Card (${sortedCards[0].type})`;
  }

function getBestHandName(cards) {
    if (cards.length !== 7) {
      throw new Error('Exactly 7 cards are required');
    }
  
    const suits = ['heart', 'spade', 'club', 'diamond'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
    // Create a map to count the occurrences of each card type
    const valueCounts = new Map();
    for (const card of cards) {
      const { type } = card;
      if (!valueCounts.has(type)) {
        valueCounts.set(type, 0);
      }
      valueCounts.set(type, valueCounts.get(type) + 1);
    }
  
    // Function to check if a hand has a flush
    function hasFlush() {
      for (const suit of suits) {
        const flushCards = cards.filter((card) => card.color === suit);
        if (flushCards.length >= 5) {
          return 'Flush';
        }
      }
      return null;
    }
  
    // Function to check if a hand has a straight
    function hasStraight() {
      const uniqueValues = Array.from(valueCounts.keys()).sort((a, b) => values.indexOf(a) - values.indexOf(b));
      let straightCount = 0;
      for (let i = 0; i < uniqueValues.length - 1; i++) {
        const currentValueIdx = values.indexOf(uniqueValues[i]);
        const nextValueIdx = values.indexOf(uniqueValues[i + 1]);
        if (nextValueIdx - currentValueIdx === 1) {
          straightCount++;
          if (straightCount >= 4) {
            return 'Straight';
          }
        } else {
          straightCount = 0;
        }
      }
      return null;
    }
  
    // Check for a flush first
    const flushResult = hasFlush();
    if (flushResult) {
      return flushResult; // Flush is the best hand
    }
  
    // Check for a straight
    const straightResult = hasStraight();
    if (straightResult) {
      return straightResult; // Straight is the second-best hand
    }
  
    // Check for four of a kind
    for (const [type, count] of valueCounts) {
      if (count === 4) {
        return 'Four of a Kind';
      }
    }
  
    // Check for a full house
    let threeOfAKindType = null;
    let pairType = null;
    for (const [type, count] of valueCounts) {
      if (count === 3) {
        threeOfAKindType = type;
      } else if (count === 2) {
        pairType = type;
      }
    }
    if (threeOfAKindType && pairType) {
      return 'Full House';
    }
  
    // Check for three of a kind
    for (const [type, count] of valueCounts) {
      if (count === 3) {
        return 'Three of a Kind';
      }
    }
  
    // Check for two pairs
    let firstPairType = null;
    let secondPairType = null;
    for (const [type, count] of valueCounts) {
      if (count === 2) {
        if (!firstPairType) {
          firstPairType = type;
        } else {
          secondPairType = type;
        }
      }
    }
    if (firstPairType && secondPairType) {
      return 'Two Pair';
    }
  
    // Check for one pair
    for (const [type, count] of valueCounts) {
      if (count === 2) {
        return 'One Pair';
      }
    }
  
    // If no other hand, return the highest card
    return 'High Card';
  }

const playerHand = playerCards.concat(flop)
const computerHand = computerCards.concat(flop)

console.log('Player : '+getBestHandName(playerHand))
console.log('Computer : '+getBestHandName(computerHand))

document.querySelector('#getPlayerHand').innerHTML = getBestHand(playerHand)

function compareHands(hand1, hand2) {
    // Define hand rankings
    const handRankings = [
      'High Card',
      'One Pair',
      'Two Pair',
      'Three of a Kind',
      'Straight',
      'Flush',
      'Full House',
      'Four of a Kind',
      'Straight Flush'
    ];
  
    // Function to get the ranking index of a hand
    function getHandRankingIndex(hand) {
      const handName = getBestHandName(hand);
      return handRankings.indexOf(handName);
    }
  
    const hand1RankIndex = getHandRankingIndex(hand1);
    const hand2RankIndex = getHandRankingIndex(hand2);
  
    if (hand1RankIndex < hand2RankIndex) {
      return 'Computer wins';
    } else if (hand1RankIndex > hand2RankIndex) {
      return 'You win !';
    } else {
      // If both hands have the same ranking, compare the highest cards
      const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
      function getHighestCardValue(hand) {
        const sortedHand = hand.sort((a, b) => values.indexOf(b.type) - values.indexOf(a.type));
        return values.indexOf(sortedHand[0].type);
      }
  
      const hand1HighestCardValue = getHighestCardValue(hand1);
      const hand2HighestCardValue = getHighestCardValue(hand2);
  
      if (hand1HighestCardValue < hand2HighestCardValue) {
        return 'Computer wins';
      } else if (hand1HighestCardValue > hand2HighestCardValue) {
        return 'You win !';
      } else {
        return 'It\'s a tie'; // If both hands have the same rank and highest card value
      }
    }
  }
  
console.log(compareHands(playerHand, computerHand));

document.querySelector('#showPlayerHand').innerHTML = getBestHand(playerHand)
document.querySelector('#showComputerHand').innerHTML = getBestHand(computerHand)

const engame = () => {
    document.querySelector('.game').style.display = 'none'
    document.querySelector('.endgame').style.display = 'flex'
}

document.querySelector('.result').innerHTML = compareHands(playerHand, computerHand)

const restartBtn = document.querySelector('.restartBtn')
restartBtn.addEventListener("click", () => {
    location.reload()
    turn = 0
})