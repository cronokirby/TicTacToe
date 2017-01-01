var backend = require('./backend/interface.js');

let additionPost = { body: "4 + 1" };
// Parses the result of an addition POST, and updates the result field
function additionCallback(result) {
    let output = `${result.body}`;
    console.log(output);
    $('#additionResult').html(output);
}
document.getElementById("addition").onclick = function () {
    backend.post("/addition", additionPost, additionCallback);
};

var currentTurn = 0;
// The starting dictionary for the gameState
var gameState = [];
function resetGameState() {
    for (let i = 0; i <= 9; i++) {
        gameState[i] = { mark: "Empty", position: i};
    }
}
// Serves to initialise
resetGameState;

// sets onclick to trigger cellEvent, for every square
let table = document.getElementById('gameTable');
for (let r = 0; r < table.rows.length; r++) {
    for (let c = 0; c < table.rows[r].cells.length; c++) {
        let cell = table.rows[r].cells[c];
        let position   = (r*3) + c;
        cell.onclick = cellEvent(cell, position);
    }
}

function cellEvent (cell, position) {
    return function () {
        // Sets the contents of the button to a blue X
        let button = $(cell).children();
        button.css({'color':'var(--XBlue)'});
        button.attr('value', 'X');
        // Modify the gameState
        let move = { mark: "X", position: position};
        gameState[position] = move;
        //Incrementing by 2, to represent the user's turn, and the backend's turn
        currentTurn += 2;
        // Wrap this info in a format the backend wants
        let gameData = { turn: currentTurn, cells: gameState, lastMove: move};
        backend.post("/gameinput", gameData, cellCallback);
    };
}

function cellCallback (result) {
    console.log(currentTurn);
    console.log(result);
    let position = result.position;
    let mark     = result.mark;
    gameState[position] = { mark: mark, position: position};
    let cellID = `#B_${position}`;
    $(cellID).attr('value', result.mark);
}
