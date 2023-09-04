// Array containing my ten questions
var questions = [
    {
        question: "What is the function of Console Log?",
        answers: [
            { text: "To write data directly to the console", correct: true },
            { text: "To integrate your CSS style to the console", correct: false },
            { text: "To log your data on your ReadMe", correct: false },
            { text: "To log if you're more of an Xbox or Playstation person", correct: false },
        ]
    },
    {
        question: "What is the difference between Const variables and Var variables?",
        answers: [
            { text: "All of the below", correct: false },
            { text: "Var variables and Const are the same, there is no difference", correct: false },
            { text: "Var varriable can be used in functions and Const cannot", correct: false },
            { text: "Var variables can be reassigned to other values and Const cannot", correct: true },
        ]
    },
    {
        question: "What does the keyword Let do in Java?",
        answers: [
            { text: "Lets your CSS and Java talk to each other", correct: false },
            { text: "Declares re-assignable, block-scoped local variables, optionally initializing each to a value", correct: true },
            { text: "Has the exact function as the Var statement", correct: false },
            { text: "Starts a timer on your HTML", correct: false },
        ]
    },
    {
        question: "Which data type can an Array hold?",
        answers: [
            { text: "All of the below", correct: true },
            { text: "Strings", correct: false },
            { text: "Booleans", correct: false },
            { text: "Integers", correct: false },
        ]
    }, {
        question: "How many values do Booleans have?",
        answers: [
            { text: "5", correct: false },
            { text: "10", correct: false },
            { text: "2", correct: true },
            { text: "They have infinite values", correct: false },
        ]
    }, {
        question: "What is a function in Java?",
        answers: [
            { text: "Disposable blocks of code that perform a specific task", correct: false },
            { text: "There are no functions in Java they are in CSS", correct: false },
            { text: "Reusable blocks of code that perform a specific task", correct: true },
            { text: "All of the above", correct: false },
        ]
    }, {
        question: "The condition in an If/Else statement is enclosed within  ___",
        answers: [
            { text: "Quotes", correct: false },
            { text: "Curly brackets", correct: false },
            { text: "Parentheses", correct: true },
            { text: "Square brackets", correct: false },
        ]
    }, {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        answers: [
            { text: "Curly brackets", correct: false },
            { text: "Quotes", correct: true },
            { text: "Nothing", correct: false },
            { text: "Parentheses", correct: false },
        ]
    }, {
        question: "Objects can store more than primitive data types like strings, booleans and numbers",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false },
           
        ]
    }, {
        question: "What code can be used to stop event bubbling?",
        answers: [
            { text: "event.stopBubble();", correct: false },
            { text: "event.stopPropagation();", correct: true },
            { text: "stopPropagation().event;", correct: false },
            { text: "stopBubble().event;", correct: false },
        ]
    },
]

// variables to grab my elements I want to manipulate
var questionsEl = document.getElementById("question");
var answersEl = document.getElementById("answer-btn");
var nextEl = document.getElementById("next");
var timerEl = document.getElementById("timer");
var timeRemainingEl = document.getElementById("time-remaining");
var playAgainButton = document.getElementById("play-again");

// Let statements to declare the following values
let currentQuestionIndex = 0;
let remainingTime = 75 * 1000; 
let timerInterval;
let userScore = 0; 
let quizFinished = false;

//Function made to start the timer once called 
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000); 
}

function updateTimer() {
    if (!quizFinished) { 
        remainingTime -= 1000; 
        if (remainingTime <= 0) {
            clearInterval(timerInterval); 
            showScore();
        }
        displayTime();
    }
}

