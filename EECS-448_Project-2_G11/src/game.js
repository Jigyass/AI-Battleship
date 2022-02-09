class GameLogic{
    constructor(){
        this.pickNumShips = true;
        this.pickOpponent = false;
        this.opponent = 0;
        this.pickGameMode = false;
        this.gameMode = 0;
        this.placing = false;
        this.player1Turn = true;
        this.player2Turn = false;
        this.firing = false;
        this.numShips = 1;
        this.startTurn = false;
        this.temp_player = 1;
    }
}
let gameLogic = new GameLogic();
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {  alert("Pick how many ships you'd like to play with!");   }, 300);
})

  /** 
* @pre User starts placing ships
* @param x,y represent click event coordinates for where user clicked
* @post Changes turns before player 1 and player 2 for placing ships.
*/

function endTurnshipplacing(x,y){ //called twice
    if (x>=650 && x<=850 && y >=300 && y <=340 ){
        if (gameLogic.player1Turn == false && gameLogic.player2Turn==false && gameLogic.placing==true){
            gameLogic.player2Turn = true;
            gameLogic.player1Turn = false;
            drawStartTurnButton();
 
        }
        else if(gameLogic.player1Turn==false && gameLogic.player2Turn==true && gameLogic.placing==true)
        {
            drawTemplate();
            shiplength=1;
            if (gameLogic.opponent == 1){
                alert("Place your length 1 ship on the left green grid");
            }
            else {
                placeAIShips();
                boardfreezestate = 1;
                gameLogic.player1Turn = true;
                gameLogic.player2Turn = false;
                gameLogic.placing = false;
                drawDoneTurnButton();
            }
        }
 
        
    }
    
}
let endshipplacing_helper=0;//variable that equals 1 to indicate shipplacing has ended
 /** 
* @pre User finishes placing ships 
* @param x,y represent click event coordinates for where user clicked
* @post Changes state of program from ship placing to firing and missing
*/

function transition(x,y){
    if (x>=650 && x<=850 && y >=300 && y <=340 && gameLogic.placing==false && gameLogic.firing==false)
    {
 
        if(gameLogic.player1Turn == true && gameLogic.player2Turn==false && endshipplacing_helper==0)
        {
            drawStartTurnButton();
            endshipplacing_helper=1;
 
        }
        else if(gameLogic.player1Turn == true && gameLogic.player2Turn==false && endshipplacing_helper==1)
        {
            boardfreezestate=0;
            gameLogic.firing=true;
        }
 
    }
}



 
/** 
* @pre User starts firing and missing 
* @param x,y represent click event coordinates for where user clicked
* @post Changes turns before player 1 and player 2 for firing and missing
*/


function endTurngame(x,y, temp_player)
{
    if (x>=650 && x<=850 && y >=300 && y <=340 && gameLogic.placing==false && gameLogic.firing==true)
    {
        if (gameLogic.temp_player == 1 && gameLogic.startTurn == true){
            gameLogic.player1Turn=false;
            if(gameLogic.opponent == 1){
                gameLogic.player2Turn=true;
                boardfreezestate = 0;
            }
            else {
                AIFireShot();
            }
        }
        else if(gameLogic.temp_player == 2 && gameLogic.startTurn == true){
            gameLogic.player1Turn=true;
            gameLogic.player2Turn=false;
            boardfreezestate = 0;
        }
        drawStartTurnButton();
        gameLogic.startTurn = true;
    }

}

