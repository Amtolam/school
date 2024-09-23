// Copies code from first button-box to all others
let buttonBoxes = Array.prototype.slice.call(document.getElementsByClassName("button-box"))
const buttonBoxHTML = buttonBoxes.splice(0, 1)[0].innerHTML.replace(" disabled=\"\"", "")

for (let i = 0; i < buttonBoxes.length; i++){
    buttonBoxes[i].innerHTML = buttonBoxHTML
}

// Disables button that's not needed currently
for (box of buttonBoxes){
    let buttonName = box.getAttribute("name")
    for (let i = 0; i < box.children.length; i++){
        if (box.children[i].name.includes(buttonName)){
            box.children[i].setAttribute("disabled", "")
        }
    }
}

// Button structre
const bookChoiceButtons = document.getElementsByClassName("book-choice")
let buttonDictionary = {}

for (button of bookChoiceButtons){
    let name = button.name
    if (!buttonDictionary[name]){
        buttonDictionary[name] = [button]
    } else {
        buttonDictionary[name].push(button)
    }
}

console.log(buttonDictionary)
console.log(1)