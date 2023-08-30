document.querySelector('#colors').innerHTML = '🔵🔴🟡🟣⚪️🟢🟤🟠'

const availableColors = ['🔵', '🟡', '🔴', '⚪️', '🟢', '🟤', '🟠', '🟣']
const winner = []

const winnerGen = () => {
    while (winner.length < 8) {
        let randomIndex = Math.floor(Math.random() * (availableColors.length/2))
        winner.push(availableColors[randomIndex]+availableColors[randomIndex+1])
    }
    console.log(winner)
} 


let guessCount = 12
winnerGen()

let gamePlay = document.querySelector('#gamePlay')
gamePlay.innerHTML = `${guessCount} guesses left`

const userGuess = () => {
    let userInput = document.querySelector('#input').value

    if (rightGuess(userInput) == false && guessCount > 0 && userInput.length == 8) {
        guessCount -= 1
        document.querySelector('#input').value = ""
        gamePlay.innerHTML = `${guessCount} guesses left`
    }
    else if (userInput.length != 8) {
        gamePlay.innerHTML = `please enter 4 colors`
        document.querySelector('#input').value = ""
    }
    if (rightGuess(userInput) == false && guessCount == 0) {
        gamePlay.innerHTML = `no more guesses, you lost !`
        document.querySelector('#input').value = ""
    }
    else if (rightGuess(userInput) == true) {
        gamePlay.innerHTML = `you win !`
    }

    console.log(userInput)
    console.log(rightGuess(userInput))
    console.log(guessCount)
}

const colorValidation = (guess) => {
    for (let i = 0 ; i <= guess.length ; i++) {
        if (availableColors.includes(guess[i]+guess[i+1]) == true) {
            return true
        }
        else {
            return false
        }
    }
}


const rightGuess = (guess) => {
    if (guess == winner.join("")) {
        return true
    }
    else {
        return false
    }
}

// const isWin = (guess) => {
//     if (guessCount > 0 && rightGuess(guess) == false) {
//         guessCount -= 1
//         console.log(guessCount)
//     }
//     else if (guessCount > 0 && rightGuess(guess) == true) {
//         return 'you win !'
//     }
//     else if (guessCount == 0) {
//         return 'you loose...'
//     }
// }

// const gamePlay = () => {
//     console.log(document.querySelector('#input').value)
//     let guess = userInput
//     console.log(isWin(guess))

//     while (guessCount > 0) {
//         guess = userInput
//         console.log(isWin(guess))
//     }
// }

