// ** DATE LOGIC **

// Count days since start of play (27th June 2024)
// COPIED FROM: https://stackoverflow.com/questions/25562173/calculate-number-of-specific-weekdays-between-dates
let startDay = new Date(2024,5,27)
let ndays = 1 + Math.floor(( new Date() - startDay)/(24*3600*1000))
let dateSum = (a,b) => { return a + Math.floor((ndays + (startDay.getDay()+6-b) % 7) / 7); };
let dayOfPlayingBingo = [1,2,3,4,5].reduce(dateSum,0);

document.getElementsByTagName("title")[0].innerHTML += dayOfPlayingBingo;

const numOfCards = 40;
let images = document.getElementsByTagName("img");



// ** CARD LOGIC **
let numArray = Array.from(Array(numOfCards).keys())
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
