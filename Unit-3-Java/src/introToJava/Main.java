package introToJava;
//Importing the scanner class
import java.util.Scanner;
//Importing all of the io libraries
import java.io.*;

public class Main {

	public static void main(String[] args) {
		
//		//Print Statements
//		System.out.println("Hello World!");
//		
//		//Variables and Data Types
//		int num = 5;
//		System.out.println(num);
//		
//		//Double is to 15 decimal places
//		//Float is to 7 decimal places
//		double num1 = 5.2;
//		System.out.println(num1);
//		
//		//Boolean
//		boolean b = true;
//		System.out.println(b);
//		
//		//Char
//		char c = 't';
//		System.out.println(c);
//		
//		//String
//		String str = "Hello";
//		System.out.println(str);
//		
//		//Basic Operators
//		int x = 5;
//		int y = 7;
//		int z = 57;
//		
//		//Adding
//		int sum = x + y + z;
//		System.out.println(sum);
//		
//		//Subtracting
//		int diff = x - y - z;
//		System.out.println(diff);
//		
//		//Multiplying
//		int prod = x * y * z;
//		System.out.println(prod);
//		
//		//Division
//		//Typecasting: (double) will convert the variable being addressed into the datatype being specified within the parenthesis
//		double div = (double)z / y;
//		System.out.println(div);
//		
//		//Exponents
//		//The first arguemnt is the base of the exponent, the second argument is the power it is being raised to
//		double exp = Math.pow(x, y);
//		System.out.println(exp);
//		
//		//Modulus
//		int mod = z % x;
//		System.out.println(mod);
//		
//		//Inputs and Scanners
//		//Instatiating a scanner
		Scanner sc = new Scanner(System.in);
//		
//		//Intaking a string from the terminal
//		String scanned = sc.nextLine();
//		System.out.println(scanned);
//		
//		//Intaking an integer from the terminal
//		int scanned1 = sc.nextInt();
//		System.out.println(scanned1);
//		
//		//Intaking a double from the terminal
//		double scanned2 = sc.nextDouble();
//		System.out.println(scanned2);

		// ===== Lesson 2: Conditionals =====
//		
//		/*
//		 * > Greater than
//		 * < Less than
//		 * == Equal to
//		 * >= Greater than or Equal to
//		 * <= Less than or Equal to
//		 * != Not Equal to
//		 */
//		
//		int x = 6;
//		int y = 7;
//		int z = 10;
//		
//		boolean compare = x < y;
//		System.out.println(compare);
//		compare = y < x;
//		System.out.println(compare);
//		
//		//And, Or, and Not Operators
//		/*
//		 * && both statements are true
//		 * || one or both of the statements are true
//		 * ! when one or multiple statements are not true
//		 */
//		
//		//Conditional Statements
//		int num = 5;
//		
//		if (num < 10)
//		{
//			System.out.println("Number is less than 10");
//		}
//		else if (num == 10)
//		{
//			System.out.println("Number is equal to 10");
//		}
//		else
//		{
//			System.out.println("Number is greater tha 10");
//		}
//		
//		System.out.println("Please enter your average");
//		
//		int avg = sc.nextInt();
//		
//		System.out.println("Do you participate in extracurriculars? Answer with true or false");
//		
//		boolean extra = sc.nextBoolean();
//		
//		if (avg > 90 && extra == true)
//		{
//			System.out.println("Congradulations! Welcome to hell");
//		}
//		else
//		{
//			System.out.println("That's tough");
//		}
//		
//		//Sometimes the scanner likes to cry and you have to call it to get its attention which it will ignore but it will then listen to the next time you call it. 
//		sc.nextLine();
//		//Conditional Statements with Strings
//		System.out.println("Please enter your name");
//		String name = sc.nextLine();
//		
//		if (name.equalsIgnoreCase("BOB"))
//		{
//			System.out.println("Hi Bob");
//		}
//		
//		System.out.println("F");
		
		// ===== Lesson 3: Loops =====
//		//while loop
//		int num = 1;
//		while (num <= 100)
//		{
//			System.out.println("The number is " + num);
//			num++;
//		}
//		
//		//do while loop
//		do
//		//The same as a while loop, but it will always run at least once, even if the condition is not true
//		{
//			System.out.println("Alex is cringe");
//		}
//		while (Math.random() * 10 < 5);
//		
//		System.out.println("How many students are in the class?: ");
//		int numStudents = sc.nextInt();
//		int count = 1;
//		int mark;
//		int sum = 0;
//		int hMark = 0;
//		
//		while (count <= numStudents)
//		{
//			System.out.println("Insert mark number " + count + ": ");
//			mark = sc.nextInt();
//			sum += mark;
//			count++;
//			
//			if (hMark < mark)
//			{
//				hMark = mark;
//			}
//		}
//		
//		System.out.println("The class average is: " + (sum / numStudents));
//		System.out.println("The highest mark in the class is: " + hMark);
//		
//		//for loops
//		for (int i = 1; i <= 100; i++)
//		{
//			System.out.println(i);
//		}
		
		//Lesson 4: Error Catching and Reading + Writing Files
		
		try
		{
			System.out.println("Enter your favourite number");
			//int favNum = sc.nextInt();			
		}
		catch(Exception e)
		//Indicates to catch an exception. e is the event
		{
			System.out.println("Invalid Input");
			System.out.println(e);
		}
		
		//Reading Files
		File file = new File("ComputerScience.txt");
		//An object representing a file. The argument of the function is the name of the file
		
		if (file.exists())
		//Determines whether or not the file exists
		{
			System.out.println("File Located");
		}
		else
		{
			System.out.println("File not found");
		}
		
		try
		{
			FileWriter fw = new FileWriter("ComputerScience.txt");
			//An object representing the file, but it is ready to write with now.
			PrintWriter pw = new PrintWriter(fw);
			//An object that can be addressed to write to the file specified by parentheses.
			pw.println("Hi");
			//This will overwrite the whole file, and does not append it.
			pw.println("What's up?");
			pw.println("Trevor get off your phone");
			pw.close();
		}
		catch (Exception e)
		{
			System.out.println("File Not Found");
		}
		
		//Reading from the TestFile.txt
		try
		{
		FileReader fr = new FileReader("TestFile.txt");
		Scanner sc1 = new Scanner(fr);
		//A scanner is created and pointed towards the file
		while (sc1.hasNext()) 
		//while there are more lines to take in from the file
		{
		String words = sc1.nextLine();
		System.out.println(words);
		}
			
		}
		catch (Exception e)
		{
			System.out.println("File Not Found");
		}
		
}
}









