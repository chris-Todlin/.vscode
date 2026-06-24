""" This is the game inventory of the year """

stuff = {'rope': 1, 'torch': 6, 'gold coin': 42, 'dagger': 1, 'arrow': 12}

def displayInventory(inventory):
    print("Inventory:")
    
    for k, v in inventory.items():
        print(str(v) +" " + k)
    
    print("Total number of items: " + str(findTotal(inventory)))

# function to find the total items in the list
def findTotal(invetory):
    total = 0
    for v in invetory.values():
        total += v
    return total or 0
displayInventory(stuff)