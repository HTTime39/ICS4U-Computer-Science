//Please Kill Me

//ENCAPSULATION
class Employee
{
    //Setter
    setEmpDetails(name, id, phoneNo)
    {
        this.name = name;
        this.id = id;
        this.phonNo = phoneNo;
    }

    //Getter
    getEmpName()
    {
        return this.name;
    }
    
    getEmpId()
    {
        return this.id;
    }

    getphoneNo()
    {
        return this.phoneNo;
    }
}

//Using the setters and getters
let emp1 = new Employee();

emp1.setEmpDetails("John", 1001, 1234567890);

console.log(emp1.getEmpName());


//INHERITANCE
class Car
{
    setName(name)
    {
        this.name = name;
    }

    startEngine()
    {
        console.log("Engine started for " + this.name);
    }

    stopEngine()
    {
        console.log("Engine stopped for " + this.name);
    }
}

//All of the properties and methods of the Car class also apply to the Toyota class
class Toyota extends Car
{
    topSpeed(speed)
    {
        console.log("Top speed for " + this.name + " is " + speed);
    }
}

let toyota1 = new Toyota();
//Referring to methods contained within the Car class using an object that was created using the Toyota class
toyota1.setName("Corolla");
toyota1.startEngine();
toyota1.stopEngine();


//POLYMORPHISM
class Animal
{
    constructor(name)
    {
        this.name = name;
    }

    eats()
    {
        console.log(this.name + " eats dog food");
    }
}

let animal = new Animal("Dog");

class Alligator extends Animal
{
    eats()
    {
        console.log(this.name + " eats human");
    }
}

let doge = new Animal("Doge");
let watson = new Alligator("Watson");

doge.eats();
watson.eats();