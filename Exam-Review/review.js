let para = document.querySelector("#para");
//An object is created representing the item in the document with the para id.

para.style.color = "black";
//The colour of the element with the para id is changed to black. 

let x = 2;
let y = 3;
let z = 5;

//Basic arithmatic operators
console.log(x + y);
console.log(z - y);
console.log(x * y);
console.log(z / x);
console.log(z % x);

console.log(Math.floor(8.25));
//Rounding down
console.log(Math.ceil(8.25));
//Rounding up

let container = document.querySelector("#container");

container.append("Appended Text");
//Appending text to a container

container.innerHTML = "innerHTML Text";
//Setting the innerHTML to a string value

console.log(container.getAttribute("class"));
//Printing the value of an attribute

container.classList.add("class1");

document.addEventListener("click", function() {console.log("Clicked")});
//An event listener that fires whenever the document is clicked. 

//Object
let obj = 
{
    name: "Nathaniel",
    age: 18,
    awake: true,

    //Encapsulation
    getName()
    {
        return(this.name);
        //The this keyword refers to the attribute within the object.
    },
    getAge()
    {
        return(this.age);
    },
    getAwake()
    {
        return(this.awake);
    }
}

console.log(obj.getName());
console.log(obj.getAge());
console.log(obj.getAwake());

//Conditional Statements
let stop = false;
let counter = 0;
while (!stop)
{
    if (counter != 10)
    {
        counter++;
        console.log(counter);
    }
    else
    {
        stop = true;
    }
}
//A do while loop runs at least once, even if the condition is untrue.

let myArray = [5, 3, 4, 9, 6];

for (i = 0; i < myArray.length; i++)
{
    console.log(myArray[i]);
}

myArray.push(7);
//Appends to the end of the array
console.log(myArray[5]);
myArray.pop();
//Removes the last index in the array
console.log(myArray);

class myClass
{
    name = "Batman";
    alias = "Andy Liu";
    color = "black";

    catchPhrase()
    {
        console.log("Woof");
    }
    catchPhrase1()
    {
        console.log("Grr");
    }
}

class myClass1 extends myClass
//Inheritance
{
    name = "SpiderMan";
    alias = "AndyLiu";
    color = "red";

    //Polymorphism
    catchPhrase()
    {
        console.log("Woof1");
    }
}

let Andy = new myClass();
Andy.catchPhrase();
Andy.catchPhrase1();

let Andy1 = new myClass1();
Andy1.catchPhrase();
Andy1.catchPhrase1();