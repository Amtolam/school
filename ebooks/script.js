let bookWrappersDict = {
    "5":document.querySelector(".books-5"),
    "6":document.querySelector(".books-6"),
    "7":document.querySelector(".books-7"),
    "8":document.querySelector(".books-8"),
    "9":document.querySelector(".books-9"),
    "10":document.querySelector(".books-10"),
    "11":document.querySelector(".books-11"),
    "12":document.querySelector(".books-12"),
    "13":document.querySelector(".books-13"),
    "misc":document.querySelector(".books-misc"),
    "all":document.querySelector(".books-all"),
}
let curSeries = bookWrappersDict["all"]
let curButton = document.querySelector("button:disabled")
// Button structre
const changeBookSeries = (event) => {
    curButton.toggleAttribute("disabled")
    curButton = event.target
    curButton.toggleAttribute("disabled")
    curSeries.classList.toggle("hidden")
    curSeries = document.querySelector(`.book-wrapper.${curButton.name}`)
    curSeries.classList.toggle("hidden")
    console.log(event)
}

const bookChoiceButtons = document.getElementsByClassName("book-choice")
for (let i = 0; i < bookChoiceButtons.length; i++) {
    bookChoiceButtons[i].addEventListener("click", changeBookSeries)
}

for (let book in data) {
    if (data[book].Notes) {
        htmlString =
            `<div class="book" title="${book}">
                <a href="${data[book].Clean}">
                    <div class="overlay-box">
                        <div class="notes">${data[book].Notes}</div>
                    </div>
                    <img width=240px class="book-img" alt="loading... ${data[book].Subject}" src="${data[book].Cover}">
                </a>
            </div>`
        if (!data[book].Clean) {
            htmlString =
                `<div class="book" title="${book}">
                    <div class="overlay-box">
                        <div class="notes">${data[book].Notes}</div>
                    </div>
                        
                    <img width=240px class="book-img" alt="loading... ${book}" src="${data[book].Cover}">
                </div>`
        }
    } else {
        htmlString =
            `<div class="book" title="${book}">
			<a href="${data[book].Clean}">
                <img width=240px class="book-img" alt="loading... ${book}" src="${data[book].Cover}">
			</a>
		</div>`
    }
    for (grade of data[book].Grade.split(",")){
        bookWrappersDict[Number(grade)].innerHTML += htmlString
    }
    bookWrappersDict["all"].innerHTML += htmlString
}
console.log(1)