/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date == done
  ---- [02] Choose Levels From Select Box == done
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 2 Seconds For The First Word == done
  ---- [07] add button Esc to refresh the page when finished == done
  ---- [08] when a person choose a level then restart the game, it is saved to the local storage  == done
  ---- [09] when a person fails from the beginning he gets game over == done
*/

// Array Of Words
let words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let difficultyLvl = document.querySelector(".difficulty select");
let lastUpdateDiv = document.querySelector(".last-update");
let first = document.querySelector(".last-update .one");
let second = document.querySelector(".last-update .two");
let third = document.querySelector(".last-update .three");
let thatLvl = document.querySelector(".last-update .thatLvl");

let firstWordTime = true;

// Setting Levels
const lvls = {
  Easy: 7,
  Normal: 4,
  Hard: 2,
};

// Choose Difficulty

function difficultyChange() {
  defaultLevelName = difficultyLvl.value;
  lvlNameSpan.innerHTML = defaultLevelName;
  defaultLevelSeconds = lvls[defaultLevelName];
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
}

difficultyLvl.addEventListener("change", difficultyChange);

// Default Level

let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// update the last score you got from localStorage
if (
  window.localStorage.getItem("scoreGot") &&
  window.localStorage.getItem("scoreTotal") &&
  window.localStorage.getItem("time") &&
  window.localStorage.getItem("level")
) {
  showInDom();
} else {
  lastUpdateDiv.style.display = "none";
}

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  difficultyLvl.disabled = true;
  genWords();
};

function genWords() {
  // Get Random Words From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove Word From The Array
  words.splice(wordIndex, 1);
  // Show The Random Words
  theWord.innerHTML = randomWord;
  // Empty Upcoming words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Elements
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call The Start Play Function
  startPlay();
}

function startPlay() {
  if (firstWordTime == true) {
    timeLeftSpan.innerHTML = defaultLevelSeconds + 2;
    firstWordTime = false;
  } else {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  }
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          //Call Generate Words Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratz !!");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
          // set score to localStorage
          setLastScore();
          showInDom();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);

        // set score to localStorage
        setLastScore();
        showInDom();
      }
    }
  }, 1000);
}

function setLastScore() {
  // set score to localStorage
  window.localStorage.setItem("scoreGot", scoreGot.innerHTML);
  window.localStorage.setItem("scoreTotal", scoreTotal.innerHTML);
  window.localStorage.setItem("level", difficultyLvl.value);
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  window.localStorage.setItem("time", time);
}

function showInDom() {
  // Show The Info In The DOM
  first.innerHTML = window.localStorage.scoreGot;
  second.innerHTML = window.localStorage.scoreTotal;
  third.innerHTML = window.localStorage.time;
  thatLvl.innerHTML = window.localStorage.level;
}

if (window.localStorage.getItem("level")) {
  const storedLevel = window.localStorage.getItem("level");
  difficultyLvl.value = storedLevel;
  difficultyChange();
}

// Refresh Page By Pressing The ESC key
function refreshPage(event) {
  if (event.key === "Escape") {
    window.location.reload();
  }
}

document.addEventListener("keyup", refreshPage);
