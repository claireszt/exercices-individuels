let matches = 50

const removeMatches = (number) => {
    matches -= number
}

const matchesNumber = document.getElementById("matches")
matchesNumber.innerHTML = `${matches} matches`

let numberOfMatches = document.querySelectorAll('div > button')

for (let number of numberOfMatches) {
    number.addEventListener("click", () => {
        let numberToRemove = Number(number.innerText)

        if (matches < numberToRemove) {
            matchesNumber.innerHTML = `you win !`
        }

        else {
            removeMatches(numberToRemove)
            console.log(matches)

            matchesNumber.innerHTML = `${matches} left`
        }
    })
}
