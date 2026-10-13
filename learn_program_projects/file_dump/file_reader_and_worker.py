#! python3 

# This file is going to read the file and try to work with it
filename = "txt_file\\pi_digits.txt";

with open(filename) as file_content:
    lines = file_content.readlines();

# get the string now attaches
pi_string = '';

for line in lines:
    pi_string += line.strip();

# print the string
print(pi_string);
print(len(pi_string));