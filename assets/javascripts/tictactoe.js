var oPlayer = "O";
// ai
var xPlayer = "X";

// random spot when start games
function randomPickSpot(origBoard){
  return Math.floor((Math.random() * origBoard.length))
}

// check empty board
function isEmptyBoard(originBoard, currentBoard){
  return originBoard.equals(currentBoard);
}

function againstPlayer(player){
  if (player == xPlayer){
    return oPlayer;
  }else{
    return xPlayer;
  }
}

function isEndGame(currentBoard, player){
  var availableSpots = emptyIndexies(currentBoard);
  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(currentBoard, againstPlayer(player))){
     return true;
  }
	else if (winning(currentBoard, player)){
    return true;
	}
  else if (availableSpots.length === 0){
  	return true;
  }
  return false;
}

function resetBoard(){
  return [ 0, 1, 2, 3, 4, 5, 6 , 7, 8];
}

// the main minimax function
function minimax(board, player){
  //available spots
  var available = emptyIndexies(board);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(board, oPlayer)){
     return {score:-10};
  }
	else if (winning(board, xPlayer)){
    return {score:10};
	}
  else if (available.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < available.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = board[available[i]];

    // set the empty spot to the current player
    board[available[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == xPlayer){
      var result = minimax(board, oPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(board, xPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    board[available[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === xPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

// returns the available spots on the board
function emptyIndexies(board){
  return  board.filter(s => s != "O" && s != "X");
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
function winning(board, player){
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}
