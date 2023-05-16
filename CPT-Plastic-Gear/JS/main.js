//==================== SPRITE DIMENSION VARIABLE SETUP ====================//


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

//Animation variables in order of priority (So no visual bugs when going in multiple directions)
let snakeDown = false;
let snakeUp = false;
let snakeLeft = false;
let snakeRight = false;

/*========== Setting Up Collision Detection on Walls ==========*/
//The dimensions to be used in collision detection for horizontal wall segments (vh)
let wallWidthV = 5;
let wallHeightV = 25;
//The dimensions to be used in collision detection for horizontal wall segments (vh)
let wallWidthH = 25;
let wallHeightH = 5;


//==================== INPUT VARIABLE SETUP ===============================//


//Key Event Listeners
document.addEventListener("keydown", keysDown); //Records keys when pressed
document.addEventListener("keyup", keysUp); //Unrecords keys when unpressed

/*========== Collision Detection Variables ==========*/
//Will be changed in the recursive collision detection function when Snake is against a wall
let leftStop = false;
let rightStop = false;
let topStop = false;
let bottomStop = false;

//Whether or not Snake has been detected by a guard or camera
let detected = false;


//========== Visual Effect Layer Object ==========//
let vEffectLayer = document.querySelector("#vEffectLayer");
let visionDetectionSwap = document.querySelector("#visionDetectionSwap"); //The div that contains the vision boxes that move when a guard or camera moves or turns


//==================== WALL VARIABLES BY ROOM =============================//


/*========== Room 0 Wall Positions ==========*/
let wall0AX = 0;
let wall0AY = 15;

let wall0BX = 25;
let wall0BY = 15;

let wall0CX = 60;
let wall0CY = 15;

let wall0DX = 70;
let wall0DY = 15;

let wall0EX = 90;
let wall0EY = 15;

//Later walls and rooms have coordinates directly placed in collision function parameters


//==================== FRAMEWORK FOR LOADING ROOMS ========================//


//Variables for what the current room is and what the last room was
let roomID = 0;
let roomIDLast;

//Variables for whether or not a door exists in a room
let dbExists = true;
let dtExists = false;


//==================== RECORDING AND UNRECORDING USER INPUTS ==============//


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


//==================== PLAYER CONTROL FUNCTION (RECURSIVE) ================//


let gameMainVar = setInterval(gameMain, 15);
function gameMain()
{
    //moves snake down
    if ((pressedKeys[83] || pressedKeys[40]))
    {
        if (snakeY < 88 && bottomStop == false)
        {
            snakeY += 0.5;
            snakeYString = snakeY + "vh";
            snake.style.marginTop = snakeYString;

            snakeDown = true;
            snakeAnimation();
        }
        doorCheckD();
    }
    else 
    {
        snakeDown = false
    }
    //moves snake up
    if ((pressedKeys[87] || pressedKeys[38]))
    {
        if (snakeY > 0 && topStop == false)
        {
            snakeY -= 0.5;
            snakeYString = snakeY + "vh";
            snake.style.marginTop = snakeYString;

            if (snakeDown == false)
            {
                snakeUp = true;
                snakeAnimation();
            }
        }
        doorCheckU();
    }
    else
    {
        snakeUp = false;
    }
    //Moves snake to the right
    if ((pressedKeys[68] || pressedKeys[39]))
    {
        if (snakeX < 107 && rightStop == false)
        {
            snakeX += 0.5;
            snakeXString = snakeX + "vh";
            snake.style.marginLeft = snakeXString;

            if (snakeDown == false && snakeUp == false)
            {
                snakeRight = true;
                snakeAnimation();
            }
        }
        //for door function
    }
    else
    {
        snakeRight = false;
    }
    //moves snake to the left
    if ((pressedKeys[65] || pressedKeys[37]))
    {
        if (snakeX > 0 && leftStop == false)
        {
            snakeX -= 0.5;
            snakeXString = snakeX + "vh";
            snake.style.marginLeft = snakeXString;

            if (snakeDown == false && snakeUp == false && snakeRight == false)
            {
                snakeLeft = true;
                snakeAnimation();
            }
        }
        //for door function
    }
    else
    {
        snakeLeft = false;
    }

    //This will end the game
    if (detected)
    {
        console.log("Sadge");
    }
}


//==================== COLLISION DETECTION FUNCTION (RECURSIVE)============//


