"""
    This function is going to read a password file
    Store it in a variable
    Ask the user for the password
    Compare with the stored one
    If okay, print some message
    otherwise Acess denied
"""

# read the password file 
passwordFile = open('C:/Users/Admin/.vscode/pythonLearn/introduction/passwor.txt')
passwordSecret = passwordFile.read()

# Ask for the user password
typedPassword = input("Enter your password   ")

# compare the psswords
if typedPassword == passwordSecret:
    print("Acess granted")
    # othere things
    if typedPassword == "12345":
        print("That password is on that idiots puts on their luggage")
else:
    print("Acess denied")