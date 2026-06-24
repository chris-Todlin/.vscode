""" 
    This is a file to deal with the control flow of the program
    I know you hate me for doing this but I love it
    Trial case one loading...
"""

# ask for the name
print("Enter your name: ")
name = input()
print("Enter your age: ")
age = int(input()) # convert the input to integer for resolution

# check some conditions
if name == 'Alice':
    print("Hi, ALice")
elif age <  12:
    print("You are not Alice, kiddo")
elif age > 100:
    print("You are not Alice, gannie.")
elif age > 2000:
    print("Unlike you, Alice is not an undead, immortal vampire.")
else:
    print("You are neither Alice nor a little kid.")