let gameCollisionVar = setInterval(gameCollision, 15);
function gameCollision()
{
    leftStop = false;
    rightStop = false;
    topStop = false;
    bottomStop = false;
    switch (roomID)
    {
        case 0:
            collisionRoom0();
            break;
        case 1:
            collisionRoom1();
            break;
        case 2:
            collisionRoom2();
            break;
        case 3:
            collisionRoom3();
            break;
        case 4:
            collisionRoom4();
    }
}


//==================== DIRECTIONAL COLLISION DETECTION FRAMEWORK ==========//


/*========== Overall Collision ==========*/
function collisionV(wallX, wallY)
{
    collisionTopV(wallX, wallY);
    collisionBottomV(wallX, wallY);
    collisionLeftV(wallX, wallY);
    collisionRightV(wallX, wallY);
}
function collisionH(wallX, wallY)
{
    collisionTopH(wallX, wallY);
    collisionBottomH(wallX, wallY);
    collisionLeftH(wallX, wallY);
    collisionRightH(wallX, wallY);
}

/*========== Collision By Parts ==========*/
function collisionTopV(wallX, wallY) //Snake hits the top of a vertical wall
{
    if (snakeY + snakeHeight == wallY && snakeY + snakeHeight <= wallY + wallHeightV)
    {
        if (snakeX + snakeWidth > wallX && snakeX < wallX + wallWidthV)
        {
            bottomStop = true;
        }
    }
}
function collisionTopH(wallX, wallY) //Snake hits the top of a horizontal wall
{
    if (snakeY + snakeHeight == wallY && snakeY + snakeHeight <= wallY + wallHeightH)
    {
        if (snakeX + snakeWidth > wallX && snakeX < wallX + wallWidthH)
        {
            bottomStop = true;
        }
    }
}

function collisionBottomV(wallX, wallY) //Snake hits the bottom of a vertical wall
{
    if (snakeY == wallY + wallHeightV && snakeY >= wallY)
    {
        if (snakeX + snakeWidth > wallX && snakeX < wallX + wallWidthV)
        {
            topStop = true;
        }
    }
}
function collisionBottomH(wallX, wallY) //Snake hits the bottom of a horizontal wall
{
    if (snakeY == wallY + wallHeightH && snakeY >= wallY)
    {
        if (snakeX + snakeWidth > wallX && snakeX < wallX + wallWidthH)
        {
            topStop = true;
        }
    }
}

function collisionLeftV(wallX, wallY) //Snake hits the left of a vertical wall
{
    if (snakeX + snakeWidth >= wallX && snakeX <= wallX)
    {
        if (snakeY + snakeHeight > wallY && snakeY < wallY + wallHeightV)
        {
            rightStop = true;
        }
    }
}
function collisionLeftH(wallX, wallY) //Snake hits the left of a horizontal wall
{
    if (snakeX + snakeWidth >= wallX && snakeX <= wallX)
    {
        if (snakeY + snakeHeight > wallY && snakeY < wallY + wallHeightH)
        {
            rightStop = true;
        }
    }
}

function collisionRightV(wallX, wallY) //Snake hits the right of a vertical wall
{
    if (snakeX <= wallX + wallWidthV && snakeX >= wallX)
    {
        if (snakeY + snakeHeight > wallY && snakeY < wallY + wallHeightV)
        {
            leftStop = true;
        }
    }
}
function collisionRightH(wallX, wallY) //Snake hits the right of a horizontal wall
{
    if (snakeX <= wallX + wallWidthH && snakeX >= wallX)
    {
        if (snakeY + snakeHeight > wallY && snakeY < wallY + wallHeightH)
        {
            leftStop = true;
        }
    }
}

//Collision for Custom Objects
//Parameters represent X-Coordinate, Y-Coordinate, Width of Object, Height of Object
function customCollision(wallX, wallY, wallWidth, wallHeight)
{
    if (snakeY + snakeHeight == wallY && snakeY + snakeHeight <= wallY + wallHeight)
    {
        if (snakeX + snakeWidth > wallX && snakeX < wallX + wallWidth)
        {
            bottomStop = true;
        }
    }
    if (snakeY == wallY + wallHeight && snakeY >= wallY)
    {
        if (snakeX + snakeWidth > wallX && snakeX < wallX + wallWidth)
        {
            topStop = true;
        }
    }
    if (snakeX + snakeWidth >= wallX && snakeX <= wallX)
    {
        if (snakeY + snakeHeight > wallY && snakeY < wallY + wallHeight)
        {
            rightStop = true;
        }
    }
    if (snakeX <= wallX + wallWidth && snakeX >= wallX)
    {
        if (snakeY + snakeHeight > wallY && snakeY < wallY + wallHeight)
        {
            leftStop = true;
        }
    }
}


