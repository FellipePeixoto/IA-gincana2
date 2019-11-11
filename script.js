var alpha;
var asPlayer = '⭕';
var asAI = '❌';

class Node {
    constructor(state){
        this.board = state;
        this.child = [];
        this.value = 0;
    }

    isTerminal() {
        for (var i = 0; i < 9; i++) {
            if (this.board[i] == '')
                return false;
        }
        return true;
    }

    emptyIndexies() {
        var indexies = [];
        for (var i = 0; i < this.board.length; i++){
            if (this.board[i] == '')
                indexies.push(i);
        }
        return indexies;
    }
}

function play(currentState) {
    console.log(currentState);
    var node = new Node(currentState);
    var value = minimax(node, asAI);
    console.log(value);
    return value;
}

function itsWin(boardState, player) {
    if (
        (boardState[0] == player && boardState[1] == player && boardState[2] == player) ||
        (boardState[3] == player && boardState[4] == player && boardState[5] == player) ||
        (boardState[6] == player && boardState[7] == player && boardState[8] == player) ||
        (boardState[0] == player && boardState[3] == player && boardState[6] == player) ||
        (boardState[1] == player && boardState[4] == player && boardState[7] == player) ||
        (boardState[2] == player && boardState[5] == player && boardState[8] == player) ||
        (boardState[0] == player && boardState[4] == player && boardState[8] == player) ||
        (boardState[2] == player && boardState[4] == player && boardState[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}

function minimax(node, player){

    var avaibleSpots = node.emptyIndexies();

    if (node.isTerminal()) {

        if (itsWin(node.board, asPlayer)) {
            return {score: -1};
        }
        else if (itsWin(node.board, asAI)) {
            return {score: 1};
        }
        else if (avaibleSpots.length === 0) {
            return {score: 0};
        }

    }

    if (itsWin(node.board, asPlayer)) {
        return {score: -1};
    }
    else if (itsWin(node.board, asAI)) {
        return {score: 1};
    }
    else if (avaibleSpots.length === 0) {
        return {score: 0};
    }

    var moves = [];

    for (i = 0; i < avaibleSpots.length; i++) {

        var move = {};
        move.index = avaibleSpots[i];
        node.board[avaibleSpots[i]] = player;

        if (player == asAI){
            var result = minimax(node, asPlayer);
            move.score = result.score;
        }
        else {
            var result = minimax(node, asAI);
            move.score = result.score;
        }

        node.board[avaibleSpots[i]] = '';
        moves.push(move);
    }

    var bestMove;

    if (player == asAI) {
        var bestScore = Number.NEGATIVE_INFINITY;
        for (i = 0; i < moves.length; i++){
            if (moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else if (player == asPlayer) {
        var bestScore = Number.POSITIVE_INFINITY;
        for (i = 0; i < moves.length; i++){
            if (moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}