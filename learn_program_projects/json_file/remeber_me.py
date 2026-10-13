#! python3

# This is going to read the user and not even care
import json

# we want to load the name of the user
filename = 'user.json'
error_file = 'error.txt'

# the user
user = ''

try:
    with open(filename) as f_obj:
        user = json.load(f_obj)
except Exception as e:
    with open(error_file, 'a') as f_object:
        f_object.write(str(e) + '\n')

if not user:
    username = input("What is your name? ")

    with open(filename, 'w') as f_obj:
        json.dump(username,f_obj)
        print(f"We'll remember you when you come back, {username} !")
else:
    print(f"Welcome back, {user} !")