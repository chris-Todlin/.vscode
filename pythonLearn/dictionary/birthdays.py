""" 
    This is the birthday programme to fulfil the nation wide covid 19
"""

birthdays = {
    'Alice': 'Apr 1',
    'Bob': 'Dec 21',
    'Carol': 'Mar 14'
}

# start the loop 
while True:
    print('Enter the name: (blank to quit)')
    name = input()
    
    # for the quitters
    if name == '': break 
    
    if name in birthdays:
        print(birthdays[name] + ' is the birthday of ' + name)
    else:
        print('I do not have birthday information for ' + name)
        print('What is their birthday?')
        bday = input()
        birthdays[name] = bday  # save the new birthday
        
        print('Birthday database updated.')