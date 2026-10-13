#! python3

# This is going to utilise the loading of the json file
import json 

filename = 'numbers.json'

with open(filename) as f_obj:
    numbers = json.load(f_obj)

print(numbers)