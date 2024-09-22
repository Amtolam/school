let buttonBoxes = Array.prototype.slice.call(document.getElementsByClassName("button-box"))
let buttonBoxHtml = buttonBoxes.splice(0,1)[0]

for (let i = 0; i< buttonBoxes.length; i++){
    buttonBoxes[i].innerHTML=  buttonBoxHtml.innerHTML
}
console.log(buttonBoxes, buttonBoxHtml)










console.log(1)