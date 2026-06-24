""" 
    This is the program to ensure through understanding of the while, break and continue
    It involves the asking of the name and the password
    Enter the name and password
"""
# initial variables
name = ""
password = ""

# start the  infinite loop
while True:
    print("Who are you ?")
    name = input() #enter the name
    if name != 'Joe':
        continue # if the username is not Joe, then start again
    print("Hello, Joe. What is the password? (It is a fish.)")
    password = input()
    if password == 'swordfish':
        break # if the password is okay, continue with the rest of the code
print("Access granted.")