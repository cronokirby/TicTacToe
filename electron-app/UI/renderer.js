var backend = require('./backend/interface.js');

let additionPost = { body: "4 + 1" };
// Parses the result of an addition POST, and updates the result field
function additionCallback(result){
    let output = `${result.body}`;
    console.log(output);
    $('#additionResult').html(output);
}
document.getElementById("addition").onclick = function () {
    backend.post("/addition", additionPost, additionCallback);
};

// sets onclick to trigger squareEvent, for every square
let table = document.getElementById('gameTable');
for (let r = 0; r < table.rows.length; r++) {
    for (let c = 0; c < table.rows[r].cells.length; c++) {
        let cell = table.rows[r].cells[c];
        let position   = (r*3) + c;
        cell.onclick = squareEvent(cell, position);
    }
}

function squareEvent (cell, position) {
    return function () {
        // Sets the contents of the button to a blue X
        let button = $(cell).children();
        button.css({'color':'var(--XBlue)'});
        button.attr('value', 'X');
        // Send
    };
}
