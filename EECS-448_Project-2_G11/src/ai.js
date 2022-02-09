let genFront = [];
let genTail = [];
let genFrontX;
let genFrontY;
let genTailX;
let genTailY;
let genOrientation;
let genCoordinates = [];

/** 
* @pre none
* @param shipLength, the length of the ship that will have random coordinates generated for it.
* @post returns a size 2 array containing a pair of size 2 arrays. The first contains the x and y coordinates for the front of the ship, the second the x and y coordinates for the tail.
*/
function getRandomCoordinates(shipLength){
    genFrontX = Math.floor(Math.random()*(10)); //ranges between 0 and 9
    genFrontY = Math.floor(Math.random()*(9)); //ranges between 0 and 8
    genOrientation = Math.floor(Math.random()*2);  //ranges between 0 and 1 
    if(genOrientation == 0){ //0 is vertical, 1 is horizontal
        genTailX = genFrontX;
        if(genFrontY + (shipLength - 1) >= 8){
            genTailY = genFrontY - (shipLength - 1);    
        }
        else {
            genTailY = genFrontY + (shipLength - 1);
        }
    }
    else {
        if(genFrontX + (shipLength - 1) >= 9){
            genTailX = genFrontX - (shipLength - 1);    
        }
        else {
            genTailX = genFrontX + (shipLength - 1);
        }
        genTailY = genFrontY;
    }
    genFront.push(genFrontX);
    genFront.push(genFrontY);
    genTail.push(genTailX);
    genTail.push(genTailY);
    return([genFront, genTail]);
}

/** 
* @pre an AI needs to have been selected as the opponent.
* @param none
* @post places ships randomly for player 2 (representing the AI).
*/
function placeAIShips(){
    for(let i = 1; i <= gameLogic.numShips; i++){
        let shipplaced = false;
        while(shipplaced == false){
            genCoordinates = getRandomCoordinates(i);
            try
            {
                console.log(genCoordinates)
                place_ship(genCoordinates[0], genCoordinates[1], player2)
                let ship = new Ship(get_all_ship_cells(genCoordinates[0], genCoordinates[1]))
                all_player2_ships.push(ship)
                number_of_plyr2_placed_ships += 1
                shipplaced = true
                  
            } 
            catch(error)
            {
                console.log(error)
                shipplaced = false
            }
            genCoordinates.pop();
            genFront.pop();
            genTail.pop();
            genCoordinates.pop();
            genFront.pop();
            genTail.pop();
        }
    }
}


let genX;
let genY;
let genShot = [];

/** 
* @pre none
* @param none
* @post returns a size 2 array containing a randomly generated y coordinate and x coordinate. For use by Easy AI.
*/
function easyShot(){
    genX = Math.floor(Math.random()*(10))
    genY = Math.floor(Math.random()*(9))
    return([genY, genX]);
}


let rememberShot = easyShot(); //[y, x] of last hit cell
let rememberHit = false; //Whether or not we are looking around a hit cell
/** 
* @pre none
* @param none
* @post returns a size 2 array containing a randomly generated y coordinate and x coordinate, except in the case when a ship has been hit, in which case it returns adjacent coordinates. For use by Medium AI. 
*/

function mediumShot(){ //trying with 0,0 at the bottom left
    let shot = easyShot();

    if (rememberHit == true) {
        for (let i = 0; i < 5; i++) {
            shot = rememberShot;
            if (i == 0) { //looks up
                shot[0]--;
            }
            else if (i == 1) { //looks right
                shot[1]++;
            }
            else if (i == 2) { //looks down
                shot[0]++;
            }
            else if (i == 3) { //looks left
                shot[1]--;
            }
            else {              //Determines that no adjacent cells are valid options
                rememberHit = false;
                shot = easyShot();
                return shot;
            }

            let shotInBounds = ((shot[0] >= 0 && shot[0] <= 8) && (shot[1] >= 0 && shot[1] <= 9));
            let shotNotAlreadyHit = !player1.board["grid"][shot[0]][shot[1]].hit
            let shotNotAlreadyMissed = !player1.board["grid"][shot[0]][shot[1]].miss
            let shotFilled = player1.board["grid"][shot[0]][shot[1]].filled

            if (shotInBounds && shotNotAlreadyHit && shotNotAlreadyMissed) {
                if (shotFilled) {
                    rememberShot = shot;
                }
                return shot;
            }
        }
    }
    else {
        let shotFilled = player1.board["grid"][shot[0]][shot[1]].filled
        let shotNotAlreadyHit = !player1.board["grid"][shot[0]][shot[1]].hit
        let shotNotAlreadyMissed = !player1.board["grid"][shot[0]][shot[1]].miss

        if (shotFilled && shotNotAlreadyHit && shotNotAlreadyMissed) {
            rememberShot = shot;
            rememberHit = true;
        }

        return shot;
    }
    
}

/** 
* @pre none
* @param none
* @post returns a size 2 array containing a y and x coordinate where a filled cell that hasn't been hit is located. For use by Hard AI.
*/
function hardShot(){
    let cheatShot = get_ship_cells(player1); //Locations of all filled cells
    
    while (player1.board["grid"][cheatShot[0][0]][cheatShot[0][1]].hit == true) { //filters out cells that have been hit
        cheatShot.splice(0,1);
    }

    return cheatShot[0];
}

/** 
* @pre none
* @param none
* @post calls a different coordinate-generating function depending on the difficulty of the AI opponent, then fires a shot at the coordinates and makes the appropriate checks associated with firing.
*/
function AIFireShot(){
    if(gameLogic.opponent == 2){
        genShot = easyShot();
    }
    else if(gameLogic.opponent == 3){
        genShot = mediumShot();
    }
    else {
        genShot = hardShot();
    }
    gameLogic.temp_player = 2;
    fire_missile(genShot, player1)
    if (gameLogic.gameMode == 2){   		//mirror functionality - a shot on player 2 is mirrored on player 1's board.
        fire_missile(genShot, player2);
    }
    sink_ships(player2)  //sinking both players' ships (regardless of mode, no ship will change to sunk status when this is called if it has not been hit)
    sink_ships(player1)
    win_check()
    gameLogic.player2Turn = false;
}

