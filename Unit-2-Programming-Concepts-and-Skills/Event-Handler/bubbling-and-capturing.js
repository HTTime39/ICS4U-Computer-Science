const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

grandparent.addEventListener("click", grandparentOne, false);
parent.addEventListener("click", parentOne, false);
child.addEventListener("click", childOne, {once: true});

//e.stopPropagation() terminates an event, and will stop any other events that might try to happen after the current event. For example, outer divs of a nested div will not trigger since the event has been terminated

//{once: true} makes the event so that it only occurs once, and will never fire again after its initial use

function grandparentOne(e)
{
    console.log("Grandparent 1");
    e.stopPropagation();
}
function parentOne(e)
{
    console.log("Parent 1");
    e.stopPropagation();
}
function childOne(e)
{
    console.log("Child 1");
    e.stopPropagation();
}

//The order behaviour changes when capturing is enabled
// grandparent.addEventListener("click", grandparentTwo, true);
// parent.addEventListener("click", parentTwo, true);
// child.addEventListener("click", childTwo, true);

// function grandparentTwo(e)
// {
//     console.log("Grandparent Capture");
// }
// function parentTwo(e)
// {
//     console.log("Parent Capture");
//     //This will terminate the event and stop any further events
// }
// function childTwo(e)
// {
//     console.log("Child Capture");
// }

//========== Mouse Events ==========//
let myButton = document.querySelector("#myButton");

myButton.addEventListener("click", sglButton, false);
function sglButton()
{
    console.log("Button: Single Click");
}

myButton.addEventListener("dblclick", dblButton, false);
//The event being listened for is a double click on the button
function dblButton()
{
    console.log("Button: Double Click");
}

myButton.addEventListener("mouseover", hover, false);
//The event being listened for is when the mouse is hovering over the button
function hover()
{
    console.log("Button: Hovering");
}

myButton.addEventListener("mouseout", hoverout, false);
//The event being listened for is when the mouse leaves the area above the button
function hoverout()
{
    console.log("Button: Left Hovering");
}

myButton.addEventListener("mousedown", mousePressed, false)
//The event being listened for is when the mouse is clicked down
function mousePressed()
{
    console.log("Button: Mouse Pressed");
}

myButton.addEventListener("mouseup", mouseUnpressed, false);
//The event being listened for is when the mouse is released after clicking down
function mouseUnpressed()
{
    console.log("Button: Mouse Unpressed");
}

myButton.addEventListener("mousemove", mouseMoving, false);
//The event being listened for is when the mouse is moving over the button
function mouseMoving()
{
    //console.log("Button: Mouse Moving");
}

//========== Mouse Event Properties ==========//
let myButton1 = document.querySelector("#myButton1");
myButton1.addEventListener("mousedown", function(e)
{
    //console.log(e);
    //Global Mouse Position: Screen X and Screen Y
    //Position of mouse in relation to monitor

    //Browser Mouse Position: Client X and Client Y
    //Position of mouse in relation to the viewport?

    //e.button refers to the button that is pressed to activate the event
    if (e.button == 0)
    {
        console.log("Left Mouse Button Pressed");
    }
    else if (e.button == 1)
    {
        console.log("Middle Button Pressed");
    }
    else if (e.button == 2)
    {
        console.log("Right Button Pressed");
    }
    else
    {
        console.log("Gaming Mouse Hehe");
    }
})

//Triggers the event when the scroll wheel is used
// document.addEventListener("mousewheel", function(e)
// {
//     console.log(e);
// })

document.addEventListener("mousewheel", mouseWheeling, false);

function mouseWheeling(e)
{
    let scrollDirection = e.wheelDelta;
    if(scrollDirection > 0 )
    {
        console.log("Scrolling Up");
    }
    else
    {
        console.log("Scrolling Down");
    }
}

//========== Keyboard Events ==========//
//keydown - Fires when you press down on a key
//keypress - Fires only when you press down on a key that is a character (Doesn't work when pressing Shift Alt etc.)
//keyup - Fires when a key is released from being pressed

window.addEventListener("keydown", function(e)
{
    console.log(e);
})

window.addEventListener("keydown", checkKeyPressed, false)

function checkKeyPressed(e)
{
    if (e.keyCode == 65)
    {
        console.log("The A Key Was Pressed");
    }
}

//Switch Statement
window.addEventListener("keydown", arrowCheck);

function arrowCheck(e)
{
    switch (e.keycode)
    {
        case 37:
            console.log("Left Key Pressed");
            break;
        case 38:
            console.log("Up Key Pressed");
            break;
        case 39:
            console.log("Right Key Pressed");
            break;
        case 40:
            console.log("Down Key Pressed");
            break;
    }
}

//Detecting Multiple Keys Being Presssed
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

let keys = [];

function keysPressed(e)
{
    //Store an entry for EVERY KEY pressed
    keys[e.keyCode] = true;
    //Every index is a number that is associated with a key, and they will be set to true when pressed

    //Ctrl + Shift + 5
    if (keys[17] && keys[16] && keys[53])
    {
        console.log("Ctrl + Shift + 5");
        e.preventDefault();
        //Prevents the computer from using the normal shortcut a keyset would trigger
    }
}
function keysReleased(e)
{
    keys[e.keyCode] = false;
    console.log("Keys Released");
}