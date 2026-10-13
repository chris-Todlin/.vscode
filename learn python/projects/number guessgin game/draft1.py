#! python3
# draft1.py - The first draft of the number guessing game

# adding the choice of the comp
from random import randint as randomNumber

def numberGuessingGame():
    # adding the loop to deal with the error in inputs
    while True:
        # ask for the input
        print("Enter your guess between 1 - 100: ")
        guess = input()
        
        # check if the input is decimal 
        if not guess.isdecimal():
            print("The input must be a number")
            continue
        
        guess = int(guess) # convert to a number
        
        # check if the number is within the range
        if guess < 1 or guess > 100:
            print(str(guess) + " is out of the rnage(1 -100)")
            continue
        
        # now check against the choice of the coimp
        compChoice = randomNumber(1,101)
        print(compChoice)
        
        if compChoice == guess:
            print("correct!")
        elif guess < compChoice:
            print("Too low!")
        else:
            print("Too high!")

        # break after a sucessfull run
        break

numberGuessingGame()