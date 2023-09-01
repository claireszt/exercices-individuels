function tryWord(word, base) {
    if (word.toUpperCase() === base.toUpperCase()) {
        return {result: true}
    } else {
        let wellPlaced = [];
        let notInWord = [];
        let missplaced = [];

        let arrayBase = base.toUpperCase().split('');
        let arrayWord = word.toUpperCase().split('');

        for (let i = 0; i < arrayBase.length - 1; i++) {
            if (arrayBase[i] === arrayWord[i]) {
                wellPlaced.push(arrayWord[i]);
            } else if (arrayBase.includes(arrayWord[i])) {
                missplaced.push(arrayWord[i])
            }
        }

        for (const char of arrayWord) {
            if (arrayBase.includes(char) === false) {
                notInWord.push(char)
            }
        }

        return { result: false, wellPlaced: wellPlaced, missplaced: missplaced, notInWord: notInWord }
    }
}

function guess() {
    let base = 'dictionnaire'
    let word = document.getElementById("word").value
    let result = tryWord(word, base)
    document.getElementById("word").value = ''
    document.getElementById("try").innerText = word


   
    if (result.result == true) {
        document.getElementById("win").innerText = 'Vous avez gagné'
        document.getElementById("well").innerText = ''
        document.getElementById("miss").innerText = ''
        document.getElementById("not").innerText = ''
    } else {
        document.getElementById("win").innerText = ''
        document.getElementById("well").innerText = 'Bien placé: ' + result.wellPlaced.join(', ')
        document.getElementById("miss").innerText = 'Mal placé: ' + result.missplaced.join(', ')
        document.getElementById("not").innerText = 'Pas dans le mot: ' + result.notInWord.join(', ')
    }
}
