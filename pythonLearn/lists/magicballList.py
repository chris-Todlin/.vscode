""" 
    The version of the magic ball 8 using lists
    
"""

from random import randint as RandomNumber

# save the messages here in
messages = ['It is certain',
'It is decidedly so',
'Yes definitely',
'Reply hazy try again',
'Ask again later',
'Concentrate and ask again',
'My reply is no',
'Outlook not so good',
'Very doubtful']

# now print the message with every call 
print(messages[RandomNumber(0, len(messages) - 1)])