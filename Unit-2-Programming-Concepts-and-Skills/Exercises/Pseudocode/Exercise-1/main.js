// Ask a user to input their name and age and display different messages based on the age entered. For ages under 12, print “you are just a kid”, for ages between 12 and 18, print “you are a teenager”, for ages between 18 and 75, print “you are an adult”, and for ages over 75, print “you are a senior citizen” 

/*
PROMPT the user's name
PROMPT the user's age

IF age <= 12
    PRINT "You are just a kid"
ELSE IF 12 < age <= 18
    PRINT "You are a teenager"
ELSE IF 18 < age < 75
    PRINT "You are an adult"
ELSE IF 75 <= age
    PRINT "You are a senior citizen"
*/

uName = prompt("What is your name?");
uAge = parseInt(prompt("What is your age?"));

if (uAge <= 12)
{
    alert("You are just a kid");
}
else if (12 < uAge && uAge <=18)
{
    alert("You are a teenager");
}
else if (18 < uAge && uAge < 75)
{
    alert("You are an adult");
}
else if (75 <= uAge)
{
    alert("You are a senior citizen");
}