var alpha;
var asPlayer = '⭕';
var asAI = '❌';

class Node {
    constructor(state){
        this.board = state;
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

    isThisWin(player) {
        if (
            (this.board[0] == player && this.board[1] == player && this.board[2] == player) ||
            (this.board[3] == player && this.board[4] == player && this.board[5] == player) ||
            (this.board[6] == player && this.board[7] == player && this.board[8] == player) ||
            (this.board[0] == player && this.board[3] == player && this.board[6] == player) ||
            (this.board[1] == player && this.board[4] == player && this.board[7] == player) ||
            (this.board[2] == player && this.board[5] == player && this.board[8] == player) ||
            (this.board[0] == player && this.board[4] == player && this.board[8] == player) ||
            (this.board[2] == player && this.board[4] == player && this.board[6] == player)
            ) {
            return true;
        } else {
            return false;
        }
    }
}

function play(currentState) {

    var node = new Node(currentState);
    
    var avaibleMoves = node.emptyIndexies();
    var bestMove = -1;
    var bestScore = -1;

    for (i = 0; i < avaibleMoves.length; i++){
        node.board[avaibleMoves[i]] = asAI

        var score = minimax(node, 1000, true);

        if (score > bestScore) {
            bestScore = score;
            bestMove = avaibleMoves[i];
        }
    }

    console.log(bestScore);
    return bestMove;
}

function minimax(node, maxAI){

    if (node.isTerminal) {
        if (node.isThisWin(asAI))
            return 1;
        else if (node.isThisWin(asPlayer))
            return -1;
        else 
            return  0;
    }

    if (maxAI){
        var max = Number.NEGATIVE_INFINITY;
        var avaibleSpots = node.emptyIndexies();

        for (i = 0; i < avaibleSpots.length; i++){
            var newNode = new node(node.board);
            newNode.board[avaibleSpots[i]] = asAI;
            
            max = Math.max(max, minimax(newNode, !maxAI));

            newNode.board[avaibleSpots[i]] = '';
        }

        return max;
    }
    else {
        var min = Number.POSITIVE_INFINITY;
        var avaibleSpots = node.emptyIndexies();

        for (i = 0; i < avaibleSpots.length; i++){
            var newNode = new node(node.board);
            newNode.board[avaibleSpots[i]] = asPlayer;
            
            min = Math.min(max, minimax(newNode, !maxAI));

            newNode.board[avaibleSpots[i]] = '';
        }

        return min;
    }
}