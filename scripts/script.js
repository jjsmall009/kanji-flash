// Kanji Flash - 2022 JJ Small

// Create the level selector buttons
const container = document.getElementById("level-picker");

function makeRows(rows, cols) {
    for (i = 0; i < (rows * cols); i++) {
        let cell = document.createElement("div");
        cell.innerText = (i + 1);   
        cell.addEventListener("click", level_select);
        container.appendChild(cell).className = "level-btn";
    }
}

makeRows(15, 4);

// Level button functionality
function level_select() {
    const level = this.innerText;
    const num_kanji = data[level - 1][`${level}`].length
    const scoreline = document.getElementById("level-score");
    scoreline.innerText = `Level ${level} - 0/${num_kanji}`;
}

// Flip card
let card = document.querySelector('.card-content');
card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
});

// Answer button functionality
let answer_btns = document.getElementsByClassName("answer-btn");
for (var i = 0; i < answer_btns.length; i++) {
    answer_btns[i].addEventListener("click", processAnswer);
}

function processAnswer() {
    alert("you clicked and answer button!");
}

