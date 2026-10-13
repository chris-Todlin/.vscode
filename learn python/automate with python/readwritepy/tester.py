#! python3

# tester.py - Trying out on the file creation part of the python

import os 

myFiles = ['accounts.txt', 'details.csv', 'invite.docx'] # this are the document sin my phase

for files in myFiles:
    print(os.path.join(r'C:\Users\Admin\.vscode\learn python\automate with python\readwritepy', files))

# print the current working directory 
print(os.getcwd())

# adding the error message handling capabilitites
try:
    # changing the director to another 
    os.chdir(r"C:\Users\Admin\.vscode\learn python\automate wipython")

    # print the current directory again
    print(os.getcwd())
except Exception as e:
    print("The above mentioned directory does not exist!!")