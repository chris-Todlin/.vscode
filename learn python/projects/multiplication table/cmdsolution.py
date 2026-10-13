#! python3

# cmdsolution.py - Using the commandline where the argument is just the number of the limit

import sys, trial1

# get started 
if len(sys.argv) < 2:
    # prnt the usage
    print("Usage".center(20))
    print("Enter the number of multiplication upto: ")
    print("py cmdsolution.py [number]")
else:
    while True:
        try:
            # the multiplication there in
            trial1.multiplicationTable1(int(sys.argv[1]))
            break # break out of the loop
        except Exception as e:
            # do not break 
            print("Please enter a number")