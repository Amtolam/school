let curHTML = document.querySelector("html")
let prevSessionExists
// Check if Local Storage funcionality exists
if (typeof (Storage) !== "undefined") {
    let prevSessionHTML = localStorage.getItem("prevSession")
    let prevSessionVersion = localStorage.getItem("prevVersion")
    // if there are a previous site stored and version existing which is high enough
    prevSessionExists = prevSessionHTML && prevSessionVersion && Number(curHTML.getAttribute("version")) == Number(prevSessionVersion)
    if (prevSessionExists) {
        // then set the current HTML to this shit
        curHTML.innerHTML = prevSessionHTML
    }
}

// When page is closed, store current session
window.addEventListener("beforeunload", function () {
    if (document.querySelector("body").innerHTML) {
        localStorage.setItem("prevSession", curHTML.innerHTML)
        localStorage.setItem("prevVersion", curHTML.getAttribute("version"))
    } else {
        localStorage.setItem("prevSession", "")
        localStorage.setItem("prevVersion", 0)
    }
});

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

// Get the default disabled button
let curButton = document.querySelector("button:disabled")
// Weird fail safe - reload page disregarding POST request when there are no buttons
// in other words - on error, reload
if (!curButton) {
    console.log("force reload")
    localStorage.clear()
    document.querySelector("body").innerHTML = ""
    window.location.href = window.location.href
}
// Infer corresponding wrapper by button name
let curSeries = document.querySelector(`.${curButton.name}`)
if (!prevSessionExists) {
    curSeries.classList.toggle("hidden")
}
// Button behaviour
// Toggles previous wrapper and button off - toggles new one on
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

// keep legacy sort
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

if (!prevSessionExists) {
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
        ${data[book].Link ?
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
}

// for devices that don't allow "beforeunload", save current state after 5 seconds since start up
setTimeout(function () {
    if (document.querySelector(".book-wrapper").innerHTML) {
        localStorage.setItem("prevSession", curHTML.innerHTML)
        console.log("saving current state")
    }
}, 5000);
console.log(1)