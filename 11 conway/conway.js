
// functions
const decoupeChaine = (str) => {
    let newStr = str[0]

    for (let i = 1 ; i < str.length ; i++) {
        if (str[i] === str[i-1]) {
            newStr += str[i]
        } else {newStr += ' '+str[i]}
    }

    return newStr
}

const decritChaine = (str) => {
    const strSplit = decoupeChaine(str).split(" ")
    const newArr = []

    for (let i = 0 ; i < strSplit.length ; i++) {
        newArr.push(strSplit[i].length + strSplit[i].slice(0,1))
    }

    return newArr.join("")
}

const suiteConway = (carac, n) => {
    const suite = [carac, decritChaine(carac)]

    for (let i = 1 ; suite.length < n  ; i++) {
        suite.push(decritChaine(suite[i]))
    }

    return suite
}

// DOM
const getResults = () => {
    const caracValue = document.getElementById("carac").value 
    const nValue = document.getElementById("n").value 

    const suite = suiteConway(caracValue, nValue)
    const results = document.querySelector('.results')
    results.innerHTML = "<h3> Here is your suite :</h3>"


    for (let i = 0 ; i < suite.length ; i++) {
        results.innerHTML += `${suite[i]} </br>`
    }
}
