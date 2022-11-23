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
* Event handling for clicking a level button
* Will grab that levels kanji and queue them up for flashcarding
*/

function level_select() {
    const level = this.innerText
    const kanji_list = data[level - 1][`${level}`]
    update_label(level, 0, kanji_list.length);
    create_flashcard_queue(kanji_list);
}

function update_label(level, correct, num_kanji) {
    const scoreline = document.getElementById("level-score");
    scoreline.innerText = `Level ${level} - ${correct}/${num_kanji}`;
}

let kanji_queue = [];
let remaining = -1;
function create_flashcard_queue(list) {
    kanji_queue = shuffle(list);
    remaining = list.length;
    update_kanji_card(list[0]);
}

function update_kanji_card(kanji_data) {
    let k_b = document.getElementById("kanji_big");
    let k_s = document.getElementById("kanji_small");
    let r = document.getElementById("readings");
    let m = document.getElementById("meanings");

    k_b.innerText = kanji_data.kanji;
    k_s.innerText = kanji_data.kanji;

    r.innerText = kanji_data.readings;
    m.innerText = kanji_data.meanings;
}

/* Helper function to randomize the kanji set */
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

/* 
* RESPONSE BUTTONS - Event handling for clicking the answer response buttons
*/
let good_btn = document.getElementById("good-btn");
let bad_btn = document.getElementById("bad-btn");
good_btn.addEventListener("click", update_good);
bad_btn.addEventListener("click", update_bad);

function update_good() {
    kanji_queue.shift();
    card.classList.toggle('is-flipped');
    remaining -= 1;

    if(remaining < 1) {
        return;
    }
    update_kanji_card(kanji_queue[0]);
}

function update_bad() {
    wrong = kanji_queue.shift();
    kanji_queue.push(wrong);
    card.classList.toggle('is-flipped');
    update_kanji_card(kanji_queue[0]);
}