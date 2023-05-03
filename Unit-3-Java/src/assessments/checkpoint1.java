package assessments;
import java.util.Scanner;
import java.io.*;

public class checkpoint1 {

	public static void main(String[] args) {
		//Program 1: Change Calculator
		Scanner in = new Scanner(System.in);
		System.out.println("How much change do you need in cents?");
		double change = in.nextDouble();
		int toonie = 0;
		int loonie = 0;
		int quarter = 0;
		int dime = 0;
		int nickel = 0;
		int penny = 0;
		
		while (change > 0)
		{
			if (change - 200 >= 0)
			{
				change -= 200;
				toonie++;
			}
			else if (change - 100 >= 0)
			{
				change -= 100;
				loonie++;
			}
			else if (change - 25 >= 0)
			{
				change -= 25;
				quarter++;
			}
			else if (change - 10 >= 0)
			{
				change -= 10;
				dime++;
			}
			else if (change - 5 >= 0)
			{
				change -= 5;
				nickel++;
			}
			else if (change -1 >= 0)
			{
				change -= 1;
				penny++;
			}
		}
		
		System.out.println("Your change is " + toonie + " toonies, " + loonie + " loonies, " +  quarter + " quarters, " + dime + " dimes, " + nickel + " nickels, " + penny + " pennies.");
		
		//Program 2: Printing
		System.out.println("How many copies do you want to print:");
		int copies = in.nextInt();
		double costPerPage = 0;
		if (0 <= copies && copies <= 99)
		{
			costPerPage = 0.30;
		}
		else if (100 <= copies && copies <= 499)
		{
			costPerPage = 0.28;
		}
		else if (500 <= copies && copies <= 749)
		{
			costPerPage = 0.27;
		}
		else if (750 <= copies && copies <= 1000)
		{
			costPerPage = 0.26;
		}
		else if (1000 < copies)
		{
			costPerPage = 0.25;
		}
		
		System.out.println("The price per page will be: " + costPerPage);
		System.out.println("The total cost is: " + costPerPage * copies);
		
		//Program 3: Package Check
		System.out.println("What is the weight of your package in kilograms:");
		double weight = in.nextDouble();
		System.out.println("What is the length in centimeters:");
		double length = in.nextDouble();
		System.out.println("What is the width in centimeters:");
		double width = in.nextDouble();
		System.out.println("What is the height in centimeters:");
		double height = in.nextDouble();
		
		double volume = length * width * height;
		
		if (27 < weight && 100000 < volume)
		{
			System.out.println("Package is too heavy and too large");
		}
		else if (27 < weight)
		{
			System.out.println("Package is too heavy");
		}
		else if (100000 < volume)
		{
			System.out.println("Package is too large");
		}
		else
		{
			System.out.println("The package meets all of the requirements");
		}
		
		//Program 4: Loops
		int count = 1;
		while (count <= 100)
		{
			System.out.println(count);
			count++;
		}
		
		for (int i = 100; i >= 1; i--)
		{
			System.out.println(i);
		}
		
		int count1 = 1;
		while (count1 <= 50)
		{
			System.out.println(count1);
			count1 += 2;
		}
		
		for (int i = 1; i <= 50; i++)
		{
			if (i % 2 == 0)
			{
				System.out.println(i);
			}
		}
		
		int count2 = 1;
		while (count2 <= 20)
		{
			if (count2 % 6 == 0)
			{
				System.out.println(count2);
			}
			count2++;
		}
		
		//Program 5: Security
		in.nextLine();
		System.out.println("What is your username?");
		String userName = in.nextLine();
		System.out.println("What is your password?");
		String passWord = in.nextLine();
		
		int intruderCount = 0;
		String userNameAttempt = "";
		String passWordAttempt = "";
		
		do
		{
			System.out.println("Input username:");
			userNameAttempt = in.nextLine();
			System.out.println("Input password:");
			passWordAttempt = in.nextLine();
			
			intruderCount++;
		}
		while (intruderCount != 3 && !userNameAttempt.equals(userName) && !passWordAttempt.equals(passWord));

		if (userNameAttempt.equals(userName) && passWordAttempt.equals(passWord))
		{
			System.out.println("Welcome!");
		}
		else 
		{
			System.out.println("Intruder Alert");
		}
		
		//Program 6: Files
		try
		{
			FileWriter file = new FileWriter("file01.txt");
			PrintWriter fileW = new PrintWriter(file);
			fileW.println("A sentence");
			fileW.close();
			
			FileReader rFile = new FileReader("file01.txt");
			Scanner fsc = new Scanner(rFile);
			
			String text = fsc.nextLine();
			System.out.println(text);
		}
		catch (Exception e)
		{
			System.out.println("File Not Found");
		}
				
	}

}