const board = document.getElementById("board");
board.addEventListener("touchend", makeMove);
let player = true;

let player1 = [];
let player2 = [];

let key = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,5,9],
  [3,5,7],
  [1,4,7],
  [2,5,8],
  [3,6,9]
];

let moves = 0;

function makeMove(event) {
  if (player) {
    event.target.innerHTML = "X";
    console.log(event.target.id);
    player1.push(event.target.id);
    moves++;
    player = false;
    validateWin(player1);
  }
  
  else {
    event.target.innerHTML = "O";
    player2.push(event.target.id);
    moves++;
    player = true;
    validateWin(player2);
  }
}

function validateWin(victory) {
  let win = false;
  key.forEach(condition => {
    if (win) {
      console.log("You won!");
      return;
    }
    else {
      condition.forEach(index => {
        console.log(`Index: ${index}`);
        console.log(`Victory: ${victory}`);

        if(victory.includes(index)) {
          win = true;
        }
        else {
          win = false;
        }
      })
    }
  })

  if (moves == 9) {
    console.log("It was a draw!");
  }
}

function reset() {
  const gameSquares = document.querySelectorAll(".gameSquares");
  gameSquares.forEach(square => {
    square.innerHTML = "";
    player1 = [];
    player2 = [];
    player = true;
    moves = 0;
  });
}