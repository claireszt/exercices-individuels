const askName = () => {
    let nameUser = prompt("Quel est votre prenom ?")
    let helloUser = '<h2> Bonjour ' + nameUser +' ! </h2>'
    return document.body.innerHTML += helloUser
}

const askBirthDate = () => {
    let yearUser = prompt("Quelle est votre annee de naissance ?")
    let monthUser = prompt("Quel est votre mois de naissance ?")
    let currentMonth = 6
    let ageUser = 0
        if(monthUser > currentMonth) {
            ageUser = 2023 - yearUser - 1
        } else {ageUser = 2023 - yearUser}

    return document.body.innerHTML += '<h3>Vous avez '+ageUser+' ans, déso.</h3>'
}

askName ()
askBirthDate () 