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
		
		ArrayList <ArrayList<Integer>> board = new ArrayList<ArrayList<Integer>>();
		//ArrayList that holds ArrayLists that holds integers.
		
		board.add(new ArrayList<Integer>());
		board.add(new ArrayList<Integer>());
		board.add(new ArrayList<Integer>());
		//Creates an ArrayList in the first 3 indeces of the outer ArrayList. They don't need names since they exist within an already named ArrayList.
		
		//0 will represent O, 1 will represent X, 2 will represent unoccupied.
		
		for (int i = 0; i < 3; i++)
			//Cycles through the rows of the board.
		{
			for (int j = 0; j < 3; j++)
			//Cycles through the columns of the board.
			{
				board.get(i).add(2);
				//The i'th ArrayList is gotten, and 2 is set as the value for the first 3 indeces (0, 1, 2).
			}
		}
		//The needed indexes are added and set to indicate that spot is empty.
		
		Boolean gameOver = false;
		//Variable tracking whether or not the game has finished.
		
		while (!gameOver)
		{
			playerTurn(board);
			cpuTurn(board);
			gameWinCheck(board);
		}

		
		
	}
	
	public static void playerTurn(ArrayList<ArrayList<Integer>> board)
	//The ArrayList is passed through to the function for the player's turn.
	{
		
	}
	
	public static void cpuTurn(ArrayList<ArrayList<Integer>> board)
	//The ArrayList is passed through to the function for the cpu's turn.
	{
		
	}
	
	public static void gameWinCheck(ArrayList<ArrayList<Integer>> board)
	//The board ArrayList is passed through to the function that checks the board for a win condition.
	{
		
	}

}
