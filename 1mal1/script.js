let difficulty = "easy"

const todaysDate = () => { return new Date().toDateString() }

const dailyScoreCards = document.querySelectorAll(".dailyScore")


// Check if Local Storage funcionality exists
if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("difficulty")) {
        difficulty = localStorage.getItem("difficulty").toLowerCase()
    }

    const lastDate = localStorage.getItem("lastDate")
    if (lastDate !== todaysDate()) {
        localStorage.setItem("lastDate", todaysDate())
        localStorage.setItem("dailyScore", 0)
    } else {
        for (card of dailyScoreCards) {
            card.innerHTML = localStorage.getItem("dailyScore")
        }
    }
}



// Button logic 
const difficultyBar = document.querySelector("#difficulties")

document.querySelector(`#${difficulty}StartBanner`).show()
document.getElementById(difficulty).disabled = true


const allStartBanners = document.querySelectorAll("dialog.startBanner")

function closeAllStartBanners() {
    closeAllDialogs(allStartBanners)
}

function closeAllDialogs(dialogs) {
    for (dialog of dialogs) {
        dialog.close()
    }
}

function disableAllElementsInside(parent) {
    for (element of parent) {
        element.disabled = true
    }
}


const changeDifficulty = (event) => {
    for (button of difficultyBar.children) {
        button.disabled = false
    }
    event.target.disabled = true
    closeAllStartBanners()
    difficulty = event.target.innerHTML.toLowerCase()
    document.querySelector(`#${difficulty}StartBanner`).show()
}

for (button of difficultyBar.children) {
    button.addEventListener("click", changeDifficulty)
}

// When page is closed, store current difficulty
window.addEventListener("beforeunload", () => {
    localStorage.setItem("difficulty", difficulty)
});


const numpad = document.querySelector("#numpad")
const entryField = document.querySelector("#entry")

const typeNumberOnPad = (event) => {
    entryField.value += event.target.innerHTML
    entryField.focus()
}
for (numberButton of numpad.querySelectorAll(".number")) {
    numberButton.addEventListener("click", typeNumberOnPad)
}

const backspaceButton = document.querySelector("#backspace")
backspaceButton.addEventListener("click", () => {
    entryField.value = entryField.value.substring(0, entryField.value.length - 1)
    entryField.focus()
})

const allClearButton = document.querySelector("#allClear")
allClearButton.addEventListener("click", () => {
    entryField.value = ""
    entryField.focus()
})



const hamburgerButton = document.querySelector("#hamburger")

// Game logic

const expression = document.querySelector("#expression")
const problemScoreCard = document.querySelector("#problemScore")
const totalScoreCard = document.querySelector("#totalScore")
const problemCountCard = document.querySelector("#problemCount")

let firstNum, secondNum, totalScore, problemCount, correctCount, startTime, problemsLeftCount, solution

const problemProbabilitiesPerDifficultyInPercent = {
    "easy": [100, 0, 0, 0],
    "medium": [0, 80, 100, 0],
    "hard": [0, 65, 85, 100]
}

const timer = document.querySelector("#timer")

function setInitalGameState() {
    disableAllElementsInside(difficultyBar.children)
    closeAllStartBanners()
    hamburgerButton.disabled = true
    solution = createNewProblem()
    firstNum = 0
    secondNum = 0
    totalScore = 0
    problemCount = 0
    correctCount = 0
    if (difficulty == "hard") {
        problemsLeftCount = 50
    } else if (difficulty == "medium") {
        problemsLeftCount = 20
    } else {
        problemsLeftCount = 10
    }

    timer.classList.add("chart")
    startTime = performance.now()
}

function randomIntBetween(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound
}

const weightsForHarderDifficulties = [0, 0, 3, 15, 30, 35, 50, 65, 80, 95, 100]

function createNewProblem() {
    let weight = randomIntBetween(0, 100)
    const prevFirstNum = firstNum
    const prevSecondNum = secondNum

    if (weight <= problemProbabilitiesPerDifficultyInPercent[difficulty][0]) {
        firstNum = randomIntBetween(1, 10)
        do {
            secondNum = randomIntBetween(1, 10)
        } while (prevFirstNum == firstNum && prevSecondNum == secondNum)
        displayExpression(`${firstNum} · ${secondNum}`)
        return firstNum * secondNum
    } else if (weight <= problemProbabilitiesPerDifficultyInPercent[difficulty][1]) {
        weight = randomIntBetween(0, 100)
        let possibleNumber = 2
        while (weight > weightsForHarderDifficulties[possibleNumber]) {
            possibleNumber++
        }
        firstNum = possibleNumber
        do {
            weight = randomIntBetween(0, 100)
            let possibleNumber = 2
            while (weight > weightsForHarderDifficulties[possibleNumber]) {
                possibleNumber++
            }
            secondNum = possibleNumber
        } while (prevFirstNum == firstNum && prevSecondNum == secondNum)


        displayExpression(`${firstNum} · ${secondNum}`)
        return firstNum * secondNum
    } else if (weight <= problemProbabilitiesPerDifficultyInPercent[difficulty][2]) {
        firstNum = randomIntBetween(11, 21)
        secondNum = 2
        if (firstNum == 21) {
            firstNum = randomIntBetween(1, 10)
        }
        if (prevFirstNum == firstNum && prevSecondNum == secondNum) {
            firstNum = randomIntBetween(1, 10)
        }
        displayExpression(`${firstNum}<sup>${secondNum}</sup>`)
        return firstNum ** secondNum
    } else {
        firstNum = 2
        secondNum = randomIntBetween(0, 10)
        if (prevFirstNum == firstNum && prevSecondNum == secondNum) {
            secondNum = randomIntBetween(5, 10)
        }
        displayExpression(`${firstNum}<sup>${secondNum}</sup>`)
        return firstNum ** secondNum
    }
}

