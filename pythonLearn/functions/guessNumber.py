""" 
    Guess Number game
"""

# This si the guess number game
from random import randint as randomNumber

compGuess = randomNumber(1, 20)
guess = 10 # initial default case

while True:
    print('To exit type exit')
    print('I am thinking of a number between 1 and 20.')
    # now ask for the gues
    print("Enter your guess or exit ")
    guess = input()
    
    try:
        if guess == 'exit': break
        guess = int(guess) # covert to number
        
        if guess < compGuess:
            print('Your guess is too low')
        elif guess > compGuess:
            print('Your guess is too high')
        else:
            break
        # else continue
    except ValueError:
        print('Enter corrent input')