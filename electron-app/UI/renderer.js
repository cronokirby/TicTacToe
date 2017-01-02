const backend = require('./backend/interface.js');
var currentTurn = 0;
// The starting dictionary for the gameState
var gameState = [];
function resetGameState() {
    currentTurn = 0;
    for (let i = 0; i <= 8; i++) {
        gameState[i] = { mark: "Empty", position: i};
    }
}
// Serves to initialise
resetGameState();

document.getElementById('ResetGame').onclick = function () {
    resetGameState();
    resetBoard();
    let winnerBox = document.getElementById("WinnerBox");
    winnerBox.classList.add("is-paused");
    let newone = winnerBox.cloneNode(true);
    winnerBox.parentNode.replaceChild(newone, winnerBox);
};

// sets onclick to trigger cellEvent, for every square
let gameInputs = document.getElementsByClassName('GameInput');
for (let i = 0; i < gameInputs.length; i++) {
    let cell = gameInputs[i];
    cell.onclick = cellEvent(cell, i);
}

function resetBoard () {
    for (let i = 0; i < gameInputs.length; i++) {
        let cell = $(gameInputs[i]);
        cell.attr('value', '');
    }
}

function cellEvent (cell, position) {
    return function () {
        // Sets the contents of the button to a blue X
        let button = $(cell);
        button.css({'color':'var(--XBlue)'});
        button.attr('value', 'X');
        // Modify the gameState
        let move = { mark: "X", position: position};
        gameState[position] = move;
        //Incrementing by 2, to represent the user's turn, and the backend's turn
        currentTurn += 2;
        if (currentTurn === 10) {
            setWinner("Tie");
        } else {
            // Wrap this info in a format the backend wants
            let gameData = { turn: currentTurn, cells: gameState, lastMove: move};
            console.log(JSON.stringify(gameData));
            backend.post("/gameinput", gameData, cellCallback);
        }
    };
}

function cellCallback (result) {
    console.log(JSON.stringify(result));
    let position = result.move.position;
    let mark     = result.move.mark;
    let winner   = result.winner;
    if (winner != "None") {
        setWinner(winner);
    }
    gameState[position] = { mark: mark, position: position};
    let cell = $(`#B_${position}`);
    cell.css({'color':'var(--ORed)'});
    cell.attr('value', mark);
}

function setWinner(winner) {
    console.log(winner);
    let winnerBox = document.getElementById("WinnerBox");
    winnerBox.classList.remove('is-paused');
    $("#WinnerText").html(winner);
}
