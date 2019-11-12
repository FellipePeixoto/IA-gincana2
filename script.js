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
        //console.log(this.board);
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
    var bestMoveValue = -1;
    var played = -1;
    var avaibleSpots = node.emptyIndexies();
    
    avaibleSpots.forEach(element => {
        node.board[element] = asPlayer
        var moveValue = minimax(node, 0, false);
        node.board[element] = '';

        if (moveValue > bestMoveValue){
            bestMoveValue = moveValue;
            played = element;
        }
    });

    console.log(played);
    return played;
}

function minimax(node, depth, maxPlayer){

    if (node.isThisWin(asAI)) {
        return 1 - depth;
    }
    
    if (node.isThisWin(asPlayer)){
        return -1 + depth;
    }
    
    if (node.isTerminal())
    {
        return 0;
    }

    if (maxPlayer){
        var minValue = Number.NEGATIVE_INFINITY;

        var avaibleSpots = node.emptyIndexies();

        avaibleSpots.forEach(element => {
            node.board[element] = asPlayer;
            minValue = Math.max(minValue, minimax(node, depth + 1, false));
            node.board[element] = '';
        });

        return minValue;
    }
    else {
        var maxValue = Number.POSITIVE_INFINITY;

        var avaibleSpots = node.emptyIndexies();

        avaibleSpots.forEach(element => {
            node.board[element] = asAI;
            maxValue = Math.min(maxValue, minimax(node, depth + 1, true));
            node.board[element] = '';
        });

        return maxValue;
    }
}