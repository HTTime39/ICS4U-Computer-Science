/*
    FOR LOOP
    Set variable to 1: Starting condition
    Stop when counter reaches 20: Terminating condition
    Increment counter by 1: Counter

        IF the remainder of the current iteration number  divided by 15 = 0
            print "Fizzbuzz"
        ELSE IF the above is false and the remainder of the current iteration number divided by 3 = 0 
            print "Fizz"
        ELSE IF the above is false and the remainder of the current iteration number divided by 5 = 0
            print "Buzz"
        ELSE 
            print the current iteration number
*/

function fizzBuzz() 
{
    for (let i = 1; i <= 20; i++)
    {
        if (i % 15 == 0)
        {
            console.log("Fizzbuzz");
        }
        else if (i % 3 == 0)
        {
            console.log("Fizz");
        }
        else if (i % 5 == 0)
        {
            console.log("Buzz");
        }
        else
        {
            console.log(i);
        }
    }
}

fizzBuzz();