
let oldSeries = document.querySelector(".book-wrapper.books-12")
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

bookWrapper = document.querySelector("div.book-wrapper")
console.log(bookWrapper)
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
        console.log("test")
    } else {
        htmlString =
            `<div class="book" title="${book}">
			<a href="${data[book].Clean}">
                <img width=240px class="book-img" alt="loading... ${book}" src="${data[book].Cover}">
			</a>
		</div>`
    }

        bookWrapper.innerHTML += htmlString
}
console.log(1)