
#! python3
import random, os, time, shutil
from captals_data import capitals
# This file is going to create the files of the quizes
# STEP 2:

# create the function to read the files
def create_file(num):
  create_start = time.perf_counter()
  answers = ''
  # shuffle the capitals
  states = list(capitals.keys())
  random.shuffle(states)

  with open(f"capitalsquiz{num+1}.txt", 'w') as f_obj:
      # write the header of the file
      f_obj.write(f"Name: \n\nDate:\n\nPeriod\n\n")
      f_obj.write(f"{' ' *20} State Capitals Quiz (Form {num + 1})")
      f_obj.write('\n\n')
  
  # run the loop 
  for i in range(50):
    quest_time = time.perf_counter()
    # get the write answer
    correct_ans = capitals[states[i]]
    wrong_ans = list(capitals.values())
    
    # delete the index of the correct answer
    del wrong_ans[wrong_ans.index(correct_ans)]
    
    # get a sample of the wrong answers
    wrong_ans = random.sample(wrong_ans, 3)
    ans_opt = wrong_ans + [correct_ans]
    
    # shuffle again
    random.shuffle(ans_opt)

    # write the question - 50
    with open(f"capitalsquiz{num+1}.txt", 'a') as f_obj:
        # write the header of the file
        f_obj.write(f"{i+1}. What is the capital of {states[i]}?\n")

        # write the answers
        for j in range(4):
          f_obj.write(f"  {'ABCD'[j]}. {ans_opt[j]}\n")
        f_obj.write('\n')

    # open the file for the answer
    with open(f"capitalsquiz_answers{num+1}.txt", 'a') as f_obj:
      f_obj.write(f"{i+1}.{'ABCD'[ans_opt.index(correct_ans)]}\n")
  end_time = time.perf_counter()

  print(f"Creating time: {end_time - create_start:.2f} seconds")
  print(f"Writing time: {end_time - quest_time:.2f} seconds")

# function to create the file
def files_creator():
  if os.path.exists(os.path.join(os.getcwd() , 'quiz_files')):
    # delete the previous quiz_files
    shutil.rmtree(os.path.join(os.getcwd() , 'quiz_files'))
    print("Deleted the previous file folder ...")
    print('Sleeping ...')
    time.sleep(10)
    print('Aaah!, I need to go on...')
  
  start_time = time.perf_counter()
  #  change the dir after creating the folder quiz_files
  os.makedirs(os.path.join(os.getcwd() , 'quiz_files'))

  os.chdir(".\\quiz_files")
  print(f"{os.getcwd()} during file creation")
  for i in range(35):
     create_file(i)
  #print(os.listdir("."))

  # return the 
  os.chdir('..\\')
  print(f"{os.getcwd()} after file creation")
  end_time = time.perf_counter()
  print(shutil.disk_usage(os.path.join(os.getcwd())))
  print(f"Process time: {end_time - start_time:.2f} seconds")

#
if __name__ == "__main__":
   files_creator()