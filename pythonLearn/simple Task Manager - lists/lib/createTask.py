""" 
This is going to create the task for the user based on the
title  and the content of the task to be saved
"""

# the two lists - all empty
Tasks = ['Add a task'] # the content one
Titles = ['example Task'] # for the titles 

# the function to create the task 
def createTaskUser():
    
    # welcome message
    print("Welcome, you can add your task below\n")
    
    # now add the title
    print("Enter your title: ")
    title = input()
    Titles.append(title or 'title ' + str(len(Titles) + 1)) # incase no content
    
    # now add the task
    print("Enter your task: ")
    task = input()
    Tasks.append(task or 'task ' + str(len(Tasks) + 1)) # incase no content
    
    # a message to say task created
    print("Task added")
    
    print(Titles)
    print(Tasks)

# now reading the list of the titles in the lists
def createList():
    # a start message
    print("\n\t\tTASK LIST\n")
    
    # if the list is empty just print the empty and return 
    if len(Titles) == 0:
        print("\tThe list is empty")
        return
    5
    # just a for loop
    for i in range(0, len(Titles)):
        print("\t" + str(i + 1) + ". " + Titles[i])
        
    # an ending message
    print("\n\t\t### END ###\n")

# now the part of read by the title 
def readTaskByTitle():
    try:
        # get the title from the user
        print("Enter the title of the task to read: ")
        titleTask = input()
        
        # check of the index exist 
        indexTask = Titles.index(titleTask)
        
        if indexTask or indexTask == 0:
            print("\n|--------------------------------")
            print("|\tTask: " + Titles[indexTask])
            print("|\tContent: " + Tasks[indexTask])
            print("|--------------------------------\n")
    except ValueError:
        print("No such task exists!!\n")

def updateTaskByTitle():
    try:
        # welcome message
        print("Welcome, you can add your task below\n")
        
        # get the title from the user
        print("Enter the title of the task to update: ")
        titleTask = input()
        
        # check of the index exist 
        indexTask = Titles.index(titleTask)
        
        # now add the title
        print("Enter your new title: ")
        title = input()
        Titles[indexTask] = title or titleTask # incase no content
        
        # now add the task
        print("Enter your new task: ")
        task = input()
        Tasks[indexTask] = task or Tasks[indexTask]   # incase no content
        
        # a message to say task created
        print("Task updated!!")
        
        print(Titles)
        print(Tasks)
        
    except ValueError:
        print("No such task exists!!\n")
        
# delete the task by title 
def deleteTaskByTitle():
    try:
        # get the title from the user
        print("Enter the title of the task to delete: ")
        titleTask = input()
        
        # check of the index exist 
        indexTask = Titles.index(titleTask)
        
        # delete them now 
        del Titles[indexTask]
        del Tasks[indexTask]
        
        # print
        print("Task deleted!!!")
        
    except ValueError:
        print("No such task exists!!\n")

def DeleteAllTasks():
    # ask if sure
    print("Are you sure you wnt to delet all of them?(y/n)")
    option = input().lower()
    
    # check the option
    if option == 'y':
        global Titles, Tasks
        Titles = []
        Tasks = []
        print("All are deleted!")
    else:
        print("Ooops!!!")