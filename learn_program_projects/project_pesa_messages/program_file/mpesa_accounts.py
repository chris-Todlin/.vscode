#! python3

# import the thing I want
import sorting1, sorting2, pprint, time

# get the main function
def main():
    start_time = time.perf_counter() # start the timer
    # doing the sorting of teh data to get the two files
    data = sorting1.sorting_func()

    # create the file for the reading
    filename = sorting1.print_dict(data)

    # read file and return the list
    content = sorting1.read_file(filename)

    full_data = sorting2.extract_full_data(content)

    # now join the data
    sorting2.join_data(full_data)

    end_time = time.perf_counter() # stop the timer
    print(f"Execution time: {end_time - start_time:.2f} seconds")

# checking ...
if __name__ == "__main__":
    main()