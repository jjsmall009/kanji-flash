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
    good_btn.disabled = false;
    bad_btn.disabled = false;
});

/* 
* Event handling for clicking a level button
* Will grab that levels kanji and queue them up for flashcarding
*/
let size = 0;
let level = -1;
let correct = 0;
function level_select() {
    correct = 0;
    level = this.innerText
    const kanji_list = data[level - 1][`${level}`]
    size = kanji_list.length;
    update_label(level, 0, size);
    create_flashcard_queue(kanji_list);
}

function update_label(level, correct, num_kanji) {
    const scoreline = document.getElementById("level-scoreline");
    scoreline.innerText = `Level ${level} - ${correct}/${num_kanji}`;
}

let kanji_queue = [];
function create_flashcard_queue(list) {
    kanji_queue = shuffle(list);
    update_kanji_card(list[0]);
}

function update_kanji_card(kanji_data) {
    good_btn.disabled = true;
    bad_btn.disabled = true;
    let k_b = document.getElementById("kanji_big");
    let k_s = document.getElementById("kanji_small");
    let r = document.getElementById("readings");
    let m = document.getElementById("meanings");

    k_b.innerText = kanji_data.kanji;
    k_s.innerText = kanji_data.kanji;

    r.innerText = kanji_data.readings.join(", ");
    m.innerText = kanji_data.meanings.join(", ");
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
    correct += 1;
    update_label(level, correct, size);

    if(kanji_queue.length == 0) {
        reset();
    } else {
        update_kanji_card(kanji_queue[0]);
    }
}

function update_bad() {
    wrong = kanji_queue.shift();
    kanji_queue.push(wrong);
    card.classList.toggle('is-flipped');
    update_kanji_card(kanji_queue[0]);
}

function reset() {
    alert("You've completed the level!");
    correct = 0;
}