""" 
    This is the main file to import in the python one
    It contains the menu for all the decision making part 
"""

import createTask

def mainFunction():
    # welcome message
    print('Welcome to trial task manager\n')
        
    # Set the activities to be done
    menu = ['Create Task',
                'Show list',
                'Read Task by Title',
                'Update Task by Title',
                'Delete Task by Title',
                'Delete all Tasks',
                'Exit Program']
    
    while True:
        # now set tforth the menu draw aprt from the deamon
        print("\t\tMenu\n")
        # just a for loop
        for i in range(0, len(menu)):
            print("\t" + str(i + 1) + ". " + menu[i])
            
        # an ending message
        print("\n\t\t### END ###\n")
        
        try:
            # Askt he user for the 
            print("What is your option: ")
            option = int(input())
            
            if option == len(menu):
                print("Thank you for visiting")
                break
            
            if option > len(menu) or option < 1:
                print("You entered an incorect option!")
            else:
                driveMenu(option)
        except TypeError:
            print("Incorrect input!!")


# function to operate the menut
def driveMenu(choice):
    # the if hell 
    if choice == 1: createTask.createTaskUser()
    elif choice == 2: createTask.createList()
    elif choice == 3: createTask.readTaskByTitle()
    elif choice == 4: createTask.updateTaskByTitle()
    elif  choice == 5: createTask.deleteTaskByTitle()
    else: createTask.DeleteAllTasks()


if __name__ == "__main__":
    mainFunction()