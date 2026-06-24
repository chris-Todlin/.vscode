""" 
    This function or piece of code check if the name entered is Alice
    The source code is as follows:
        Ask for the user to enter the name
        Check if the name is Alice:
            True -> Print(Hi, alice)
            False -> Print(Hello Stranger)
        Terminate
"""

print("Enter your name: ")
yourName = input()

# checking the name
if yourName == 'Alice':
    print("Hi, Alice")
else: 
    print("Hello, stranger")
# terminate