
#! Python3 
# This module is going to helps us understand more about the shelve module
# Which is used to save thing or variable on the hard drive

import shelve, os, time
import file_open_read as fo

# say we have a list and we want to save it
cats = ['Zophie', 'Pooka', 'Simon']

def create_shelve():
    start_time = time.perf_counter()
    fo.create_dir('shelve_files')
    # open the shelve data file
    shelfFile = shelve.open('mydata')

    # now save it 
    shelfFile['cats'] = cats

    # close the file
    shelfFile.close()

    os.chdir('..')
    print('Everything all okay..')
    end_time = time.perf_counter()
    print(f"Writing and reading time {end_time - start_time:.2f} seconds")

# another variation of the file 
def file_hard():
    start_time = time.perf_counter()
    fo.create_dir('shelve_files')
    with shelve.open('datamine') as f_obj:
       f_obj['dog'] = cats

    os.chdir('..')
    print('Everything all okay..')
    end_time = time.perf_counter()
    print(f"Writing and reading time {end_time - start_time:.2f} seconds")

create_shelve()
file_hard()