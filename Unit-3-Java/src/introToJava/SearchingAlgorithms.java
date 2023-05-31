package introToJava;

public class SearchingAlgorithms {

	public static void main(String[] args) {
		//===== Searching Alogrithms =====//
		
		//Linear Search: Checks an array's value from start to finish or until it finds the value that it is searching for.
		
		int [] values = {0, 1, 2, 3, 4, 5, 6};
		
		System.out.println(linearSearch(values, 3));
		
		//Binary Search: Cuts a data set in half until it finds a desired value. It only works when data is stored in order of least to greatest. 
		
		System.out.println(binarySearch(values, 5));

		//Searching Algorithms with Strings.

		String name1 = "Justin";
		String name2 = "Jack";

		System.out.println(name1.compareTo(name2));
		//The difference between the first letter's place in the alphabet. It will compare the next available letter if the first letters of the strings being compared are the same.
		//You can use these to have the algorithms work with a list that is organized alphabetically.
	}

	public static boolean linearSearch(int [] values, int desiredValue)
	{
		for (int i = 0; i < values.length; i++)
		{
			if (values[i] == desiredValue)
			{
				return(true);
			}
		}
		return(false);
	}
	
	public static boolean binarySearch(int[] values, int desiredValue)
	{
		int low = 0;
		int high = values.length - 1;
		
		while (low <= high)
		//There are numbers to search, as long as the low and the high are not the same.
		{
			int middle = (low + high) / 2;
			int currentValue = values[middle];
			//The value of the index at the center of the current bounds within the dataset.
			
			if (currentValue == desiredValue)
			{
				return true;
			}
			else if (currentValue > desiredValue)
			{
				high = currentValue;
			}
			else if (currentValue < desiredValue)
			{
				low = currentValue;
			}
		}
		return(false);
	}
}
