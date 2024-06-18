var gameInProgress = false;
var board = [];
var rows = 9,
  cols = 9,
  numMines = 10;
var numRevealedSquares = 0;

function loadNewGame() {
  document.querySelectorAll(".square").forEach(function (s) {
    s.onclick = null;
    s.oncontextmenu = null;
  });
  gameInProgress = false;

  numRevealedSquares = 0;
  board = [];

  for (var i = 0; i < rows * cols; i++) {
    board.push("");
  }
  populateMines();
  populateNumbers();
  loadBoardHTML();
  document.getElementById("smiley").classList.remove("loss");
  document.getElementById("smiley").classList.remove("win");
  document.getElementById("smiley").classList.add("happy");

  document.querySelectorAll(".board.square").forEach(function (s) {
    s.onclick = handleLeftClick;
    s.oncontextmenu = handleRightClick;
  });
  document.getElementById("smiley").onclick = handleMouseDownSmiley;
}

function loadBoardHTML() {
  var html = "";
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      html += '<button class="board square unrevealed' + board[i * cols + j] + '" ';
      var id = getID(i * cols + j);
      html += 'id="' + id + '"/>';
    }
  }
  document.getElementById("minesweeper").innerHTML = html;
  document.getElementById("smiley").classList.remove("loss");
  document.getElementById("smiley").classList.remove("win");
  document.getElementById("smiley").classList.add("happy");
}

function handleMouseDownSmiley() {
  if (
    document.getElementById("smiley").classList.contains("happy") &&
    !gameInProgress
  ) {
    return;
  }
  // TODO: add CSS to press button when clicked
  loadNewGame();
}

function handleLeftClick(event) {
  // TODO: add CSS to press button when clicked
  // TODO: change smiley class from happy to load and then back to happy on mouseup
  if (!gameInProgress) {
    // first move
    gameInProgress = true;
    // first move reveals a mine
    if (
      event.which != 2 &&
      document.getElementById(this.id).classList.contains("mine")
    ) {
      document.querySelectorAll(".board.square").forEach(function (s) {
        s.onclick = null;
        s.oncontextmenu = null;
      });
      repositionMine(this.id);
      populateNumbers();
      loadBoardHTML();
      document.querySelectorAll(".board.square").forEach(function (s) {
        s.onclick = handleLeftClick;
        s.oncontextmenu = handleRightClick;
      });
    }
  }

  if (document.getElementById(this.id).classList.contains("unrevealed")) {
    revealSquare(this.id);
  }
}

function handleRightClick(event) {
  if (!gameInProgress) {
    // first move
    gameInProgress = true;
  }

  if (document.getElementById(this.id).classList.contains("unrevealed")) {
      document.getElementById(this.id).classList.toggle("flagged");
  }
}

function repositionMine(id) {
  var position = id.slice(3);
  var i = 0;
  while (board[i] == " mine") {
    i++;
  }
  board[i] = " mine";
  board[position] = "";
}

function revealSquare(id) {
  if (document.getElementById(id).classList.contains("flagged")) {
    return;
  }
  document.getElementById(id).classList.remove("unrevealed");
  document.getElementById(id).classList.remove("clicked");
  document.getElementById(id).classList.add("revealed");
  numRevealedSquares += 1;
  if (isEmpty(id)) {
    revealAdjacentSquares(id); // reveal no mines
  }
  if (document.getElementById(id).classList.contains("mine")) {
    document.getElementById(id).classList.add("first");
    endGame("sad");
    return;
  }
  if (numRevealedSquares == rows * cols - numMines) {
    endGame("happy");
    return;
  }
}

function isEmpty(id) {
  var position = id.slice(3);
  if (board[position] == "") {
    return true;
  }
  return false;
}

function getID(position) {
  return "sq-" + position;
}

