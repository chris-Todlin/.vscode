#! python3
import os,time
# This file is going to open the file and read its content

# first check if the file exists
filename = 'hello.txt'
count = 1

# check if the file exists
def file_exists(filename):
    start_time = time.perf_counter()
    if os.path.isfile(os.path.join(os.getcwd(), filename)):
        print("The file above mentioned exists")
        print("Openning file...")

        with open(filename) as file_obj:
            content = file_obj.read()

            # using readline
            content_1 = file_obj.readline()

            print(content)
            print(content_1)
            end_time = time.perf_counter()
            print(f"Reading time {end_time - start_time:.2f} seconds")
    else:
        print("No such file exist in our system")

# df create a dit for the written file
def create_dir(dirname):
    try:
        # create the dir
        os.makedirs(os.path.join(os.getcwd(), dirname))

    except Exception as e:
        print("Problem in dealing with this one")
    else:
        print("file created")
        # change the working directory to create the file
        os.chdir(os.path.join(os.getcwd(), dirname))

# def writing to a file
def write_to_file():
    # first create a dir and check if it exist for the writen file
    start_time = time.perf_counter()
    create_dir('written_files')
    filename = f"file{count}.txt"

    # create the file 
    with open(filename, 'w') as file_object:
        # write to the file
        file_object.write('Hello world!\n')

    # apend the text then 
    with open(filename, 'a') as f_obj:
        f_obj.write('Bacon is not a vegetable.')

    # read the file
    file_exists(filename)

    # return to the former working directory
    os.chdir('..')
    end_time = time.perf_counter()
    print(f"Writing and reading time {end_time - start_time:.2f} seconds")


# the main thin
def main():
    file_exists(filename)
    file_exists('sonnet29.txt')
    write_to_file()

# checking ...
if __name__ == "__main__":
    main()