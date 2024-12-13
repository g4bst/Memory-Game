//Used this video for help! https://www.youtube.com/watch?v=fYjQH6vvdr4&t=376s, I also used Chat GPT to help out with checking my code.



function updateSettings(event)
{
    var value = event.target.value;
    var stylesheet = document.getElementById("colorTheme");
    stylesheet.setAttribute("href", value);
}







const cards = document.querySelectorAll('.card');
const faces = [
    'images/angry.jpg',
    'images/bubbles.jpg',
    'images/confused.jpg',
    'images/pink.jpg',
    'images/screaming.jpg',
    'images/shocked.jpg',
    'images/angry.jpg',
    'images/bubbles.jpg',
    'images/confused.jpg',
    'images/pink.jpg',
    'images/screaming.jpg',
    'images/shocked.jpg'
];

const maxScore = 6;
let score = 0,
    firstCard = null,
    secondCard = null,
    boardDisabled = true;
let moves = 0,
    sec = 0,
    min = 0,
    interval = null;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function start() {
    score = 0;
    moves = 0;
    sec = 0;
    min = 0;
    document.querySelector('.moves span').innerText = '0';
    document.querySelector('.timer span').innerText = '00:00';
    cards.forEach(card => card.classList.remove('show'));
    shuffle(faces);

    // Assign shuffled faces to the cards
    cards.forEach((card, i) => {
        const img = card.querySelector('.back .img');
        const imgElement = document.createElement('img');
        imgElement.src = faces[i];
        imgElement.alt = 'Image not found'; // Optional alt text
        img.innerHTML = ''; // Clear any previous content
        img.appendChild(imgElement);
    });

    boardDisabled = false;
    startTimer();
}

function flipCard() {
    if (boardDisabled || this.classList.contains('show')) return;

    if (!firstCard) {
        firstCard = this;
        this.classList.toggle('show');
    } else {
        if (!secondCard) {
            moves += 1;
            document.querySelector('.moves span').innerText = moves;
            secondCard = this;
            this.classList.toggle('show');

            // Check if the cards match
            if (firstCard.querySelector('.back img').src === secondCard.querySelector('.back img').src) {
                firstCard = null;
                secondCard = null;
                score += 1;

                // If all pairs are matched, stop the game
                if (score === maxScore) {
                    clearInterval(interval);
                    interval = null;
                    document.querySelector('.start button').innerText = 'New Game';
                }
            } else {
                setTimeout(() => {
                    firstCard.classList.toggle('show');
                    secondCard.classList.toggle('show');
                    firstCard = null;
                    secondCard = null;
                }, 1000);
            }
        }
    }
}

function startTimer() {
    if (!interval) {
        interval = setInterval(() => {
            sec += 1;
            if (sec === 60) {
                min += 1;
                sec = 0;
            }

            document.querySelector('.timer span').innerText = `${(min < 10) ? '0' + min : min} : ${(sec < 10) ? '0' + sec : sec}`;
        }, 1000);
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));

document.querySelector('.start button').onclick = () => {
    document.querySelector('.start button').innerText = 'Restart';
    start();
};