function revealAdjacentSquares(id) {
  var position = id.slice(3);
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols - 1; y++) {
      if (x * cols + y == position) {
        break;
      }
    }
    if (x * cols + y == position) {
      break;
    }
  }
  var px = x - 1;
  var nx = x + 1;
  var py = y - 1;
  var ny = y + 1;

  if (
    px > -1 &&
    py > -1 &&
    board[px * cols + py] != " mine" &&
    document
      .getElementById(getID(px * cols + py))
      .classList.contains("unrevealed")
  ) {
    revealSquare(getID(px * cols + py));
  }
  if (
    px > -1 &&
    board[px * cols + y] != " mine" &&
    document
      .getElementById(getID(px * cols + y))
      .classList.contains("unrevealed")
  ) {
    revealSquare(getID(px * cols + y));
  }
  if (
    px > -1 &&
    ny < cols &&
    board[px * cols + ny] != " mine" &&
    document
      .getElementById(getID(px * cols + ny))
      .classList.contains("unrevealed")
  ) {
    revealSquare(getID(px * cols + ny));
  }
  if (
    py > -1 &&
    board[x * cols + py] != " mine" &&
    document
      .getElementById(getID(x * cols + py))
      .classList.contains("unrevealed")
  ) {
    revealSquare(getID(x * cols + py));
  }
  if (
    ny < cols &&
    board[x * cols + ny] != " mine" &&
    document
      .getElementById(getID(x * cols + ny))
      .classList.contains("unrevealed")
  ) {
    revealSquare(getID(x * cols + ny));
  }
  if (
    nx < rows &&
    py > -1 &&
    board[nx * cols + py] != " mine" &&
    document
      .getElementById(getID(nx * cols + py))
      .classList.contains("unrevealed")
  ) {
    revealSquare(getID(nx * cols + py));
  }
  if (
    nx < rows &&
    board[nx * cols + y] != " mine" &&
    document
      .getElementById(getID(nx * cols + y))
      .classList.contains("unrevealed")
  ) {
    revealSquare(getID(nx * cols + y));
  }
  if (
    nx < rows &&
    ny < cols &&
    board[nx * cols + ny] != " mine" &&
    document
      .getElementById(getID(nx * cols + ny))
      .classList.contains("unrevealed")
  ) {
    revealSquare(getID(nx * cols + ny));
  }
}

function endGame(smileyStatus) {
  document.querySelectorAll(".board.square").forEach(function (s) {
    s.onclick = null;
    s.oncontextmenu = null;
  });
  if (smileyStatus == "happy") {
    document.getElementById("smiley").classList.remove("happy");
    document.getElementById("smiley").classList.add("win");
  } else {
    document.getElementById("smiley").classList.remove("happy");
    document.getElementById("smiley").classList.add("loss");
    revealAllMines();
  }
  gameInProgress = false;
}

function revealAllMines() {
  for (var i = 0; i < board.length; i++) {
    if (board[i] == " mine") {
      var id = getID(i);
      document.getElementById(id).classList.remove("unrevealed");
      document.getElementById(id).classList.remove("clicked");
      document.getElementById(id).classList.add("revealed");
      if (document.getElementById(id).classList.contains("flagged")) {
        document.getElementById(id).classList.remove("flagged");
        document.getElementById(id).classList.add("crossed");
      }
    }
  }
}

function populateMines() {
  for (var i = 0; i < numMines; i++) {
    var position;
    do {
      position = Math.floor(Math.random() * rows * cols);
    } while (board[position] == " mine");
    board[position] = " mine";
  }
}

function populateNumbers() {
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      var position = x * cols + y;
      if (board[position] != " mine") {
        var surroundingMines = countSurroundingMines(x, y);
        switch (surroundingMines) {
          case 1:
            board[position] = " one";
            break;
          case 2:
            board[position] = " two";
            break;
          case 3:
            board[position] = " three";
            break;
          case 4:
            board[position] = " four";
            break;
          case 5:
            board[position] = " five";
            break;
          case 6:
            board[position] = " six";
            break;
          case 7:
            board[position] = " seven";
            break;
          case 8:
            board[position] = " eight";
            break;
          default:
            board[position] = "";
            break;
        }
      }
    }
  }
}

function countSurroundingMines(x, y) {
  var px = x - 1;
  var nx = x + 1;
  var py = y - 1;
  var ny = y + 1;
  var surrounding = 0;

  if (px > -1 && py > -1 && board[px * cols + py] == " mine") {
    surrounding += 1;
  }
  if (px > -1 && board[px * cols + y] == " mine") {
    surrounding += 1;
  }
  if (px > -1 && ny < cols && board[px * cols + ny] == " mine") {
    surrounding += 1;
  }
  if (py > -1 && board[x * cols + py] == " mine") {
    surrounding += 1;
  }
  if (ny < cols && board[x * cols + ny] == " mine") {
    surrounding += 1;
  }
  if (nx < rows && py > -1 && board[nx * cols + py] == " mine") {
    surrounding += 1;
  }
  if (nx < rows && board[nx * cols + y] == " mine") {
    surrounding += 1;
  }
  if (nx < rows && ny < cols && board[nx * cols + ny] == " mine") {
    surrounding += 1;
  }

  return surrounding;
}
