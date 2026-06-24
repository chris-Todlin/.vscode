""" 
    This is the literal part of finding the index of for example the orange in 
    a list of fruits in a box stored as python list
    
    Welcom all to learning it all in a go
"""

#  this is the list of the fruits
fruits = ['mango', 'bananana', 'orange', 'tangerine', 'pumpkin', 'watermelon']

# we want to find the index of the orange
# we cannot use the for name in fruits 

""" 
    Start
    Fruits list in, find the orange
    Loop using the for i in range (0, len(fruits))
    if fruits[0] == 'ornage': 
        print the index or store it if needed 
        break to release the memory resources 
"""

for i in range(0, len(fruits)):
    if fruits[i].lower() == 'oranges':
        print("Index of oranges is: " + str(i))
        break
    
    # if the loop reaches its end the tell the user there is no 
    # index found
    if i == len(fruits) - 1:
        print("No index found for oranges")
        
# advancing into usign the index method of the list
def FindTheIndex(item):
    try:
        indexItem = fruits.index(item) # return the index
        
        print("The index of " + item + " is " + str(indexItem))
    except ValueError:
        print("Index not found for " + item)  # no index found

FindTheIndex('oranges')