""" 
    This is my first python program.
    Forgive me if it does no appeal to you in anyway
    GoodLuck to me!!
"""

# This program says hallo and asks for my name

print("Hello world!")
print("What is your name?") # ask for my name

myName = input() # the input section

print("It is good to meet you, ",myName)
print("The length of your name is: ",len(myName))

print("What is your age?") # asks then for the age
myAge = input() # get it in

print("You will be " + str(int(myAge) + 1)+  " in a year")