#! python3
# userinputsol.py - Adding the user input solution on it

# start the program 
import trial1

# start the loop for wrong input 
while True:
    try:
        print("Enter the number to check if prime or not:")
        number = int(input())

        # check if prime
        trial1.prime_number(number)

        # break if the input is true and a number
        break
    except Exception as e:
        print("Please enter a real number!")