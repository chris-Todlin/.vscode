#! python3
import re, pprint

# This file is going to open the file and then sort them in a dict
group_transcations = {
    'Transaction': [],
}

# the expense/revenue
status = []

# the file name
filepath = "C:\\Users\\Admin\\.vscode\\learn_program_projects\\project_pesa_messages\\Note.txt";

# The sorting function
def sorting_func():
    # create the regexes for the three signal
    """ status_regex = re.compile(r'account balance') """ # -> not interseted since it has little effect on my accounts
    revenue_regex = re.compile(r'received|transferred|deposit')
    exp_regex = re.compile(r'sent|paid|bought') # withdrwal has a confilct with 

    try:
        # open the file and read it
        with open(filepath) as file_objects:
            for line in file_objects:
                if line[:6] == 'Failed':
                    continue
                elif revenue_regex.search(line):
                    group_transcations['Transaction'].append(line.strip())
                    status.append('Revenue')
                elif exp_regex.search(line):
                    status.append('Expenditure')
                else:
                    pass
    except FileNotFoundError:
        print("Sorry the file you provided is not found")

    # after doen
    return group_transcations

# function to puch data info the file
def write_to_file(filename,data,mode):
    # the data is in line
    try:
        with open(filename, mode) as file_object:
            file_object.write(data + '\n')
    except Exception as e:
        print("There were some errors")
        pprint.pprint(e)
    else:
        pass

# function to print the dict
def print_dict(data):
    print(f"\n\nWritting to  Transaction file...")
    print(f" Length of Transaction file is {len(data['Transaction'])} statements. Confirm with the file.")

    # for every count
    count = 1
    for item in data['Transaction']:
        if count == 1:
            write_to_file(f"C:\\Users\\Admin\\.vscode\\learn_program_projects\\project_pesa_messages\\Transaction.txt", item, 'w')
        else:
            write_to_file(f"C:\\Users\\Admin\\.vscode\\learn_program_projects\\project_pesa_messages\\Transaction.txt", item, 'a')

        # add the count
        count += 1
    # returnt he file name
    return "C:\\Users\\Admin\\.vscode\\learn_program_projects\\project_pesa_messages\\Transaction.txt"

# read the file - return the string
def read_file(path):
    try:
        # open the file and read it
        with open(path) as file_objects:
            lines = file_objects.readlines()
    except FileNotFoundError:
        print("Sorry the file you provided is not found")

    # return 
    return lines
