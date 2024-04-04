const questions = [
    {
        question: "¿Cómo se escribe el número 15 en español?",
        answers: [
            {text: "Veinte", correct: false},
            {text: "Quince", correct: true},
            {text: "Cuarenta", correct: false},
            {text: "Dieciséis", correct: false},
        ],
    },
    {
        question: "¿Cuál es el numeral cardinal para '100' en español?",
        answers: [
            {text: "Mil", correct: false},
            {text: "Cien", correct: true},
            {text: "Ciento", correct: false},
            {text: "Diez", correct: false},
        ],
    },
    {
        question: '¿Cómo se conjuga el verbo "escribir" en primera persona del singular en presente de indicativo?',
        answers: [
            {text: "Escribo", correct: true},
            {text: "Escribes", correct: false},
            {text: "Escribe", correct: false},
            {text: "Escribimos", correct: false},
        ],
    },
    {
        question: "Selecciona el numeral cardinal que corresponde a '21'.",
        answers: [
            {text: "Veintidós", correct: false},
            {text: "Veinte", correct: false},
            {text: "Veintiuno", correct: true},
            {text: "Doscientos", correct: false},
        ],
    },
    {
        question: "¿Qué número es 'ochocientos' en español?",
        answers: [
            {text: "80", correct: false},
            {text: "800", correct: true},
            {text: "18", correct: false},
            {text: "180", correct: false},
        ],
    },
    {
        question: "¿Cuál es la forma correcta del verbo 'hablar' en primera persona del singular en presente?",
        answers: [
            {text: "Hablas", correct: false},
            {text: "Habla", correct: false},
            {text: "Hable", correct: false},
            {text: "Hablo", correct: true},
        ],
    },
    {
        question: "Elige la forma correcta del verbo 'vivir' en tercera persona del plural en presente.",
        answers: [
            {text: "Viven", correct: true},
            {text: "Vives", correct: false},
            {text: "Vive", correct: false},
            {text: "Vivimos", correct: false},
        ],
    },
    {
        question: "¿Cómo se conjuga el verbo 'ser' en primera persona del plural en el presente?",
        answers: [
            {text: "Soy", correct: false},
            {text: "Eres", correct: false},
            {text: "Somos", correct: true},
            {text: "Son", correct: false},
        ],
    },
    {
        question: "Selecciona la conjugación correcta del verbo 'ir' en segunda persona del singular en presente.",
        answers: [
            {text: "Voy", correct: false},
            {text: "Va", correct: false},
            {text: "Vas", correct: true},
            {text: "Vamos", correct: false},
        ],
    },
    {
        question: "¿Cuál es la forma correcta del verbo 'leer' en tercera persona del singular en presente?",
        answers: [
            {text: "Lees", correct: false},
            {text: "Leemos", correct: false},
            {text: "Leer", correct: false},
            {text: "Lee", correct: true},
        ],
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Siguiente";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correto");
        score++;
    } else {
        selectedBtn.classList.add("incorreto");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });    
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `¡Obtuviste ${score} de ${questions.length} puntos!`;
    nextButton.innerHTML = 'Juega de nuevo';
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
