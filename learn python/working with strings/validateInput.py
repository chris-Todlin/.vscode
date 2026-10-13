""" This is used to validate the input of the user """

while True:
    # enter you age
    print("Enter your age:")
    age = input()

    # check if is in a decimal number not a alnum or al 
    if age.isdecimal():
        break 
    
    # else
    print('Please enter a number for your age')


# setting the new password for you application or account
while True:
    print('Select a new password (letters and numbers only)')
    password = input()

    # check  if there is no space and the rest of the params is oka
    if password.isalnum() and (not password.isspace()):
        break 
    print('Passwords can only have letter and numbers.')