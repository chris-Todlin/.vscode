#! python3
# This program is going to check if my birthday is in the pi digits I have

""" 
    STEPS

    1. Load the data from the pi_digits.txt
    2. create the string pi_digits
    3. Ask the user to enter their birthday
    4. Search if the birthday is there in the pi
    5. print message or response
"""

# step 1
filename = "txt_file\\pi_digits.txt";
pi_string = ''; # the pi string

with open(filename) as file_content:
    for line in file_content:
        pi_string += line.strip(); # step 2

# step 3
birthday = input("Enter your birthday in the form mmddyy: ")
if birthday in pi_string:
    print("Your birthday appears in the digits of pi!")
else:
    print("Your birthday does not appear in the digits of pi.")