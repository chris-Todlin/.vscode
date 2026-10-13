#! python3
# inputtrial.py - Trying out on the input part of the program 

# import the process part
import processtrial, outputtrial

# start with input functionality 
def input_trial():
    # set the real subject ds
    user_subjects = {} # to store them there in

    while True:
        # start 
        # ask for the number of subjects to enter
        print("Enter the number of subjects: ")
        num_subjects = input()
        
        if num_subjects.isdigit():
            # run the loop for the numer of subjects
            subjects = int(num_subjects) # the number of subjects to enter

            while subjects > 0:
                try:
                    # ask for the subject name 
                    print("Enter the subjects name: ")
                    subject_name = input().title() # change the case of the letter

                    # ask for the letter grade
                    print("Enter the letter grade:")
                    letter_grade = input()

                    # check if the letter grade is valid
                    if letter_grade.upper() not in ['A', 'B', 'C', 'D', 'F'] or len(letter_grade) != 1:
                        raise ValueError("Invalid letter grade. Please enter A, B, C, D, or F.")

                    # continues
                    user_subjects[subject_name] =  { 'grade' : letter_grade.upper() }# store them the in
                    subjects -= 1 
                except Exception as e:
                    print(f"Error: {e}. Please try again.")

            # after every thing is done quit the loop 
            break
        else:
            print("Please enter a valid number for the subjects.")
    return user_subjects # return them about it

# if this is run as the file 
if __name__ == "__main__":
    input_trial() # call the function to run it