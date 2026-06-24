""" 
    This code has a lesson to learn
"""

# start
name = ''

# this makes sure you  input the name
while not name: # step in if True
    print("Enter your name:")
    name = input()

# another section
print("How many guests will you have?")
numOfGuests = int(input())

if numOfGuests: #if the value is not 0
    print("Be sure to have enough room for all your guests.")

# end
print('Done')