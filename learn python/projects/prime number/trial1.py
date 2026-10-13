#! python3
# trial1.py - separate the chuff and get the range limit 

# start the loop 
def prime_number(n):
    # separate the chuff
    limit = round(n/2) # get the lmit
    count = 0 # count the number of time it is divisible

    # if the number is 0 or 1 then it is not a prime number
    if  n in [0,1]:
        print(str(n) + " is a special case. It is not a prime number.")
        return # to end the loop

    # run the loop 
    for i in range(2, limit):
        if n%i == 0:
            count += 1 # add the coiunt

    # if the count is greater than one then it is not a prime number
    if count > 0:
        print(str(n) + " is not a prime number.")
    else:
        print(str(n) + " is a prime number.")


if __name__ == "__main__":
    # This is the last trial 
    prime_number(0)
    prime_number(22)
    prime_number(11)