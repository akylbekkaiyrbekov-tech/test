const questions = [
    {
        text: "Where is Tree?",
        leftImg: "images/tree-false.jpg",
        rightImg: "images/tree-true.jpg",
        correct: "right"
    },
    {
        text: "Where is Honey?",
        leftImg: "images/honey-true.jpg",
        rightImg: "images/honey-false.jpg",
        correct: "left"
    },
    {
        text: "Where is Moon?",
        leftImg: "images/moon-1.jpg",
        rightImg: "images/moon-2.jpg",
        correct: "none" 
    }
];

let currentStep = 0;
let moonClicks = 0;
let clickedSides = []; // Чтобы не нажимали дважды на одну и ту же картинку в Moon

function checkAnswer(side) {
    const q = questions[currentStep];
    const leftIcon = document.getElementById('status-left');
    const rightIcon = document.getElementById('status-right');

    if (q.correct !== "none") {
        if (side === q.correct) {
            currentStep++;
            updateUI();
        } else {
            // Показываем крестик на 1 секунду при ошибке
            const icon = (side === 'left') ? leftIcon : rightIcon;
            icon.innerText = "❌";
            setTimeout(() => icon.innerText = "", 1000);
        }
    } else {
        // Логика для Луны
        if (!clickedSides.includes(side)) {
            clickedSides.push(side);
            if (side === 'left') leftIcon.innerText = "❌";
            if (side === 'right') rightIcon.innerText = "❌";
        }

        if (clickedSides.length >= 2) {
            setTimeout(startSlideshow, 800);
        }
    }
}

function updateUI() {
    const q = questions[currentStep];
    document.getElementById('question-text').innerText = q.text;
    document.getElementById('img-left').src = q.leftImg;
    document.getElementById('img-right').src = q.rightImg;
    document.getElementById('status-left').innerText = "";
    document.getElementById('status-right').innerText = "";
}

// Слайд-шоу из 3-х фото
const finalImages = [
    "images/slide1.jpg",
    "images/slide2.jpg",
    "images/slide3.jpg"
];

function startSlideshow() {
    document.getElementById('game-container').classList.add('hidden');
    const slideContainer = document.getElementById('slideshow-container');
    const slideImg = document.getElementById('slideshow-img');
    slideContainer.classList.remove('hidden');

    let i = 0;
    slideImg.src = finalImages[i]; // Показать первое сразу

    const interval = setInterval(() => {
        i++;
        if (i < finalImages.length) {
            slideImg.src = finalImages[i];
        } else {
            clearInterval(interval); // Останавливаем после 3-й фотки
            // Если хочешь зациклить — убери clearInterval и оставь i = (i + 1) % finalImages.length;
        }
    }, 2500); // Смена фото каждые 2.5 секунды
}
