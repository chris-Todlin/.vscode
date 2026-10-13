#! python3
#outputtrial.py - Trying to see how we are going to print the output of the program 

def print_output(grades):

    # start the main loop 
    print("Subject".ljust(15) + "Grade".center(10) + "Points".rjust(4))
    print("".center(30, "-")) # print the line
    for k,v in grades.items():
        # check if the key is not total 
        if k != 'total':
            print(k.ljust(15) + v['grade'].center(10) + str(v['points']).rjust(4))
        else:
            print("".center(30, "-")) # print the line
            print("Total Points: ".ljust(20) + str(v['total_points']).rjust(4))
            print("Average Points: ".ljust(20) + str(v['average_points']).rjust(4))
