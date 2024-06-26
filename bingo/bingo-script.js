const numOfCards = 25;
let images = document.getElementsByTagName("img");

numArray = Array.from(Array(numOfCards).keys())
// COPIED FROM https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
let currentIndex = numOfCards;
// While there remain elements to shuffle...
while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [numArray[currentIndex], numArray[randomIndex]] = [   numArray[randomIndex], numArray[currentIndex]];
}

for (let i = 0; i < images.length; i++){
  images[i].setAttribute("src", "images/card" + numArray[i] + ".svg")
}
