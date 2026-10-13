#! python3

# solution1.py - This tries to include the looop  for the incorrect inputs 

import trial1

# start the program
while True:

    # ask for the input 
    try:
        print("Enter the number of multiplication to: ")
        limitNumber = int(input())

        # then set the number right 
        trial1.multiplicationTable1(limitNumber)
        # then break the loop 
        break
    except Exception as e:
        print("Please enter a number!!")