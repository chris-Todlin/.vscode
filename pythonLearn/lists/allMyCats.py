""" 
    Enter the name of the cat
    Save them in the array or the list
    if the input is '', then break 
    print the name of the cats in the list 
"""

# start the operation
catNames = [] # list initilaized

# start the loop 
while True:
    # get the name of the cat in
    print(len(catNames) + 1)
    print("Enter the name of the cat " + str(len(catNames) + 1) + " (Or enter nothing to stop)")
    name = input()
    
    # if the input is empty then break 
    if name == '':
        break 
    
    # else concatinate the list
    catNames += [name] # should do the trick right!
    
# if the loop break, then name of the cats in the list
print("The cat names are:")
for name in catNames:
    print('  ' + name)