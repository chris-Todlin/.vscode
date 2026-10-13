#! python3

# This file is going to do the word count the the words in the file
def count_words(filename):
    # count the approx number of words
    try:
        with open(filename) as file_object:
            contents = file_object.read()
    except FileNotFoundError:
        print(f"Sorry, the file {filename} does not exist.")
        pass # to fall silently
    else:
        # count the number of words
        print(f"The file {filename} has about {len(contents.split())} words.")

# function to do the addition of numbers
def enter_number(place):
    try:
        num= int(input(f"Enter the {place} number : "))
    except ValueError:
        print(f"The number you entered is not a real number.")
    else:
        return num

def addition():
    num1 = enter_number("first")
    num2 = enter_number("second")

    # check if the number are number
    if num1 and num2:
        print(f"The sum: {num1} + {num2} = {num1+num2}")
    else:
        print("Messed up by enterign a non number, so no sum, or you can try yourself that")
        pass

def main():
    filename = 'alice.txt'

    #count_words(filename)
    addition()

if __name__ == "__main__":
    main()