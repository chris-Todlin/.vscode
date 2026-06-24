""" 
    This is a program to evealuate the expression entering of the program
    Enter an one an would terminate when the is a blank input
"""

# start
expression = ""

while True:
    print("Enter the expression: ")
    part = input()
    
    expression = expression + ' ' + part
    
    # chack of the part is ''
    if not part:
        break
print("The expression is: " + expression)