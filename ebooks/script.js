const bookWrappersDict = {
    "5": document.querySelector(".books-5"),
    "6": document.querySelector(".books-6"),
    "7": document.querySelector(".books-7"),
    "8": document.querySelector(".books-8"),
    "9": document.querySelector(".books-9"),
    "10": document.querySelector(".books-10"),
    "11": document.querySelector(".books-11"),
    "12": document.querySelector(".books-12"),
    "13": document.querySelector(".books-13"),
    "misc": document.querySelector(".books-misc"),
    "all": document.querySelector(".books-all")
}
let curButton = document.querySelector("button:disabled")
//console.log(document.querySelectorAll("button"))
let curSeries = document.querySelector(`.${curButton.name}`)
curSeries.classList.toggle("hidden")
// Button structre
const changeBookSeries = (event) => {
    curButton.toggleAttribute("disabled")
    curButton = event.target
    curButton.toggleAttribute("disabled")
    curSeries.classList.toggle("hidden")
    curSeries = document.querySelector(`.book-wrapper.${curButton.name}`)
    curSeries.classList.toggle("hidden")
}

const bookChoiceButtons = document.getElementsByClassName("book-choice")
for (let i = 0; i < bookChoiceButtons.length; i++) {
    bookChoiceButtons[i].addEventListener("click", changeBookSeries)
}


const bookOrderBySubject = {
    "Mathe": -1,
    "Deutsch": 1,
    "Englisch": 2,
    "Latein": 3,
    "Französisch": 4,
    "Biologie": 5,
    "Chemie": 6,
    "Physik": 7,
    "Informatik": 8,
    "Musik": 9,
    "Religion (ev)": 10,
    "Ethik": 11,
    "Geschichte": 12,
    "Politik und Gesellschaft": 13,
    "Geographie": 14
}

let curOrder

for (let book in data) {
    curOrder = bookOrderBySubject[data[book].Subject]
    htmlString =
        `<div class="book" title="${book}" style="order:${curOrder ? curOrder : 99}">
        ${data[book].Link ?
            `<a href="${data[book].Link}">`
        : ""} 
        ${data[book].Notes ?
            `<div class="overlay-box">
                <div class="notes">${data[book].Notes}</div>
            </div>`
        : ""} 
            <img loading="lazy" width=240px class="book-img" alt="loading... ${book}" src="${data[book].Cover}">
        ${data[book].Clean ?
            "</a>"
        : ""}
        </div>`

    for (grade of data[book].Grade.split(",")) {
        curWrap = bookWrappersDict[Number(grade)]
        //console.log(curWrap, curSeries, curWrap==curSeries)
        if (curWrap == curSeries) {
            htmlString = htmlString.replace('loading="lazy"', "")
        }
        curWrap.innerHTML += htmlString
    }
    bookWrappersDict["all"].innerHTML += htmlString
}
console.log(1)