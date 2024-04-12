var gameInProgress = false;
var board = [];
var rows = 9,
  cols = 9,
  numMines = 10;
var numRevealedSquares = 0;
var clock;
var countdown;
var currSeconds = 0;
// var validClick = true;
//var mousedownid;
//var timeout;

function loadNewGame() {
  $("#game").on("mousedown", function () {
    return false;
  });
  gameInProgress = false;

  clearInterval(clock);
  currSeconds = -1;
  updateTimer();

  countdown = numMines;
  updateCountdown();
  numRevealedSquares = 0;
  board = [];

  for (var i = 0; i < rows * cols; i++) {
    board.push("");
  }
  populateMines();
  populateNumbers();
  loadBoardHTML();
  $(".board.square").on("mousedown", handleMouseDown);

  document.getElementById("smiley").classList.remove("loss");
  document.getElementById("smiley").classList.remove("win");
  document.getElementById("smiley").classList.add("happy");
  $("#smiley").on("mousedown", handleMouseDownSmiley);
}

function loadBoardHTML() {
  var html = "";
  for (var i = 0; i < rows; i++) {
    html += "<tr> ";
    for (var j = 0; j < cols; j++) {
      html += '<td class="board square unrevealed' + board[i * cols + j] + '" ';
      var id = getID(i * cols + j);
      html += 'id="' + id + '"/>';
    }
    html += "</tr>";
  }
  document.getElementById("minesweeper").innerHTML = html;
  document.getElementById("smiley").classList.remove("loss");
  document.getElementById("smiley").classList.remove("win");
  document.getElementById("smiley").classList.add("happy");
}

function handleMouseDownSmiley(event) {
  if (document.getElementById("smiley").classList.contains("happy") && !gameInProgress) {
    return;
  }
  // TODO: add CSS to press button when clicked
  loadNewGame();
}

function handleMouseDown(event) {
  // TODO: add CSS to press button when clicked
  // TODO: change smiley class from happy to load and then back to happy on mouseup
  if (!gameInProgress) {
    // first move
    gameInProgress = true;
    startTimer();
    // first move reveals a mine
    if (event.which != 2 && document.getElementById(this.id).classList.contains("mine")) {
      $(".board.square").on("mousedown", function () {
        return false;
      });
      repositionMine(this.id);
      populateNumbers();
      loadBoardHTML();
      $(".board.square").on("mousedown", handleMouseDown);
    }
  }

  if (document.getElementById(this.id).classList.contains("unrevealed")) {
    if (event.which == 3) {
      if (document.getElementById(this.id).classList.contains("flagged")) {
        document.getElementById(this.id).classList.remove("flagged");
        countdown += 1;
      } else {
        document.getElementById(this.id).classList.add("flagged");
        countdown -= 1;
      }
      updateCountdown();
    } else {
      revealSquare(this.id);
    }
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

function clickSquare(id) {
  document.getElementById(id).classList.remove("unrevealed");
  document.getElementById(id).classList.remove("revealed");
  document.getElementById(id).classList.add("clicked");
}

function unclickSquare(id) {
  document.getElementById(id).classList.remove("clicked");
  document.getElementById(id).classList.add("unrevealed");
  $("#" + id).off("mouseup");
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
    document.getElementById(getID(px * cols + py)).classList.contains("unrevealed")
  ) {
    revealSquare(getID(px * cols + py));
  }
  if (
    px > -1 &&
    board[px * cols + y] != " mine" &&
    document.getElementById(getID(px * cols + y)).classList.contains("unrevealed")
  ) {
    revealSquare(getID(px * cols + y));
  }
  if (
    px > -1 &&
    ny < cols &&
    board[px * cols + ny] != " mine" &&
    document.getElementById(getID(px * cols + ny)).classList.contains("unrevealed")
  ) {
    revealSquare(getID(px * cols + ny));
  }
  if (
    py > -1 &&
    board[x * cols + py] != " mine" &&
    document.getElementById(getID(x * cols + py)).classList.contains("unrevealed")
  ) {
    revealSquare(getID(x * cols + py));
  }
  if (
    ny < cols &&
    board[x * cols + ny] != " mine" &&
    document.getElementById(getID(x * cols + ny)).classList.contains("unrevealed")
  ) {
    revealSquare(getID(x * cols + ny));
  }
  if (
    nx < rows &&
    py > -1 &&
    board[nx * cols + py] != " mine" &&
    document.getElementById(getID(nx * cols + py)).classList.contains("unrevealed")
  ) {
    revealSquare(getID(nx * cols + py));
  }
  if (
    nx < rows &&
    board[nx * cols + y] != " mine" &&
    document.getElementById(getID(nx * cols + y)).classList.contains("unrevealed")
  ) {
    revealSquare(getID(nx * cols + y));
  }
  if (
    nx < rows &&
    ny < cols &&
    board[nx * cols + ny] != " mine" &&
    document.getElementById(getID(nx * cols + ny)).classList.contains("unrevealed")
  ) {
    revealSquare(getID(nx * cols + ny));
  }
}

function endGame(smileyStatus) {
  $(".board.square").off("mousedown");
  clearInterval(clock);
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
        document.getElementById(id).classListadd("crossed");
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

function startTimer() {
  currSeconds = 0;
  document.getElementById("crudeClock").innerHTML = ++currSeconds;
  clock = setInterval(updateTimer, 1000);
}

function updateTimer() {
  var string = currSeconds.toString().split("").reverse().join("");
  document.getElementById("crudeClock").innerHTML = ++currSeconds;
}

function updateCountdown() {
  document.getElementById("crudeCountdown").innerHTML = countdown;
}
