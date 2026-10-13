#! python3 

# This file is going to do the file not found error for you 

filename = "alice.txt"

# let's try to open the file
# wrapping it with the iconic try blocks
try: 
    with open(filename) as file_object:
        contents = file_object.read()
except FileNotFoundError:
    msg = f"Sorry, the file {filename} does not exists"
    print(msg)
else:
    # count the approximate number of words in the file
    words = contents.split()
    num_words = len(words)
    print(f"The file {filename} has about {num_words} words.")