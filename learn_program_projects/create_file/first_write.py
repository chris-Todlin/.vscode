#! python3

# This program is going to create a file and write to it

filename = "programming.txt"  # the name of the file

def file_reader():
    # now read the file
    with open(filename) as file_object:
        content = file_object.read();

        print(content);

with open(filename, 'w') as file_object:
    file_object.write("I love programming.\n");
    file_object.write("I love creating new games.\n");

# read the file 
file_reader();

# now present the append mode
with open(filename, 'a') as file_object:
    file_object.write("I also love finding meaning in large datasets.\n");
    file_object.write("I love creating apps that can run in a browser.\n");

# read the file again
file_reader();