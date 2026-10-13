#! python3

# This file is going to open the excel file for you wait in a moment
import openpyxl, shutil, os, time, re

excel_file = []

# function to look into the childir and find the .xlx file
def find_file():
    pattern_excel = re.compile(r'.*.xlsx')

    # find the childir
    for files in os.listdir('.'):
        if pattern_excel.match(files):
            excel_file.append(files)

    print(excel_file)

# function for that
def open_file(filename):
    start_time = time.perf_counter()
    find_file()

    # workbook
    wb_1 = openpyxl.load_workbook(filename)

    # find the type od the wb
    print(type(wb_1))

    # try printing
    print(wb_1)

    end_time = time.perf_counter()

    print(f"Excecution time {end_time - start_time:.2f}")

# the main function
def main():
    """ for file in excel_f """
    """     open_file(file) """
    find_file()
    open_file  ('Book1.xlsx')


if __name__ == "__main__":
    main()