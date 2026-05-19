// ================= QUESTIONS =================

// ================= QUESTIONS =================

const quizData = [

    {
        question:
        "Which language is used for web styling?",

        options:
        ["HTML", "Python", "CSS", "C++"],

        correct:
        2
    },

    {
        question:
        "Which company developed JavaScript?",

        options:
        ["Microsoft", "Netscape", "Google", "Apple"],

        correct:
        1
    },

    {
        question:
        "Which tag is used for hyperlinks in HTML?",

        options:
        ["<a>", "<link>", "<h1>", "<img>"],

        correct:
        0
    },

    {
        question:
        "Which method is used to select an element by ID?",

        options:
        [
            "querySelector()",
            "getElementById()",
            "getElementsByClassName()",
            "innerHTML"
        ],

        correct:
        1
    },

    {
        question:
        "Which keyword declares a constant in JavaScript?",

        options:
        ["var", "let", "const", "static"],

        correct:
        2
    },

    {
        question:
        "Which HTML tag is used to insert an image?",

        options:
        ["<img>", "<picture>", "<src>", "<image>"],

        correct:
        0
    },

    {
        question:
        "Which CSS property changes text color?",

        options:
        ["font-color", "text-color", "color", "background"],

        correct:
        2
    },

    {
        question:
        "Which symbol is used for comments in JavaScript?",

        options:
        ["//", "##", "<!-- -->", "**"],

        correct:
        0
    },

    {
        question:
        "Which HTML element is used for the largest heading?",

        options:
        ["<h6>", "<heading>", "<h1>", "<head>"],

        correct:
        2
    },

    {
        question:
        "Which method converts JSON into JavaScript object?",

        options:
        [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.object()"
        ],

        correct:
        0
    },

    {
        question:
        "Which CSS layout system uses rows and columns?",

        options:
        ["Flexbox", "Grid", "Float", "Position"],

        correct:
        1
    },

    {
        question:
        "Which operator is used for strict equality in JavaScript?",

        options:
        ["==", "!=", "===", "="],

        correct:
        2
    },

    {
        question:
        "Which function displays output in browser console?",

        options:
        [
            "console.log()",
            "print()",
            "document.write()",
            "alert()"
        ],

        correct:
        0
    },

    {
        question:
        "Which HTML tag creates a line break?",

        options:
        ["<break>", "<br>", "<lb>", "<hr>"],

        correct:
        1
    },

    {
        question:
        "Which JavaScript keyword creates a function?",

        options:
        ["method", "func", "define", "function"],

        correct:
        3
    }

];
// ================= VARIABLES =================

let currentQuiz = 0;

let score = 0;

let selectedAnswer = null;

let timeLeft = 15;

let timerInterval;


// ================= ELEMENTS =================

const question =
document.getElementById("question");

const options =
document.getElementById("options");

const nextBtn =
document.getElementById("nextBtn");

const currentQuestion =
document.getElementById("currentQuestion");

const totalQuestions =
document.getElementById("totalQuestions");

const resultCard =
document.getElementById("resultCard");

const scoreText =
document.getElementById("scoreText");

const restartBtn =
document.getElementById("restartBtn");

const quizCard =
document.querySelector(".quiz-card");

const timer =
document.getElementById("timer");

const progressBar =
document.getElementById("progressBar");


// ================= TOTAL QUESTIONS =================

totalQuestions.innerText =
quizData.length;


// ================= LOAD QUESTION =================

function loadQuestion(){

    resetState();

    const currentData =
    quizData[currentQuiz];

    currentQuestion.innerText =
    currentQuiz + 1;

    question.innerText =
    currentData.question;

    // CREATE OPTIONS

    currentData.options.forEach((option,index) => {

        const button =
        document.createElement("button");

        button.innerText = option;

        button.classList.add("option-btn");

        button.addEventListener("click", () => {

            selectAnswer(button,index);

        });

        options.appendChild(button);

    });

    // START TIMER

    startTimer();

    // UPDATE PROGRESS

    updateProgressBar();

}


// ================= RESET =================

function resetState(){

    nextBtn.style.display = "none";

    options.innerHTML = "";

    selectedAnswer = null;

}


// ================= SELECT ANSWER =================

function selectAnswer(button,index){

    if(selectedAnswer !== null){

        return;

    }

    selectedAnswer = index;

    clearInterval(timerInterval);

    const correctAnswer =
    quizData[currentQuiz].correct;

    const optionButtons =
    document.querySelectorAll(".option-btn");

    optionButtons.forEach((btn,i) => {

        if(i === correctAnswer){

            btn.classList.add("correct");

        }

        if(i === selectedAnswer &&
           selectedAnswer !== correctAnswer){

            btn.classList.add("wrong");

        }

        btn.disabled = true;

    });

    // SCORE

    if(selectedAnswer === correctAnswer){

        score++;

    }

    nextBtn.style.display = "inline-block";

}


// ================= TIMER =================

function startTimer(){

    clearInterval(timerInterval);

    timeLeft = 15;

    timer.innerText = timeLeft;

    timerInterval = setInterval(() => {

        timeLeft--;

        timer.innerText = timeLeft;

        if(timeLeft <= 0){

            clearInterval(timerInterval);

            autoNextQuestion();

        }

    },1000);

}


// ================= PROGRESS =================

function updateProgressBar(){

    const progress =

    ((currentQuiz + 1) /
    quizData.length) * 100;

    progressBar.style.width =
    `${progress}%`;

}


// ================= AUTO NEXT =================

function autoNextQuestion(){

    currentQuiz++;

    if(currentQuiz < quizData.length){

        loadQuestion();

    }
    else{

        showResult();

    }

}


// ================= NEXT BUTTON =================

nextBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    currentQuiz++;

    if(currentQuiz < quizData.length){

        loadQuestion();

    }
    else{

        showResult();

    }

});


// ================= RESULT =================

function showResult(){

    clearInterval(timerInterval);

    quizCard.classList.add("hidden");

    resultCard.classList.remove("hidden");

    scoreText.innerText =
    `Your Score: ${score} / ${quizData.length}`;

}


// ================= RESTART =================

restartBtn.addEventListener("click", () => {

    currentQuiz = 0;

    score = 0;

    resultCard.classList.add("hidden");

    quizCard.classList.remove("hidden");

    loadQuestion();

});


// ================= INITIAL LOAD =================

loadQuestion();