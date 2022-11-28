// Kanji Flash - JJ Small 2022

/* ============================================
    Grab page elements and other initialization
   ============================================
*/
let levelZone = document.getElementById("level-picker");
let scoreline = document.getElementById("level-scoreline");
let card = document.getElementById("card-content");
let goodBtn = document.getElementById("good-btn");
let badBtn = document.getElementById("bad-btn");
let currentLevel = null;

goodBtn.addEventListener("click", updateGood);
badBtn.addEventListener("click", updateBad);
card.addEventListener("click", function () {
  card.classList.toggle("is-flipped");
});

// Constructor to represent the current level
function CurrentLevelData(level) {
  this.level = level;
  this.kanjiList = shuffle(data[level - 1][`${level}`]);
  this.size = this.kanjiList.length;
  this.correct = 0;
}

/* ============================================
    Level Zone
   ============================================
*/
// Populate the level zone with div buttons using CSS Grid
function makeRows(rows, cols) {
  for (let i = 0; i < rows * cols; i++) {
    let cell = document.createElement("div");
    cell.innerText = i + 1;
    cell.addEventListener("click", levelSelect);
    levelZone.appendChild(cell).className = "level-btn";
  }
}
makeRows(15, 4);

// Selecting a level will create a new level object and set things up
function levelSelect() {
  currentLevel = new CurrentLevelData(this.innerText);
  updateScoreline();
  updateKanjiCard(currentLevel.kanjiList[0]);
}

/* ============================================
    Kanji Card and Flashcard Zone
   ============================================
*/
function updateScoreline() {
  const level = currentLevel.level;
  const correct = currentLevel.correct;
  const size = currentLevel.size;
  scoreline.innerText = `Level ${level} - ${correct}/${size}`;
}

// Helper function to randomize the kanji set
function shuffle(arr) {
  var j, x, index;
  for (index = arr.length - 1; index > 0; index--) {
    j = Math.floor(Math.random() * (index + 1));
    x = arr[index];
    arr[index] = arr[j];
    arr[j] = x;
  }
  return arr;
}

// Update the front and back of the kanji card
function updateKanjiCard(kanjiData) {
  let kanjiBig = document.getElementById("kanji_big");
  let kanjiSmall = document.getElementById("kanji_small");
  let readings = document.getElementById("readings");
  let meanings = document.getElementById("meanings");

  kanjiBig.innerText = kanjiData.kanji;
  kanjiSmall.innerText = kanjiData.kanji;

  readings.innerText = kanjiData.readings.join(", ");
  meanings.innerText = kanjiData.meanings.join(", ");
}

// Button functionality
function updateGood() {
  currentLevel.kanjiList.shift();
  card.classList.toggle("is-flipped");
  currentLevel.correct += 1;
  updateScoreline();

  if (currentLevel.kanjiList.length == 0) {
    reset();
  } else {
    updateKanjiCard(currentLevel.kanjiList[0]);
  }
}

function updateBad() {
  wrongKanji = currentLevel.kanjiList.shift();
  currentLevel.kanjiList.push(wrongKanji);
  card.classList.toggle("is-flipped");
  updateKanjiCard(currentLevel.kanjiList[0]);
}

function reset() {
  alert("You've completed the level!");
  currentLevel = null;
}
