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

//For room 3's camera. Variables that keep track of its position
let camera3APos = 19;
let visionDetecion3APos = 15;

//Variables Containing Audio Files
let alertSound = new Audio("Audio/alert.mp3");
//An object representing an audio file.
//There are three of these because it cannot play a file that is already playing, so this lets you overlap them.
let gunshot0 = new Audio("Audio/gunshot0.mp3");
let gunshot1 = new Audio("Audio/gunshot1.mp3");
let gunshot2 = new Audio("Audio/gunshot2.mp3");

let deathSFX = new Audio("Audio/death-sfx.mp3");

let mainBGM = new Audio("Audio/main-bgm.mp3");

let explosion = new Audio("Audio/explosion.mp3");
let explosion1 = new Audio("Audio/explosion1.mp3");
let explosion2 = new Audio("Audio/explosion2.mp3");

let bgmTimer = 0;
let userFirstInteraction = false;
//The user needs to interact with the page first, otherwise the audio will fail to load. This is tracked here.
bgmLoopVar = setInterval(function bgmLoop()
{
    if (userFirstInteraction)
    {
        if (mainBGM.paused) mainBGM.play();
    }
}, 250);


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

let gameEnd = false;
//Variable tracking if the player has reached the final room of the game.
let endDialogueBox;
//Will store the HTML of the alert dialogue box upon loading the last room.


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

//Later walls and rooms have coordinates directly placed in collision function parameters (It's easier, and I'm too lazy to remove these ones and put them in directly)


//==================== FRAMEWORK FOR LOADING ROOMS ========================//


//Variables for what the current room is and what the last room was
let roomID = 0;
let roomIDLast;

//Variables for whether or not a door exists in a room
let dbExists = true; //The bottom door
let dtExists = false; //The top door


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
    if (roomID == 5)
    //Checks whether or not Snake is in the final room.
    {
        gameEnd = true;
    }
    //moves snake down
    if ((pressedKeys[83] || pressedKeys[40]))
    {
        if (snakeY < 88 && bottomStop == false)
        //The limit makes sure that Snake doesn't leave the coordinate system of the view port. The boolean changes to true later in the code when Snake is against a wall.
        {
            //A variable tracks Snake's Y-coordinate (X-coordinate in other parts), the unit "vh" is appended to it, the CSS property of Snake's div is changed to the modified value for his position.
            snakeY += 0.5;
            snakeYString = snakeY + "vh";
            snake.style.marginTop = snakeYString;

            snakeDown = true;
            //This determines Snake's direction that he is travelling, and tells the animation function which sprite to use to represent his direction.
            snakeAnimation();
        }
        userFirstInteraction = true;
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
        userFirstInteraction = true;
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
        userFirstInteraction = true;
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
        userFirstInteraction = true;
    }
    else
    {
        snakeLeft = false;
    }

    //This will end the game
    if (detected)
    {
        alertSound.play();
        snakeDie();
    }
}


//==================== COLLISION DETECTION FUNCTION (RECURSIVE)============//


