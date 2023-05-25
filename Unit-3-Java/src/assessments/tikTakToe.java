package assessments;
import java.util.Scanner;
import java.util.ArrayList;

public class tikTakToe {
	
	static Scanner in = new Scanner(System.in);

	public static void main(String[] args) {
		System.out.println("Welcome to Tik Tak Toe.");
		System.out.println("Please enter the symbol you want to play as (X/O)");
		
		String userSymbol = in.nextLine();
		//Tracks the player's symbol
		String cpuSymbol = "X";
		//Tracks the CPU's symbol. Set to X by default
		if (userSymbol.equalsIgnoreCase("X"))
		{
			userSymbol = "X";
			//Corrects to uppercase if the user inputed a lowercase X
			cpuSymbol = "O";
			//Changes the CPU's symbol to O
		}
		else if (userSymbol.equalsIgnoreCase("O"))
		{
			userSymbol = "O";
			//Corrects the casing of the O
			//The cpuSymbol does not need to be set since the default would be set here.
		}
		
		ArrayList <ArrayList<String>> board = new ArrayList<ArrayList<String>>();
		//ArrayList that holds ArrayLists that holds integers.
		
		board.add(new ArrayList<String>());
		board.add(new ArrayList<String>());
		board.add(new ArrayList<String>());
		//Creates an ArrayList in the first 3 indeces of the outer ArrayList. They don't need names since they exist within an already named ArrayList.
		
		//0 will represent O, 1 will represent X, 2 will represent unoccupied.
		
		for (int i = 0; i < 3; i++)
			//Cycles through the rows of the board.
		{
			for (int j = 0; j < 3; j++)
			//Cycles through the columns of the board.
			{
				board.get(i).add(" ");
				//The i'th ArrayList is gotten, and 2 is set as the value for the first 3 indeces (0, 1, 2).
			}
		}
		//The needed indexes are added and set to indicate that spot is empty.
		
		Boolean gameOver = false;
		//Variable tracking whether or not the game has finished.
		
		displayBoard(board);
		
//		while (!gameOver)
//		{
//			playerTurn(board);
//			cpuTurn(board);
//			gameWinCheck(board);
//		}

		
		
	}
	
	public static void displayBoard(ArrayList<ArrayList<String>> board)
	//For displaying the board's current state.
	{
		System.out.println("     1 2 3");
		
		System.out.println("");
		
		System.out.println("1   |" + board.get(0).get(0) + "|" + board.get(0).get(1) + "|" + board.get(0).get(2) + "|");
		
		System.out.println("2   |" + board.get(1).get(0) + "|" + board.get(1).get(1) + "|" + board.get(1).get(2) + "|");
		
		System.out.println("3   |" + board.get(2).get(0) + "|" + board.get(2).get(1) + "|" + board.get(2).get(2) + "|");
		
	}
	
	static int playerRow;
	//Global variable for the player's row choice.
	static int playerColumn;
	//Global variable for the player's column choice.
	static boolean canPlace = false;
	//Global variable that indicates to while loops that the spot trying to be placed on is empty.
	
	public static void playerTurn(ArrayList<ArrayList<String>> board)
	//The ArrayList is passed through to the function for the player's turn.
	{
		System.out.println("Which row would you like to place your symbol? (1, 2, 3)");
		playerRow = in.nextInt();
		System.out.println("Which column would you like to place your symvol (1, 2, 3)");
		playerColumn = in.nextInt();
		
		if (board.get(playerRow - 1).get(playerColumn - 1).equalsIgnoreCase(" "))
			//Checks to see if the space is unoccupied.
		{
			canPlace = false;
		}
		else
		{
			System.out.println("The spot is occupied, choose another spot to place your symbol.");
		}
	}
	
	public static void cpuTurn(ArrayList<ArrayList<String>> board)
	//The ArrayList is passed through to the function for the cpu's turn.
	{
		
	}
	
	public static void gameWinCheck(ArrayList<ArrayList<String>> board)
	//The board ArrayList is passed through to the function that checks the board for a win condition.
	{
		
	}

}
