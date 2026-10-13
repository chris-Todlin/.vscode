#! python3
# wordguess.py - A word Guesssign game 

# import the ramdom module
import random as rd

# List of words
words = [
    'rainbow', 'computer', 'science', 'programming',
    'python', 'mathematics', 'player', 'condition',
    'reverse', 'water', 'board', 'geeks'
]

# ask for the user name
name = input("Enter your name: ")
print(f"Good Luck! {name}")

# select a random word
wordrd = rd.choice(words) 

# initi the guesese
turns = 12
guessed = '' # the guessed word

# user info
print(f"You have {turns} turns to guess the word.")

while turns > 0:
    failed = 0

    # display the characters of the word with hidden letter
    for char in wordrd:
        if char in guessed:
            print(char,end=" ")
        else:
            print("_", end=" ")
            failed += 1
    print()

    # check if the word has been guessed 
    if failed == 0:
        print("You Win")
        print(f"The word is: {wordrd}")
        break

    # get the user input
    guess = input("Guess a character: ").lower()

    # validate the inpt length 
    if len(guess) != 1:
        print("Please enter a single character.")
        continue

    # check if the input has already been guessed
    if guess in guessed:
        print("You already guessed that character.")
        continue

    # store the guess
    guessed += guess

    # handle incorrect guesses
    if guess not in wordrd:
        turns -= 1
        print(f"Wrong guess. You have {turns} turns left.")

        if turns == 0:
            print("You Lose")
            print(f"The word was: {wordrd}")