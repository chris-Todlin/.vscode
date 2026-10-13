#! python3

# This file is going to do some odd work, so don't open the curtain

""" print(5/0); """

# an improvement of this
try:
    print(5/0);
except ZeroDivisionError:
    print("You can't divide by zero!");