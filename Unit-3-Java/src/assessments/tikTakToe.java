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
		//The user's symbol is set for the game.
		
		if (userSymbol.equalsIgnoreCase("X"))
		{
			userSymbol = "X";
			//Corrects to upper case if the user inputed a lower case X
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
		//Creates an ArrayList in the first 3 indices of the outer ArrayList. They don't need names since they exist within an already named ArrayList.
		
		//0 will represent O, 1 will represent X, 2 will represent unoccupied.
		
		for (int i = 0; i < 3; i++)
			//Cycles through the rows of the board.
		{
			for (int j = 0; j < 3; j++)
			//Cycles through the columns of the board.
			{
				board.get(i).add(" ");
				//The i'th ArrayList is gotten, and " " is set as the value for the first 3 indices (0, 1, 2).
			}
		}
		//The needed indexes are added and set to indicate that spot is empty.
		
		displayBoard(board);
		//The board is displayed in the console.
		
		while (!gameEnd)
			//Repeats until the game is signaled to end by win, loss, or tie.
		{
			playerTurn(board);
			//The function for the player's turn.
			gameEndCheck(board);
			//The board is checked for all win conditions after the player's turn.
			if (!gameEnd)
			//This stops the cpu from making another turn after the player has one and signaled the game to end. 
			{
				cpuTurn(board);
				//The function for the cpu's turn.
				gameEndCheck(board);
				//The board is is checked for all win conditions after the player's turn.
			}
		}
		
		
	}
	
	public static void displayBoard(ArrayList<ArrayList<String>> board)
	//For displaying the board's current state.
	{
		System.out.println("");
		
		System.out.println("     1 2 3");
		
		System.out.println("");
		
		System.out.println("1   |" + board.get(0).get(0) + "|" + board.get(0).get(1) + "|" + board.get(0).get(2) + "|");
		
		System.out.println("2   |" + board.get(1).get(0) + "|" + board.get(1).get(1) + "|" + board.get(1).get(2) + "|");
		
		System.out.println("3   |" + board.get(2).get(0) + "|" + board.get(2).get(1) + "|" + board.get(2).get(2) + "|");
		
		System.out.println("");
		
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
		//Repeats until the player chooses a valid spot.
		{
			System.out.println("Which row would you like to place your symbol? (1, 2, 3)");
			playerRow = in.nextInt();
			//The player's row choice is taken.
			System.out.println("Which column would you like to place your symbol (1, 2, 3)");
			playerColumn = in.nextInt();
			//The player's column choice is taken.

			if (board.get(playerRow - 1).get(playerColumn - 1).equalsIgnoreCase(" "))
			//Checks to see if the space is unoccupied.
			{
				canPlace = true;
				//Signals that the program can proceed to end the turn of the player since they have chosen a valid spot to place their mark.
			}
			else
			{
				System.out.println("The spot is occupied, choose another spot to place your symbol.");
			}			
		}
		
		board.get(playerRow - 1).set(playerColumn - 1, userSymbol);
		//Sets the chosen spot equal to the players symbol.
		
		displayBoard(board);
		//The board is displayed after the player has made their turn. 
		
		canPlace = false;
		//Resets the boolean that indicated whether or not a spot if open, so it can be reused by the cpu turn function.
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
				//A number between 1 and 3 is chosen
				if (rowPicker < 1) cpuRow = 1;
				else if (rowPicker < 2) cpuRow = 2;
				else if (rowPicker <= 3) cpuRow = 3;
				//This essentially rounds the values to whole numbers for the program to check and place the cpu's mark. <= is used for the third one to prevent the program from crashing if 3 is generated by the random function, at the trade off of having a marginally increased chance to pick 3 for rows, and for columns in the segment below.
				
				double columnPicker = Math.random() * 3;
				//A number between 1 and 3 is chosen
				if (columnPicker < 1) cpuColumn = 1;
				else if (columnPicker < 2) cpuColumn = 2;
				else if (columnPicker <= 3) cpuColumn = 3;
				//The same as the row pick segment, but a number is chosen for the column instead.
			
				if (board.get(cpuRow - 1).get(cpuColumn - 1).equalsIgnoreCase(" "))
				//Checks to see if the space is unoccupied.
				{
					canPlace = true;
					//Signals that the program can proceed in setting the value that the cpu has chosen by breaking out of the while loop for generating a random selection.
				}	
			}
		
		board.get(cpuRow - 1).set(cpuColumn - 1, cpuSymbol);
		//Sets the chosen spot equal to the players symbol.
		displayBoard(board);
		//The board is displayed after the cpu has made a turn.
		
		canPlace = false;
		//Resetting the valid placement boolean so it can be reused again.
	}
	
	public static int boardFull = 0;
	//Will track the total number of turns that have been made. When it hits nine, a draw will be signaled if no win conditions have been achieved.
	
	public static void gameEndCheck(ArrayList<ArrayList<String>> board)
	//The board ArrayList is passed through to the function that checks the board for a win condition.
	{
		boardFull++;
		
		if (winCheck(board, userSymbol))
		//Checks to see if the user has won.
		{
			gameEnd = true;
			//The game is signaled to end.
			System.out.println("The player has won.");
		}
		if (winCheck(board, cpuSymbol) && !gameEnd)
		//Checks to see if the cpu has won.
		{
			gameEnd = true;
			//The game is signaled to end.
			System.out.println("The CPU has won.");
		}
		
		if (boardFull == 9 && !gameEnd)
		//If the max amount of turns has been reached, and a win condition was not triggered on the last turn (This iteration would be for the last/9th turn).
		{
			gameEnd = true;
			System.out.println("The board is full and there is no winner. The game is a tie");
		}
	}
	
	public static boolean currentCheck;
	//Will hold whether or not the current win check will return as true or false.
	
	public static boolean winCheck(ArrayList<ArrayList<String>> board, String symbol)
	{		
		for (int i = 0; i < 3; i++)
		//Detects win conditions for rows and columns. i cycles rows in the first if statement, and columns in the second if statement. 
		{
			if (board.get(i).get(0).equalsIgnoreCase(symbol) && board.get(i).get(1).equalsIgnoreCase(symbol) && board.get(i).get(2).equalsIgnoreCase(symbol))
			//Checking to see if the win condition has been met for each row.
			{
				currentCheck = true;
				//Changes to true if a win condition is met in a horizontal row.
				System.out.println("Win by row " + (i + 1));
			}
			if (board.get(0).get(i).equalsIgnoreCase(symbol) && board.get(1).get(i).equalsIgnoreCase(symbol) && board.get(2).get(i).equalsIgnoreCase(symbol))
			//Checking to see if the win condition has been met for each column.
			{
				currentCheck = true;
				//Changes to true if a win condition is met in a column.
				System.out.println("Win by column " + (i + 1));
			}
		}
		
		if (board.get(0).get(0).equalsIgnoreCase(symbol) && board.get(1).get(1).equalsIgnoreCase(symbol) && board.get(2).get(2).equalsIgnoreCase(symbol))
		//Checks for a win condition in the diagonal from top left to bottom right.
		{
			currentCheck = true;
			System.out.println("Win by (1,1) (2,2) (3,3) diagonal.");
		}
		if (board.get(0).get(2).equalsIgnoreCase(symbol) && board.get(1).get(1).equalsIgnoreCase(symbol) && board.get(2).get(0).equalsIgnoreCase(symbol))
		//Checks for a win condition in the diagonal from the top right to the bottom left.
		{
			currentCheck = true;
			System.out.println("Win by (1,3) (2,2) (3,1) diagonal.");
		}
			
		return(currentCheck);
		//Returns the value to signal the gameEndCheck to end the game if true, or to continue if false.
	}

}
