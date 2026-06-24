myPets = ['Zophie', 'Pooka', 'Fat-tail'] # this are my pets

print("Enter a pet name: ")
name = input() 

# Check if the name fo the pet is in the list
if name not in myPets:
    print("I don't have a pet named " + name)
else:
    print(name + "is my pet.")