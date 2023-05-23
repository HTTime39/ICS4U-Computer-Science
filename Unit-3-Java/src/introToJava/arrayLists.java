package introToJava;
import java.util.ArrayList;
import java.util.Scanner;


public class arrayLists {

    static Scanner in = new Scanner(System.in);

    public static void main(String[] args) {
        ArrayList <Integer> numbers = new ArrayList();
        //Class Name, Non-Primitive Datatype, Object Name, new Class Name.

        System.out.println(numbers);
        //An empty array is printed.

        numbers.add(8);
        numbers.add(10);
        numbers.add(12345);
        //Appending values to the array.

        System.out.println(numbers);
        //Printing the whole array.

        System.out.println(numbers.get(0));
        System.out.println(numbers.get(1));
        System.out.println(numbers.get(2));
        //Printing individual indexes of the array.

        System.out.println(numbers.size());
        //Printing the length of the array.

        numbers.remove(0);
        //Removes the specified index, and shifts all of the indexes that come after it down one. 

        numbers.clear();
        //Clears all indexes from the array.
        System.out.println(numbers);

        /*===Example with Strings===*/
        ArrayList <String> students = new ArrayList();
        //An ArrayList is created with the String datatype.

        while (true)
        {
            System.out.println("Please enter students from your class. Type 'done' to indicate you are finished");

            String name = in.nextLine();

            if (name.equalsIgnoreCase("done"))
            {
                break;
                //Breaks from the while loop.
            }

            students.add(name);
        }

        System.out.println(students);

        System.out.println("Enter 1 to drop a student from the class.");

        int choice = in.nextInt();

        if (choice == 1)
        {
            dropStudent(students);
        }

    }
    
    public static void dropStudent(ArrayList <String> students)
    //Passing through the ArrayList as a parameter.
    {
        System.out.println("Class List = " + students);
        System.out.println("Enter the name of the student who dropped: ");
        in.nextLine();
        //Skipping :(
        String name = in.nextLine();

        for (int i = 0; i < students.size(); i++)
        //Removes the selected name from the ArrayList.
        {
            if (name.equalsIgnoreCase(students.get(i)))
            {
                students.remove(i);
            }
        }

        System.out.println(students);
    }

}