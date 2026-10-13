""" This is the case example of the greet the user in all the cases """

print('How are you?')
feeling = input()

# check if the feeling is great or good
if feeling.lower() in ['good', 'okay', 'great', 'fine', 'fresh']:
    print('I feel great too!')
else:
    print('I hope the rest of your day is good')