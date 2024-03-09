const passages = [
    {
        content: "The Great Barrier Reef, located off the coast of Australia, is the world's largest coral reef system. It stretches over 2,300 kilometers and is home to a diverse range of marine life, including hundreds of species of fish, mollusks, and coral. The reef also serves as a crucial habitat for endangered species such as the dugong and the green sea turtle. However, it faces threats from climate change, pollution, and overfishing, putting its delicate ecosystem at risk.",
        questions: [
            {
                question:
                    "The Great Barrier Reef is said to be..",
                answers: [
                    { text: "The largest coral reef", correct: false},
                    { text: "The largest sea", correct: false},
                    { text: "The largest coral reef system", correct: true},
                ]
            },
            {
                question:
                    "What are some of the threats facing the Great Barrier Reef?",
                answers: [
                    { text: "Climate change, Pollution, and Overfishing", correct: true},
                    { text: "Loitering, Plastics and Overpopulation", correct: false},
                    { text: "Global warming, Biodiversity loss and Greenhouse gasses", correct: false},
                ]
            }
        ]
    },
    {
        content: "In the heart of Paris, the Louvre Museum stands as one of the world's most renowned cultural institutions. Originally built as a fortress in the late 12th century, it was transformed into a museum in the late 18th century and now houses over 35,000 works of art spanning thousands of years of history. Among its most famous treasures is Leonardo da Vinci's masterpiece, the Mona Lisa, which attracts millions of visitors each year. The Louvre continues to be a symbol of artistic excellence and a must-visit destination for art enthusiasts worldwide",
        questions: [
            {
                question:
                    "What was the original purpose of the Louvre Museum?",
                answers: [
                    { text: "It was originally built to be an Art museum", correct: false},
                    { text: "It was originally built to be a Church", correct: false},
                    { text: "It was originally built to be a Fortress", correct: true},
                ]
            },
            {
                question:
                    "What is the famous artwork housed in the Louvre and describe its significance?",
                answers: [
                    { text: "Las Meninas, presents a several important figures in Spanish History", correct: false},
                    { text: "Mona Lisa, it attracts millions of visitors each year", correct: true},
                    { text: "Starry Night, brings a strong spark of emotion to the visitors", correct: false},
                ]
            }
        ]
    },
];

let currentPassageIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let allQuestionsAnswered = false; // New variable to track if all questions have been answered

function startQuiz() {
    currentPassageIndex = 0;
    currentQuestionIndex = 0;
    score = 0;
    allQuestionsAnswered = false; // Reset the variable
    showPassage();
    showQuestion();
}

function showPassage() {
    const passageContent = document.getElementById("passage-content");
    passageContent.textContent = passages[currentPassageIndex].content;
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const answerButton = document.getElementById("answer-btns");

    resetState();
    let currentPassage = passages[currentPassageIndex];
    let currentQuestion = currentPassage.questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    let questionHTML = questionNo + ". " + currentQuestion.question;
    questionElement.textContent = questionHTML;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    const answerButton = document.getElementById("answer-btns");
    const nextButton = document.getElementById("nxt-btn");

    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // Increment score by 1 for each correct answer
    } else {
        selectedBtn.classList.add("incorrect");
    }
    const answerButton = document.getElementById("answer-btns");
    const nextButton = document.getElementById("nxt-btn");
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    if (currentQuestionIndex === passages[currentPassageIndex].questions.length - 1) {
        nextButton.textContent = "Next Passage";
    }
}

function handleNextButton() {
    console.log("Current Passage Index:", currentPassageIndex);
    console.log("Total Passages:", passages.length);
    currentQuestionIndex++;
    if (currentPassageIndex < passages.length) {
        let currentPassage = passages[currentPassageIndex];
        console.log("Current Passage:", currentPassage);
        if (currentPassage && currentPassage.questions) {
            if (currentQuestionIndex < currentPassage.questions.length) {
                showQuestion();
            } else {
                console.log("No more questions for this passage");
                currentPassageIndex++;
                currentQuestionIndex = 0; // Reset question index
                if (currentPassageIndex < passages.length) {
                    showPassage();
                    showQuestion();
                } else {
                    console.log("End of passages. Showing score.");
                    allQuestionsAnswered = true; // Set to true when all questions have been answered
                    showScore();
                }
            }
        } else {
            console.log("Current passage or questions are undefined.");
        }
    }
}

function showScore() {
    const passageContent = document.getElementById("passage-content");
    const questionElement = document.getElementById("question");
    const nextButton = document.getElementById("nxt-btn");

    resetState();

    // Hide passage content
    passageContent.style.display = "none";

    // Check if all questions have been answered
    if (allQuestionsAnswered) {
        // Calculate the total number of questions
        let totalQuestions = 0;
        passages.forEach(passage => {
            totalQuestions += passage.questions.length;
        });

        // Display the score
        questionElement.innerHTML = `You scored ${score} out of ${totalQuestions}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";

        nextButton.addEventListener("click", () => {
            window.location.href = "modeselector.html"; // Redirect to modeselector.html
        });
    }
}

document.getElementById("nxt-btn").addEventListener("click", () => {
    if (currentQuestionIndex < passages[currentPassageIndex].questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