let gameCollisionVar = setInterval(gameCollision, 15);
function gameCollision()
{
    //These determine whether or not Snake is against a wall.
    leftStop = false;
    rightStop = false;
    topStop = false;
    bottomStop = false;
    //The code for each wall in a room is changed using a switch case statement. A different function is called depending on the room.
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
//The individual collision functions for each direction are combinded here to make it easier to implement walls with just one line.
function collisionV(wallX, wallY)
//This one has preset height and width values for a vertical wall
{
    collisionTopV(wallX, wallY);
    collisionBottomV(wallX, wallY);
    collisionLeftV(wallX, wallY);
    collisionRightV(wallX, wallY);
}
function collisionH(wallX, wallY)
//This one has preset height and width values for a horizontal wall
{
    collisionTopH(wallX, wallY);
    collisionBottomH(wallX, wallY);
    collisionLeftH(wallX, wallY);
    collisionRightH(wallX, wallY);
}

/*========== Collision By Parts ==========*/
//Each function checks if Snake is colliding with a wall in each direction.
function collisionTopV(wallX, wallY) //Snake hits the top of a vertical wall
{
    if (snakeY + snakeHeight == wallY && snakeY + snakeHeight <= wallY + wallHeightV)
    //Checks that Snake is at the top of the wall with his Y-coordinate.
    {
        if (snakeX + snakeWidth > wallX && snakeX < wallX + wallWidthV)
        //Checks that Snake is aligned with the wall via X-coordate, and not to the left or right of it while at the correct Y-coordinate.
        {
            bottomStop = true;
            //Blocks Snake from moving down into the wall.
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
//This is the same logic as the wall collision detection, but has two extra variables to represent a changing width and height of an object.
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
//The minus and plus this variable in the function gives a little bit of grace to the detection in case a pixel of Snake's toe is being detected etc. Small boundries exist around the visible portion of the sprite.
function detectCheck(x, y, width, height)
//Parameters represent a red box (Field of View): x coordinate, y coordinate, width of the box, height of the box.
{
    detected = false;
    //Checks if Snake's top left corner is in a guard's view. This is similar to the collision detection functions, but changes a different variable to indicate that Snake has been caught.
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
    return(detected);
}


//==================== Detection for Room 3 Camera ========================//


//This is specific to the camera in room 3. Similar functions can be created using this one as a template.
//An extra layer is added to determine whether or not Snake is actually detected, when he is behind a wall in this room.
let wallSoften = 1; //Similar to the softening of the vision detection. Makes the walls extend just a little bit more for some give.
let wallHeight = 15; //For detection calculations.
function cameraCheck(x, y, width, height)
//The same parameters as the normal detectCheck function
{
    detectCheck(x, y, width, height);
    //The default function is called to see if Snake is being detected.
    hiddenBehindWall(y, height, 15);
    //A function is called with the specifics of each wall to see if they are blocking the camera's view, and will override the results of the default function
    hiddenBehindWall(y, height, 43);
    hiddenBehindWall(y, height, 71);

    return(detected);
}

//This checks to see if the wall is blocking Snake from the view of the camera and will override the result of the default field of view checker.
function hiddenBehindWall(y, height, wallY)
//(Current topMargin of the camera view, height of the camera view, the topMargin of the protective wall)
{
    if (wallY <= snakeY + wallSoften && snakeY - wallSoften <= wallY + 5 && wallY + snakeHeight <= snakeY + snakeHeight + wallSoften && snakeY + snakeHeight - wallSoften <= wallY + wallHeight)
    //Snake is entirely behind the first wall
    {
        detected = false;
    }
    else if (!(y <= snakeY + snakeHeight - detectSoften && snakeY + snakeHeight + detectSoften <= y + height) && (wallY <= snakeY + wallSoften && snakeY - wallSoften < wallY + wallHeight)) //Snake's feet are not within the detection zone, but his head is behind the wall.
    //Snake is leaving the bottom of the first wall
    //Even though his head is still in the detection zone, it is not detected because it is registered here as blocked by the wall.
    {
        detected = false;
    }
    else if (!(y <= snakeY - detectSoften && snakeY + detectSoften <= y + height) && (wallY <= snakeY + snakeHeight + wallSoften && snakeY + snakeHeight - wallSoften < wallY + wallHeight))
    //Does the same as the last else if but checks for when Snake is moving up from behind a wall and his toes are still in the technical detection zone behind the wall.
    {
        detected = false;
    }
}


//==================== ROOM DATA STRINGS ==================================//


//Each string represents a room, and is injected into the viewport when a room is called.
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

<!--Doormats-->
<div class = "doorVertical" id = "doorBottom">
    <img src = "Assets/door-bottom.png" class = "doorVerticalSpriteBottom">
</div>
<div class = "doorVertical" id = "doorTop">
    <img src = "Assets/door-top.png" class = "doorVerticalSpriteTop">
</div>

<!-- Guard -->
<div class = "guard" id = "guard2A">
    <img src = "Assets/guard-back.png" class = "guardSprite">
</div>

<!--Player Character's Div Containing Sprite-->
<div id = "snake">
    <img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>

<!-- Vision Detection Box -->
<div id = "visionDetectionSwap">
    <img src = "Assets/detection-box.png" id = "visionDetection2A" class = "visionBoxFill">
</div>

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

<div id = "vEffectLayer">
    <!-- This will change colour above the viewport for screenload, shooting, etc. -->
</div>`;

let room3 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">

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

<div id = "visionDetectionSwap">
<img src = "Assets/detection-box.png" id = "visionDetection3A" class = "visionBoxFill">
</div>

<img src = "Assets/camera-left.png" id = "camera3A" class = "camera-side">

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

<div id = "vEffectLayer">
    <!-- This will change colour above the viewport for screenload, shooting, etc. -->
</div>`;

let room4 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">

<div class = "guard" id = "guard4A">
    <img src = "Assets/guard-back.png" class = "guardSprite">
</div>
<div class = "guard" id = "guard4B">
    <img src = "Assets/guard-forward.png" class = "guardSprite">
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
    <img src = "Assets/detection-box.png" id = "visionDetection4A" class = "visionBoxFill">
    <img src = "Assets/detection-box.png" id = "visionDetection4B" class = "visionBoxFill">
</div>

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

<div id = "vEffectLayer">
    <!-- This will change colour above the viewport for screenload, shooting, etc. -->
</div>`;

let room5 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">

<!--Doormats-->
<div class = "doorVertical" id = "doorTop">
    <img src = "Assets/door-top.png" class = "doorVerticalSpriteTop">
</div>

<!--Player Character's Div Containing Sprite-->
<div id = "snake">
    <img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>

<div id = "metalGear">
    <img src = "Assets/metal-gear.png" id = "metalGearIntact">
</div>

<div class = "wallHorizontal" id = "wall5A">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall5B">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall5C">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall5D">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall5E">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall5F">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall5G">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>
<div class = "wallHorizontal" id = "wall5H">
    <img src = "Assets/wall-horizontal.png" class = "wallHorizontalSprite">
</div>


<div class = "wallVertical" id = "wall5I">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall5J">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall5K">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall5L">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall5M">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall5N">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall5O">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>
<div class = "wallVertical" id = "wall5P">
    <img src = "Assets/wall-vertical.png" class = "wallVerticalSprite">
</div>

<div id = "endDialogueBox">
    <!-- Box that will fill and empty of the end game dialogue before animation -->
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
    //Guards
    customCollision(84, 47, 5, 10);
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
    //Guards
    customCollision(53, 54, 5, 5);
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
    //Guards
    customCollision(80, 15, 5, 10);
    customCollision(72, 40, 5, 10);
}


//==================== Snake Animation Function ============================//


let snakeAnimTimer = 0;
//This variable is incremented each time the function is called, and will act as a timer for the walking animations of Snake.
function snakeAnimation()
{
    snakeAnimTimer++;
    if (snakeDown)
    {
        if (snakeAnimTimer < 20)
        //For certain ammounts of time, Snake's sprite appears and then changes. The animation timer is reset to zero once the animation has finished so that it can happen again. The same logic is used for each direction that snake is moving. The ordering of the if statements is important here because the game will prioritize the up and down sprites, even if the player is moving both up/down, and left/right.
        {
            //The innerHTML of the div containing Snake's sprite is changed to a different sprite.
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
//Similar to Snake's animation timer, but for enemies (guards/cameras).
let enemyAnimationVar = setInterval(enemyAnimation, 15);
function enemyAnimation()
{
    enemyTimer++;
    switch (roomID)
    //The animations are changed per room using the roomID variable in a switch case to know which one to run. Otherwise, the JS will try to update non-existant HTML and break :(
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
                //The detection function is called here. The x-coordinate, y-coordinate, width, and height are used to determine whether Snake is within a vision box. This logic works similar to the wall collision logic.
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
                guard2A.innerHTML = `<img src = "Assets/guard-back.png" class = "guardSprite">`;
                visionDetectionSwap.innerHTML = `<img src = "Assets/detection-box.png" id = "visionDetection2A" class = "visionBoxFill">`;
                detectCheck(50, 19, 12, 32);
            }
            else if (enemyTimer <= 180)
            {
                guard2A.innerHTML = `<img src = "Assets/guard-forward.png" class = "guardSprite">`
                visionDetectionSwap.innerHTML = `<img src = "Assets/detection-box.png" id = "visionDetection2A-Alt" class = "visionBoxFill">`;
                detectCheck(50, 61, 12, 37);
            }
            else
            {
                enemyTimer = 0;
            }
            break;
        case 3:
            if (enemyTimer <= 280)
            {
                //There is extra here for the camera because it actually has to move, rather than pivot, so there are variables to track and adjust its position, the same way that Snake moves. The camera sprite, as well as the vision box sprite are tracked and moved here.
                camera3APos += 0.25;
                camera3A.style.marginTop = camera3APos + "vh";
                visionDetection3APos += 0.25;
                visionDetection3A.style.marginTop = visionDetection3APos + "vh";
                cameraCheck(0, camera3APos, 112, 13); //The Y-Coordinate is variable here because the box is moving.
                //A different detection check is called here, because the camera check has an extra layer of logic since it detects in some areas and not others, for example walls block its view as it moves up and down the room. This extra layer checks. 
            }
            else if (enemyTimer <= 560)
            {
                camera3APos -= 0.25;
                camera3A.style.marginTop = camera3APos + "vh";
                visionDetection3APos -= 0.25;
                visionDetection3A.style.marginTop = visionDetection3APos + "vh";
                cameraCheck(0, camera3APos, 112, 13);
            }
            else
            {
                enemyTimer = 0;
            }
            break;
        case 4:
            if (enemyTimer <= 150)
            {
                guard4A.innerHTML = `<img src = "Assets/guard-back.png" class = "guardSprite">`;
                guard4B.innerHTML = `<img src = "Assets/guard-left.png" class = "guardSprite">`;
                visionDetectionSwap.innerHTML = `
                <img src = "Assets/detection-box.png" id = "visionDetection4A" class = "visionBoxFill">
                <img src = "Assets/detection-box.png" id = "visionDetection4B-Alt" class = "visionBoxFill">`;
                if (detectCheck(77, 0, 10, 15) == true || detectCheck(47, 39, 25, 12))
                {
                    detected = true;
                }
                
                
            }
            else if (enemyTimer <= 300)
            {
                guard4A.innerHTML = `<img src = "Assets/guard-right.png" class = "guardSprite">`;
                guard4B.innerHTML = `<img src = "Assets/guard-forward.png" class = "guardSprite">`;
                visionDetectionSwap.innerHTML = `
                <img src = "Assets/detection-box.png" id = "visionDetection4A-Alt" class = "visionBoxFill">
                <img src = "Assets/detection-box.png" id = "visionDetection4B" class = "visionBoxFill">`;
                //True needs to be put in here for some reason? The console says it's true when it should be but doesn't work here otherwise?
                if (true == detectCheck(85, 13, 27, 14) || detectCheck(69, 50, 11, 23))
                //These need to be put in an if statement because they will overwrite each other, because they cannot both be true at the same time, so OR will solve this.
                {
                    detected = true;
                }
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
//Checks whether or not Snake is at the coordinates of the door, and will call the roomLoad function if he is. This function gets called in the main control function when Snake moves in a certain direction.
//One function is for the door that might be at the top of a room, and one is for the door that might be at the bottom of the room. 
{
    if (52 <= snakeX && snakeX <= 55 && snakeY == 88 && dbExists == true)
    {
        roomIDLast = roomID;
        //The last roomID is tracked to determine whether to place Snake at the top door or bottom door depending on which direction he is coming from. 
        roomID++;
        //The roomID is incremented so that the next room's code and HTML are loaded.
        roomLoad();
        //The room load function is called.
    }
}
function doorCheckU()
{
    if (52 <= snakeX && snakeX <= 55 && snakeY == 0 && dtExists == true)
    {
        //The same as the last function, but the room is incremented down because Snake is moving back a room (The top door).
        roomIDLast = roomID;
        roomID--;
        roomLoad();
    }
}

/*========== Loading Room Data ==========*/
let referenceTimer;
let currentTimer;
function roomLoad()
{
    console.log("Loading Room " + roomID);
    //Each room's specifics are loaded here

    switch (roomID)
    {
        case 0:
            //The HTML string is set to the innerHTMl of the viewport
            document.getElementById("gameViewPort").innerHTML = room0;
            snake = document.querySelector("#snake"); //The JS needs to regrab snake from the HTML since in code, he has been "recreated"

            //Whether or not the door exists is set here. In room zero, the top door does not exist because it is the first room and you cannot go back. (Top doors bring you back, bottom doors bring you back).
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

            let camera3A = document.querySelector("#camera3A");
            camera3APos = 19;
            //The camera's sprite and Y-coordinate position are grabbed for the JS to reference, and to track its position since it moves.
            let visionDetection3A = document.querySelector("#visionDetection3A");
            visionDetection3APos = 15;
            //The vision detection box's sprite and Y-coordinate position are grabbed for the JS to reference, and to track its position since it moves.

            dtExists = true;
            dbExists = true;
            break;
        case 4:
            document.getElementById("gameViewPort").innerHTML = room4;
            snake = document.querySelector("#snake");

            let guard4A = document.querySelector("#guard4A");
            let guard4B = document.querySelector("guard4B");

            dtExists = true;
            dbExists = true;
            break;
        case 5:
            document.getElementById("gameViewPort").innerHTML = room5;
            snake = document.querySelector("#snake");

            endDialogueBox = document.querySelector("#endDialogueBox");
            metalGear = document.querySelector("#metalGear");

            dtExists = true;
            dbExists = false;
            break;
    }

    vEffectLayer = document.querySelector("#vEffectLayer");
    //Recreating the object representing the Visual Effect Layer.
    visionDetectionSwap = document.querySelector("#visionDetectionSwap");
    //Recreating the object representin the div, that swaps out vision boxes for guards when they change direction so it can be referenced.

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
    enemyTimer = 0; //The enemy animation timer is reset, so that there is no chance that a guard is looking at Snake immediately as he enters a room he was previously in.

    console.log("Loaded Room " + roomID);
}


//==================== Snake Die :( =======================================//


let deathAnimTimer = 0;
let restartEnable = false;
//Timer variable for the death animation.
function snakeDie()
{
    //All of the interval functions are stopped. All functionality of the main game is terminated.
    clearInterval(gameMainVar);
    clearInterval(gameCollisionVar);
    clearInterval(enemyAnimationVar);
    clearInterval(bgmLoopVar);
    mainBGM.pause();
    //The main bgm is ended.

    //The visual effect layers need to flash to indicate gun fire. A part of this also continues to loop once the end screen text. Code to return to the start screen is also here.
    setInterval(function gunFlash(){
        deathAnimTimer++;
        //The visual effect layer over the viewport is flashed white to emulate gunflashes and then falls black with an end screen message. The animation uses a similar method to the snake and enemy animations.
        if (deathAnimTimer <= 1)
        {
            vEffectLayer.style.opacity = 0.5;
            vEffectLayer.style.backgroundColor = "white";
        }
        else if (deathAnimTimer <= 3)
        {
            vEffectLayer.style.opacity = 1;
            vEffectLayer.style.backgroundColor = "white";
            gunshot0.play();
        }
        else if (deathAnimTimer <= 4)
        {
            vEffectLayer.style.opacity = 0.5;
            vEffectLayer.style.backgroundColor = "white";
        }
        else if (deathAnimTimer <= 5)
        {
            vEffectLayer.style.opacity = 0;
            vEffectLayer.style.backgroundColor = "white";
        }
        else if (deathAnimTimer <= 6)
        {
            vEffectLayer.style.opacity = 0.5;
            vEffectLayer.style.backgroundColor = "white";
        }
        else if (deathAnimTimer <= 8)
        {
            vEffectLayer.style.opacity = 1;
            vEffectLayer.style.backgroundColor = "white";
            gunshot1.play();
        }
        else if (deathAnimTimer <= 9)
        {
            vEffectLayer.style.opacity = 0.5;
            vEffectLayer.style.backgroundColor = "white";
        }
        else if (deathAnimTimer <= 10)
        {
            vEffectLayer.style.opacity = 0;
            vEffectLayer.style.backgroundColor = "white";
        }
        else if (deathAnimTimer <= 11)
        {
            vEffectLayer.style.opacity = 0.5;
            vEffectLayer.style.backgroundColor = "white";
        }
        else if (deathAnimTimer <= 13)
        {
            vEffectLayer.style.opacity = 1;
            vEffectLayer.style.backgroundColor = "white";
            gunshot2.play();
        }
        else if (deathAnimTimer <= 14)
        {
            vEffectLayer.style.opacity = 0.5;
            vEffectLayer.style.backgroundColor = "white";
        }
        else if (deathAnimTimer <= 15)
        {
            vEffectLayer.style.opacity = 0;
            vEffectLayer.style.backgroundColor = "transparent";
        }
        else if (deathAnimTimer <= 16)
        {
            deathSFX.play();
            vEffectLayer.style.opacity = 0.5;
            vEffectLayer.style.backgroundColor = "black";
        }
        else if (deathAnimTimer <= 17)
        {
            vEffectLayer.style.opacity = 1;
            vEffectLayer.style.backgroundColor = "black";
        }
        else if (deathAnimTimer <= 19)
        //The death message appears here.
        {
            vEffectLayer.innerHTML = `<img src = "Assets/end-screen-message.png" id = "endText" class = "opacityQuarter">`;
        }
        else if (deathAnimTimer <= 21)
        {
            vEffectLayer.innerHTML = `<img src = "Assets/end-screen-message.png" id = "endText" class = "opacityHalf">`;
        }
        else if (deathAnimTimer <= 23)
        {
            vEffectLayer.innerHTML = `<img src = "Assets/end-screen-message.png" id = "endText" class = "opacity75">`;
        }
        else if (deathAnimTimer <= 25)
        {
            vEffectLayer.innerHTML = `<img src = "Assets/end-screen-message.png" id = "endText" class = "opacityFull">`;
            restartEnable = true; //The restart button is enables after the first time this part of the animation plays.
        }
        else if (deathAnimTimer <= 27)
        {
            vEffectLayer.innerHTML = `<img src = "Assets/end-screen-message.png" id = "endText" class = "opacity75">`;
        }
        else if (deathAnimTimer <= 29)
        {
            vEffectLayer.innerHTML = `<img src = "Assets/end-screen-message.png" id = "endText" class = "opacityHalf">`;
        }
        else
        //The animation timer is reset back to when the death text first appears to flash it.
        {
            deathAnimTimer = 19;
        }

        if (restartEnable == true && pressedKeys[13])
        //Is a restart allowed, and the enter key is pressed?
        {
            window.location.replace("start-game.html");
        }

    }, 100);
}


//==================== Game End Animation =================================//


let dialogueGo = false; //For when to start the dialogue before the animation.
let animationGo = false; //For when to start the main part of the animation.
let endAnimationTimer = 0; //Timer for the animation.
let smokeRepeat = 0;
let explosionPlay = false;
let explosionPlay1 = false;
let explosionPlay2 = false;
setInterval(function gameEndAnimation()
{
    if (animationGo)
    {
        endAnimationTimer++;
        snakeDown = false;
        if (endAnimationTimer <= 69)
        //Snake walks towards the Metal Gear.
        {
            snakeY += 0.5;
            snakeYString = snakeY + "vh";
            snake.style.marginTop = snakeYString;

            snakeDown = true;
            snakeAnimation();
        }
        else if (endAnimationTimer <= 142)
        //Snake pauses infront of the Metal Gear.
        {

        }
        else if (endAnimationTimer <= 162)
        //Snake tampers with the Metal Gear (This is just the walk animation, but his feet are hidden).
        {
            snake.innerHTML = `<img src = "Assets/snake-forward.png" id = "snakeSprite">`;
        }
        else if (endAnimationTimer <= 202)
        {
            snake.innerHTML = `<img src = "Assets/snake-forward-alt.png" id = "snakeSprite">`;
        }
        else if (endAnimationTimer <= 222)
        {
            snake.innerHTML = `<img src = "Assets/snake-forward.png" id = "snakeSprite">`;
        }
        else if (endAnimationTimer <= 242)
        {
            snake.innerHTML = `<img src = "Assets/snake-forward-alt.png" id = "snakeSprite">`;
        }
        else if (endAnimationTimer <= 262)
        {
            snake.innerHTML = `<img src = "Assets/snake-forward.png" id = "snakeSprite">`;
        }
        else if (endAnimationTimer <= 282)
        {
            snake.innerHTML = `<img src = "Assets/snake-forward-alt.png" id = "snakeSprite">`;
        }
        else if (endAnimationTimer <= 364)
        //Snake pauses to observe his fine handiwork.
        {

        }
        else if (endAnimationTimer <= 432)
        //Snake walks away from the Metal Gear towards the door.
        {
            snakeY -= 0.5;
            snakeYString = snakeY + "vh";
            snake.style.marginTop = snakeYString;

            snakeUp = true;
            snakeAnimation();
        }
        else if (endAnimationTimer <= 765)
        //Snake leaves the room (His sprite is deleted). There is also a pause here.
        {
            snake.innerHTML = "";
        }
        else if (endAnimationTimer <= 775)
        //EXPLOSION
        {
            vEffectLayer.style.opacity = 0.5;
            vEffectLayer.style.backgroundColor = "#f3f91d";
            if (!explosionPlay)
            {
                explosion.play();
                explosionPlay = true;
            }
        }
        else if (endAnimationTimer <= 785)
        {
            vEffectLayer.style.backgroundColor = "#fea621";
        }
        else if (endAnimationTimer <= 795)
        {
            vEffectLayer.style.backgroundColor = "#c2000b";
        }
        else if (endAnimationTimer <= 805)
        {
            vEffectLayer.style.backgroundColor = "#fea621";
            if (!explosionPlay1)
            {
                explosion1.play();
                explosionPlay1 = true;
            }
        }
        else if (endAnimationTimer <= 815)
        {
            vEffectLayer.style.backgroundColor = "#f3f91d";
        }
        else if (endAnimationTimer <= 825)
        {
            vEffectLayer.style.opacity = 0.5;
            vEffectLayer.style.backgroundColor = "#f3f91d";
        }
        else if (endAnimationTimer <= 835)
        {
            vEffectLayer.style.backgroundColor = "#fea621";
            if (!explosionPlay2)
            {
                explosion2.play;
                explosionPlay2 = true;
            }
        }
        else if (endAnimationTimer <= 845)
        {
            vEffectLayer.style.backgroundColor = "#c2000b";
        }
        else if (endAnimationTimer <= 855)
        {
            vEffectLayer.style.backgroundColor = "#fea621";
        }
        else if (endAnimationTimer <= 865)
        {
            vEffectLayer.style.backgroundColor = "#f3f91d";
        }
        else if (endAnimationTimer <= 875)
        {
            vEffectLayer.style.opacity = 0.5;
            vEffectLayer.style.backgroundColor = "#f3f91d";
        }
        else if (endAnimationTimer <= 885)
        {
            vEffectLayer.style.backgroundColor = "#fea621";
        }
        else if (endAnimationTimer <= 895)
        {
            vEffectLayer.style.backgroundColor = "#c2000b";
        }
        else if (endAnimationTimer <= 905)
        {
            vEffectLayer.style.backgroundColor = "#fea621";
        }
        else if (endAnimationTimer <= 915)
        {
            vEffectLayer.style.opacity = 0.75;
            vEffectLayer.style.backgroundColor = "#f3f91d";
        }
        else if (endAnimationTimer <= 930)
        //Smoke first appears here.
        {
            vEffectLayer.style.opacity = 1;
            vEffectLayer.style.backgroundColor = "gray";
            metalGear.innerHTML = `<img src = "Assets/metal-gear-destroyed.png" id = "metalGearDestroyed">`;
        }
        else if (endAnimationTimer <= 945)
        //Smoke flickers here.
        {
            vEffectLayer.style.opacity = 0.75;
        }
        else if (endAnimationTimer <= 960)
        {
            vEffectLayer.style.opacity = 0.5;
        }
        else if (endAnimationTimer <= 975)
        {
            vEffectLayer.style.opacity = 0.25;
        }
        else if (endAnimationTimer <= 990)
        {
            vEffectLayer.style.opacity = 0.5;
        }
        else if (smokeRepeat <= 7)
        //The smoke flickers 7 times. The timer is reset 5 times to do this.
        {
            smokeRepeat++;
            endAnimationTimer = 931;
        }
        else if (endAnimationTimer <= 1005)
        //The scene fades to black before switching to the radio screen.
        {
            vEffectLayer.style.backgroundColor = "black";
        }
        else if (endAnimationTimer <= 1020)
        {
            vEffectLayer.style.opacity = 0.5;
        }
        else if (endAnimationTimer <= 1035)
        {
            vEffectLayer.style.opacity = 0.75;
        }
        else if (endAnimationTimer <= 1050)
        {
            vEffectLayer.style.opacity = 1;
        }
        else
        {
            window.location.replace("game-end.html");
        }
    }
    else if (dialogueGo)
    //An alert noting the discovery of the Metal Gear is briefly shown, before starting the final animation.
    {
        endAnimationTimer++;
        if (endAnimationTimer <= 267)
        {
            endDialogueBox.innerHTML = `<div id = "innerDialogueBox"><p>There's the "Plastic Gear." It's time to blow it up.</p></div>`;
        }
        else
        {
            endAnimationTimer = 0;
            //The timer is reset for the rest of the aniation to reuse the time.
            endDialogueBox.innerHTML = ``;
            //The alert is cleared from the screen.
            animationGo = true;
            //The animation is enabled.
        }
    }
    else if (gameEnd)
    {
        clearInterval(gameMainVar);
        dialogueGo = true;
    }
}, 15);


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
        roomID = 5; //Room that is currently being worked on
        DevRoomLoad();
    }
    if(pressedKeys[13]) window.location.replace("game-start.html");
}