#! python3
# phoneNumber.py - Adding grouping through the paranthesis

import re

try:
    phoneRegexnum = re.compile(r'(\(\d\d\d\)) (\d\d\d-\d\d\d\d)')
    print(phoneRegexnum)
    mo = phoneRegexnum.search('My number is (415) 555-4242.') # search the string 

    # checking the grouping by paranthesis
    """ print(mo.group())
    print(mo.group(2))
    print(mo.group(3))
    print(mo.group(0)) """

    # adding the area code of the place and the mainnumber
    areaCide, mainNumber = mo.groups()
    print(areaCide)
    print(mainNumber)

except Exception as e:
    print("Failed!")
    print(e)