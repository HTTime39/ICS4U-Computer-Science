//Records and unrecords keys that are pressed.
document.addEventListener("keydown", keysDown); //Records keys when pressed
document.addEventListener("keyup", keysUp); //Unrecords keys when unpressed

let vEffectLayer = document.querySelector("#vEffectLayer");

let bgm = new Audio("Audio/start-screen.mp3");

//Array to hold all currently held buttons
let pressedKeys = [];

//Records keys when pressed
function keysDown(e)
{
    pressedKeys[e.keyCode] = true;
    bgm.play();
}

//Unrecords keys when unpressed
function keysUp(e)
{
    aPressed();
    pressedKeys[e.keyCode] = false;
}

let textBox = document.querySelector("#textBox");
//Text box that holds on screen messages.

//Strings holding dialogue HTML
let dialogue = 
[
    `<p>Snake: This is Solid Snake. The “Plastic Gear” has been destroyed.</p>`,
    `<p>Big Boss: Well done Snake. You’ve saved the world from the terrorists of “Outer Heaven” once again.</p>`,
    `<p>Big Boss:  I’ve dispatched a helicopter for extraction. It’ll be there shortly. See you back at base.</p>`,
    `<p>Snake: Roger that. See you at base. Snake out.</p>`,
]

let dialogueTracker = 0;
//Tracks the progression of the dialogue.
let gameRestartTimer = 0;
//Timer for the fade animation.
let gameEndFade = false;
//Tells the recursive function when to start fading.
let gameRestart = setInterval(function gameRestartFade()
{
    if (gameEndFade)
    {
        gameRestartTimer++;
        if (gameRestartTimer <= 1)
        {
            vEffectLayer.style.opacity = 0.25;
            vEffectLayer.style.backgroundColor = "black";
        }
        else if (gameRestartTimer <= 2)
        {
            vEffectLayer.style.opacity = 0.5;
        }
        else if (gameRestartTimer <= 3)
        {
            vEffectLayer.style.opacity = 0.75;
        }
        else if (gameRestartTimer <= 4)
        {
            vEffectLayer.style.opacity = 1;
        }
        else
        {
            window.location.replace("start-game.html");
            //Sends the user back to the starting screen.
        }
    }
}, 750);

function aPressed()
{
    if (dialogueTracker == 3)
    {
        gameEndFade = true;
    }
    else if (pressedKeys[13])
    //Proceeds through the dialogue.
    {
        dialogueTracker++;
        textBox.innerHTML = dialogue[dialogueTracker];
    }
}