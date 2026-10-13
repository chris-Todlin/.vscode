#! python3

# trial1.py - this get us to understand the process under the hood of the multiplication table

def multiplicationTable1(n):
    print(" Multiplication table ".center(50, '-'))
    print("\n")
    # the first loop to set the tone
    for i in range(1,n+1):
        # the loop to set the table on the next part
        for j in range(1, n+1):
            # now do the multiplication of the numbers
            output = str(i) + " * " + str(j) + " = " + str(i*j).rjust(1)
            print(output.center(40))
        # add a line to space the table 
        print("\n")

# trial case 
#multiplicationTable1(3)