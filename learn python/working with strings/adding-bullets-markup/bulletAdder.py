#! python3
# bulletAdder.py - Adds wikipidies points to the start
# of each line

import pyperclip

text = pyperclip.paste() # the text you copied

print(text)

# the process or the TODO

# split the text to get the lines
lines = text.split('\n')

for i in range(0, len(lines)):
    lines[i] = '- ' + lines[i] # add the markup

# join the string \n
text = '\n'.join(lines)

# the end of it 
pyperclip.copy(text)