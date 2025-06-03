const textArea = document.getElementById('textarea');
const allButtons = document.querySelectorAll('.keypad button[data-value]');
const play = document.getElementById('play');
let counter = 0;


window.currentResultAddition = null;
window.currentResultSubtraction = null;
window.currentResultMultiplication = null;
window.currentResultDivision = null;

function startCountdown(durationInSeconds, displayElement) {
    let remaining = durationInSeconds;
    displayElement.textContent = remaining;

    const intervalId = setInterval(() => {
        remaining--;
        if (remaining < 0) {
            clearInterval(intervalId);
            const counterFinal = counter;
            document.getElementById('counterFinal').textContent = counterFinal;
            document.getElementById('startGame').classList.add('hidden');
            document.getElementById('endGame').classList.remove('hidden');
            return;
        }
        displayElement.textContent = remaining;
    }, 1000);
    return intervalId;
}

document.getElementById('play').addEventListener('click', () => {
    const timerEl = document.getElementById('timer');
    startCountdown(30, timerEl);
});

allButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        textArea.value += btn.dataset.value;
        textArea.dispatchEvent(new Event('input'));
    });
});

document.getElementById('clear').addEventListener('click', () => {
    textArea.value = '';
});

play.addEventListener('click', () => {
    document.getElementById('mainGame').classList.add('hidden');
    document.getElementById('startGame').classList.remove('hidden');
    const currentOperation = document.getElementById('operation').value;
    document.getElementById('currentOperation').textContent = currentOperation;

    switch (currentOperation) {
        case 'Addition':
            counter = 0;
            createAddition();
            break;
        case 'Subtraction':
            counter = 0;
            createSubtraction();
            break;
        case 'Multiplication':
            counter = 0;
            createMultiplication();
            break;
        case 'Division':
            counter = 0;
            createDivision();
            break;
    }
});

//Addition
const createAddition = () => {
    const randomNumber1 = Math.floor(Math.random() * 10 + 1);
    const randomNumber2 = Math.floor(Math.random() * 10 + 1);
    window.currentResultAddition = randomNumber1 + randomNumber2;

    document.getElementById('currentTask').textContent = randomNumber1 + ' + ' + randomNumber2;
    document.getElementById('counter').textContent = 'Score ' + counter;
    textArea.value = '';
    textArea.focus();
};
//Subtraction
const createSubtraction = () => {
    const randomNumber1 = Math.floor(Math.random() * 10 + 1);
    const randomNumber2 = Math.floor(Math.random() * 10 + 1);
    if (randomNumber1 < randomNumber2) {
        window.currentResultSubtraction = randomNumber2 - randomNumber1;
        document.getElementById('currentTask').textContent = randomNumber2 + ' - ' + randomNumber1;
    } else {

        window.currentResultSubtraction = randomNumber1 - randomNumber2;
        document.getElementById('currentTask').textContent = randomNumber1 + ' - ' + randomNumber2;
    }
    
    


    document.getElementById('counter').textContent = 'Score ' + counter;
    textArea.value = '';
    textArea.focus();
};

//Multiplication
const createMultiplication = () => {
    const randomNumber1 = Math.floor(Math.random() * 10 + 1);
    const randomNumber2 = Math.floor(Math.random() * 10 + 1);
    window.currentResultMultiplication = randomNumber1 * randomNumber2;

    document.getElementById('currentTask').textContent = randomNumber1 + ' * ' + randomNumber2;
    document.getElementById('counter').textContent = 'Score ' + counter;
    textArea.value = '';
    textArea.focus();
};

//Division
const createDivision = () => {
    function checkNumber() {
        
        const randomNumber1 = Math.floor(Math.random() * 100 + 1);
        const randomNumber2 = Math.floor(Math.random() * 100 + 1);
        if (randomNumber1 % randomNumber2 !== 0) {
            return checkNumber();
        } else {
            window.currentResultDivision = randomNumber1 / randomNumber2;
            document.getElementById('currentTask').textContent = randomNumber1 + ' / ' + randomNumber2;
            document.getElementById('counter').textContent = 'Score ' + counter;
            textArea.value = '';
            textArea.focus();
        };
    };
    checkNumber();
  

    
};

textArea.addEventListener('input', () => {



    const userResult = Number(textArea.value.trim());
    if (!isNaN(userResult) && userResult === window.currentResultAddition  || userResult === window.currentResultSubtraction || userResult === window.currentResultMultiplication || userResult === window.currentResultDivision) {

        counter++

        const currentOperation = document.getElementById('operation').value;
        switch (currentOperation) {
        case 'Addition':
            createAddition();
            break;
        case 'Subtraction':
            createSubtraction();
            break;
        case 'Multiplication':
            createMultiplication();
            break;
        case 'Division':
            createDivision();
            break;
    }
    }
});

document.getElementById('playAgain').addEventListener('click', () => {
    document.getElementById('mainGame').classList.remove('hidden');
    document.getElementById('endGame').classList.add('hidden');
});
