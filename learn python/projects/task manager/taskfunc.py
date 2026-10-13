#! python3
# tasffunct.py - Holding the functionalities involved with the task 

# import the TASKs
import maintask

def list_tasks():
    index  = 1
    print("")
    print("TASKS".center(30, "-"))
    
    # if the re are no tasks, then delete
    if len(maintask.TASKS.keys()) == 0:
        print("No saved Tasks".center(30))
        return
    
    for k in maintask.TASKS.keys():
        print(str(index).ljust(2) + ". " + k.ljust(40))
        index += 1

# delete task 
def delete_task():
    # ask for the task name 
    print("Enter task name to delete: ")
    task_del = input()

    # check it exist in the keys 
    if task_del in maintask.TASKS.keys():
        # delete the task and quit
        del maintask.TASKS[task_del]
    else:
        print("No such task exists!!!")

    # return 
    return 

# function to update the task
def update_task():
    # ask for the task name 
    print("Enter task name to delete: ")
    task_update = input()

    # ask for the new content
    print("Enter the new task content: ")
    task_content = input()
    
    # check it exist in the keys 
    if task_update in maintask.TASKS.keys():
        # update the task and quit
        maintask.TASKS[task_update] = task_content
    else:
        print("No such task exists!!!")
    
    # return 
    return 