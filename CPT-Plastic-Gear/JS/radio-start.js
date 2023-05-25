//Records and unrecords keys that are pressed.
document.addEventListener("keydown", keysDown); //Records keys when pressed
document.addEventListener("keyup", keysUp); //Unrecords keys when unpressed


let bgm = new Audio("Audio/start-screen.mp3");
//Object for the BGM of this screen

//Array to hold all currently held buttons
let pressedKeys = [];

//Records keys when pressed
function keysDown(e)
{
    pressedKeys[e.keyCode] = true; //Checks to see if the enter button has been pressed.
    if (bgm.paused) bgm.play();
    //When the bgm stops playing, it will call it again.
}

//Unrecords keys when unpressed
function keysUp(e)
{
    aPressed();
    pressedKeys[e.keyCode] = false;
}

let textBox = document.querySelector("#textBox");
//The on screen message is changed by addressing the innerHTML of this div.

//String array holding dialogue HTML. Each index is a screen of dialogue.
let dialogue = 
[
    `<p>Snake: This is Solid Snake, respond please.</p>`,
    `<p>Big Boss: Snake, your mission is to infiltrate the terrorist base, “Outer Heaven” and destroy their secret weapon, “Plastic Gear”.</p>`,
    `<p>Snake: What is the “Plastic Gear?”</p>`,
    `<p>Big Boss: It is a 3D printed bipedal combat walker vehicle capable of firing nuclear missiles from any location.</p>`,
    `<p>Snake: 3D printed? Won’t that break easily? Why did “Outer Heaven” choose to manufacture it out of plastic?</p>`,
    `<p>Big Boss: Our intel suggests they used a special 3D printing technique to make it harder than a diamond.</p>`,
    `<p>Big Boss: As for why they chose plastic, we suspect that it is so they can sneak it past airport security.</p>`,
    `<p>Snake: I see… Does that mean this is a live fire mission?</p>`,
    `<p>Big Boss: We don’t want any evidence left behind to trace our operation.</p>`,
    `<p>Big Boss: You are not permitted to use guns. You are to only plant a bomb once finding the "Plastic Gear"</p>`,
    `<p>Big Boss: You must sneak past all the guards and cameras unnoticed.</p>`,
    `<p>Big Boss: Your visor enables you to see the fields of view of guards and cameras. They will appear as red boxes.</p>`,
    `<p>Big Boss: Do not enter the red boxes, and you should remain undetected.</p>`,
    `<p>Snake: Anything else I should know?</p>`,
    `<p>Big Boss: If you need my help, you can press the H key to contact me on your radio.</p>`,
    `<p>Big Boss: That is all Snake. Keep your foot on the gas pedal.</p>`,
    `<p>Snake: Roger that. Snake out.</p>`
]

let dialogueTracker = 0;
//The dialogue to display next is tracked here.
let gameStartTimer = 0;
//Timer for the fade animation.
let startFade = false;
//Tells the recursive function when to start fading.
let gameStart = setInterval(function gameStartFade()
//This function is called once every 750ms.
{
    if (startFade == true)
    //Will only run when the fade is ready to at the end of the dialogue.
    {
        gameStartTimer++;
        if (gameStartTimer <= 1)
        {
            //The layer fades to black by increasing the opacity.
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
        else
        {
            window.location.replace("main.html");
            //Sends the user back to the starting screen.
        }
    }
}, 750);

function aPressed()
//When the enter button is pressed, the dialogue will proceed, and once it reaches the end, it will signal for the screen to fade to black.
//If delete is pressed, it will skip to the end of the dialogue.
{
    if (dialogueTracker == 16)
    {
        startFade = true;
    }
    else if (pressedKeys[8])
    //Let's you skip through the dialogue.
    {
        dialogueTracker = 16;
        textBox.innerHTML = dialogue[dialogueTracker];
    }
    else if (pressedKeys[13])
    //Proceeds through the dialogue.
    {
        dialogueTracker++;
        textBox.innerHTML = dialogue[dialogueTracker];
    }
}