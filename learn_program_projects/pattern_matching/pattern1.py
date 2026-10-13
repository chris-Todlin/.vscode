#! python3

# This file is going to do the pattern matching of any pattern using regex

# We want to find if the text has a phone number
def isPhoneNumber(text):
    # length must be 12
    if len(text) != 12:
        return False # not a number
    # check if pos 3 and 77 is a hyphen
    elif not (text[3] == '-' and text[7] == '-'):
        return False
    elif not (text[0:3].isdecimal() and text[4:7].isdecimal() and text[8:12].isdecimal()):
        return False
    else:
        return True

# chunking the message from a string to a 
def chunk_checker(message):
    for i in range(len(message)):
        chunk = message[i:i+12]
        # check if it is there in
        if isPhoneNumber(chunk):
            print(f"Phone Number found: {chunk}")
    print('Done')

def main():
    print('415-555-4242 is a phone number:')
    print(isPhoneNumber('415-555-4242'))
    print('Moshi moshi is a phone number:')
    print(isPhoneNumber('Moshi moshi'))

    # the message
    message = 'Call me at 415-555-1011 tomorrow. 415-555-9999 is my office.'
    chunk_checker(message)

# the main rogram running
if __name__ == "__main__":
    main()