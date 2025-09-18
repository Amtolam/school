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
let oldSeries = bookWrappersDict["all"]
// Button structre
const changeBookSeries = (event) => {
    oldSeries.classList.toggle("hidden")
    newSeries = event.target.name
    oldSeries = document.querySelector(`.book-wrapper.${newSeries}`)
    oldSeries.classList.toggle("hidden")
}

const bookChoiceButtons = document.getElementsByClassName("book-choice")
for (let i = 0; i < bookChoiceButtons.length; i++) {
    bookChoiceButtons[i].addEventListener("click", changeBookSeries)
}

console.log(bookWrappersDict)
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
    console.log(data[book].Grade.split(","))
    for (grade of data[book].Grade.split(",")){
        console.log(grade, Number(grade))
        bookWrappersDict[Number(grade)].innerHTML += htmlString
    }
    bookWrappersDict["all"].innerHTML += htmlString
}
console.log(1)