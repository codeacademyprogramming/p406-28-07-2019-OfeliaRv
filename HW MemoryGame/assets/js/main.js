const cells = document.querySelectorAll('.cell');

let flipped = false;
let finished = false; //checks if cards are flipped already
let firstCell, secondCell;

let playerScore = 0;
score = document.getElementById("score");
score.value = playerScore;


function flipCell() {
    if (finished) return;
    this.classList.add('flip');

    if (!flipped) {
        flipped = true;
        firstCell = this;

        return;
    }
    secondCell = this;
    checkMatch();

}

function checkMatch() {
    if (firstCell.dataset.name === secondCell.dataset.name) {
        firstCell.removeEventListener('click', flipCell);    //removing cells 
        secondCell.removeEventListener('click', flipCell);
        playerScore++;
        score.value = playerScore;
        reset();
    } else {
        finished = true;
        setTimeout(() => {
            firstCell.classList.remove('flip');  //unflipping cells
            secondCell.classList.remove('flip');
            reset();
        }, 2000);
    }
}

function reset() {
    [flipped, finished] = [false, false];
    [firstCell, secondCell] = [null, null];
}

(function shuffle() {
    cells.forEach(cell => {
        let randomPosition = Math.floor(Math.random() * 6);
        cell.style.order = randomPosition;
    });
})()

cells.forEach(cell => cell.addEventListener('click', flipCell));

// cells.forEach(cell => {
//     if ($(cell).hasClass(flip)) {
//         stopGame();
//     }
// });


////////TIMER FUNCTION



var mins = 3;
var secs = mins * 60;

function getminutes() {
    mins = Math.floor(secs / 60);
    return mins;
}

function getseconds() {
    return secs - Math.round(mins * 60);
}

function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
        if (seconds < 59) {
            seconds.value = secs;
        } else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }

        if (mins < 0) {
            stopGame();
        } else {
            secs--;
            setTimeout('Decrement()', 1000);
        }
    }
}

function stopGame() {
    alert('Time is up! Your score is' + playerScore);
    cells.removeEventListener('click', flipCell);
    minutes.value = 0;
    seconds.value = 0;
}

function countdown() {
    setTimeout('Decrement()', 60);
}

//const startGame = document.getElementById("#start").addEventListener('click', countdown);

const playerName = document.querySelector('#entername');
const playerInfo = [];

playerName.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('input[name="playerName"]');
    const score = document.querySelector('input[name="score"]');

    playerInfo.push({ name: name.value, score: score.value });
    name.value = '';
    score.value = '';
    fullfillTable();
})

function fullfillTable() {
    const table = document.querySelector('table.table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    playerInfo.forEach((player) => {
        const tableRow = document.createElement('tr');

        for (let key in player) {
            const tableData = document.createElement('td');
            tableData.innerText = player[key];
            tableRow.appendChild(tableData);
        }

        tbody.appendChild(tableRow);
    });
}