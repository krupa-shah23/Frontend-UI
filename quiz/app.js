const quizdata = [
    { 
        question: "Who is Iron Man's alter ego?", 
        options: ["Bruce Banner", "Tony Stark", "Steve Rogers", "Peter Parker"], 
        answer: 1 
    },
    { 
        question: "Which Disney princess has a chameleon named Pascal?", 
        options: ["Ariel", "Belle", "Rapunzel", "Tiana"], 
        answer: 2 
    },
    { 
        question: "What is the name of Thor's hammer?", 
        options: ["Vanir", "Mjolnir", "Aesir", "Norn"], 
        answer: 1 
    },
    { 
        question: "In 'Finding Nemo', what kind of fish is Nemo?", 
        options: ["Pufferfish", "Angelfish", "Clownfish", "Zebrafish"], 
        answer: 2 
    },
    { 
        question: "Who was the first Avenger in the Marvel Cinematic Universe?", 
        options: ["Iron Man", "The Hulk", "Thor", "Captain America"], 
        answer: 3 
    },
    { 
        question: "Which Disney movie features the song 'Let It Go'?", 
        options: ["Tangled", "Moana", "Frozen", "Brave"], 
        answer: 2 
    },
    { 
        question: "What is the name of Black Panther's home country?", 
        options: ["Wakanda", "Latveria", "Genosha", "Atlantis"], 
        answer: 0 
    },
    { 
        question: "Who is Mickey Mouse's girlfriend?", 
        options: ["Daisy", "Minnie", "Clarabelle", "Ortensia"], 
        answer: 1 
    },
    { 
        question: "Which Infinity Stone was located in Loki's scepter?", 
        options: ["Space Stone", "Reality Stone", "Mind Stone", "Time Stone"], 
        answer: 2 
    },
    { 
        question: "In 'The Lion King', what is Simba's mother's name?", 
        options: ["Nala", "Sarabi", "Sarafina", "Kiara"], 
        answer: 1 
    }
];


const startscreen = document.getElementById('startscreen');
const quizscreen = document.getElementById('quizscreen');
const resultsscreen = document.getElementById('resultsscreen');
const startbtn = document.getElementById('startbtn');
const restartbtn = document.getElementById('restartbtn');
const nextbtn = document.getElementById('nextbtn');
const currentquestion = document.getElementById('currentquestion');
const scoredisplay = document.getElementById('score');
const questiontext = document.getElementById('questiontext');
const optionscontainer = document.getElementById('optionscontainer');
const feedback = document.getElementById('feedback');
const progressfill = document.querySelector('.progressbar2.progressfill');
const resulticon = document.getElementById('resulticon');
const finalscore = document.getElementById('finalscore');
const resultmessage = document.getElementById('resultmessage');


let currentquestionindex = 0;
let score = 0;


startbtn.addEventListener('click', () => {
    hide(startscreen);
    show(quizscreen);
    currentquestionindex = 0;
    score = 0;
    scoredisplay.innerText = score;
    loadquestion();
});


restartbtn.addEventListener('click', () => {
    hide(resultsscreen);
    show(startscreen);
});


nextbtn.addEventListener('click', () => {
    currentquestionindex++;
    if (currentquestionindex < quizdata.length) 
        loadquestion();
    else
        showresults();
});


function hide(el) {
    el.classList.add('hidden');
}

function show(el) {
    el.classList.remove('hidden');
}

function loadquestion() {
    hide(feedback);
    feedback.innerText = "";
    nextbtn.classList.add('hidden');

    const q = quizdata[currentquestionindex];
    questiontext.innerText = q.question;
    currentquestion.innerText = currentquestionindex + 1;
    optionscontainer.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("optionbtn");
        btn.addEventListener("click", () => checkanswer(index));
        optionscontainer.appendChild(btn);
    });

    updateprogress();
}

function checkanswer(selectedIndex) {
    const correctIndex = quizdata[currentquestionindex].answer;
    const optionButtons = document.querySelectorAll(".optionbtn");

    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIndex) {
            btn.classList.add("correct");
        } else if (idx === selectedIndex) {
            btn.classList.add("incorrect");
        }
    });


    show(feedback);
    if (selectedIndex === correctIndex) {
        feedback.innerText = "Correct!";
        score++;
        scoredisplay.innerText = score;
    } else {
        feedback.innerText = "❌ Incorrect!";
    }

    
    nextbtn.classList.remove("hidden");
}

function showresults() {
    hide(quizscreen);
    show(resultsscreen);
    finalscore.innerText = `${score} / ${quizdata.length}`;

    const percentage = (score / quizdata.length) * 100;
    if (percentage >= 80) {
        resultmessage.innerText = "Amazing! 🎉 You're a Marvel + Disney Master!";
        resulticon.innerText = "Congoo u r truly a fan";
    } else if (percentage >= 50) {
        resultmessage.innerText = "Not bad! Try again to improve!";
        resulticon.innerText = "Try again buddyyy";
    } else {
        resultmessage.innerText = "Oops! Better luck next time!";
        resulticon.innerText = "ohh noooooo";
    }
}

function updateprogress() {
    const percent = ((currentquestionindex + 1) / quizdata.length) * 100;
    progressfill.style.width = percent + "%";
}
