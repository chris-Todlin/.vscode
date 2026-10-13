#! python3

# commandlineconverter.py - A command line unit converter program

# import 
import sys, celtodeg

try:
    # check if the argumemts are okay 
    if len(sys.argv) < 3:
        print("Usage: python commanlineconverter.py [unit] [value]")
        sys.exit()
    else:
        celtodeg.main(sys.argv[1], sys.argv[2])
except Exception as e:
    print("An error occurred: " + str(e))   
    sys.exit()