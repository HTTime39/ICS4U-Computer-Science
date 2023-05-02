package assessments;
import java.util.Scanner;

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
		
		//Hello Github

	}

}









