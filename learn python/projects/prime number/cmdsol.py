#! python3
# cmdsol.py - Adding the python solution to it with the cmd way 

# import the file needed
import sys, trial1

# if the arguments are less than 2 then usage
if len(sys.argv) < 2:
    print("Usage: py cmdsol.py [number] - number to test if prime")
else:
    try:
        # check if prime
        trial1.prime_number(int(sys.argv[1]))
    except Exception as e:
         print("Enter a real number")