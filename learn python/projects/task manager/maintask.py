#! python3
# maintask.py - The main file of the task program 

TASKS = {}
functions_task = ['Add new Task', 'List Task', 'Update Task', 'Delete Task', 'Exit'] # the list of the functionalities available

TASKS.setdefault("task 1".title(), "This is an example of a task.") # sefault one

# import he modules 
import addTask, taskfunc

def choice_select():
    while True:
        try:
            print("")
            print("MENU".center(30, "-"))
            print("")
            
            # start the loop
            for i in range(0, len(functions_task)):
                print(str(i + 1).ljust(3) + functions_task[i].ljust(30))
            
            # ask for the user choice
            print("\nWhat is your choice?")
            choice = int(input())

            # if the choice is above the len of the functions
            if choice > len(functions_task) or choice <= 0:
                raise ValueError("Above the bar")
            else:
                return choice # break the loop as you return
        except Exception as e:
            print(e)
            print("Please enter the right choice or input error!!")

def main():
    # start the match for the option by the user 
    while True:
        choice = choice_select() # ask for the choice
        match choice:
            case 1:
                # add the task 
                addTask.add_task()
            case 2:
                taskfunc.list_tasks()
            case 3:
                taskfunc.update_task()
            case 4:
                taskfunc.delete_task()
            case 5:
                # add saving to fiel here
                print("Exiting  the program ...")
                break


if __name__ == "__main__":
    main()