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

//Later rooms are put right into the collision function


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


//==================== COLLISION DETECTION FUNCTION (RECURSIVE)============//


setInterval(gameCollision, 30);
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
    <img src = "Assets/door-top.png" class = "doorVerticalSpriteTop">
</div>

<!--Player Character's Div Containing Sprite-->
<div id = "snake">
    <img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>`;

let room1 = `
<!--Floor-->
<img src = "Assets/floor.png" id = "floor">
<!--Door Mat-->
<div class = "doorVertical" id = "doorBottom">
    <img src = "Assets/door-bottom.png" class = "doorVerticalSpriteBottom">
</div>
<div class = "doorVertical" id = "doorTop">
    <img src = "Assets/door-top.png" class = "doorVerticalSpriteTop">
</div>
<!--Player Character's Div Containing Sprite-->
<div id = "snake">
<img src = "Assets/snake-forward.png" id = "snakeSprite">
</div>`;

let room2 = `
<img src = "Assets/floor.png" id = "floor">
<!--Door Mat-->
<div class = "doorVertical" id = "doorTop">
    <img src = "Assets/door-top.png" class = "doorVerticalSpriteTop">
</div>
<!--Player Character's Div Containing Sprite-->
<div id = "snake">
<img src = "Assets/snake-forward.png" id = "snakeSprite">
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
    
    }
    
    function collisionRoom2()
    {
    
    }
    
    function DevRoomLoad()
    {
        snakeX = 53;
        snakeY = 4;
    
        roomLoad();
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

            dtExists = true;
            dbExists = true;
            break;
        case 2:
            document.getElementById("gameViewPort").innerHTML = room2;
            snake = document.querySelector("#snake");

            dtExists = true;
            dbExists = false;
            break;
    }

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
    console.log("Loaded Room " + roomID);
}


//==================== SUB-RECURSIVE FUNCTION FOR DEV CONTROL =============//


setInterval(gameSecondary, 750);
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
        roomID = 0; //Room that is currently being worked on
        DevRoomLoad();
    }
}