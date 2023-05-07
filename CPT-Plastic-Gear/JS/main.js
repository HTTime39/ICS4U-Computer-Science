/*========== Setting Up Collision Detection On Snake ==========*/
let snake = document.querySelector("#snake"); //Player character
let snakeWidth = 5; //The width of Snake's sprite in viewport units. To be used in collision detection calculations.
let snakeHeight = 10; //The height of Snake's sprite in viewport units. It is actuall slightly less than a 1:2 ratio so this might need to be changed later.

/*========== Initialize Position Counters For Snake ==========*/ 
//The origin is the top left corner
let snakeX = 53; //Tracks the x position of snake as an integer
let snakeXString = "53vh"; //Tracks the x position of snake as a string with units appended so it can be read by css
snake.style.marginLeft = snakeXString;
let snakeY = 4; //Tracks the y position of snake as an integer
let snakeYString = "4vh"; //Tracks the y position of snake as a string with units appended so it can be read by
snake.style.marginTop = snakeYString;

//Key Event Listeners
document.addEventListener("keydown", keysDown); //Records keys when pressed
document.addEventListener("keyup", keysUp); //Unrecords keys when unpressed

/*========== Collision Detection Variables ==========*/
//Will be changed in the recursive collision detection function when Snake is against a wall
let leftStop = false;
let rightStop = false;
let topStop = false;
let bottomStop = false;

/*========== Setting Up Collision Detection on Walls ==========*/

//The dimensions to be used in collision detection for horizontal wall segments (vh)
let wallWidthV = 5;
let wallHeightV = 25;
//The dimensions to be used in collision detection for horizontal wall segments (vh)
let wallWidthH = 25;
let wallHeightH = 5;


/*========== Room 0 Wall Positions ==========*/
let wall1X = 20;
let wall1Y = 20;

let wall2X = 60;
let wall2Y = 60;

//Wall Doesn't Exist
let DNE = -100;
let dbExists = true;
let dtExists = false;

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
    if ((pressedKeys[68] || pressedKeys[39]))
    {
        if (snakeX < 107 && rightStop == false)
        {
            snakeX++;
            snakeXString = snakeX + "vh";
            snake.style.marginLeft = snakeXString;
        }
        //for door function
    }
    //moves snake to the left
    if ((pressedKeys[65] || pressedKeys[37]))
    {
        if (snakeX > 0 && leftStop == false)
        {
            snakeX--;
            snakeXString = snakeX + "vh";
            snake.style.marginLeft = snakeXString;
        }
        //for door function
    }
    //moves snake up
    if ((pressedKeys[87] || pressedKeys[38]))
    {
        if (snakeY > 0 && topStop == false)
        {
            snakeY--;
            snakeYString = snakeY + "vh";
            snake.style.marginTop = snakeYString;
        }
        doorCheckU();
    }
    //moves snake down
    if ((pressedKeys[83] || pressedKeys[40]))
    {
        if (snakeY < 88 && bottomStop == false)
        {
            snakeY++;
            snakeYString = snakeY + "vh";
            snake.style.marginTop = snakeYString;
        }

        doorCheckD();
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
        if (snakeY + snakeHeight > wall1Y && snakeY < wall1Y + wallHeightV)
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
        if (snakeY + snakeHeight > wall2Y && snakeY < wall2Y + wallHeightH)
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
        if (snakeY + snakeHeight > wall1Y && snakeY < wall1Y + wallHeightV)
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
        if (snakeY + snakeHeight > wall2Y && snakeY < wall2Y + wallHeightH)
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
    if (snakeY + snakeHeight == wall1Y && snakeY + snakeHeight <= wall1Y + wallHeightV)
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
    else if (snakeY + snakeHeight == wall2Y && snakeY + snakeHeight <= wall2Y + wallHeightH)
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
    if (snakeY == wall1Y + wallHeightV && snakeY >= wall1Y)
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
    else if (snakeY == wall2Y + wallHeightH && snakeY >= wall2Y)
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

//========== Framework for loading rooms ==========
let roomID = 0;
let roomIDLast;

//Room Data (HTML) for each room in the game
let room0 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">
<!--Wall's Div Containing Sprite-->
<div class = "wallVertical" id = "wallTest">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallHorizontal" id = "wallTest1">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<!--Guard's Div Containing Sprite-->
<div id = "guard">
    <img src = "Assets/guard-forward.png" class = "guardSprite">
</div>
<!--Door Mat-->
<div class = "doorVertical" id = "doorBottom">
    <img src = "Assets/door-bottom.png" class = "doorVerticalSprite">
</div>

<!--Player Character's Div Containing Sprite-->
<div id = "snake">
    <img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>`;

let room1 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">
<!--Player Character's Div Containing Sprite-->
<div class = "doorVertical" id = "doorTop">
<img src = "Assets/door-top.png" class = "doorVerticalSprite">
</div>
<div id = "snake">
    <img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>`;

/*========== Loading a Room ==========*/
function roomLoad()
{
    console.log("Loading Room " + roomID);
    //Each room's specifics are loaded here
    switch (roomID)
    {
        case 0:
            document.getElementById("gameViewPort").innerHTML = room0;
            snake = document.querySelector("#snake"); //The JS needs to regrab snake from the HTML since in code, he has been "recreated"

            dbExists = true;
            dtExists = false;
            break;
        case 1:
            //The HTML is switched to so the viewport contains the objects that are in the room being loaded
            document.getElementById("gameViewPort").innerHTML = room1;
            snake = document.querySelector("#snake"); //The JS needs to regrab snake from the HTML since in code, he has been "recreated"

            dbExists = false;
            dtExists = true;
            break;
    }

    //When Snake advances to a room (Setting Position)
    if (roomIDLast < roomID)
    {
        snakeX = 53; //Tracks the x position of snake as an integer
        snakeXString = "53vh"; //Tracks the x position of snake as a string with units appended so it can be read by css
        snake.style.marginLeft = snakeXString;
        snakeY = 1; //Tracks the y position of snake as an integer
        snakeYString = "1vh"; //Tracks the y position of snake as a string with units appended so it can be read by
        snake.style.marginTop = snakeYString;
    }
    //When Snake returns to a room (Setting Position)
    else if (roomID < roomIDLast)
    {
        snakeX = 53;
        snakeXString = "53vh";
        snake.style.marginLeft = snakeXString;
        snakeY = 88;
        snakeYString = "87vh";
        snake.style.marginTop = snakeYString;
    }
    console.log("Loaded Room " + roomID);
}

/*========== Triggering Room Load at Doors ==========*/
function doorCheckD()
{
    if (52 <= snakeX && snakeX <= 55 && snakeY == 88 && dbExists == true)
    {
        roomIDLast = roomID;
        roomID++;
        roomLoad();
    }
}
function doorCheckU()
{
    if (52 <= snakeX && snakeX <= 55 && snakeY == 0 && dtExists == true)
    {
        roomIDLast = roomID;
        roomID--;
        roomLoad();
    }
}