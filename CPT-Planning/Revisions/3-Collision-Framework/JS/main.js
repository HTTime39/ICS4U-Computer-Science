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
let snakeWidth = 5; //The width of Snake's sprite in viewport units. To be used in collision detection calculations.
let snakeHeight = 10; //The height of Snake's sprite in viewport units. It is actuall slightly less than a 1:2 ratio so this might need to be changed later.

/*========== Collision Detection Variables ==========*/
//Will be changed in the recursive collision detection function when Snake is against a wall
let leftStop = false;
let rightStop = false;
let topStop = false;
let bottomStop = false;

/*========== Setting Up Collision Detection on Walls ==========*/
let wallSpriteV = document.querySelector(".wallVerticalSprite"); //Can probably be deleted later

//The dimensions to be used in collision detection for horizontal wall segments (vh)
let wallWidthV = 5;
let wallHeightV = 25;
//The dimensions to be used in collision detection for horizontal wall segments (vh)
let wallWidthH = 25;
let wallHeightH = 5;

let wallTest = document.querySelector("#wallTest");

/*========== Test Wall Positions TEMP==========*/
let wall1X = 20;
let wall1Y = 20;

let wall2X = 60;
let wall2Y = 60;

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
    if ((pressedKeys[68] || pressedKeys[39]) && snakeX < 107 && rightStop == false)
    {
        snakeX++;
        snakeXString = snakeX + "vh";
        snake.style.marginLeft = snakeXString;
    }
    //moves snake to the left
    if ((pressedKeys[65] || pressedKeys[37]) && snakeX > 0 && leftStop == false)
    {
        snakeX--;
        snakeXString = snakeX + "vh";
        snake.style.marginLeft = snakeXString;
    }
    //moves snake up
    if ((pressedKeys[87] || pressedKeys[38]) && snakeY > 0 && topStop == false)
    {
        snakeY--;
        snakeYString = snakeY + "vh";
        snake.style.marginTop = snakeYString;
    }
    //moves snake down
    if ((pressedKeys[83] || pressedKeys[40]) && snakeY < 88 && bottomStop == false)
    {
        snakeY++;
        snakeYString = snakeY + "vh";
        snake.style.marginTop = snakeYString;
    }
}

/*========== Recursive Collision Detection ==========*/
setInterval(gameCollision, 30);
function gameCollision()
{
    //Snake hits the left side of a wall
    //VERTICAL
    if (snakeX + snakeWidth >= wall1X && snakeX <= wall1X)
    {
        if (snakeY + snakeHeight >= wall1Y && snakeY <= wall1Y + wallHeightV)
        {
            rightStop = true;
        }
        else
        {
            rightStop = false;
        }
    }
    //HORIZONTAL
    else if (snakeX + snakeWidth >= wall2X && snakeX <= wall2X)
    {
        if (snakeY + snakeHeight >= wall2Y && snakeY <= wall2Y + wallHeightH)
        {
            rightStop = true;
        }
        else
        {
            rightStop = false;
        }
    }
    else
    {
        rightStop = false;
    }

    //Snake hits the right side of a wall
    //VERTICAL
    if (snakeX <= wall1X + wallWidthV && snakeX >= wall1X)
    {
        if (snakeY + snakeHeight >= wall1Y && snakeY <= wall1Y + wallHeightV)
        {
            leftStop = true;
        }
        else
        {
            leftStop = false;
        }
    }
    //HORIZONTAL
    else if (snakeX <= wall2X + wallWidthH && snakeX >= wall2X)
    {
        if (snakeY + snakeHeight >= wall2Y && snakeY <= wall2Y + wallHeightH)
        {
            leftStop = true;
        }
        else
        {
            leftStop = false;
        }
    }
    else
    {
        leftStop = false;
    }

    //Snake hits the top of a wall
    //VERTICAL
    if (snakeY + snakeHeight == wall1Y - 1 && snakeY + snakeHeight <= wall1Y + wallHeightV)
    {
        if (snakeX + snakeWidth > wall1X && snakeX < wall1X + wallWidthV)
        {
            bottomStop = true;
        }
        else
        {
            bottomStop = false;
        }
    }
    //HORIZONTAL
    else if (snakeY + snakeHeight == wall2Y - 1 && snakeY + snakeHeight <= wall2Y + wallHeightH)
    {
        if (snakeX + snakeWidth > wall2X && snakeX < wall2X + wallWidthH)
        {
            bottomStop = true;
        }
        else
        {
            bottomStop = false;
        }
    }
    else
    {
        bottomStop = false;
    }

    //Snake hits the bottom of a wall
    //VERTICAL
    if (snakeY == wall1Y + 1 + wallHeightV && snakeY >= wall1Y - 1)
    {
        if (snakeX + snakeWidth > wall1X && snakeX < wall1X + wallWidthV)
        {
            topStop = true;
        }
        else
        {
            topStop = false;
        }
    }
    //HORIZONTAL
    else if (snakeY == wall2Y + 1 + wallHeightH && snakeY >= wall2Y - 1)
    {
        if (snakeX + snakeWidth > wall2X && snakeX < wall2X + wallWidthH)
        {
            topStop = true;
        }
        else
        {
            topStop = false;
        }
    }
    else
    {
        topStop = false;
    }
}

/*========== Sub Recursive Function for Low Priority Functions ==========*/
setInterval(gameSecondary, 1000);
function gameSecondary()
{
    //For secondary recursive tasks :(
}