//==================== Vision Detection Function ==========================//


let detectSoften = 1.5;
//The minus and plus this variable is the function gives a little bit of grace to the detection in case a pixel of Snake's toe is being detected etc. Small boundries exist around the visible portion of the sprite
function detectCheck(x, y, width, height)
//Parameters represent a red box (Field of View): x coordinate, y coordinate, width of the box, height of the box.
{
    detected = false;
    //Checks if Snake's top left corner is in a guard's view
    if (x <= snakeX - detectSoften && snakeX + detectSoften <= x + width)
    {
        if (y <= snakeY - detectSoften && snakeY + detectSoften <= y + height)
        {
            detected = true;
        }
    }
    //Checks if Snake's bottom right corner is in a guard's view
    if (x <= snakeX + snakeWidth - detectSoften && snakeX + snakeWidth + detectSoften <= x + width)
    {
        if (y <= snakeY + snakeHeight - detectSoften && snakeY + snakeHeight + detectSoften <= y + height)
        {
            detected = true;
        }
    }
    //Checks Snake's bottom left corner
    if (x <= snakeX - detectSoften && snakeX + detectSoften <= x + width)
    {
        if (y <= snakeY + snakeHeight - detectSoften && snakeY + snakeHeight + detectSoften <= y + height)
        {
            detected = true;
        }
    }
    //Checks Snake's top right corner
    if (x <= snakeX + snakeWidth - detectSoften && snakeX + snakeWidth + detectSoften <= x + width)
    {
        if (y <= snakeY - detectSoften && snakeY + detectSoften <= y + height)
        {
            detected = true;
        }
    }
}


//==================== ROOM DATA STRINGS ==================================//


let room0 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">

<!--Wall's Div Containing Sprite-->
<div class = "wallHorizontal" id = "wall0A">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall0B">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall0C">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall0D">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallVertical" id = "wall0E">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall0F">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall0G">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallHorizontal" id = "wall0H">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall0I">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall0J">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall0K">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall0L">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>

<!--Plane-->
<div class = "plane" id = "plane0A">
    <img src = "Assets/plane.png" class = "planeSprite">
</div>
<!--Tanks-->
<div class = "tank" id = "tank0A">
    <img src = "Assets/tank.png" class = "tankSprite">
</div>
<div class = "tank" id = "tank0B">
    <img src = "Assets/tank.png" class = "tankSprite">
</div>

<!--Door Mat-->
<div class = "doorVertical" id = "doorBottom">
    <img src = "Assets/door-bottom.png" class = "doorVerticalSpriteBottom">
</div>
<div class = "doorVertical" id = "doorTop">
    <img src = "Assets/door-room-0.png" class = "doorVerticalSpriteTop">
</div>

<!--Player Character's Div Containing Sprite-->
<div id = "snake">
    <img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>
<div id = "vEffectLayer">
    <!-- This will change colour above the viewport for screenload, shooting, etc. -->
</div>`;

let room1 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">

<div class = "guard" id = "guard1A">
    <img src = "Assets/guard-right.png" class = "guardSprite">
</div>

<!--Doormats-->
<div class = "doorVertical" id = "doorBottom">
    <img src = "Assets/door-bottom.png" class = "doorVerticalSpriteBottom">
</div>
<div class = "doorVertical" id = "doorTop">
    <img src = "Assets/door-top.png" class = "doorVerticalSpriteTop">
</div>

<!--Player Character's Div Containing Sprite-->
<div id = "snake">
    <img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>

<!-- Vision Detection Box -->
<div id = "visionDetectionSwap">
    <img src = "Assets/detection-box.png" id = "visionDetection1A" class = "visionBoxFill">
</div>

<!--Walls-->
<div class = "wallHorizontal" id = "wall1A">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall1B">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall1C">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall1D">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallVertical" id = "wall1E">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall1F">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall1G">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallHorizontal" id = "wall1H">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall1I">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall1J">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall1K">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>

<!--Tanks-->
<div class = "tank" id = "tank1A">
    <img src = "Assets/tank.png" class = "tankSprite">
</div>
<div class = "tank" id = "tank1B">
    <img src = "Assets/tank.png" class = "tankSprite">
</div>
<div class = "tank" id = "tank1C">
    <img src = "Assets/tank.png" class = "tankSprite">
</div>
<div class = "tank" id = "tank1D">
    <img src = "Assets/tank-1.png" class = "tankSprite">
</div>


<div id = "vEffectLayer">
    <!-- This will change colour above the viewport for screenload, shooting, etc. -->
</div>`;

