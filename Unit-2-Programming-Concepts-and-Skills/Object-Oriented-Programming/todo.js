//Create variables
let form = document.querySelector(".form");
let lists = document.querySelector(".lists");
let input = document.querySelector(".input");

//Array
let todoArr = [];

//Create Event Listener
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //Object
    let id = Math.random();
    let todo = new Todo(id, input.value);
    console.log(id);
    console.log(todo);

    //Adding To the List
    //"..." spread operator. Works the same as the .append method in Python
    todoArr = [...todoArr, todo];

    UI.displayData();
    UI.clearInput();
    UI.removeToDo();
})

//Class Creation
class Todo
{
    constructor(id, todo)
    {
        this.id = id;
        this.todo = todo;
    }
}

class UI
{
    //An object doesn't need to be instantiated to use a static function within a class
    static displayData()
    {
        let displayData = todoArr.map((item) => {
            return `
                <div class = "todo">
                    <p>${item.todo}</p>
                    <span class = "remove">🗑</span>
                </div>
            `
            //$ lets you use JS variables to insert them into HTML
        })
        lists.innerHTML = (displayData).join(" ");
        //Changes the comma between the array elements to the argument of the function
    }
    static clearInput()
    {
        input.value = "";
    }
    static removeToDo()
    {
        lists.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove"))
            {
                e.target.parentElement.remove();
                //The element within the list item is checked to see if it is a delete button through its class
                
            }
        });
    }
}