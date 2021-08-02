// dont start the game and timer if game is not started yet
let isGameStarted = true;

// put your questions in array with JSON object
// do not put 0 to ID => start from 1 and more // Make sure each ID is uniqe
// id will help us to track which question we are working on.
let questions = [
  {
    id: 1,
    question: "What color is sky?",
    answer: "blue",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 2,
    question: "If you freeze water, what do you get?",
    answer: "ice",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 3,
    question: "Which state is famous for Hollywood?",
    answer: "California",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 4,
    question: "How many pairs of wings do bees have?",
    answer: "Two",
    isAnswered: false,
    userInput: "",
  },
  {
    id: 5,
    question: "Where is the Great Pyramid of Giza?",
    answer: "Egypt",
    isAnswered: false,
    userInput: "",
  },
];

let currentQuestion = 0;

// Score
let score = 0;

// coundown game time second
let time = 60;
let timeID = 0;

// Document Elements
const divQuestion = document.querySelector(".question");
const inpUser = document.querySelector("#userInput");
let btnSubmit = document.querySelector(".submit");
let divScore = document.querySelector(".score");
let divTimer = document.querySelector(".timer");
let audio = document.getElementById("audio");

// Get the modal
var modal = document.getElementById("myModal");

// events
btnSubmit.addEventListener("click", () => onSubmit());
inpUser.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    onSubmit();
  }
});

const displayNextQuestion = () => {
  // get unAnswered awaiting questions
  const nextQuestion = questions.filter((question) => !question.isAnswered);
  // if all questions answered go to result page
  if (!nextQuestion || nextQuestion.length < 1) {
    return (window.location.href = `./result.html?score=${score}&total=${questions.length}`);
  }

  // Random question
  // display random question if unAnswered questions are more then 1
  if (nextQuestion.length > 1) {
    const randomIndex = generateRandomNumber(nextQuestion.length);
    divQuestion.textContent = nextQuestion[randomIndex].question;
    currentQuestion = nextQuestion[randomIndex].id;
    return nextQuestion[randomIndex];
  }

  divQuestion.textContent = nextQuestion[0].question;
  currentQuestion = nextQuestion[0].id;
  return nextQuestion[0];
};

const timerStart = () => {
  if (!isGameStarted) return clearInterval(timeID);
  timeID = setInterval(() => {
    time = time - 1;
    divTimer.textContent = time;

    // stop timer when hits 0
    if (time === 0) {
      isGameStarted = false;
      modal.style.display = "block";
      clearInterval(timeID);
    }
  }, 1000);
};

// on button Click
const onSubmit = () => {
  soundClicked();

  if (inpUser.value.length < 1 || inpUser.value === "" || inpUser.value === " ")
    return null;
  if (!isGameStarted) return null;
  questions.map((question) => {
    if (question.id !== currentQuestion) return null;
    question.userInput = inpUser.value;
    question.isAnswered = true;

    // update answer
    const isAnswerCorrect = checkAnswer(question.answer, inpUser.value);
    if (isAnswerCorrect) score++;

    // clear input
    inpUser.value = "";
    // focus to input after submit button clicked
    inpUser.focus();
  });

  displayNextQuestion();
};

// Check user answer and update the data.
const checkAnswer = (correctAnswer, userAnswer) => {
  if (correctAnswer.toLowerCase() === userAnswer.toLowerCase()) return true;
  return false;
};

// button click sound
const soundClicked = () => {
  audio.pause();
  audio.currentTime = -1;
  audio.play();
};

// Random number for random question
const generateRandomNumber = (limit) => {
  return Math.floor(Math.random() * limit);
};

displayNextQuestion();
timerStart();
inpUser.value = "";
