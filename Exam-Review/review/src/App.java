import java.util.Scanner;
import java.util.ArrayList;

public class App {
    public static void main(String[] args) throws Exception {
        //Primitive math operators are the same as in JS.

        Scanner in = new Scanner(System.in);

        try
        //The code here tries to run
        {
            System.out.println("Input an integer");
            int input = in.nextInt();
            System.out.println("You chose " + input);
        }
        catch (Exception e)
        //If an exception occurs, this code will run instead of letting the program crash | A variable is set to hold all of the information about the exception
        {
            System.out.println("You did not input an integer");
        }

        //If statements, while loops, and for loops are all the same in Java as they are in JS.

        ArrayList <ArrayList<Integer>> myArray = new ArrayList();

        myArray.add(new ArrayList<Integer>());
        myArray.add(new ArrayList<Integer>());
        myArray.add(new ArrayList<Integer>());

        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                myArray.get(i).add(j + i * 3);
            }
        }

        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                System.out.println(myArray.get(i).get(j));
            }
        }

        //A linear search algorithm will search through the array for the desired value from the start to the end of the array until it finds what it is looking for.
        //A binary search algorithm will look at the halfway point of an array organized in ascending order, and will check the middle of the dataset depending on whether or not the desired value is greater than or less than the value currently being evaluated. 
        //The insertion sort method will order a list into ascending order by shuffling around the indexes of the array, by checking whether or not the evaluated value is greater than or less than the values it is next to. 
    }
}
