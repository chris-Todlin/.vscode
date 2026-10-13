#! python3

# program to enter the name of the user
# Then write the name to a file guest_book.txt

filename = "guest_book.txt"; # the name for the file

# function to write to the file
def write_to_file(name):
    with open(filename, 'a') as file_object:
        file_object.write(name + '\n');

# function to ask for the name
def ask_for_name():
    while True:
        name = input("Please enter your name: ");
        if name:
            write_to_file(name.capitalize());
            print(f"Hello {name}, your name has been written to the file {filename}.");
        else:
            print("You did not enter a name. Please try again.");

        # breaking the loop if the user wants to exit
        exit_choice = input("Do you want to exit? (yes/no): "); 
        if exit_choice.lower() == "yes":
            print("Exiting the program. Goodbye!");
            break;


# check if the py is running ad the main
if __name__ == "__main__":
    ask_for_name();