let room2 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">

<!--Walls-->
<div class = "wallHorizontal" id = "wall2A">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2B">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2C">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2D">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2E">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2F">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2G">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2H">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2I">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2J">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2K">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2L">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall2M">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>

<!--Doormats-->
<div class = "doorVertical" id = "doorBottom">
    <img src = "Assets/door-bottom.png" class = "doorVerticalSpriteBottom">
</div>
<div class = "doorVertical" id = "doorTop">
    <img src = "Assets/door-top.png" class = "doorVerticalSpriteTop">
</div>

<!--Player Character's Div Containing Sprite-->
<div id = "snake">
    <img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>
<div id = "vEffectLayer">
    <!-- This will change colour above the viewport for screenload, shooting, etc. -->
</div>`;

let room3 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">

<!--Walls-->
<div class = "wallHorizontal" id = "wall3A">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3B">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3C">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3E">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3F">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3G">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3I">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3J">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3K">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3M">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3N">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3O">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3P">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3Q">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3R">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3S">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3T">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3U">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3V">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3W">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3X">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3Y">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3Z">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3AA">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3AB">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3AC">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall3AD">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>

<!--Doormats-->
<div class = "doorVertical" id = "doorBottom">
    <img src = "Assets/door-bottom.png" class = "doorVerticalSpriteBottom">
</div>
<div class = "doorVertical" id = "doorTop">
    <img src = "Assets/door-top.png" class = "doorVerticalSpriteTop">
</div>

<!--Player Character's Div Containing Sprite-->
<div id = "snake">
    <img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>
<div id = "vEffectLayer">
    <!-- This will change colour above the viewport for screenload, shooting, etc. -->
</div>`;

let room4 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">

<!--Walls-->
<div class = "wallHorizontal" id = "wall4A">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall4B">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall4C">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall4D">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallVertical" id = "wall4E">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall4F">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall4G">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallHorizontal" id = "wall4H">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall4I">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>

<!--Tanks-->
<div class = "tank" id = "tank4A">
    <img src = "Assets/tank.png" class = "tankSprite">
</div>
<div class = "tank" id = "tank4B">
    <img src = "Assets/tank.png" class = "tankSprite">
</div>
<div class = "tank" id = "tank4C">
    <img src = "Assets/tank-1.png" class = "tankSprite">
</div>

<!--Doormats-->
<div class = "doorVertical" id = "doorBottom">
    <img src = "Assets/door-bottom.png" class = "doorVerticalSpriteBottom">
</div>
<div class = "doorVertical" id = "doorTop">
    <img src = "Assets/door-top.png" class = "doorVerticalSpriteTop">
</div>

<!--Player Character's Div Containing Sprite-->
<div id = "snake">
    <img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>
<div id = "vEffectLayer">
    <!-- This will change colour above the viewport for screenload, shooting, etc. -->
