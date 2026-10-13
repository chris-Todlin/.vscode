#! python3
# game1.py - A number guessign game 

# import the random module 
from random import randrange as rd

# function to compare the userguess
def compareGuess(userguess, compchoice):
    if userguess == compchoice:
        print("You guessed it right!")
        return True
    elif userguess < compchoice:
        print("Your guess is too low!")
        return False
    else:
        print("Your guess is too high!")
        return False

# adding the safety net such 
try:
        # user define a range
    min = int(input("Enter the minimum number of the range: "))
    max = int(input("Enter the maximum number of the range: "))
    # system set the target
    TARGET = rd(min, max + 1)

    # initialte the chances(loop)
    chances = 7
    print(f"You have {chances} chances to guess the number.")
    for i in range(chances):
        # another one here too 
        try:
            # user guesses
            userguess = int(input(f"Guess a number between {min} and {max}: ({chances - i} chances left) "))
            
            # compare the guess with the target
            if compareGuess(userguess, TARGET):
                break
        except ValueError:
            chances = chances + 1  # Give the user another chance if they enter invalid input
            print("Invalid input! Please enter an integer.")
    else:
        print(f"Sorry, you've used all your chances. The number was {TARGET}.")
except Exception as e:
    print(f"An error occurred: {e}. Please enter valid integers for the range.")    