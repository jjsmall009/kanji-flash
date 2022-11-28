// Kanji Flash - 2022 JJ Small

/* 
* LEVELS ZONE - Populates the levels zone with div buttons using CSS Grid
*/
const levelZone = document.getElementById("level-picker");

function makeRows(rows, cols) {
    for (let i = 0; i < (rows * cols); i++) {
        let cell = document.createElement("div");
        cell.innerText = (i + 1);   
        cell.addEventListener("click", level_select);
        levelZone.appendChild(cell).className = "level-btn";
    }
}
makeRows(15, 4);


/* 
* CARD FLIP - Clicking on the kanji card will flip it over to reveal the readings/meanings
*/
let card = document.querySelector('.card-content');
card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
    goodBtn.disabled = false;
    badBtn.disabled = false;
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
    const kanjiList = data[level - 1][`${level}`]
    size = kanjiList.length;
    update_label(level, 0, size);
    create_flashcard_queue(kanjiList);
}

function update_label(level, correct, num_kanji) {
    const scoreline = document.getElementById("level-scoreline");
    scoreline.innerText = `Level ${level} - ${correct}/${num_kanji}`;
}

let kanjiQueue = [];
function create_flashcard_queue(list) {
    kanjiQueue = shuffle(list);
    update_kanji_card(list[0]);
}

function update_kanji_card(kanjiData) {
    goodBtn.disabled = true;
    badBtn.disabled = true;
    let kanjiBig = document.getElementById("kanji_big");
    let kanjiSmall = document.getElementById("kanji_small");
    let readings = document.getElementById("readings");
    let meanings = document.getElementById("meanings");

    kanjiBig.innerText = kanjiData  .kanji;
    kanjiSmall.innerText = kanjiData.kanji;

    readings.innerText = kanjiData.readings.join(", ");
    meanings.innerText = kanjiData.meanings.join(", ");
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
let goodBtn = document.getElementById("good-btn");
let badBtn = document.getElementById("bad-btn");
goodBtn.addEventListener("click", update_good);
badBtn.addEventListener("click", update_bad);


function update_good() {
    kanjiQueue.shift();
    card.classList.toggle('is-flipped');
    correct += 1;
    update_label(level, correct, size);

    if(kanjiQueue.length == 0) {
        reset();
    } else {
        update_kanji_card(kanjiQueue[0]);
    }
}

function update_bad() {
    wrong = kanjiQueue.shift();
    kanjiQueue.push(wrong);
    card.classList.toggle('is-flipped');
    update_kanji_card(kanjiQueue[0]);
}

function reset() {
    alert("You've completed the level!");
    correct = 0;
}