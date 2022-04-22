// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/149-tic-tac-toe.html
// https://youtu.be/GTWrWM1UsnA
// https://editor.p5js.org/codingtrain/sketches/5JngATm3c
let board = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']
];

let players = ['X', 'O'];
let currentPlayer;
let available = [];

function setup() {
    createCanvas(400, 400);
    frameRate(30);
    currentPlayer = floor(random(players.length));
    for (let j = 0; j < 9; j++) {
        for (let i = 0; i < 9; i++) {
            // makes a array of 2d arrays of available slots
            available.push([i, j]);
        }
        console.log(available);
    }
}

function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function colourwins(winner) {
    let w = width / 9;
    let h = height / 9;
    strokeWeight(0);
    if (winner == 'X') {
        fill('#00ff0050');
        rect(0, 0, w * 3, h * 3);
    } else if (winner == 'O') {
        fill('#0000ff50');
        rect(0, 0, w * 3, h * 3);
    }
}

function checkWinner() {
    let winner = null;
    let w = width / 9;
    let h = height / 9;
    // Vertical lines of 3
    for (let i = 0; i < 3; i++) {

        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];

            colourwins(winner);

            strokeWeight(4);

            line(i * w + (w / 2), h / 2, i * w + (w / 2), h * 3 - (h / 2));
        }
    }
    // Horizontal lines of 3
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
               colourwins(winner);
        }
    }
    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
           colourwins(winner);
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
           colourwins(winner);
    }
    if (winner == null && available.length == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

function nextTurn() {
    let index = floor(random(available.length));
    let spot = available.splice(index, 1)[0];
    let i = spot[0];
    let j = spot[1];
    board[i][j] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
}
 function mousePressed() {
   nextTurn();
 }
function draw() {
    background(255);
    let w = width / 9;
    let h = height / 9;
    //GRID
    strokeWeight(2);
    stroke('#ff000050');
    //vertical lines
    for (let j = 1; j < 9; j++) {
        line(0, j * h, width, j * h);
    }
    //horizontal lines
    for (let i = 1; i < 9; i++) {
        line(i * w, 0, i * w, height);
    }
    stroke('black');
    strokeWeight(4);
    for (let j = 0; j < 9; j++) {
        for (let i = 0; i < 9; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[i][j];
            textSize(32);
            let r = w / 4;
            if (spot == players[1]) {
                noFill();
                ellipse(x, y, r * 2);
            } else if (spot == players[0]) {
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }
        }
    }
    let result = checkWinner();
    if (result != null) {
        noLoop();
        let resultP = createP('');
        resultP.style('font-size', '32pt');
        if (result == 'tie') {
            resultP.html('Tie!');
        } else {
            resultP.html(`${result} wins!`);
        }
    } else {
       // nextTurn();
    }
}
