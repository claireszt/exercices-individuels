let min = 0
let max = 10

let namePlayer1 = prompt('Player 1, what is your name ?')
let namePlayer2 = prompt('Player 2, what is your name ?')

// let instText = document.querySelector("instruction")
// instText.textContent = "Player 1"

const askNumber = () => {
    let numberToGuess

    do {
        numberToGuess = parseInt(prompt(`${namePlayer1}, please enter a number between ${min} and ${max}.`))
    }
    while (numberToGuess < min || numberToGuess > max)

    console.log(numberToGuess)
    return numberToGuess
} 

const didIWin = (number) => {
    let win
    if (winNumber === number) {
        win = true
    } else {
        win = false
    }

    return win
}

let promptText = `${namePlayer2} : guess the number between ${min} and ${max}.`

const gamePlay = () => {
    // first try
    let givenNumber= parseInt(prompt(promptText))

    let winner = didIWin(givenNumber)
    let countTry = 1

    // while false
    while(winner === false) {
        promptText = `try again ! (${countTry})`
        givenNumber = parseInt(prompt(promptText))
        winner = didIWin(givenNumber)
        countTry++
    }

    // win
    document.body.innerHTML += `${namePlayer2}, you are the winner ! <br> You guessed the number in ${countTry} tries.`}

const controle = () => {
    let numberInput = document.getElementById("input").value
    console.log(numberInput) 
    return numberInput 
}

let winNumber = askNumber()
gamePlay()