package exercises;
import java.util.Scanner;

public class Day1Exercises {

	public static void main(String[] args) {
		//Task 1
		System.out.println("What is your name?");
		Scanner in = new Scanner(System.in);
		String name = in.nextLine();
		System.out.println("Hello " + name);
		
		//Task 2
		System.out.println("Insert two numbers:");
		int num0 = in.nextInt();
		int num1 = in.nextInt();
		System.out.println(num0 + num1);
		
		//Task 3
		System.out.println("Insert four of your grades");
		double grade0 = in.nextDouble();
		double grade1 = in.nextDouble();
		double grade2 = in.nextDouble();
		double grade3 = in.nextDouble();
		System.out.println((grade0 + grade1 + grade2 + grade3) / 4);
		
		//Task 4
		System.out.println("Insert length and width of field:");
		double length = in.nextDouble();
		double width = in.nextDouble();
		System.out.println(length * width / 43560);
		
		//Task 5
		System.out.println("Insert a number to convert to kilometers:");
		double x = in.nextDouble();
		System.out.println(x * 1.61);
		
		//Task 6
		System.out.println("Insert cost of meal:");
		double cost = in.nextDouble();
		System.out.println("Tax " + (Double)(cost * 0.13));
		System.out.println("Tip "+ (Double)((cost * 1.13) * 0.2));
		System.out.println("Total " + (Double)((cost * 1.13) * 1.2));
	}

}
