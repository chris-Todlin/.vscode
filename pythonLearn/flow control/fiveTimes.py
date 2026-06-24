""" 
    Print my name five times and the name is included
"""

# start
print('My name is: ')

for i in range(5):
    # usign teh continue thing
    if i == 0: continue
    if i == 3: break
    print('Jimmy Five Timers (' + str(i) + ')')