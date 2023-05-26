package assessments;
import java.util.Scanner;
import java.util.ArrayList;

public class tikTakToe {
	
	public static Scanner in = new Scanner(System.in);

	public static String userSymbol;
	//Tracks the player's symbol
	public static String cpuSymbol = "X";
	//Tracks the CPU's symbol. Set to X by default
	public static boolean gameEnd = false;
	//Boolean changes to signal the end of the game. 

	public static void main(String[] args) {
		System.out.println("Welcome to Tik Tak Toe.");
		System.out.println("Please enter the symbol you want to play as (X/O)");
		
		userSymbol = in.nextLine();
		
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
		
		while (!gameOver)
		{
			playerTurn(board);
			gameEndCheck(board);
			cpuTurn(board);
			gameEndCheck(board);
		}
		
		
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
	
	public static int playerRow;
	//Global variable for the player's row choice.
	public static int playerColumn;
	//Global variable for the player's column choice.
	public static boolean canPlace = false;
	//Global variable that indicates to while loops that the spot trying to be placed on is empty.
	
	public static void playerTurn(ArrayList<ArrayList<String>> board)
	//The ArrayList is passed through to the function for the player's turn.
	{
		while (!canPlace)
		//Repeats until the cpu chooses a valid spot.
		{
			System.out.println("Which row would you like to place your symbol? (1, 2, 3)");
			playerRow = in.nextInt();
			System.out.println("Which column would you like to place your symbol (1, 2, 3)");
			playerColumn = in.nextInt();

			if (board.get(playerRow - 1).get(playerColumn - 1).equalsIgnoreCase(" "))
			//Checks to see if the space is unoccupied.
			{
				canPlace = true;
			}
			else
			{
				System.out.println("The spot is occupied, choose another spot to place your symbol.");
			}			
		}
		
		board.get(playerRow - 1).set(playerColumn - 1, userSymbol);
		//Sets the chosen spot equal to the players symbol.
		
		displayBoard(board);
		
		canPlace = false;
		//Resets the boolean that indicated whether or not a spot if open.
	}
	
	public static int cpuRow;
	//Variable for cpu picking a row.
	public static int cpuColumn;
	//Variable for cpu picking a column.
	
	
	public static void cpuTurn(ArrayList<ArrayList<String>> board)
	//The ArrayList is passed through to the function for the cpu's turn.
	{
		while (!canPlace)
			//Repeats until the player chooses a valid spot.
			{
				double rowPicker = Math.random() * 3;
				//A number between 0 and 8 is chosen. 0 - 2 will be row 1, 3 - 5 will be row 2, 6 - 8 will be row 3.
				if (rowPicker < 1) cpuRow = 1;
				else if (rowPicker < 2) cpuRow = 2;
				else if (rowPicker <= 3) cpuRow = 3;
				//This makes it easier since a decimal value is generated, to pick between the three numbers.
				
				double columnPicker = Math.random() * 9;
				//A number between 0 and 8 is chosen. 0 - 2 will be column 1, 3 - 5 will be column 2, 6 - 8 will be column 3.
				if (0 <= columnPicker && columnPicker <= 2) cpuColumn = 1;
				else if (3 <= columnPicker && columnPicker <= 5) cpuColumn = 2;
				else if (6 <= columnPicker && columnPicker <= 8) cpuColumn = 3;
				//This makes it easier since a decimal value is generated, to pick between the three numbers.
			
				if (board.get(cpuRow - 1).get(cpuColumn - 1).equalsIgnoreCase(" "))
					//Checks to see if the space is unoccupied.
				{
					canPlace = true;
				}	
			}
		
		board.get(cpuRow - 1).set(cpuColumn - 1, cpuSymbol);
		//Sets the chosen spot equal to the players symbol.
		displayBoard(board);
		
		canPlace = false;
		//Resetting the valid placement boolean.
	}
	
	public static int boardFull = 0;
	//It is set to true, because the check will assume that the board is full until proven otherwise.
	
	public static void gameEndCheck(ArrayList<ArrayList<String>> board)
	//The board ArrayList is passed through to the function that checks the board for a win condition.
	{
		boardFull++;
		
//		if (winCheck(board, userSymbol))
//		//Checks to see if the user has won.
//		{
//			gameEnd = true;
//			//The game is signaled to end.
//			System.out.println("Congradulations. The players has won.");
//		}
//		if (winCheck(board, cpuSymbol))
//		//Checks to see if the cpu has won.
//		{
//			gameEnd = true;
//			//The game is signaled to end.
//			System.out.println("The player has won.");
//		}
		
		if (boardFull == 9 && !gameEnd)
		//If the max amount of turns has been reached, and a win condition was not triggered on the last turn (This iteration would be for the last turn).
		{
			gameEnd = true;
			System.out.println("The board is full and there is no winner. The game is a tie");
		}
	}
	
	public static boolean currentCheck;
	//Will hold whether or not the current win check will return as true or false.
	
//	public static boolean winCheck(ArrayList<ArrayList<String>> board, String symbol)
//	{		
//		for (int i = 0; i < 3; i++)
//		//Detects win conditions for rows and columns.
//		{
//			if (board.get(i).get(0).equalsIgnoreCase(symbol) && board.get(i).get(1).equalsIgnoreCase(symbol) && board.get(i).get(2).equalsIgnoreCase(symbol))
//			//Checking to see if the win condition has been met for each row.
//			{
//				currentCheck = true;
//				//Changes to true if a win condition is met in a horizontal row.
//			}
//			if (board.get(0).get(i).equalsIgnoreCase(symbol) && board.get(1).get(i).equalsIgnoreCase(symbol) && board.get(0).get(i).equalsIgnoreCase(symbol))
//			//Checking to see if the win condition has been met for each column.
//			{
//				currentCheck = true;
//				//Changes to true if a win condition is met in a column.
//			}
//		}
//		
//		if (board.get(0).get(0).equalsIgnoreCase(symbol) && board.get(1).get(1).equalsIgnoreCase(symbol) && board.get(2).get(2).equalsIgnoreCase(symbol))
//		//Checks for a win condition in the diagonal from top left to bottom right.
//		{
//			currentCheck = true;
//		}
//		if (board.get(0).get(2).equalsIgnoreCase(symbol) && board.get(1).get(1).equalsIgnoreCase(symbol) && board.get(2).get(0).equalsIgnoreCase(symbol))
//		//Checks for a win condition in the diagonal from the top right to the bottom left.
//		{
//			currentCheck = true;
//		}
//			
//		return(currentCheck);
//	}

}
