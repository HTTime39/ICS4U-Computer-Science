/*========== Exercise 1 ==========*/
class Person
{
    constructor(name, age)
    {
        this.name = name;
        this.age = age;

        console.log(this.describe());
    }

    describe()
    {
        return(this.name + " is " + this.age + " years old.");
    }
}

let Ash = new Person("Ash", 10);

/*========== Exercise 2 ==========*/
class Person1
{
    setInfo(name, address, phone)
    {
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

    getName()
    {
        console.log("My name is " + this.name);
    }
    getAddress()
    {
        console.log(this.name + " lives at " + this.address);
    }
    getPhone()
    {
        console.log(this.name + "'s phone number is " + this.phone);
    }
}

let Brock = new Person1();
Brock.setInfo("Brock", "1 Pewter City", 12345678910);
Brock.getPhone();

/*========== Exercise 3 ==========*/
class SmartPhone
{
    constructor(name, storage, colour)
    {
        this.name = name;
        this.storage = storage;
        this.colour = colour;
    }
    getName()
    {
        return(this.name);
    }
    getStorage()
    {
        return(this.storage);
    }
    getColour()
    {
        return(this.colour);
    }
}
class Google extends SmartPhone
{
    gMessage()
    {
        return("We are not stealing your data.");
    }
}
class Samsung extends SmartPhone
{
    sMessage()
    {
        return("Please buy our folding devices too. It cost too much to engineer them and we need some sales :(");
    }
}

let Pixel = new Google("Pixel", "128GB", "green");
let S23 = new Samsung("S23", "256GB", "violet");

console.log("The " + Pixel.getName() + " has " + Pixel.getStorage() + " of storage and is " + Pixel.getColour() + ". " + Pixel.gMessage());

console.log("The " + S23.getName() + " has " + S23.getStorage() + " of storage and is " + S23.getColour() + ". " + S23.sMessage());

/*========== Exercise 4 ==========*/
class Student
{
    constructor(name, year)
    {
        this.name = name;
        this.year = year;
    }

    feelAboutSchool()
    {
        return("I hate my school work.");
    }
    doWork()
    {
        return("I can do my school work later.");
    }
}
class GoodStudent extends Student
{
    feelAboutSchool()
    {
        return("I will do good at my school work.");
    }
    doWork()
    {
        return("I am doing my school work now.");
    }
}

let alex = new Student("Alex", 12);
let nicholas = new GoodStudent("Nicholas", 12);

console.log(alex.name + " is in grade " + alex.year + ". " + alex.name + " says " + alex.feelAboutSchool() + " " + alex.doWork());

console.log(nicholas.name + " is in grade " + nicholas.year + ". " + nicholas.name + " says " + nicholas.feelAboutSchool() + " " + nicholas.doWork());

/*========== Exercise 5 ==========*/
/*
The spread operator ... can be used to take an existing array, and add a value to the next available index in that array, or you could create a new array that is a copy of the existing array with the new value appended to the next available index. 

Example:
array = [...array, x]

The $ symbol allows you to insert the value of a JS variable into a string of text. This is especially useful when you are setting the innerHTML of an element to a variable but you want the markup of HTML around what you are inserting. 

Example:
`
<p>${variable}</p>
`

The static keyword can be used before a function that is declared within a class, and allows you to call the function without needing to instantiate an object using the class first. 

Example:
class myClass
{
    static myMethod()
    {
        console.log("Hi");
    }
}
myClass.myMethod();

The map() method creates an array using what is being returned to it in combination with the items in the array it is being called on. It will loop through each defined value of the existing array and sequentially set the values to the new array.

Example:
newArray = array.map((item) => {return`Hi ${item}`});

The item keyword refers to the current object that is being refereced. For example, when using the map() method, the item keyword is used refer to each object that is being referenced in the array sequentially.

Example:
newArray = array.map((item) => {return`Hi ${item.attribute}`});

The join() method changes what character appear between the elements of an array. 

Example:
console.log(array.join("!"));
*/

/*========== Exercise 6 ==========*/
/*
You might name the class that contains all of the objects within the game gameMain or onScreen to represent that it is the main class that contains objects for all of the objects that you see on the screen while playing the game. 

Some of the objects that make up Pac-Man might include an object representing the player character. There would also be an object for each ghost that appears on the screen while playing the game. Also, an object for every fruit and power pellet, as well as possibly for all of the score pellets that you have to eat to complete a level. There might also be an object for each of the walls that make up the maze.

Object for the Player:
LOOP
    IF up key is pressed
        IF no wall is above Pac-Man
            MOVE up
    IF down key is pressed
        IF no wall is below Pax-Man
            MOVE down
    IF left key is pressed
        IF no wall is to the left of Pac-Man
            MOVE left
    IF right key is pressed
        IF no wall is the the right of Pac-Man
            MOVE right
    
    IF Pac-Man is touching Ghost
        END game
*/