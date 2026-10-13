#! python3

# celtodeg.py - A program to convert Celsius to Fahrenheit
def onlyMain():
    # the input from the user
    print("Enter the temperature in Celsius: ")
    celsius = input()

    # check if the Celsius value is a number
    if celsius.isdecimal():
        # convert to Fahrenheit
        fahrenheit = (9/5 * float(celsius)) + 32
        print("The temperature in Fahrenheit is: " + str(fahrenheit))
    else:
        print("Please enter a valid number")

# function to convert the celcus to fahrein heright 
def cel_to_fah(celcius):
    return (9/5 * celcius) + 32

# function to convert the fahrein heright to celcius
def fah_to_cel(fahreinheight):
    return (5/9 * (fahreinheight - 32))

# function o control the flow o fthe 
def controlFlow(units, value):
    match units:
        case "celcius":
            print("The temperature " + str(value) + " " + units + " is " + str(cel_to_fah(value)) + " Fahrenheit")
            return cel_to_fah(value)
        case "fahrenheit" | "fah":
            print("The temperature " + str(value) + " " + units + " is " + str(fah_to_cel(value)) + " Celsius")
            return fah_to_cel(value)
        case _:
            print("Invalid unit. Please enter 'celcius' or 'fahrenheit'.")
            return None
        
# function to run th whoe thing
def main(units, value):
    # validate the input 
    if value.isdecimal():
        controlFlow(units, float(value))
    else:
        print("Please enter a valid number")

if __name__ == "__main__":
    print("This runs only when the function is directly executed, not when imported")
    onlyMain()