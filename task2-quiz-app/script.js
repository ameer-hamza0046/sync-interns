// questions for the quiz
const questions = [
  {
    question: "How many days do we have in a week?",
    choices: ["3", "5", "7", "9"],
    correct: 2,
  },
  {
    question: "How many days are there in a normal year?",
    choices: ["360", "365", "366", "Either 365 or 366"],
    correct: 1,
  },
  {
    question: "How many hours are there in two days?",
    choices: ["12", "24", "36", "48"],
    correct: 3,
  },

  {
    question: "Which animal is known as the 'Ship of the Desert'?",
    choices: ["Rhino", "Dinosaur", "Cheetah", "Camel"],
    correct: 3,
  },
  {
    question: "Who is the author of 'Julius Caesar'?",
    choices: [
      "William Shakespeare",
      "Geoffrey Chaucer",
      "John Milton",
      "Sylvia Plath",
    ],
    correct: 0,
  },
];

// html elements
const questionElement = document.querySelector(".quiz-container>h2");
const radios = document.querySelectorAll("input[type='radio']");
const labels = document.querySelectorAll("label");
const submitBtn = document.querySelector("input[type='submit']");

// the user answers will be stored here
const userAnswers = [];

// index used to iterate on the questions
let questionIndex = 0;

// this function loads the next question
// it changes the question, load the corresponding choices, unchecks all the radios
function loadNextQuestion() {
  questionElement.innerHTML = questions[questionIndex].question;
  labels.forEach((label, idx) => {
    label.innerHTML = questions[questionIndex].choices[idx];
  });
  radios.forEach((radio) => {
    radio.checked = false;
  });
  questionIndex++;
}

submitBtn.addEventListener("click", () => {
  // find the selected answer
  let selectedAnswer = -1;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked === true) {
      selectedAnswer = i;
      break;
    }
  }

  // store this result
  userAnswers.push(selectedAnswer);

  // load new questions if available
  // else load the result
  if (questionIndex < questions.length) {
    loadNextQuestion();
  } else {
    let numberOfCorrectAnswers = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === questions[i].correct) {
        numberOfCorrectAnswers++;
      }
    }

    // make the quiz-container invisible
    // and make the result-container visible
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.classList.add("invisible");
    const resultContainer = document.querySelector(".result-container");
    resultContainer.classList.remove("invisible");

    // "x/y questions corret"
    const [x, y] = document.querySelectorAll(".result-container>h2>span");
    x.innerHTML = numberOfCorrectAnswers;
    y.innerHTML = questions.length;

    // display all the questions along with their correct answers
    questions.forEach((element) => {
      // create a new div to store the question and answer
      const questionAnswerDiv = document.createElement("div");
      questionAnswerDiv.innerHTML = `<h4>${element.question}</h4>
      <p>Correct Answer: ${element.choices[element.correct]}</p>`;
      // append this div into result container
      resultContainer.appendChild(questionAnswerDiv);
    });
  }
});

// load the first question
loadNextQuestion();
