""" 
    Write	a	function	named	collatz()	that	has	one	
    parameter	named	number.	If
    number	is	even,	then	collatz()	should	print	
    number // 2	and	return	this	value.
    If	number	is	odd,	then	collatz()	should	print	
    and	return	3 * number + 1.
    Then	write	a	program	that	lets	the	user	
    type	in	an	integer	and	that	keeps	calling
    collatz()	on	that	number	until	the	function	
    returns	the	value	1.	(Amazingly
    enough,	this	sequence	actually	works	for	any	
    integer—sooner	or	later,	using	this
    sequence,	you’ll	arrive	at	1!	Even	mathematicians	
    aren’t	sure	why.	Your
    program	is	exploring	what’s	called	the	Collatz	sequence,	
    sometimes	called	“the
    simplest	impossible	math	problem.”)
    Remember	to	convert	the	return	value	from	
    input()	to	an	integer	with	the
    int()	function;	otherwise,	it	will	be	a	string	value.
    Hint:	An	i
"""

# function 
def collatz(number):
    # variable for the result 
    result = None # has no value 
    
    # check for the even and odd
    if number % 2 == 0: # even
        result = number // 2
        print(result)
        return result
    else: 
        result = 3 * number + 1
        print(result)
        return(result)

# now the functionality of the collatz
returnValue = 0

while True:
    try:
        print("Enter any integer: ")
        userInput = int(input())
        
        while True:
            returnValue = collatz(userInput)
            print(returnValue)
            if returnValue == 1: 
                break
    except ValueError:
        print("Error: Enter the correct input")
# trial case
print(collatz(3))