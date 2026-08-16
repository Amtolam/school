// Button logic

let difficulty = "Easy"
// Check if Local Storage funcionality exists
if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("difficulty")) {
        difficulty = localStorage.getItem("difficulty")
    }
}

const difficultyBar = document.querySelector("#difficulties")

document.querySelector(`#${difficulty.toLowerCase()}StartBanner`).show()
document.getElementById(difficulty).toggleAttribute("disabled")


const changeDifficulty = (event) => {
    for (button of difficultyBar.children) {
        button.removeAttribute("disabled")
    }
    event.target.toggleAttribute("disabled")
    document.querySelector(`#${difficulty.toLowerCase()}StartBanner`).close()
    difficulty = event.target.innerHTML
    document.querySelector(`#${difficulty.toLowerCase()}StartBanner`).show()
}

for (button of difficultyBar.children) {
    button.addEventListener("click", changeDifficulty)
}

// When page is closed, store current difficulty
window.addEventListener("beforeunload", function () {
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



// Game logic

const expression = document.querySelector("#expression")
const problemScoreCard = document.querySelector("#problemScore")
const totalScoreCard = document.querySelector("#totalScore")
const problemCountCard = document.querySelector("#problemCount")

let firstNum, secondNum, totalScore, problemCount, correctCount, startTime, problemsLeftCount, solution

const problemProbabilitiesPerDifficultyInPercent = {
    "Easy": [100, 0, 0, 0],
    "Medium": [0, 80, 100, 0],
    "Hard": [0, 65, 85, 100]
}


function startGame() {
    document.querySelector(`#${difficulty.toLowerCase()}StartBanner`).close()

    solution = newProblem()
    firstNum = 0
    secondNum = 0
    totalScore = 0
    problemCount = 0
    correctCount = 0
    if (difficulty == "Hard") {
        problemsLeftCount = 50
    } else if (difficulty == "Medium") {
        problemsLeftCount = 20
    } else {
        problemsLeftCount = 10
    }

    startTime = performance.now()
}

const weightsForHarderDifficulties = [3, 15, 30, 35, 50, 65, 80, 95, 100]
let weight
function newProblem() {
    const problemHardness = Math.random() * 100
    if (problemHardness <= problemProbabilitiesPerDifficultyInPercent[difficulty][0]) {
        const prevFirstNum = firstNum
        firstNum = Math.ceil(Math.random() * 10)
        const prevSecondNum = secondNum
        secondNum = 0
        do {
            secondNum = Math.ceil(Math.random() * 10)
        } while (prevFirstNum == firstNum && prevSecondNum == secondNum)
        expression.innerHTML = `${firstNum} · ${secondNum}`
        return firstNum * secondNum
    } else if (problemHardness <= problemProbabilitiesPerDifficultyInPercent[difficulty][1]) {
        const prevFirstNum = firstNum
        weight = Math.random() * 100
        for (let i = 0; i < 9; i++) {
            if (weight <= weightsForHarderDifficulties[i]) {
                firstNum = i + 2
                break
            }
        }
        const prevSecondNum = secondNum
        do {
            weight = Math.random() * 100
            for (let i = 0; i < 9; i++) {
                if (weight <= weightsForHarderDifficulties[i]) {
                    console.log("AHAHHAHH")
                    secondNum = i + 2
                    break
                }
            }
        } while (prevFirstNum == firstNum && prevSecondNum == secondNum)


        expression.innerHTML = `${firstNum} · ${secondNum}`
        return firstNum * secondNum
    } else if (problemHardness <= problemProbabilitiesPerDifficultyInPercent[difficulty][2]) {
        const prevFirstNum = firstNum
        firstNum = Math.ceil(Math.random() * 11) + 10
        const prevSecondNum = secondNum
        secondNum = 2
        if (firstNum == 21) {
            firstNum = Math.ceil(Math.random() * 10)
        }
        if (prevFirstNum == firstNum && prevSecondNum == secondNum) {
            firstNum = Math.ceil(Math.random() * 10)
        }
        expression.innerHTML = `${firstNum}<sup>${secondNum}</sup>`
        return firstNum ** secondNum
    } else {
        const prevFirstNum = firstNum
        firstNum = 2
        const prevSecondNum = secondNum
        secondNum = Math.floor(Math.random() * 11)
        if (prevFirstNum == firstNum && prevSecondNum == secondNum) {
            firstNum = Math.ceil(Math.random() * 10)
        }
        expression.innerHTML = `${firstNum}<sup>${secondNum}</sup>`
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

    if (difficulty == "Hard") {
        score--
        score *= 10
    } else if (difficulty == "Medium") {
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

    updateInformation(calculateScore(performance.now() - startTime, entryField.value == solution, solution > 100))
    entryField.value = ""
    if (problemsLeftCount <= 0) {
        if (difficulty == "Hard" && totalScore >= 1900) {
            document.querySelector("#information").innerHTML = `<div>Wow! Du hast mit ${totalScore} Punkten Stufe 'Hard' gemeistert, dich hält nichts mehr auf!</div>`
        } else if (difficulty == "Medium" && totalScore >= 375) {
            document.querySelector("#information").innerHTML = `<div>Wow! Du hast mit ${totalScore} Punkten Stufe 'Medium' gemeistert, jetzt musst du wohl auf 'Hard' spielen</div>`
        } else if (difficulty == "Easy" && totalScore >= 42) {
            document.querySelector("#information").innerHTML = `<div>Wow! Du hast mit ${totalScore} Punkten Stufe 'Easy' gemeistert, jetzt musst du wohl auf 'Medium' spielen</div>`
        } else {
            document.querySelector("#information").innerHTML = `<div>Hier darfst du 5s dein Endergebnis bestaunen: ${totalScore}. Und gleich in die nächste Runde!</div>`
        }
        entryField.toggleAttribute("disabled", true)
        for (button of numpad.children) {
            button.toggleAttribute("disabled", true)
        }
        //need to make less janky (update: I made it more janky)

        document.querySelector("#information").removeAttribute("id")

        const changeDifficultyAfterWinning = (event) => {
            for (button of difficultyBar.children) {
                button.removeAttribute("disabled")
            }
            event.target.toggleAttribute("disabled")
            document.querySelector(`#${difficulty.toLowerCase()}StartBanner`).close()
            difficulty = event.target.innerHTML

            setTimeout(() => { window.location.reload() }, 500)
        }
        for (button of difficultyBar.children) {
            button.addEventListener("click", changeDifficultyAfterWinning)
        }
        setTimeout(() => { window.location.reload() }, 5000)
        return false
    } else {
        solution = newProblem()
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
    }, 10)
}




console.log(1)