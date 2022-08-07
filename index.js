// TicTacToe Example
/**
 * Generic board game types
 * @type Player: json object, in the format of
 * {
 *  id: string, unique player id
 *  username: string, the player's display name
 * }
 * @type BoardGame: json object, in the format of
 * {
 *  // creator read write fields
 *  state: json object, which represents any board game state
 *  joinable: boolean (default=true), whether or not the room can have new players added to it
 *  finished: boolean (default=false), when true there will be no new board game state changes
 *
 *  // creator read only
 *  players: [Player], array of player objects
 *  version: Number, an integer value that increases by 1 with each state change
 * }
 * @type BoardGameResult: json object, in the format of
 * {
 *  // fields that creator wants to overwrite
 *  state?: json object, which represents any board game state
 *  joinable?: boolean, whether or not the room can have new players added to it
 *  finished?: boolean, when true there will be no new board game state changes
 * }
 */

/**
 *  [row][col]
 * [0] [
[0]   [
[0]     'red', 'red',
[0]     'red', 'red',
[0]     'red', 'red',
[0]     null
[0]   ],
[0]   [
[0]     null, null,
[0]     null, null,
[0]     null, null,
[0]     null
[0]   ],
[0]   [
[0]     null, null,
[0]     null, null,
[0]     null, null,
[0]     null
[0]   ],
[0]   [
[0]     null, null,
[0]     null, null,
[0]     null, null,
[0]     null
[0]   ],
[0]   [
[0]     null, null,
[0]     null, null,
[0]     null, null,
[0]     null
[0]   ],
[0]   [
[0]     null, null,
[0]     null, null,
[0]     null, null,
[0]     null
[0]   ]
[0] ]
 */

/**
 * onRoomStart
 * @returns {BoardGameResult}
 */
function onRoomStart() {
  console.log("onRoomStart")
  return {
    state: {
      board: Array(6).fill().map(()=>Array(7).fill(null)), // thanks mr. stackoverflow
      winner: null
    }
  };
}

/**
 * onPlayerJoin
 * @param {Player} player, represents the player that is attempting to join this game
 * @param {BoardGame} boardGame
 * @returns {BoardGameResult}
 */
function onPlayerJoin(player, boardGame) {
  console.log("onPlayerJoin", player, boardGame)
  const { players } = boardGame; // why 

  if(players.length == 2) {
    return { joinable: false};
  }
  return {}; // am i returning nothing
}

function getPlayerColor(player, players) {
  if (player.id === players[0].id) {
    return "red"
  }
  return "blue"
}

/**
 * getYFromX
 * @param {*} board 
 * @param {*} x 
 * @returns -1 if no possible y value (e.g. the column is filled), 
 * returns the proper y value for when placing a chip
 */
function getRowNumFromCol(board, colNum) {
  for(let rowNum = 5; rowNum >= 0; rowNum--){
    if(board[rowNum][colNum] === null) {
      return rowNum
    }
  }
  return -1
}

function isEndGame(board, players) {
  return [null, null]
}

/**
 * onPlayerMove
 * @param {Player} player, the player that is attempting to make a move
 * @param {*} move json object, controlled the creator that represents the player's move
 * @param {BoardGame} boardGame
 * @returns {BoardGameResult}
 */
function onPlayerMove(player, move, boardGame) {
  console.log("onPlayerMove", player, move, boardGame);
  // if (boardGame.players.length !== 2) {
  //   throw new Error("Game not in progress");
  // }

  const { state, players } = boardGame
  const { board, playerToMoveIndex } = state;

  const { colNum } = move;
  const rowNum = getRowNumFromCol(board, colNum);
  console.log("MOVE", rowNum, colNum)
  if (rowNum === -1) {
    throw new Error("Player cannot mover here");
  }

  const playerColor = getPlayerColor(player, players);
  board[rowNum][colNum] = playerColor;
  console.log(board)
  // const [isEnd, winner] = isEndGame(board, players);

  // if (isEnd) {
  //   state.winner = winner;
  //   return { state, finished: true};
  // }
  return { state };
}

/**
 * onPlayerQuit
 * @param {Player} player, the player that is attempting to quit the game
 * @param {BoardGame} boardGame
 * @returns {BoardGameResult}
 */
function onPlayerQuit(player, boardGame) {
  console.log("onPlayerQuit", player, boardGame);

  if(players.length === 1) {
    const [winner] = players;
    state.winner = winner;
    return { state, joinable: false, finished: true };
  }
  return { joinable: false, finished: true };
}

module.exports = {
  onRoomStart,
  onPlayerJoin,
  onPlayerMove,
  onPlayerQuit,
};
