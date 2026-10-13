#! python3
# isPhoneNumberreq.py - Using regex to find the pattern

# Sarting with lessons

# importing the re module for the regex
import re

# \d - digit character
phonepattern = re.compile(r'\d\d\d-\d\d\d-\d\d\d\d')

phonepattern_2 = re.compile(r'\d{3}-\d{3}-\d{4}') # shortened form

print(phonepattern)
print(phonepattern_2)

# trting out ot search if the string exist in the conquest
mo = phonepattern.search('My number is 415-555-4242.')
print('Phone number found: ' + mo.group())

mo = phonepattern_2.search('My number is 415-555-4242.')
print('Phone number found: ' + mo.group())