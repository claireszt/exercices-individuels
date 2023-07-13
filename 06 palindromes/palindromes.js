const isValidDate = (date) => {
    let arrDate = date.split("/")
    if (arrDate[0] <= maxDaysInMonth(arrDate[1]) && arrDate[2].length == 4 && arrDate[1] <=12) {
        return true
    }
    return false
}

const maxDaysInMonth = (month) => {
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        return 31
    }
    else if (month == 2) {
        return 29
    }
    else {return 30}

}

const isPalindrome = (str) => {
    const newStr = str.split("").join("").replace(/[^a-zA-Z0-9 ]/g, '')
    const strReverse = str.split("").reverse().join("").replace(/[^a-zA-Z0-9 ]/g, '')

    if (newStr == strReverse) {
        return true
    }
    else {
        return false
    }
}

const getNextPalindromes = (x) => {
    const arrPal = []
    let date = new Date()


    while (arrPal.length < x) {
        let newDate = date.setDate(date.getDate() + 1);
        date = new Date(newDate)
        let month = (date.getMonth() + 1).toString().padStart(2, "0")
        let day = date.getDate().toString().padStart(2, "0")

        if (isPalindrome(`${day}/${month}/${date.getFullYear()}`)) {
            arrPal.push(`${day}/${month}/${date.getFullYear()}`)
        }
    }

    return arrPal

}


const isDatePalindrome = (date) => {
    if (isPalindrome && isValidDate) {
        return true
    }
    else {
        return false
    }
}

// console.log(getNextPalindromes(8))
console.log(isDatePalindrome('03/02/2030'))