//CONSOLE LOG AND VARIABLES
console.log("Hello World!"); //I want to kill myself.
//window.alert("Hello");

var myVariable0 = "true"; //Can for some reason be reinstantiated.
console.log(myVariable0);

let myVariable1 = "true"; //Cannot be reinstantiated, acts as a variable does in other languages.
console.log(myVariable1);

//Instantiating a blank variable, and then assigning it a value.
let age;
age = 17;
console.log(age);

//DATATYPES
console.log("Hello World"); //String
console.log(age); //Integer

let student = true; //Boolean
console.log(student);

let myVariable2 = Number("800"); //Number() will change the datatype of the argument to a number datatype
console.log(myVariable2 + 1);

//IF ELSE STATEMENTS
let safeToProceed = true;
if (safeToProceed)
{
    console.log("You shall pass!");
}
else
{
    console.log("You shall not pass!");
}

//COMPARISON OPERATORS
// == Compares two values for equality
// === Compares two values for equality and for the same datatype
// != Compares two values for inequality
// > Compares two values for greater than
// < Compares two values for less than

let myAge = 17;
if (myAge > 30)
{
    console.log("You are old.");
}
else if (myAge > 20)
{
    console.log("You are getting there.");
}
else if (myAge > 10)
{
    console.log("You've still got some good years ahead.");
}
else
{
    console.log("You are a small person");
}

//WRITING TO THE HTML DOCUMENT
document.getElementById("header").innerHTML = "We are reviewing JavaScript."; //Gets the "header" ID and changes the HTML inside the tag to the equivalent of the function
document.write("<h1>Hello!</h1>"); //Will write the HTML output to the bottom of the page.

//MATH FUNCTIONS
let myNum;
myNum = Math.round(3.5); //rounds to the nearest whole number 5^
myNum = Math.floor(3.9); //rounds down always
myNum = Math.floor(3.1); //rounds up always
myNum = Math.pow(3, 2); //First argument is raised to the exponent of the second argument
myNum = Math.sqrt(64); //Square root of the argument
myNum = Math.abs(-1); //Absolute value of the argument
myNum = Math.min(1, 5, 2, 4, 3); //Returns the least value of the set
myNum = Math.max(1, 5, 3, 4, 2); //Returns the greatest value of the set
myNum = Math.PI; //Returns the value of Pi

let x = Math.floor(Math.random() * 6) + 1;
console.log(x);

//FUNCTIONS
//Declaring a function
function myFunction()
{
    console.log("Hello!");
}

//Calling a function
myFunction();

function alexIsCringe(speed, time)
{
    console.log(speed * time);
}

alexIsCringe(100, 3);

//LOOPS
let userName = "";
// while (userName == "")
// {
//     userName = prompt("What Is Your Name?");
// }

console.log("Hello " + userName);

for (let i = 0; i < 20; i++)
{
    if (i == 7)
    {
        continue; //Breaks from the current loop iteration, but not out of the loop entirely
    }
    console.log(i + 1);
    if (i >= 9)
    {
        break; //Breaks from current loop
    }
}

//ARRAYS
let cars = ["Mustang", "Corvette", "Jaguar"]; //Mr. Pelosi's garage

//Addressing indexes of the array
console.log(cars);
console.log(cars[0]);
console.log(cars[1]);
console.log(cars[2]);

//Adding and Removing Indexes
cars.push("Tesla"); //Appends to the next available index within the array
cars.pop(); //Removes the highest indexed item within the array
cars.shift(); //Removes the 0th element of the array
cars.unshift("Ferrari"); //Shifts every indexed item up an index and indexes the argument as the 0th element

console.log(cars);

let rainbowColours = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];

for (let i = 0; i < 7; i++)
{
    console.log(rainbowColours[i]);
}