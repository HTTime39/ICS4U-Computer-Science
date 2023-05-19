//Records and unrecords keys that are pressed.
document.addEventListener("keydown", keysDown); //Records keys when pressed
document.addEventListener("keyup", keysUp); //Unrecords keys when unpressed

//Objects for HTML elements.
let startText = document.querySelector("#startText");
let enterText = document.querySelector("#enterText");

let gameStartAudio = new Audio("Audio/game-start.mp3");

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
    aPressed();
    pressedKeys[e.keyCode] = false;
}

let gameStartTimer = 0;
//Timer for the fade animation.
let startFade = false;
//Tells the recursive function when to start fading.
let gameStart = setInterval(function gameStartFade()
{
    if (startFade == true)
    //Will only run when the fade is ready to at the end of the dialogue.
    {
        gameStartTimer++;
        if (gameStartTimer <= 1)
        {
            gameStartAudio.play();
            vEffectLayer.style.opacity = 0.25;
            vEffectLayer.style.backgroundColor = "black";
        }
        else if (gameStartTimer <= 2)
        {
            vEffectLayer.style.opacity = 0.5;
        }
        else if (gameStartTimer <= 3)
        {
            vEffectLayer.style.opacity = 0.75;
        }
        else if (gameStartTimer <= 4)
        {
            vEffectLayer.style.opacity = 1;
        }
        else if (gameStartTimer <= 9)
        {
            //Do Nothing
        }
        else
        {
            window.location.replace("radio-start.html");
            //Sends the user back to the starting screen.
        }
    }
}, 750);

function aPressed()
//When enter is pressed, the fade animation is signaled to start and will transition to the next screen.
{
    if (pressedKeys[13])
    //Starts the game.
    {
        startFade = true;
    }
}

//Two variables for timers for the two animations on the screen.
let animationTimer = 0;
let animationTimer1 = 0;
//Variables for tracking the y coordinate of the title, appending units, and then changing the CSS property.
let titleY = 10;
let titleYString = "10vh";
//Function is called once every 75ms.
setInterval(function startScreenAnimation()
{
    //Title bobs up and down.
    animationTimer++;
    if (animationTimer <= 18)
    {
        titleY += 0.25;
        titleYString = titleY + "vh";
        startText.style.marginTop = titleYString;
    }
    else if (animationTimer <= 36)
    {
        titleY -= 0.25;
        titleYString = titleY + "vh";
        startText.style.marginTop = titleYString;
    }
    else
    {
        animationTimer = 0;
    }

    //Enter prompt flashes.
    animationTimer1++;
    if (animationTimer1 <= 10)
    {
        enterText.style.opacity = 1;
    }
    else if (animationTimer1 <= 20)
    {
        enterText.style.opacity = 0;
    }
    else 
    {
        animationTimer1 = 0;
    }
}, 75);