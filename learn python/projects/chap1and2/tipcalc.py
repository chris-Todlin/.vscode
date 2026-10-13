#! python3

# tipcalc.py - A tip calculator program

# cosiderations 
# a non-negative input - done
# a zero in the amount or just the tip percent - done
# a word or string in the input
# The tip is obove bar
# can you add like a confirmation before the user does the rest

# function to gurrubteet the input
def enterInput(instr):
    while True:
        try:
            amount = int(input(instr))

            if amount > 0:
                return amount
        except Exception as e:
            print("Enter a real number!!")

# user enter the bill
billAmount = enterInput("Enter the bill amount: ")
tipPercentage = enterInput("Enter the tip percentage: ")

if tipPercentage == 0:
    tip = 0
    totalAmount = billAmount
else:
    # calculate the tip and the total bill 
    tip = billAmount * (tipPercentage/100)
    totalAmount = tip + billAmount

# print it out to the user
print(f"Tip: {tip}")
print(f"Total amount: {totalAmount}")
