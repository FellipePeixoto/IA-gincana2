var asPlayer = '⭕';
var asAI = '❌';
var ttt = [
    ['', '',''],
    ['', '',''],
    ['', '','']
  ];
var currentTurn=0;
var myTurn=0;

function select(c, l)
{
    if( ttt[c][l] == ''){
        if((currentTurn-myTurn) %2 == 0 ) 
        {
            document.getElementById(c+''+l).innerText =  ttt[c][l] = "⭕";
            var issoai = play([ttt[0][0], ttt[0][1], ttt[0][2],
                  ttt[1][0], ttt[1][1], ttt[1][2],
                  ttt[2][0], ttt[2][1], ttt[2][2]]);

            if (issoai >= 0) {
                var i = parseInt(issoai / 3);
                var j = issoai % 3;
                document.getElementById(i+''+j).innerText = ttt[i][j] = "❌";
            }
            else { 
                var avaible = [];
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (ttt[i][j] == '')
                            avaible.push({linha : i, coluna : j});
                    }
                }

                var sort = avaible[parseInt(Math.random() * (avaible.length))];
                if (sort != null)
                    document.getElementById(sort.linha+''+sort.coluna).innerText = ttt[sort.linha][sort.coluna] = "❌";
            }

            myTurn++;
            endTurn();
        }
    }
}

function endTurn()
{
    checkResult();
    currentTurn++;
}

function checkResult()
{
    if( ( (ttt[0][0]==asPlayer) && (ttt[0][1]==asPlayer) && (ttt[0][2]==asPlayer) ) ||
		( (ttt[1][0]==asPlayer) && (ttt[1][1]==asPlayer) && (ttt[1][2]==asPlayer) ) ||
		( (ttt[2][0]==asPlayer) && (ttt[2][1]==asPlayer) && (ttt[2][2]==asPlayer) ) ||
		( (ttt[0][0]==asPlayer) && (ttt[1][0]==asPlayer) && (ttt[2][0]==asPlayer) ) ||
		( (ttt[0][1]==asPlayer) && (ttt[1][1]==asPlayer) && (ttt[2][1]==asPlayer) ) ||
		( (ttt[0][2]==asPlayer) && (ttt[1][2]==asPlayer) && (ttt[2][2]==asPlayer) ) ||
		( (ttt[0][0]==asPlayer) && (ttt[1][1]==asPlayer) && (ttt[2][2]==asPlayer) ) ||
        ( (ttt[0][2]==asPlayer) && (ttt[1][1]==asPlayer) && (ttt[2][0]==asPlayer) ) )
    {
        var ultimato = document.getElementById("endgame");
        ultimato.hidden = false;
        ultimato.innerText =  "Fim de Jogo! ⭕ venceu.\nClique aqui para reiniciar.";
    }
    else if( 
    ( (ttt[0][0]==asAI) && (ttt[0][1]==asAI) && (ttt[0][2]==asAI) ) ||
    ( (ttt[1][0]==asAI) && (ttt[1][1]==asAI) && (ttt[1][2]==asAI) ) ||
    ( (ttt[2][0]==asAI) && (ttt[2][1]==asAI) && (ttt[2][2]==asAI) ) ||
    ( (ttt[0][0]==asAI) && (ttt[1][0]==asAI) && (ttt[2][0]==asAI) ) ||
    ( (ttt[0][1]==asAI) && (ttt[1][1]==asAI) && (ttt[2][1]==asAI) ) ||
    ( (ttt[0][2]==asAI) && (ttt[1][2]==asAI) && (ttt[2][2]==asAI) ) ||
    ( (ttt[0][0]==asAI) && (ttt[1][1]==asAI) && (ttt[2][2]==asAI) ) ||
    ( (ttt[0][2]==asAI) && (ttt[1][1]==asAI) && (ttt[2][0]==asAI) ) )
{
    var ultimato = document.getElementById("endgame");
    ultimato.hidden = false;
    ultimato.innerText =  "Fim de Jogo! ❌ venceu.\nClique aqui para reiniciar.";
}
}