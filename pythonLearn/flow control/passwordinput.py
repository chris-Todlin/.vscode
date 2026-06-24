""" 
    The user has three chances to input the password, else it terminates
"""

# modules
import sys# import all the system functionality

# start
password = "Mwakai"
count = 0

# loop
while True:
    print("Enter your password (attempt " + str(count + 1) + " ): ")
    passW = input()
    
    # if the password is exit then exit
    if passW == 'exit': sys.exit()
    
    # checking
    if passW == password: break # break if the password is correct
    
    # add th count
    count += 1
    
    # check the number of times ans systerm exist in the 
    if count == 3: sys.exit()
print("It okay!")