class Player {
    constructor(board, ID){
        this.board = board;
        this.player = ID;
    }

}
/** 
* @pre none
* @param location of missile destination(where you want the missile to go)
* @post updates the grid of the player who fired it depending on result, displays a blue or red box on the screen where they shot depending on result, alerts the play on the result of a shot
*/
function fire_missile(locations,player)
{
    if(player.board["grid"][locations[0]][locations[1]].filled == true)
    {
        player.board["grid"][locations[0]][locations[1]].hit = true
        drawHitResult(locations[0], locations[1])

	if(gameLogic.gameMode != 2){
		console.log("HIT")
		window.alert("HIT")
	}
	else{
       		console.log("HIT on Player " + player.player + "'s fleet")		//distinguishing between players when mirror mode is turned on, since there will be two shots reported.	
        	window.alert("HIT on Player " + player.player + "'s fleet")
	}

    }
    else if(player.board["grid"][locations[0]][locations[1]].filled == false)
    {
        player.board["grid"][locations[0]][locations[1]].miss = true
        drawMissResult(locations[0], locations[1])
	if(gameLogic.gameMode != 2){
		console.log("MISS")
		window.alert("MISS")
	}
	else{
       		console.log("MISS on Player " + player.player + "'s fleet") 	//distinguishing between players when mirror mode is turned on, since there will be two shots reported.	
        	window.alert("MISS on Player " + player.player + "'s fleet")
	}
        
    }
}

/** 
* @pre none
* @param none
* @post outputs if a player has won the game
*/
function win_check()
{
    if(gameLogic.numShips == 1)
    {
        if(all_player1_ships[0].sunk == true && all_player2_ships[0].sunk == true)  //check for draw corner case
        {
            alert("It's a draw, refresh screen to play again")
        }
        else if(all_player1_ships[0].sunk == true)
        {
            alert("Player 2 wins, refresh screen to play again")
        }
        
        else if(all_player2_ships[0].sunk == true)
        {
            alert("Player 1 wins, refresh screen to play again")
        }
    }
    else if (gameLogic.numShips == 2)
    {
        if((all_player1_ships[0].sunk == true && all_player1_ships[1].sunk == true) && (all_player2_ships[0].sunk == true && all_player2_ships[1].sunk == true))  //check for draw corner case
        {
            alert("It's a draw, refresh screen to play again")
    	}
        else if(all_player1_ships[0].sunk == true && all_player1_ships[1].sunk == true)
        {
            alert("Player 2 wins, refresh screen to play again")
        
        }
        
        else if(all_player2_ships[0].sunk == true && all_player2_ships[1].sunk == true)
        {
            alert("Player 1 wins, refresh screen to play again")
        }
    }
    else if (gameLogic.numShips == 3)
    {
        if((all_player1_ships[0].sunk == true && all_player1_ships[1].sunk == true && all_player1_ships[2].sunk == true) && (all_player2_ships[0].sunk == true && all_player2_ships[1].sunk == true && all_player2_ships[2].sunk == true))  //check for draw corner case
        {
            alert("It's a draw, refresh screen to play again")
    	}
        else if(all_player1_ships[0].sunk == true && all_player1_ships[1].sunk == true && all_player1_ships[2].sunk == true)
        {
            alert("Player 2 wins, refersh screen to play again")
        }
        
        else if(all_player2_ships[0].sunk == true && all_player2_ships[1].sunk == true && all_player2_ships[2].sunk == true)
        {
            alert("Player 1 wins, refresh screen to play again")
        }
    }
    else if (gameLogic.numShips == 4)
    {
        if((all_player1_ships[0].sunk == true && all_player1_ships[1].sunk == true && all_player1_ships[2].sunk == true && all_player1_ships[3].sunk == true) && (all_player2_ships[0].sunk == true && all_player2_ships[1].sunk == true && all_player2_ships[2].sunk == true && all_player2_ships[3].sunk == true))  //check for draw corner case
        {
            alert("It's a draw, refresh screen to play again")
    	}
        else if(all_player1_ships[0].sunk == true && all_player1_ships[1].sunk == true && all_player1_ships[2].sunk == true && all_player1_ships[3].sunk == true)
        {
            alert("Player 2 wins, refersh screen to play again")
        }
        
        else if(all_player2_ships[0].sunk == true && all_player2_ships[1].sunk == true && all_player2_ships[2].sunk == true && all_player2_ships[3].sunk == true)
        {
            alert("Player 1 wins, refresh screen to play again")
        }
    }
    else if (gameLogic.numShips == 5)
    {   
        if((all_player1_ships[0].sunk == true && all_player1_ships[1].sunk == true && all_player1_ships[2].sunk == true && all_player1_ships[3].sunk == true&& all_player1_ships[4].sunk == true) && (all_player2_ships[0].sunk == true && all_player2_ships[1].sunk == true && all_player2_ships[2].sunk == true && all_player2_ships[3].sunk == true && all_player2_ships[4].sunk == true))  //check for draw corner case
        {
            alert("It's a draw, refresh screen to play again")
    	}
        else if(all_player1_ships[0].sunk == true && all_player1_ships[1].sunk == true && all_player1_ships[2].sunk == true && all_player1_ships[3].sunk == true && all_player1_ships[4].sunk == true)
        {
            alert("Player 2 wins, refersh screen to play again")
        }
        
        else if(all_player2_ships[0].sunk == true && all_player2_ships[1].sunk == true && all_player2_ships[2].sunk == true && all_player2_ships[3].sunk == true && all_player2_ships[4].sunk == true)
        {
            alert("Player 1 wins, refresh screen to play again")
        }
    }
    else if (gameLogic.numShips == 6)
    {
        if((all_player1_ships[0].sunk == true && all_player1_ships[1].sunk == true && all_player1_ships[2].sunk == true && all_player1_ships[3].sunk == true&& all_player1_ships[4].sunk == true && all_player1_ships[5].sunk == true) && (all_player2_ships[0].sunk == true && all_player2_ships[1].sunk == true && all_player2_ships[2].sunk == true && all_player2_ships[3].sunk == true && all_player2_ships[4].sunk == true && all_player2_ships[5].sunk == true))  //check for draw corner case
        {
            alert("It's a draw, refresh screen to play again")
    	}
        else if(all_player1_ships[0].sunk == true && all_player1_ships[1].sunk == true && all_player1_ships[2].sunk == true && all_player1_ships[3].sunk == true && all_player1_ships[4].sunk == true && all_player1_ships[5].sunk == true)
        {
            alert("Player 2 wins, refersh screen to play again")
        }
        
        else if(all_player2_ships[0].sunk == true && all_player2_ships[1].sunk == true && all_player2_ships[2].sunk == true && all_player2_ships[3].sunk == true && all_player2_ships[4].sunk == true && all_player2_ships[5].sunk == true)
        {
            alert("Player 1 wins, refresh screen to play again")
        }
    }    
}

let board1 = new GameState();
let board2 = new GameState();
let player1 = new Player(board1, 1);
let player2 = new Player(board2, 2);