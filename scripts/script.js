// Kanji Flash - 2022 JJ Small

/* 
* LEVELS ZONE - Populates the levels zone with div buttons using CSS Grid
*/
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


/* 
* CARD FLIP - Clicking on the kanji card will flip it over to reveal the readings/meanings
*/
let card = document.querySelector('.card-content');
card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
});


/* 
* RESPONSE BUTTONS - Event handling for clicking the answer response buttons
*/
let answer_btns = document.getElementsByClassName("answer-btn");
for (var i = 0; i < answer_btns.length; i++) {
    answer_btns[i].addEventListener("click", null)
}


/* 
* Event handling for clicking a level button
* Will grab that levels kanji and queue them up for flashcarding
*/
function level_select() {
    const level = this.innerText
    const kanji_list = data[level - 1][`${level}`]
    update_label(level, 0, kanji_list.length);
    create_flashcard_queue(level, kanji_list);
}

function update_label(level, correct, num_kanji) {
    const scoreline = document.getElementById("level-score");
    scoreline.innerText = `Level ${level} - ${correct}/${num_kanji}`;
}

function create_flashcard_queue(level, list) {
    let kanji_queue = shuffle(list);
    let remaining = list.length;

    
}

function shuffle (arr) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}