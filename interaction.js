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
            play([ttt[0][0], ttt[0][1], ttt[0][2],
                  ttt[1][0], ttt[1][1], ttt[1][2],
                  ttt[2][0], ttt[2][1], ttt[2][2]]);
            myTurn++;
            endTurn("⭕");
        }
    }
}

function endTurn(player)
{
    checkResult(player);
    currentTurn++;
}

function checkResult(char)
{
    if( ( (ttt[0][0]==char) && (ttt[0][1]==char) && (ttt[0][2]==char) ) ||
		( (ttt[1][0]==char) && (ttt[1][1]==char) && (ttt[1][2]==char) ) ||
		( (ttt[2][0]==char) && (ttt[2][1]==char) && (ttt[2][2]==char) ) ||
		( (ttt[0][0]==char) && (ttt[1][0]==char) && (ttt[2][0]==char) ) ||
		( (ttt[0][1]==char) && (ttt[1][1]==char) && (ttt[2][1]==char) ) ||
		( (ttt[0][2]==char) && (ttt[1][2]==char) && (ttt[2][2]==char) ) ||
		( (ttt[0][0]==char) && (ttt[1][1]==char) && (ttt[2][2]==char) ) ||
        ( (ttt[0][2]==char) && (ttt[1][1]==char) && (ttt[2][0]==char) ) )
    {
        var ultimato = document.getElementById("endgame");
        ultimato.hidden = false;
        ultimato.innerText =  "Fim de Jogo! "+char+" venceu.\nClique aqui para reiniciar.";

    }
}