//======== LESSON 8: OOP 1 ========

//--- Standard Object
let student = {
    name: "Justin",
    doingWork: false,
    age: 17,

    sayName: function(){
        console.log(this);
    }

}

student.sayName();

console.log(student);

//----- Example 1
class Student {
    constructor(name, age){
        this.name = name; //--> FIELDS
        this.age = age; //--> FIELDS
    }

    getName(){ //--> METHODS
        return this.name;
    }

    getAge(){ //--> METHODS
        return this.age;
    }

}

//------- Objects
let student1 = new Student("Kevin", 17);
let student2 = new Student("Polina", 17);

console.log(student1.getName());
console.log(student1.getAge());

console.log(student2.getName());
console.log(student2.getAge());


//-------- EXAMPLE 2

class House {
    constructor(address, price, residents){
        this.address = address;
        this.price = price;
        this.residents = residents;
    }

    getAddress(){
        return this.address;
    }
    
    getPrice(){
        return this.price;
    }

    getResidents(){
        return this.residents;
    }
}

//----- Objects

let house1 = new House("123 Road Street", 2000000, 40);
let house2 = new House("321 Street Road", 20, 4);
let house3 = new House("132 Strode", 10000000000000, 0.5);

console.log(house1.getPrice() + " dollars");