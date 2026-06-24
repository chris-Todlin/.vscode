""" 
    Learning of the copy and deepcoy part of life
"""

import copy

spam = ['A','B', ['a','b'],'C','D']
cheese = copy.copy(spam)

cheese[1] = 42
print(spam)
print(cheese)