""" 
    This validates the input of the user
    - Incase the user enter the valueError eg s string in a number
    - It calls for the support
    
"""

# The function 
def validateUserInput():
    # try with the try and except
    # this would cause the return if 1 or 0 
    try:
        name = input("Enter your name?  ")
        age = int(input("Enter your age?  "))
        
        # print out the details 
        print("Name: " + name + "\nAge: " + str(age))
        return 1
    except ValueError:
        print("You fucked it up!!!!")
        return 0
    
# start the program til the system return the 0
retunFact = 0
while(retunFact == 0):
    print("Hello world")
    retunFact = validateUserInput()