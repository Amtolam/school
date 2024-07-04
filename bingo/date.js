let startDay = new Date(2024,5,27)
let ndays = 1 + Math.floor(( new Date() - startDay)/(24*3600*1000))
let dateSum = (a,b) => { return a + Math.floor((ndays + (startDay.getDay()+6-b) % 7) / 7); };
let dayOfPlayingBingo = [1,2,3,4,5].reduce(dateSum,0);

document.getElementById("title").innerHTML += dayOfPlayingBingo;
