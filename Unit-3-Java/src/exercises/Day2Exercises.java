package exercises;
import java.util.Scanner;

public class Day2Exercises {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		
		//Part 1
		System.out.println("Insert two numbers:");
		int num0 = in.nextInt();
		int num1 = in.nextInt();
		if (num0 > num1)
		{
			System.out.println(num0 + " is greater than " + num1);
		}
		else if (num0 < num1)
		{
			System.out.println(num1 + " is greater than " + num0);
		}
		else
		{
			System.out.println("The two numbers are equal");
		}
		
		//Part 2
		System.out.println("Insert three unique numbers");
		int num20 = in.nextInt();
		int num21 = in.nextInt();
		int num22 = in.nextInt();
		
		int order0 = 0;
		int order1 = 0;
		int order2 = 0;
		
		//Checking for the greatest number
		if (num20 > num21 && num20 > num22)
		{
			order0 = num20;
		}
		else if (num21 > num20 && num21 > num22)
		{
			order0 = num21;
		}
		else if (num22 > num21 && num22 > num20)
		{
			order0 = num22;
		}
		
		//Checking for the least number
		if (num20 < num21 && num20 < num22)
		{
			order2 = num20;
		}
		else if (num21 < num20 && num21 < num22)
		{
			order2 = num21;
		}
		else if (num22 < num21 && num22 < num20)
		{
			order2 = num22;
		}
		
		//Checking for the middle number
		if (num20 != order0 && num20 != order2)
		{
			order1 = num20;
		}
		else if (num21 != order0 && num21 != order2)
		{
			order1 = num21;
		}
		else if (num22 != order0 && num22 != order2)
		{
			order1 = num22;
		}
		
		System.out.println(order2 + " " + order1 + " " + order0);
		
		//Part 3
		System.out.println("What is your grade?");
		
		int grade = in.nextInt();
		
		if (grade < 50)
		{
			System.out.println(":(");
		}
		else if (50 <= grade && grade <= 59)
		{
			System.out.println("D");
		}
		else if (60 <= grade && grade <= 69)
		{
			System.out.println("C");
		}
		else if (70 <= grade && grade <= 79)
		{
			System.out.println("B");
		}
		else if (80 <= grade && grade <= 94)
		{
			System.out.println("A");
		}
		else if (95 <= grade)
		{
			System.out.println("A+");
		}
		
		//Part 4
		System.out.println("How are you feeling today? (Great, Good, Okay, Terrible)");
		in.nextLine();
		String mood = in.nextLine();
		
		if (mood.equalsIgnoreCase("Great"))
		{
			System.out.println("Nice, continue having a great day!");
		}
		else if (mood.equalsIgnoreCase("Good"))
		{
			System.out.println("That's pretty good. Maybe it will be even better!");
		}
		else if (mood.equalsIgnoreCase("Okay"))
		{
			System.out.println("It could be worse");
		}
		else if (mood.equalsIgnoreCase("Terrible"))
		{
			System.out.println("Maybe tomorrow will be better");
		}
		else
		{
			System.out.println("You didn't input a valid mood");
		}
		
		//Part 5
		System.out.println("Input two integers and an operation that should be used on them (+, -, *, /):");
		
		System.out.println("Integer 1:");
		int num50 = in.nextInt();
		System.out.println("Integer 2:");
		int num51 = in.nextInt();
		System.out.println("Operation (+, -, *, /):");
		String op = in.nextLine();
		op = in.nextLine();
		
		if (op.equals("+"))
		{
			System.out.println(num50 + num51);
		}
		else if (op.equals("-"))
		{
			System.out.println(num50 - num51);
		}
		else if (op.equals("*"))
		{
			System.out.println(num50 * num51);
		}
		else if (op.equals("/"))
		{
			System.out.println(num50 / num51);
		}
		else
		{
			System.out.println("An invalid operator was entered");
		}
	}

}










