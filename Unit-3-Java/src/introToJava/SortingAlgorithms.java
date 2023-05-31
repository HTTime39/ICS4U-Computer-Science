package introToJava;

public class SortingAlgorithms 
{
    public static void main(String[] args)
    {
        //Sorting Algorithms -- Insertion Sort
        int [] list = {7, 3, 5, 8, 2, 4};

        insertionSort(list);
        printLoop(list);
    }

    public static int [] insertionSort(int [] list)
    //Sorting the list.
    {
        for (int i = 1; i < list.length; i++)
        //The for loop starts at 1 since the first index doesn't need to be evaluated.
        {
            int tempHolder = list[i];
            //The number being checked is held in this variable while it is being relocated.
            int sort = i;
            //Holds the number of the index as the while loop moves the number backward in the array.
            
            while (sort > 0 && tempHolder < list[sort - 1])
            //While there are still lower indexes to compare AND the index being evaluated is less than the index before it.
            {
                list[sort] = list[sort - 1];
                //The previous index is advanced if it is greater.
                sort--;
                //It continues to overwrite previous indices until the number before it is less than it, or it is at the beginning of the array.
            }
            list[sort] = tempHolder;
            //The original index is set to it's correct ordered spot in the array, once it can no longer move back since it is greater than the last index, or is at the beginning of the array.
        }
        return(list);
    }

    public static void printLoop(int [] list)
    //Printing the list.
    {
        for (int i = 0; i < list.length; i++)
        {
            System.out.println(list[i] + " ");
        }
    }
}
