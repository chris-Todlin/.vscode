#! python3
# isPhoneNumber.py - Check is the number is a phone number [string]

def checkPhoneNumber(number):
    # Check our the lenght of the string - 12
    if len(number) != 12:
        return False

    # check the hyphen 
    elif number[3] != '-' or number[7] != '-':
        return False
    elif not (number[:3].isdecimal() or number[4:7].isdecimal() or number[8:].isdecimal()):
        return False
    else:
        return True

# trial cases
print('415-555-4242 is a phone number:')
print(checkPhoneNumber('415-555-4242'))
print('Moshi moshi is a phone number:')
print(checkPhoneNumber('Moshi moshi'))

# what isf we are to extend it to find the text with the phone number
message =  'Call me at 415-555-1011 tomorrow. 415-555-9999 is my office.'

# run the loop to chuck the message into 12 parts
for i in range(0, len(message)):
    chunk = message[i: i+12] 

    # adding the part where if the len of the chunk is less than 12, break, save resources
    if len(chunk) != 12:
        print("I am breaking here.")
        break 
    print(chunk)
    if checkPhoneNumber(chunk):
        print('Phone number found: ' + chunk)
# end 
print("Done")