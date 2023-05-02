/*========== First Revision of Movement Engine ==========*/
//Initialize position counters --- the origin is the top left corner
let snakeX = 0; //Tracks the x position of snake as an integer
let snakeXString = "0vh"; //Tracks the x position of snake as a string with units appended so it can be read by css
let snakeY = 0; //Tracks the y position of snake as an integer
let snakeYString = "0vh"; //Tracks the y position of snake as a string with units appended so it can be read by

let snake = document.querySelector("#snake");
document.addEventListener("keydown", snakeMove);

let pressedKeys = []; //Array to hold all currently held buttons

function snakeMove(e)
{
    switch (e.keyCode)
    {
        case 68:
            snakeX++;
            snakeXString = snakeX + "vh";
            snake.style.marginLeft = snakeXString;
            break;
        case 65:
            snakeX--;
            snakeXString = snakeX + "vh";
            snake.style.marginLeft = snakeXString;
            break;
        case 87:
            snakeY--;
            snakeYString = snakeY + "vh";
            snake.style.marginTop = snakeYString;
            break;
        case 83:
            snakeY++;
            snakeYString = snakeY + "vh";
            snake.style.marginTop = snakeYString;
            break;
    }
}

setInterval(gameMain, 1000);

function gameMain()
{
    
}