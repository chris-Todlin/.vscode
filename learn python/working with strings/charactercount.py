""" This program is going to index the character of each letter in a string you pass """
# importing the pretty print
import pprint

# do the dstructure 
characters = {}

def indexString(strParam):
    for i in range(0, len(strParam)):
        characters[strParam[i]] = i
    
    # prety print the string
    print(characters)


indexString('Hello world!')