let myButton = document.querySelector("#myButton");
myButton.addEventListener("click", buttonFunc, false);

let buttonText = document.querySelector("#buttonText");

function buttonFunc()
{
    buttonText.innerHTML = "<p>Welcome to Exercise Set 1</p>";
}

let joseph = document.querySelector("#joseph");
joseph.addEventListener("click", josephInfo, false);

let josephText = document.querySelector("#josephText");

function josephInfo()
{
    josephText.innerHTML = "<p>This is a picture of the average power of friendship denier.</p>";
}

let box1 = document.querySelector("#box1");
let box2 = document.querySelector("#box2");

box1.addEventListener("click", box1Click, false);
box2.addEventListener("click", box2Click, false);

function box1Click(e)
{
    alert("DIV 1");
    e.stopPropagation();
}
function box2Click(e)
{
    alert("DIV 2");
    e.stopPropagation();
}