#! python3
import re, pprint, json
import sorting1

# dict for the 
data_dict = {
    'Trasaction_code': [],
    'Amount' :  [],
    'Transactee': [],
    'Transaction_cost': [],
}

# the final dump list
final_dump = []

# text to use
text = ''


# function to take in the code
def extract_code(text):
    for i in range(len(text)):
        # for each line, get the [0:10]
        data_dict['Trasaction_code'].append(text[i][0:10])

# extract the amount
def extract_amount(text):
    # getting the regex for the nice
    pattern = re.compile(r'Ksh(\d+.\d+)')
    for i in range(len(text)):
        mo = pattern.search(text[i])
        if mo:
            # find the index of , in the search 
            new_data = mo.groups()[0].replace(',', '')
            data_dict['Amount'].append(new_data)
        else: 
            pass

# extract the involvment
def extract_transactee(text):
    # getting the regex for the nice
    pattern = re.compile(r'((from|to|of) (.*) on (\d+/\d+/\d+))')
    for i in range(len(text)):
        mo = pattern.search(text[i])
        if mo:
            # find the index of on
            index_no = mo.group().index(' on')
            index_first = 0
            # find the index of from or to 
            if 'from' in mo.group():
                index_first = 5
            else:
                index_first = 3
            data_dict['Transactee'].append(mo.group()[index_first:index_no])
        else: 
            pass

# extract the date
def extract_date(text):
    # getting the regex for the nice
    pattern = re.compile(r'\d+/\d+/\d+')
    mo = pattern.findall(''.join(text))
    if mo:
        data_dict['Date'] = mo
    else: 
        pass

# extract the Time
def extract_time(text):
    # getting the regex for the nice
    pattern = re.compile(r'(\d+:\d+ .{2})')
    mo = pattern.findall(''.join(text))
    if mo:
        data_dict['Time'] = mo
    else: 
        pass

# extract the Time
def extract_balance(text):
    data_dict['Balance'] = []
    # getting the regex for the nice
    pattern = re.compile(r'.* is Ksh(\d+.\d+)')
    mo = pattern.findall(''.join(text))
    for i in range(len(mo)):
        mo[i] = mo[i].replace(',', '')
    data_dict['Balance'] = mo

# extract the Transaction cost
def extract_transaction_cost(text):
    # getting the regex for the nice
    pattern = re.compile(r'Transaction cost(,)? Ksh.+')
    for i in range(len(text)):
        mo = pattern.search(text[i])
        if mo:
            pattern2 = re.compile(r'Ksh(.)?(\d+.\d+)')
            mo2 = pattern2.search(mo.group())
            data_dict['Transaction_cost'].append(mo2.groups()[1])
        else: 
            data_dict['Transaction_cost'].append('0.00')
            pass

# convert the file to json
def get_json():
    data_special = {
        'data': final_dump
    }
    with open('data.json', 'w') as f_obj:
        json.dump(data_special,f_obj)

# convert the file to csv for other use such a visualization or analysis
def get_csv():
    with open('data.csv', 'w') as f_obj:
        for line in final_dump:
            f_obj.write(line + '\n')

# function to join all the data as on
def join_data(data):
    data['Status'] = sorting1.status
    # get the keys of the data
    keys = list(data.keys())

    # run a loop for the whole
    final_dump.append("CODE,AMOUNT,TRANSACTEE,TRANSACTION COST,DATE,TIME,BALANCE,STATUS")
    for i in range(len(data[keys[0]])):
            str = ''
            for j in range(len(keys)):
                if j == len(keys) - 1:
                    #print(data[keys[j]][i])
                    str += data[keys[j]][i]
                else:
                    #print(data[keys[j]][i])
                    str += data[keys[j]][i] + ","
            final_dump.append(str)
    # get the csv
    get_csv()
            

# the fiulldata extracted function functon
def extract_full_data(text):
    extract_code(text)
    extract_amount(text)
    extract_transactee(text)
    extract_date(text)
    extract_time(text)
    extract_balance(text)
    extract_transaction_cost(text)

    return data_dict