function updateInformation(problemScore) {

    problemCount++
    problemsLeftCount--
    totalScore += problemScore
    problemScoreCard.innerHTML = problemScore
    totalScoreCard.innerHTML = totalScore + " Pkt."
    problemCountCard.innerHTML = problemCount

}

function calculateScore(timeNeeded, isSolvedCorrectly, isHardProblem = false) {
    let score;

    if (isSolvedCorrectly) {
        if (!isHardProblem) {
            if (timeNeeded <= 2000) {
                score = 5
                displayMessage("Perfekt!")
            } else if (2000 < timeNeeded && timeNeeded <= 5000) {
                score = 3
                displayMessage("Niiiicht schlecht!")
            } else if (5000 < timeNeeded && timeNeeded <= 10000) {
                score = 2
                displayMessage("Gut!")
            } else if (10000 < timeNeeded && timeNeeded <= 60000) {
                score = 1
                displayMessage("Naja!")
            } else {
                score = 0
                displayMessage("Schläfst du?!")
            }
        } else {
            if (timeNeeded <= 10000) {
                score = 5
                displayMessage("Perfekt!")
            } else if (10000 < timeNeeded && timeNeeded <= 30000) {
                score = 3
                displayMessage("Niiiicht schlecht!")
            } else if (30000 < timeNeeded && timeNeeded <= 60000) {
                score = 2
                displayMessage("Gut!")
            } else if (60000 < timeNeeded && timeNeeded <= 120000) {
                score = 1
                displayMessage("Naja!")
            } else {
                score = 0
                displayMessage("Schläfst du?!")
            }
        }
    } else {
        score = -3
        displayMessage("Was'n das? " + solution + " is es")
    }

    if (difficulty == "hard") {
        score--
        score *= 10
    } else if (difficulty == "medium") {
        score *= 4
    }

    return score
}



function checkAnswer() {
    if (/\D/.test(entryField.value)) {
        entryField.setCustomValidity('Nix Buchstaben bitte')
        entryField.reportValidity()
        return false
    } else if (entryField.value == "") {
        return false
    } else {
        entryField.setCustomValidity("")
    }

    messageElement.classList.remove("slide")
    problemScoreCard.classList.remove("slide")
    timer.classList.remove("chart")


    updateInformation(calculateScore(performance.now() - startTime, entryField.value == solution, solution > 100))
    entryField.value = ""
    if (problemsLeftCount <= 0) {
        endGame()
        return false
    } else {
        solution = createNewProblem()
        startTime = performance.now()
        return false
    }
}

entryField.addEventListener("input", () => {
    entryField.setCustomValidity("")
})

const messageElement = document.getElementById("message")
function displayMessage(message) {
    messageElement.innerHTML = message
    setTimeout(() => {
        problemScoreCard.classList.add("slide")
        messageElement.classList.add("slide")
        timer.classList.add("chart")
    }, 50)
}

function displayExpression(message) {
    expression.innerHTML = message
}

//need to make less janky still
function endGame() {

    displayExpression(`${totalScore} Punkte`)
    if (difficulty == "hard" && totalScore >= 1900) {
        document.querySelector("#information").innerHTML = `<div>Wow! Du hast mit ${totalScore} Punkten Stufe 'Hard' gemeistert, dich hält nichts mehr auf!</div>`
    } else if (difficulty == "medium" && totalScore >= 375) {
        document.querySelector("#information").innerHTML = `<div>Wow! Du hast mit ${totalScore} Punkten Stufe 'Medium' gemeistert, jetzt musst du wohl auf 'Hard' spielen</div>`
    } else if (difficulty == "easy" && totalScore >= 42) {
        document.querySelector("#information").innerHTML = `<div>Wow! Du hast mit ${totalScore} Punkten Stufe 'Easy' gemeistert, jetzt musst du wohl auf 'Medium' spielen</div>`
    } else if (totalScore < 0) {
        document.querySelector("#information").innerHTML = `<div>MINUSPUNKTE? Sei froh, dass du die nicht sammeln kannst! MINUSPUNKTE? Was machst du denn? Eieiei, Miuspunkte...</div>`
    } else {
        document.querySelector("#information").innerHTML = `<div>Hier darfst du 5s dein Endergebnis bestaunen: ${totalScore}. Und gleich in die nächste Runde!</div>`
    }
    entryField.disabled = true
    disableAllElementsInside(numpad.children)

    document.querySelector("#information").removeAttribute("id")

    const changeDifficultyAfterWinning = (event) => {
        for (button of difficultyBar.children) {
            button.disabled = false
        }
        event.target.disabled = true
        document.querySelector(`#${difficulty}StartBanner`).close()
        difficulty = event.target.innerHTML.toLowerCase()

        setTimeout(() => { window.location.reload() }, 500)
    }

    hamburgerButton.disabled = false
    for (button of difficultyBar.children) {
        button.disabled = false
        button.addEventListener("click", changeDifficultyAfterWinning)
    }

    document.getElementById(difficulty).disabled = true



    if (typeof (Storage) !== "undefined") {
        const lastDate = localStorage.getItem("lastDate")
        const dailyScore = Number(localStorage.getItem("dailyScore"))
        if (lastDate && dailyScore && lastDate == todaysDate()) {
            localStorage.setItem("dailyScore", Math.max(dailyScore, dailyScore + totalScore))
            for (card of dailyScoreCards) {
                card.innerHTML = localStorage.getItem("dailyScore")
            }
        } else {
            localStorage.setItem("lastDate", todaysDate())
            localStorage.setItem("dailyScore", totalScore)
        }
    }

    setTimeout(() => { window.location.reload() }, 5000)
}

console.log(1)