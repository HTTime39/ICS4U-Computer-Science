let myRecipe = 
{
    title: "Green Curry",
    servings: 6,
    ingredients: ["Curry Paste", "Ginger", "Garlic", "Chicken", "Mushrooms", "Coconut Milk", "Thai Basil", "Limes"],
    instructions:
    {
        step1: "Grind ginger, garlic, and Thai basil, and combine them with the curry paste",
        step2: "Cut chicken into strips, and mushrooms into quarters",
        step3: "Fry chicken and mushrooms together until the chicken is beginning to brown",
        step4: "Add curry paste mixture and coconut milk into the pan with the chicken and mushrooms. Continue to cook until the chicken is fully cooked and the curry paste mixture begins to thicken",
        step5: "Add lime to taste, and take off the heat to serve"
    }
}

document.write("Title: " + myRecipe.title);
document.write("<br>");
document.write("Number of Servings: " + myRecipe.servings);
document.write("<br>");
document.write("Ingredients:");
document.write("<ul>")
for (i = 0; i < 8; i++)
{
    document.write("<li>" + myRecipe.ingredients[i] + "</li>");
    document.write("<br>");
}
document.write("</ul>");
document.write("<br>");
document.write("Cooking Instructions");
document.write("<br>");
document.write("<ul>")
document.write("<li>Step 1: " + myRecipe.instructions.step1 + "</li>");
document.write("<br>");
document.write("<li>Step 2: " + myRecipe.instructions.step2 + "</li>");
document.write("<br>");
document.write("<li>Step 3: " + myRecipe.instructions.step3 + "</li>");
document.write("<br>");
document.write("<li>Step 4: " + myRecipe.instructions.step4 + "</li>");
document.write("<br>");
document.write("<li>Step 5: " + myRecipe.instructions.step5 + "</li>");
document.write("</ul>");