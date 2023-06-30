const getLatinCharacterList = (text) => {
    let array = []
    for (let i = 0 ; i < text.length ; i++) {
        array.push(text[i])
    }
    return array
}

const getMorseCharacterList = (text) => {
    return text.split(' ')
}


const latinToMorse = {
	'A':'.-',
	'B':'-...',
	'C':'-.-.',
	'D':'-..',
	'E':'.',
	'F':'..-.',
	'G':'--.',
	'H':'....',
	'I':'..',
	'J':'.---',
	'K':'-.-',
	'L':'.-..',
	'M':'--',
	'N':'-.',
	'O':'---',
	'P':'.--.',
	'Q':'--.-',
	'R':'.-.',
	'S':'...',
	'T':'-',
	'U':'..-',
	'V':'...-',
	'W':'.--',
	'X':'-..-',
	'Y':'-.--',
	'Z':'--..'
}

const morseToLatin = {
    '-': "T",
    '--': "M",
    '---': "O",
    '--.': "G",
    '--.-': "Q",
    '--..': "Z",
    '-.': "N",
    '-.-': "K",
    '-.--': "Y",
    '-.-.': "C",
    '-..': "D",
    '-..-': "X",
    '-...': "B",
    '.': "E",
    '.-': "A",
    '.--': "W",
    '.---': "J",
    '.--.': "P",
    '.-.': "R",
    '.-..': "L",
    '..': "I",
    '..-': "U",
    '..-.': "F",
    '...': "S",
    '...-': "V",
    '....': "H"
  }

const translateLatinCharacter = (char) => {
    return latinToMorse[char]
}

const translateMorseCharacter = (char) => {
    return morseToLatin[char]
}

const encode = (text) => {
    text = text.toUpperCase()
    getLatinCharacterList(text)
    let newArr = []
    for (let i = 0 ; i < text.length ; i++) {
        if (text[i]!=" ") {
            newArr.push(translateLatinCharacter(text[i]))
        } else {
            newArr.push(text[i])
        }
    }
    return newArr.join(" ")
}

const decode = (text) => {
    getMorseCharacterList(text)
    let newArr = []
    for (let i = 0 ; i < getMorseCharacterList(text).length ; i++) {
        if (getMorseCharacterList(text)[i]!=" ") {
        newArr.push(translateMorseCharacter(getMorseCharacterList(text)[i]))
        } else {
            newArr.push(getMorseCharacterList(text)[i])
        }
    }   
    return newArr.join("").toLowerCase()
}

function inputEncodeBtn(){
    return document.getElementById("resultEncode").innerText = encode(inputEncode.value)
  }

  function inputDecodeBtn(){
    return document.getElementById("resultDecode").innerHTML = decode(inputDecode.value)
  }
