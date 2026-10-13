#! python3
# strongpass.py - Check is the password is string or not

# The module to use
import re, pyperclip

# TODO: Get tect from the cliboard
text = str(pyperclip.paste()) # get the text

# TODO: Check if the pass is strong or not 

# checkone 
if len(text) < 8:
    print('Password is too short')
elif not re.search(r'[a-zA-Z]',text):
    print('Password must contain at least one letter')
elif not re.search(r'\d+',text):
    print('Password must contain at least one number')
else:
    print('Password is strong')