// The use of events is essentially waiting for something happen, and then runnning a function associated with that action.

//Creating an event listener
document.addEventListener("click", changeColor, false);
//The first argument tells the listener that the input it is listening for is a click
//The second argument tells the listener the function that will be called when the input is detected
//The third argument turns on and off capturing.

//Removing an event listener
document.removeEventListener("click", changeColor, false);

function changeColor()
{
    document.body.style.backgroundColor = "red";
}

let myButton = document.querySelector("#myButton");
myButton.addEventListener("click", function(e)
{
    console.log(e);
    //e is an object that contains information about the event that called the function where e is the parameter
})