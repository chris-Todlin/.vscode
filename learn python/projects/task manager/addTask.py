#! python
# addTask.py - Add task of the user

# import the TASK dict
import maintask

def add_task():
    # ask for the title 
    print("Enter the task title: ")
    title_task = input()

    # ask for the task itself 
    print("Enter the task: ")
    maintask.TASKS[title_task] = input()
    # return the dict
    return

# now sriting the one for the cmd
def add_task_cmd(title, task):
    maintask.TASKS[title] = task
    return 