
from gemeInventory import displayInventory as disp

dragonLoot = ['gold coin', 'dagger', 'gold coin', 'gold coin', 'ruby']
inv = {'gold coin': 42, 'rope': 1}


def addToInventory(inventory, addedItems):
    for item in addedItems:
        inventory.setdefault(item, 0);
        inventory[item] += 1

inv = addToInventory(inv, dragonLoot)
disp(inv)