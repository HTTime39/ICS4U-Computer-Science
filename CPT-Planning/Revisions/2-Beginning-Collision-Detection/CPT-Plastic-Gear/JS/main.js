/*========== Initialize Position Counters For Snake ==========*/ 
//The origin is the top left corner
let snakeX = 0; //Tracks the x position of snake as an integer
let snakeXString = "0vh"; //Tracks the x position of snake as a string with units appended so it can be read by css
let snakeY = 0; //Tracks the y position of snake as an integer
let snakeYString = "0vh"; //Tracks the y position of snake as a string with units appended so it can be read by

let snake = document.querySelector("#snake"); //Player character
document.addEventListener("keydown", keysDown); //Records keys when pressed
document.addEventListener("keyup", keysUp); //Unrecords keys when unpressed

/*========== Setting Up Collision Detection On Snake ==========*/
//Snake's image. This way the margin that moves Snake across the screen is ignored. Change to detection divs later
let snakeSprite = document.querySelector("#snakeSprite");
//The width of snake on the screen. Later updated in the interval function to be dynamic as viewport resizes
//*CREATE INTERVAL FUNCTION THAT REPEATS LESS OFTEN TO IMPROVE PERFORMANCE LATER*//
let snakeWidth = window.getComputedStyle(snakeSprite).getPropertyValue("width");

/*========== Collision Detection Variables ==========*/
let leftStop = false;
let rightStop = false;
let topStop = false;
let bottomStop = false;

/*========== Setting Up Collision Detection on Walls ==========*/
let wallSpriteV = document.querySelector(".wallVerticalSprite");
let wallWidthV = window.getComputedStyle(wallSpriteV).getPropertyValue("width");
let wallHeightV = window.getComputedStyle(wallSpriteV).getPropertyValue("height");

/*========== Recording and Unrecording Inputs ==========*/
//Array to hold all currently held buttons
let pressedKeys = [];

//Records keys when pressed
function keysDown(e)
{
    pressedKeys[e.keyCode] = true;
}

//Unrecords keys when unpressed
function keysUp(e)
{
    pressedKeys[e.keyCode] = false;
}

/*========== Recursive Main Character Control Function ==========*/
setInterval(gameMain, 30);
function gameMain()
{
    //Moves snake to the right
    if (pressedKeys[68] && snakeX < 107 && rightStop == false)
    {
        snakeX++;
        snakeXString = snakeX + "vh";
        snake.style.marginLeft = snakeXString;
    }
    //moves snake to the left
    if (pressedKeys[65] && snakeX > 0 && leftStop == false)
    {
        snakeX--;
        snakeXString = snakeX + "vh";
        snake.style.marginLeft = snakeXString;
    }
    //moves snake up
    if (pressedKeys[87] && snakeY > 0 && topStop == false)
    {
        snakeY--;
        snakeYString = snakeY + "vh";
        snake.style.marginTop = snakeYString;
    }
    //moves snake down
    if (pressedKeys[83] && snakeY < 88 && bottomStop == false)
    {
        snakeY++;
        snakeYString = snakeY + "vh";
        snake.style.marginTop = snakeYString;
    }

    /*========== Recursive Collision Detection ==========*/
}
/*========== Sub Recursive Function for Low Priority Functions ==========*/
setInterval(gameSub, 1000);
function gameSub()
{
    //Updates the value of Snake's pixel width for when viewport size changes
    //Intended to fix collision detection when viewport changes
    snakeWidth = window.getComputedStyle(snakeSprite).getPropertyValue("width");
    wallWidthV = window.getComputedStyle(wallSpriteV).getPropertyValue("width");
    wallHeightV = window.getComputedStyle(wallSpriteV).getPropertyValue("height");
    //console.log(wallWidthV + " " + wallHeightV);
    console.log(parseFloat(window.getComputedStyle(snake).marginLeft));
    console.log(parseFloat(window.getComputedStyle(snake).marginTop));
}