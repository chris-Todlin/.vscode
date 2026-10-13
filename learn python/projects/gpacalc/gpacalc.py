#! python3
# gpacalc.py - A program to calculate the GPA of a student based on their subjects and grades

import inputtrial, processtrial, outputtrial # the ones we need

def main():
    # get the user subjects
    user_subjects = inputtrial.input_trial() # call the function to get the subjects and grades

    user_subjects = processtrial.assign_points(user_subjects) # call the function to assign the points
    outputtrial.print_output(user_subjects) # call the function to print the output

if __name__ == "__main__":
    main() # call the main function to run the program