//Display time function...to display time
function displayTime() {
    const seconds = Math.ceil(remainingTime / 1000);
    timeRemainingEl.textContent = seconds + "s";
}
//a deduct time function set to 10 seconds if the user gets the question wrong
function deductTime() {
    remainingTime -= 10000; 
    if (remainingTime < 0) {
        remainingTime = 0; e
    }
    displayTime();
}
// a add time function to add 10 seconds if the user gets the question right 
function addTime() {
    remainingTime += 10000; 
    displayTime();
}
// the quiz start function which initiates the quiz and starts the timer
function quizStart() {
    currentQuestionIndex = 0;
    userScore = 0; 
    remainingTime = 75 * 1000; 
    timerInterval = null; 
    quizFinished = false; 

    const scoreSubmission = document.getElementById("score-submission");
    scoreSubmission.style.display = "none";

    questionsEl.innerHTML = "";
    resetQuest();

    nextEl.innerHTML = "Next";
    nextQuestion();
    displayTime();
}
// the next question function lets the user move to the next question while also finishing the quiz if when the user answers the final question
function nextQuestion() {
    resetQuest();
    if (currentQuestionIndex < questions.length) {
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionsEl.innerHTML = questionNo + ". " + currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            var button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("buttons")
            answersEl.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer)
        });
    } else {
        quizFinished = true; 
    }
};
// function made to reset the quiz 
function resetQuest() {
    nextEl.style.display = "none";
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild)
    }
};
//function  that shows the score at the end of the quiz while also displaying the play again button which will let the user start all over again
function showScore() {
    clearInterval(timerInterval); 

    questionsEl.style.display = "none";
    answersEl.style.display = "none";

    nextEl.style.display = "none";

    const scoreSubmission = document.getElementById("score-submission");
    scoreSubmission.style.display = "block";

    const userScoreInSeconds = Math.ceil(remainingTime / 1000);

    document.getElementById("score").value = userScoreInSeconds + "s";

    playAgainButton.style.display = "block";
    playAgainButton.innerHTML = "Play Again";

    playAgainButton.addEventListener("click", () => {
       
        quizStart();
        startTimer();

        questionsEl.style.display = "block";
        answersEl.style.display = "block";

        questionsEl.innerHTML = "";
        resetQuest();

        nextQuestion();
    });
}
 //function to display all the high scores saved in the local storage
function displayHighScores() {

    const highscoresList = document.getElementById("highscores-list");

    highscoresList.innerHTML = "";

    highScores.sort((a, b) => b.score - a.score);

    highScores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.name}: ${score.score} seconds`;
        highscoresList.appendChild(listItem);
    });
};

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        nextQuestion();
    } else {
        showScore();
    }
};
//function that once the user selects their choice it'll say whether it's right or wrong by going green for right or red for wrong
function selectAnswer(e) {
    var selectedBtn = e.target;
    var correct = selectedBtn.dataset.correct === "true";

    if (correct) {
        selectedBtn.classList.add("correct");
        addTime(); 
        userScore += 10; 
    } else {
        selectedBtn.classList.add("incorrect");
        deductTime(); 
    }

    Array.from(answersEl.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextEl.style.display = "block";
};

nextEl.addEventListener("click", () => {

    handleNextButton();
}
);


// event listner for the start game button also un hides the questions elements and answer elements 
var startGameButton = document.getElementById("start-game-button");
startGameButton.addEventListener("click", function () {
    
    var questionElement = document.getElementById("question");
    var answerButtonElement = document.getElementById("answer-btn");
    var timerElement = document.getElementById("timer");
    var nextButton = document.getElementById("next");

    questionElement.style.display = "block";
    answerButtonElement.style.display = "block";
    timerElement.style.display = "block";
    startGameButton.style.display = "none"; 

    quizStart();
    startTimer();
});

//event listener for the submit high score button
document.getElementById("highscore-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const scoreInput = document.getElementById("score");
    const name = nameInput.value;
    const score = parseInt(scoreInput.value);

    highScores.push({ name, score });

    nameInput.value = "";
    scoreInput.value = "";

    saveHighScores();

    displayHighScores();
});

// Function to save high scores to localStorage
function saveHighScores() {
    
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function loadHighScores() {
   
    const highScoresJSON = localStorage.getItem("highScores");

    highScores = JSON.parse(highScoresJSON) || [];

    displayHighScores();
}

playAgainButton.addEventListener("click", () => {

    quizStart();
    startTimer();

    questionsEl.innerHTML = "";
    resetQuest();

    nextQuestion();
});

loadHighScores();
