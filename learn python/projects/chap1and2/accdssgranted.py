#! python3
# accesgranted.py - A program to emulate the password username system

# init the user in the system - dict
USERS = {
    "mwakai": "password123",
    "mwdime": "mwadimemwakas20006"
}

while True:
    # Askfor the user name and check 
    username = input("Enter your username:  ")

    if username not in USERS.keys():
        print("Username not found!!")
        continue #  make the loop start again

    # ask for the password and check 
    chances = 3 # for entering the password

    while chances > 0:
        password = input(f"Enter your password ({chances} chances): ")

        # checking 
        if USERS[username] == password:
            print("Unlocked!")
            break

        # else reduce the nuber of chances
        chances -= 1

    # Check if it is unlocked or the user is locked our
    if chances == 0: # add a timer so that after the time lapses it starts again
        print("You are locked out of the system!!")
    else:
        break
    