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










console.log(1)