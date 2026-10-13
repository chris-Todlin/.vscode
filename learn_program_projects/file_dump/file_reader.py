#! python3

# This file does the opening, reading and printing the contents of the file to the screen

with open('txt_file\\pi_digits.txt') as file_object: # open the file
    contents = file_object.read() # read the file
    print(contents.rstrip()) # print the file content

""" # trying to tweak it abit
file_content = open('pi_digits.txt'); # open the file
print(file_content);

# try reading the file
content = file_content.read();

# print the content
print(content); """

# we want to go a step further and read a line to line and not caring if the line is what
filename = "txt_file\\pi_digits.txt"; # this is the filename we are going to access

with open(filename) as file_content:
    for line in file_content:
        print(line.rstrip()); # line to line

# working with a list instead of the normal read() or the line to line
with open(filename) as file_content:
    lines = file_content.readlines(); # change it to a list

# now operate with the list
for line in lines:
    print(line.rstrip())