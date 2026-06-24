""" 
    Learning about passing by reference
"""

def eggs(param):
    param.append('Hello')

spam = [1,2,3] # the list

eggs(spam)
print(spam)