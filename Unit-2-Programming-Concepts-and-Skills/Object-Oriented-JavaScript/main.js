//Information about a person written procedurally
let jamesAge = 17;
let jamesEyes = "brown";
let jamesLikes = ["programming", "music", "sports"];
let jamesBirthCity = "Newmarket";
let jamesBirthProvince = "Ontario";

document.write("All about James:");
document.write("<br>");
document.write("James is " + jamesAge);
document.write("<br>");
document.write("James has " + jamesEyes + " eyes");
document.write("<br>");
document.write("James likes " + jamesLikes[0] + ", " + jamesLikes[1] + ", and " + jamesLikes[2]);
document.write("<br>");
document.write("James was born in " + jamesBirthCity + ", " + jamesBirthProvince);

//The same set of information contained within an object
let james = 
{
    age: 17, 
    eyes: "brown",
    likes: ["programming", "music", "sports"],
    isAStudent: true,
    birthplace:
    {
        city: "Newmarket",
        province: "Ontario"
    }
}

document.write("<br>");
document.write("<br>");

//Referring to the properties of the object using dot notation
document.write("All about James: As an Object");
document.write("<br>");
document.write("James is " + james.age + " years old");
document.write("<br>");
document.write("James has " + james.eyes + " eyes");
document.write("<br>");
document.write("James likes " + james.likes[0] + ", " + james.likes[1] + ", and " + james.likes[2]);
document.write("<br>");
document.write("James was born in " + james.birthplace.city + ", " + james.birthplace.province);

//Bracket Notation
let aboutMe = 
{
    homeTown: "Sharon, ON",
    hair: "black"
}

let myHomeTown = aboutMe.homeTown;
console.log(myHomeTown);

let myHair = aboutMe["hair"];
console.log(myHair);

//An object's property can be changed from outside the function
aboutMe.hair = "grey";
console.log(aboutMe.hair);

//A property can also be created within the object
aboutMe.job = "teacher";

//A property can also be deleted
delete aboutMe.job;

//Looping through an object
while (james.age <= 40)
{
    document.write("James is " + james.age + " years old");
    document.write("<br>");
    james.age++;
}

/*========== Arrays and Objects ==========*/
let student =
{
    firstName: "David",
    lastName: "Jones",
    strengths: ["Science", "Music"],
    exams:
    {
        midterm: 92,
        final: 88
    }
}
console.log(student.exams.final);

let avg = (student.exams.midterm + student.exams.final)/2;
console.log(avg);

let shoppingCart =
[
    {
        product: "Bean Bag Chair",
        price: 70,
        quantity: 2
    },
    {
        product: "Water Filter",
        price: 25,
        quantity: 1
    },
    {
        products: "Textbooks",
        price: 200,
        quantity: 5
    }
];

console.log(shoppingCart);

console.log(shoppingCart[0]);

console.log(shoppingCart[0].product);
console.log(shoppingCart[0].price);
console.log(shoppingCart[0].quantity);

let totalCost = 0;
for (i = 0; i < shoppingCart.length; i++)
{
    totalCost += shoppingCart[i].price * shoppingCart[i].quantity;
}

console.log(totalCost);