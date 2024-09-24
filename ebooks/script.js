// Copies code from first button-box to all others
let buttonBoxes = Array.prototype.slice.call(document.getElementsByClassName("button-box"))
const buttonBoxHTML = buttonBoxes[0].innerHTML.replace(" disabled=\"\"", "")

for (let i = 0; i < buttonBoxes.length; i++){
    buttonBoxes[i].innerHTML = buttonBoxHTML
}

// Disables button that's not needed currently
for (box of buttonBoxes){
    let boxName = box.getAttribute("name")
    for (let i = 0; i < box.children.length; i++){
        if (box.children[i].name.includes(boxName)){
            box.children[i].setAttribute("disabled", "")
        }
    }
}

// Button structre
const changeBookSeries = (event) => {
    event.target.parentNode.parentNode.classList.toggle("hidden")
    newSeries = event.target.name.replace("-choice", "")
    document.querySelector(`.book-wrapper[name="${newSeries}"]`).classList.toggle("hidden")
}

const bookChoiceButtons = document.getElementsByClassName("book-choice")
for (let i = 0; i < bookChoiceButtons.length; i++){
    bookChoiceButtons[i].addEventListener("click", changeBookSeries) 
}

console.log(1)