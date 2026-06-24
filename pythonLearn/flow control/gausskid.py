""" 
    Based on the legendary Gauss as the kid
    Doing the sum of number between 0 and 100
"""

# start 
total = 0

# loop 
for i in range(101):
    print(str(i) + " + " + str(total) + " = " + str(total + i))
    total += i # doing the sum

# end 
print("The total is: " + str(total))