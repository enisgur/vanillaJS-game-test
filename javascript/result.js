const audio = document.getElementById("audio");
audio.pause();
audio.currentTime = -1;
audio.play();

// http://localhost/resault.html?total=asdasd&score=20
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const getScore = document.querySelector(".correct");
const getTotal = document.querySelector(".from");

getScore.textContent = params.score;
getTotal.textContent = params.total;