</div>`;


//==================== COLLISION DETECTION UNIQUE TO EACH ROOM ========//


function collisionRoom0()
{
    //Each checks for collision with each wall
    collisionH(wall0AX, wall0AY);
    collisionH(wall0BX, wall0BY);
    collisionH(wall0CX, wall0CY);
    collisionH(wall0DX, wall0DY);
    collisionV(wall0EX, wall0EY);
    collisionV(90, 40);
    collisionV(90, 60);
    collisionH(70, 80);
    collisionH(55, 80);
    collisionH(30, 80);
    collisionH(5, 80);
    collisionH(0, 80);
    //Plane
    customCollision(0, 41, 26, 18); //Main Body
    customCollision(0, 44, 35, 12); //Nose
    customCollision(0, 35, 10, 28); //Inner Wing
    customCollision(0, 25, 6, 66); //Outer Wing
    //Tanks
    customCollision(65, 25, 17, 17);
    customCollision(45, 55, 17, 17);
}

function collisionRoom1()
{
    collisionH(0, 15);
    collisionH(25, 15);
    collisionH(50, 15);
    collisionH(70, 15);
    collisionV(90, 15);
    collisionV(90, 20);
    collisionV(90, 60);
    collisionH(65, 80);
    collisionH(40, 80);
    collisionH(15, 80);
    collisionH(0, 80);
    //Tanks
    customCollision(5, 25, 17, 17);
    customCollision(25, 50, 17, 17);
    customCollision(50, 30, 17, 17);
    customCollision(63, 58, 17, 17);
}

function collisionRoom2()
{
    collisionH(0, 14);
    collisionH(25, 14);
    collisionH(50, 14);
    collisionH(25, 34);
    collisionH(62, 34);
    collisionH(87, 34);
    collisionH(0, 54);
    collisionH(25, 54);
    collisionH(62, 54);
    collisionH(62, 14);
    collisionH(25, 74);
    collisionH(62, 74);
    collisionH(87, 74);
}
function collisionRoom3()
{
    customCollision(25, 15, 75, 15);
    customCollision(25, 43, 75, 15);
    customCollision(25, 71, 75, 15);
}
function collisionRoom4()
{
    collisionH(0, 25);
    collisionH(25, 25);
    collisionH(50, 25);
    collisionH(60, 25);
    collisionV(80, 25);
    collisionV(80, 35);
    collisionV(80, 73);
    collisionH(55, 73);
    collisionH(30, 73);
    //Tanks
    customCollision(5, 35, 17, 17);
    customCollision(30, 35, 17, 17);
    customCollision(90, 77, 17, 17);
}


//==================== Snake Animation Function ============================//


let snakeAnimTimer = 0;
// setInterval(snakeAnimation, 30);
function snakeAnimation()
{
    snakeAnimTimer++;
    if (snakeDown)
    {
        if (snakeAnimTimer < 20)
        {
            snake.innerHTML = `<img src = "Assets/snake-forward.png" id = "snakeSprite">`;
        }
        else if (snakeAnimTimer < 40)
        {
            snake.innerHTML = `<img src = "Assets/snake-forward-alt.png" id = "snakeSprite">`;
        }
        else
        {
            snakeAnimTimer = 0;
        }
    }
    else if (snakeUp)
    {
        if (snakeAnimTimer < 20)
        {
            snake.innerHTML = `<img src = "Assets/snake-up.png" id = "snakeSprite">`;
        }
        else if (snakeAnimTimer < 40)
        {
            snake.innerHTML = `<img src = "Assets/snake-up-alt.png" id = "snakeSprite">`;
        }
        else
        {
            snakeAnimTimer = 0;
        }
    }
    else if (snakeLeft)
    {
        if (snakeAnimTimer < 20)
        {
            snake.innerHTML = `<img src = "Assets/snake-left.png" id = "snakeSprite">`;
        }
        else if (snakeAnimTimer < 40)
        {
            snake.innerHTML = `<img src = "Assets/snake-left-alt.png" id = "snakeSprite">`;
        }
        else
        {
            snakeAnimTimer = 0;
        }
    }
    else if (snakeRight)
    {
        if (snakeAnimTimer < 20)
        {
            snake.innerHTML = `<img src = "Assets/snake-right.png" id = "snakeSprite">`;
        }
        else if (snakeAnimTimer < 40)
        {
            snake.innerHTML = `<img src = "Assets/snake-right-alt.png" id = "snakeSprite">`;
        }
        else
        {
            snakeAnimTimer = 0;
        }
    }
}


//==================== Enemy Animation Function ============================//


//This function also repeatedly calls the detection function for when Snake walks into a vision box
let enemyTimer = 0;
let enemyAnimationVar = setInterval(enemyAnimation, 15); //Bad form :(
function enemyAnimation()
{
    enemyTimer++;
    switch (roomID)
    {
        case 0:
            //No guards exist in room 0
            break;
        case 1:
            if (enemyTimer <= 240) //Guard looks right for 4 seconds
            {
                guard1A.innerHTML = `<img src = "Assets/guard-right.png" class = "guardSprite">`;
                visionDetectionSwap.innerHTML = `<img src = "Assets/detection-box.png" id = "visionDetection1A" class = "visionBoxFill">`;
                //x, y, width, height
                detectCheck(89, 45, 23, 15);
            }
            else if (enemyTimer <= 330) //Guard looks left for 1.5 seconds
            {
                guard1A.innerHTML = `<img src = "Assets/guard-left.png" class = "guardSprite">`;
                visionDetectionSwap.innerHTML = `<img src = "Assets/detection-box.png" id = "visionDetection1A-Alt" class = "visionBoxFill">`;
                detectCheck(42, 45, 42, 15);
            }
            else
            {
                enemyTimer = 0;
            }
            break;
        case 2:
            if (enemyTimer <= 90)
            {

            }
            else if (enemyTimer <= 180)
            {
                
            }
            else
            {
                enemyTimer = 0;
            }
            break;
    }
}

function DevRoomLoad()
{
    snakeX = 53;
    snakeY = 4;

    roomLoad();

    snake.style.marginLeft = "53vh";
    snake.style.marginTop = "4vh";
}


//==================== LOADING ROOMS ======================================//


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

/*========== Loading Room Data ==========*/
function roomLoad()
{
    console.log("Loading Room " + roomID);
    //Each room's specifics are loaded here
    switch (roomID)
    {
        case 0:
            document.getElementById("gameViewPort").innerHTML = room0;
            snake = document.querySelector("#snake"); //The JS needs to regrab snake from the HTML since in code, he has been "recreated"

            dtExists = false;
            dbExists = true;
            break;
        case 1:
            //The HTML is switched to so the viewport contains the objects that are in the room being loaded
            document.getElementById("gameViewPort").innerHTML = room1;
            snake = document.querySelector("#snake"); //The JS needs to regrab snake from the HTML since in code, he has been "recreated"

            //Creating an object representing the guard
            let guard1A = document.querySelector("#guard1A"); //Grabbing the guard from HTML for JS

            dtExists = true;
            dbExists = true;
            break;
        case 2:
            document.getElementById("gameViewPort").innerHTML = room2;
            snake = document.querySelector("#snake");

            let guard2A = document.querySelector("#guard2A");

            dtExists = true;
            dbExists = true;
            break;
        case 3:
            document.getElementById("gameViewPort").innerHTML = room3;
            snake = document.querySelector("#snake");

            dtExists = true;
            dbExists = true;
            break;
        case 4:
            document.getElementById("gameViewPort").innerHTML = room4;
            snake = document.querySelector("#snake");

            dtExists = true;
            dbExists = false;
            break;
    }

    //Recreating the object representing the Visual Effect Layer
    vEffectLayer = document.querySelector("#vEffectLayer");
    visionDetectionSwap = document.querySelector("#visionDetectionSwap");

    /*========== Room Progression or Return Detection ==========*/
    if (roomIDLast < roomID) //When Snake advances to a room (Setting Position)
    {
        snakeX = 53; //Tracks the x position of snake as an integer
        snakeXString = "53vh"; //Tracks the x position of snake as a string with units appended so it can be read by css
        snake.style.marginLeft = snakeXString;
        snakeY = 1; //Tracks the y position of snake as an integer
        snakeYString = "1vh"; //Tracks the y position of snake as a string with units appended so it can be read by
        snake.style.marginTop = snakeYString;
    }
    
    else if (roomID < roomIDLast) //When Snake returns to a room (Setting Position)
    {
        snakeX = 53;
        snakeXString = "53vh";
        snake.style.marginLeft = snakeXString;
        snakeY = 88;
        snakeYString = "87vh";
        snake.style.marginTop = snakeYString;
    }
    enemyTimer = 0;
    console.log("Loaded Room " + roomID);
}


//==================== SUB-RECURSIVE FUNCTION FOR DEV CONTROL =============//


setInterval(gameSecondary, 500);
function gameSecondary()
{
    //For secondary recursive tasks :(
    //Experimental on the fly room reload REMOVE LATER
    if(pressedKeys[57]) DevRoomLoad();
    if(pressedKeys[48]) roomID++;
    if(pressedKeys[56]) roomID--;
    if(pressedKeys[55]) console.log(roomID);
    if(pressedKeys[54])
    {
        roomID = 1; //Room that is currently being worked on
        DevRoomLoad();
    }
}