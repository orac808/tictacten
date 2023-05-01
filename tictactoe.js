let board = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];

let players = ["X", "O"];
let currentPlayer;
let available = [];
let boffsetx = 6;
let boffsety = 0;

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
  return a == b && b == c && a != "";
}

function colourwins(winner) {
  let w = width / 9;
  let h = height / 9;
  strokeWeight(0);
  if (winner == "X") {
    fill("#00ff0050");
    rect(0 + w * boffsetx, 0 + h * boffsety, w * boffsetx, h * boffsety);
  } else if (winner == "O") {
    fill("#0000ff50");
    rect(0 + w * boffsetx, 0 + h * boffsety, w * boffsetx, h * boffsety);
  }
}

function checkWinner() {
  let winner = null;

  // height and width of a single square on the board
  let w = width / 9;
  let h = height / 9;

  for (let gridY = 0; gridY < 9; gridY += 3) {
    for (let gridX = 0; gridX < 9; gridX += 3) {
      boffsetx = gridX;
      boffsety = gridY;

      // [Original checkWinner() code starts here]

      // Vertical lines of 3
      for (let i = 0; i < 3; i++) {
        if (
          equals3(
            board[i + boffsetx][0 + boffsety],
            board[i + boffsetx][1 + boffsety],
            board[i + boffsetx][2 + boffsety]
          )
        ) {
          winner = board[i + boffsetx][0 + boffsety];

          colourwins(winner);

          strokeWeight(4);

          line(
            w * boffsetx + (i * w + w / 2),
            h * boffsety + h / 2,
            w * boffsetx + (i * w + w / 2),
            h * boffsety + (h * 3 - h / 2)
          );
        }
      }

      // Horizontal lines of 3
      for (let i = 0; i < 3; i++) {
        if (
          equals3(
            board[0 + boffsetx][i + boffsety],
              board[1 + boffsetx][i + boffsety],
              board[2 + boffsetx][i + boffsety]
            )
          ) {
            winner = board[0 + boffsetx][i + boffsety];
            colourwins(winner);
            strokeWeight(4);
            line(
              (1 + boffsetx) * w - w * 0.5,
              (1 + i + boffsety) * h - h * 0.5,
              (3 + boffsetx) * w - w * 0.5,
              (1 + i + boffsety) * h - h * 0.5
            );
          }
        }
    
        // Diagonal
        if (
          equals3(
            board[0 + boffsetx][0 + boffsety],
            board[1 + boffsetx][1 + boffsety],
            board[2 + boffsetx][2 + boffsety]
          )
        ) {
          winner = board[0 + boffsetx][0 + boffsety];
          colourwins(winner);
          strokeWeight(4);
          //diaganol line 1
          line(
            (1 + boffsetx) * w - w * 0.5,
            (1 + boffsety) * h - h * 0.5,
            (3 + boffsetx) * w - w * 0.5,
            (3 + boffsety) * h - h * 0.5
          );
        }
        if (
          equals3(
            board[2 + boffsetx][0 + boffsety],
            board[1 + boffsetx][1 + boffsety],
            board[0 + boffsetx][2 + boffsety]
          )
        ) {
          winner = board[2 + boffsetx][0 + boffsety];
          colourwins(winner);
          strokeWeight(4);
          //diaganol line 2
          line(
            (3 + boffsetx) * w - w * 0.5,
            (1 + boffsety) * h - h * 0.5,
            (3 + boffsetx) * w - w * 0.5,
            (1 + boffsety) * h - h * 0.5
          );
        }
    
        // [Original checkWinner() code ends here]
      }
    }
    
      if (winner == null && available.length == 0) {
        return "tie";
      } else {
        return winner;
      }
    }
    
    function mousePressed() {
      // Calculate the grid position based on the mouse click coordinates
      let i = floor(mouseX / (width / 9));
      let j = floor(mouseY / (height / 9));
    
      // Check if the clicked grid position is empty and within the board
      if (i >= 0 && i < 9 && j >= 0 && j < 9 && board[i][j] === "") {
        // Place the current player's piece in the clicked grid position
        board[i][j] = players[currentPlayer];
        currentPlayer = (currentPlayer + 1) % players.length;
    
        // Remove the clicked position from the available positions
        let index = available.findIndex(spot => spot[0] === i && spot[1] === j);
        if (index !== -1) {
          available.splice(index, 1);
        }
      }
    }
    
    
    // [The rest of your original code remains unchanged]
    

function draw() {
  background(255);
  let w = width / 9;
  let h = height / 9;

  //GRID
  strokeWeight(2);
  stroke("#ff000050");
  //vertical lines
  for (let j = 1; j < 9; j++) {
    line(0, j * h, width, j * h);
  }
  //horizontal lines
  for (let i = 1; i < 9; i++) {
    line(i * w, 0, i * w, height);
  }
  stroke("black");
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
        ellipse(x, y, random(1) + r * 2);
      } else if (spot == players[0]) {
        line(x - r, y - r, x + r, y + random(1) + r);
        line(x + r, y - r, x - r, y + random(1) + r);
      }
    }
  }
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP("");
    resultP.style("font-size", "32pt");
    resultP.style("font-family", "Arial");
    if (result == "tie") {
      resultP.html("Tie!");
    } else {
      resultP.html(`${result} wins!`);
    }
  } else {
    //autoplay
    // nextTurn();
  }
}
