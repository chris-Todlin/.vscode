#! python3

# tableprinter.py - print the pasted data in a table formart

import pyperclip

tableData = [['apples', 'oranges', 'cherries', 'banana'],
['Alice', 'Bob', 'Carol'],
['dogs', 'cats', 'moose', 'goose']]

# now find the len of the longest data
leng = 0
for i in range(0, len(tableData)):
    newLen = len(tableData[i])
    if newLen > leng: 
        leng = newLen

# run the loop to print 
for i in range(0, leng):
    try: 
        strNew = ''
        for j in range(0, len(tableData)):
            strNew += tableData[j][i].ljust(10)
            if j == len(tableData) - 1:
                print(strNew)
    except IndexError:
        print(strNew)
        continue