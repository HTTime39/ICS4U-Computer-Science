//Records and unrecords keys that are pressed.
document.addEventListener("keydown", keysDown); //Records keys when pressed
document.addEventListener("keyup", keysUp); //Unrecords keys when unpressed

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

let textBox = document.querySelector("#textBox");

//Strings holding dialogue HTML
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
    `<p>Big Boss: You are not permitted to use weapons for anything other than actually destroying the “Plastic Gear.”</p>`,
    `<p>Big Boss: You must sneak past all the guards and cameras unnoticed.</p>`,
    `<p>Big Boss: Your visor enables you to see the fields of view of guards and cameras. They will appear as red boxes.</p>`,
    `<p>Big Boss: Do not enter the red boxes, and you should remain undetected.</p>`,
    `<p>Snake: Anything else I should know?</p>`,
    `<p>Big Boss: That is all Snake. Keep your foot on the gas pedal.</p>`,
    `<p>Snake: Roger that. Snake out.</p>`
]

let dialogueTracker = 0;
function aPressed()
{
    if (dialogueTracker == 15)
    {
        window.location.replace("main.html");
        //Sends the user to the main game. Replace makes it so that the user is unable to go back with the arrows in the top left of the browser which might break something.
    }
    else if (pressedKeys[8])
    //Let's you skip through the dialogue.
    {
        dialogueTracker = 15;
        textBox.innerHTML = dialogue[dialogueTracker];
    }
    else if (pressedKeys[13])
    //Proceeds through the dialogue.
    {
        dialogueTracker++;
        textBox.innerHTML = dialogue[dialogueTracker];
    }
}