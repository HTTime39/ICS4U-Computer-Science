/*querySelector Family*/
    //let element = document.querySelector("id" OR ".class" OR "element");
    //These three different items can be refered to with the function.

let main = document.querySelector("#main");
let pictureContainer = document.querySelector(".images");

/*querySelectorAll*/
let images = document.querySelectorAll(".images");
console.log(images);
//An NodeList/array of the elements with that class will be printed in the console

for (let i = 0; i < images.length; i++)
{
    let image = images[i];
    console.log(image.getAttribute("src"));
    //An attribute can be taken by addressing a class or id. The attribute to be addressed is placed as the argument of the function
}

images[0].style.height = "800px";
//Addessing one item that has the class referenced by the object. .style indicates a styling property will be referenced: the height property is addressed and set to 800px

/*Adding Elements to the Page*/
let body = document.body;
//A variable is set to represent the elements of the body
body.append("Hello World");
//An element is appended to the end of the currently existing elements of the body
let div = document.createElement("div");
//A variable is set to contain a div
body.append(div);
//The empty div is appended to the body of the document

/*innerText and textContent*/
div.innerText = "Hello";
div.innerContent = "Hello";

/*Removing Elements*/
let spanBye = document.querySelector("#bye");
//Gets the span with the specified id
spanBye.remove();
//Removes the indicated span from the page

/*Modifying Attributes*/
let spanHi = document.querySelector("#hi");
console.log(spanHi.getAttribute("id"));
console.log(spanHi.getAttribute("title"));

/*Setting/Changing Attributes*/
spanHi.setAttribute("title", "Hello1");
console.log(spanHi.getAttribute("title"));
//The first argument of the function defines the attribute being addressed, while the second argument defines what the content of the attribute should be changed/set to

/*Removing Attributes*/
spanHi.removeAttribute("title");
console.log(spanHi.getAttribute("title"));

/*Modifying Classes*/
/*Adding Classes*/
spanHi.classList.add("new-class");

/*Removing Classes*/
spanHi.classList.remove("hi1");

/*Toggling Classes*/
spanHi.classList.toggle("hi2");
spanHi.classList.toggle("hi3");
//If the class is present, it is removed, if the class is not there, it will be added

/*Manipulative Style*/
spanHi.style.color = "red";
//Refers to the CSS property and changes it to what the line equals on the right