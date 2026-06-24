""" 
    This code executes the basic while loop while printing the hello, world five times
    Since the count is 5, the if(count < 5), but replace with the while
    We also need to add the increament or decreament to prevent and infinite loop
    while:
        i++ // to prevent the infinite loop theory
"""


# start
count = 0

# the if loop
if count < 5:
    print("Hello, world")
    count += 1 # increament

# check the value of the count - debuggers checkpointers
print("The value of the count is: " + str(count)) # count = 1

count = 0
# the while loop
while count < 5:
    print("Hello, world")
    count += 1 # increament

# check the value of the count
print("The value of the count is: " + str(count)) # count = 5