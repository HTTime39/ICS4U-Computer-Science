package introToJava;
import java.util.Scanner;
import java.io.*;

public class methods {
	
	//Placing the scanner outside the main string makes it available to all classes within the public class
	static Scanner in = new Scanner(System.in);

	public static void main(String[] args) {
		myMethod();
		
		
		int [] numbers = {123, 456, 789};
		
		System.out.println("Enter 1 to display all numbers. \nEnter 2 to view an index number:");
		int choice = in.nextInt();
		
		if (choice == 1)
		{
			displayAll(numbers);
			//An array is passed into a method
		}
		else if (choice == 2)
		{
			displaySelect(numbers);
		}
		
		System.out.println("Please input a number");
		int number1 = in.nextInt();
		System.out.println("Please input another number");
		int number2 = in.nextInt();
		
		System.out.println(calculate(number1, number2));

	}
	
	public static void myMethod()
	{
		myMethod1();
		System.out.println("Kill Yourself");
	}
	
	public static void myMethod1()
	{
		System.out.println("Hi");
	}
	
	public static void displayAll(int numbers[])
	//Passing through the array
	{
		for (int i = 0; i < numbers.length; i++)
		{
			System.out.println(numbers[i]);
		}
	}
	
	public static void displaySelect(int numbers[])
	{
		System.out.println("What number do you want to see");
		int choice = in.nextInt();
		System.out.println(numbers[choice - 1]);
	}
	
	public static int calculate(int num1, int num2)
	{
		int sum = num1 + num2;
		return(sum);
	}
	
}
