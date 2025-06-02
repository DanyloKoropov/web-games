const anagrams = {
    5: [
        ["abets", "baste", "betas", "beast", "beats"],
        ["acres", "cares", "races", "scare"],
        ["alert", "alter", "later"],
        ["angel", "angle", "glean"],
        ["baker", "brake", "break"],
        ["bared", "beard", "bread", "debar"],
        ["dater", "rated", "trade", "tread"],
        ["below", "bowel", "elbow"],
        ["caret", "cater", "crate", "trace", "react"]
    ],
    6: [
        ["arrest", "rarest", "raster", "raters", "starer"],
        ["carets", "caters", "caster", "crates", "reacts", "recast", "traces"],
        ["canter", "nectar", "recant", "trance"],
        ["danger", "gander", "garden", "ranged"],
        ["daters", "trades", "treads", "stared"]
    ],
    7: [
        ["allergy", "gallery", "largely", "regally"],
        ["aspired", "despair", "diapers", "praised"],
        ["claimed", "decimal", "declaim", "medical"],
        ["dearths", "hardest", "hatreds", "threads", "trashed"],
        ["detains", "instead", "sainted", "stained"]
    ],
    8: [
        ["parroted", "predator", "prorated", "teardrop"],
        ["repaints", "painters", "pantries", "pertains"],
        ["restrain", "retrains", "strainer", "terrains", "trainers"],
        ["construe", "counters", "recounts", "trounces"]
    ]
};

let timerId = null;
let roundStart = null;
let currentTask = '';
let currentGroup = [];
let initialTime = 30;

const select = document.getElementById('selectnumbers');
const buttonPlay = document.getElementById('play');
const timerDisplay = document.getElementById('timer-display');
const inputField = document.getElementById('gameinput');

function startGame(letterCount) {
    document.getElementById('basic-page').classList.add('hidden');
    document.getElementById('lose-screen').classList.add('hidden');
    document.getElementById('win-screen').classList.add('hidden');
    document.getElementById('beginning-game').classList.remove('hidden');
    roundStart = Date.now();
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
    const key = letterCount;
    const groups = key === 'any' ? Object.values(anagrams).flat() : (anagrams[key] || []);
    const group = groups[Math.floor(Math.random() * groups.length)];
    currentGroup = group.slice();
    currentTask = group[Math.floor(Math.random() * group.length)];
    inputField.value = '';
    initialTime = 30;
    timerId = startTimer(initialTime, timerDisplay, reportResult);
    inputField.focus();
    const span = document.getElementById('current-word');
    span.textContent = currentTask + ' (' + currentGroup.length + ')';
}

function arraysMatch(playerArray, correctArray) {
    if (playerArray.length !== correctArray.length) {
        return false;
    }
    const temp = correctArray.slice();
    for (let word of playerArray) {
        const normalized = word.trim().toLowerCase();
        const idx = temp.findIndex(item => item.toLowerCase() === normalized);
        if (idx === -1) {
            return false;
        }
        temp.splice(idx, 1);
    }
    return true;
}

function onPlayClick(e) {
    e.preventDefault();
    const count = select.value;
    startGame(count);
}
buttonPlay.addEventListener('click', onPlayClick);

function updateDisplay(seconds, elem) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formatted = String(mins) + ':' + String(secs).padStart(2, '0');
    elem.textContent = formatted;
}

function startTimer(durationSeconds, displayElem, onTimeUp) {
    let remaining = durationSeconds;
    updateDisplay(remaining, displayElem);
    const intervalId = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            clearInterval(intervalId);
            updateDisplay(0, displayElem);
            onTimeUp();
        } else {
            updateDisplay(remaining, displayElem);
        }
    }, 1000);
    return intervalId;
}

function getElapsedTimeFormatted() {
    if (!roundStart) {
        return '0:00';
    }
    const now = Date.now();
    const elapsedMs = now - roundStart;
    const elapsedSec = Math.floor(elapsedMs / 1000);
    const minutes = Math.floor(elapsedSec / 60);
    const seconds = elapsedSec % 60;
    return minutes + ':' + String(seconds).padStart(2, '0');
}

inputField.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const raw = inputField.value;
        const lines = raw.trim() === '' ? [] : raw.split(/\r?\n/).map(s => s.trim()).filter(s => s.length > 0);
        if (lines.length === currentGroup.length) {
            e.preventDefault();
            clearInterval(timerId);
            reportResult();
        }
    }
});

function reportResult() {
    const rawString = inputField.value.trim();
    const playerArray = rawString === '' ? [] : rawString.split(/\r?\n/).map(s => s.trim()).filter(s => s.length > 0);
    const correctArray = currentGroup;
    if (arraysMatch(playerArray, correctArray)) {
        handleWin();
    } else {
        handleLose();
    }
}

function handleWin() {
    clearInterval(timerId);
    document.getElementById('beginning-game').classList.add('hidden');
    const winScreen = document.getElementById('win-screen');
    winScreen.classList.remove('hidden');
    const elapsed = getElapsedTimeFormatted();
    const elapsedElem = document.getElementById('elapsed-time');
    elapsedElem.textContent = elapsed;
}

function handleLose() {
    clearInterval(timerId);
    document.getElementById('beginning-game').classList.add('hidden');
    timerDisplay.classList.add('hidden');
    const losePage = document.getElementById('lose-screen');
    losePage.classList.remove('hidden');
    const idCurrentTask = document.getElementById('currentTask');
    const lengthArrElem = document.getElementById('lengthArr');
    idCurrentTask.textContent = currentTask;
    lengthArrElem.textContent = currentGroup.length;
    const listUl = document.getElementById('correct-words');
    listUl.innerHTML = '';
    for (let w of currentGroup) {
        const li = document.createElement('li');
        li.textContent = w;
        listUl.appendChild(li);
    }
}
