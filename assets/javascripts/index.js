$(document).ready(function(){
  var currentBoard = [0, 1, 2, 3, 4, 5, 6 , 7, 8];

  var oPlayer = "O";
  var xPlayer = "X";

  var currentPlayer = xPlayer;
  var gameEnd = false;

  playGame(currentBoard);

  $("#replay").click(function(){
    gameEnd = false;
    currentPlayer = xPlayer;

    currentBoard = resetBoard();
    console.log(currentBoard);
    playGame(currentBoard);
  });

  function playGame(board){
    var originBoard = [0, 1, 2, 3, 4, 5, 6 , 7, 8];
    do {
      if(isEmptyBoard(originBoard, board)){
        var randomPosition = randomPickSpot(board);
        currentBoard[randomPosition] = currentPlayer;
        drawPlayer(randomPosition, currentPlayer);
      }

      currentPlayer = againstPlayer(currentPlayer);
      var bestSpot = minimax(board, currentPlayer);
      currentBoard[bestSpot.index] = currentPlayer;
      drawPlayer(bestSpot.index, currentPlayer);
      gameEnd = isEndGame(board, currentPlayer);

    } while (!gameEnd);
  }

  function drawPlayer(position, player){
      $(".square[ref="+ position + "]").text(player);
  }

});
