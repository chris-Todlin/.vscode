#! python3

# This file is going to read the txt file and print upto a crtain number of lines
filepath = "C:\\Users\\Admin\\.vscode\\learn_program_projects\\project_pesa_messages\\text_file\\Note.txt";
expend_file = "C:\\Users\\Admin\\.vscode\\learn_program_projects\\project_pesa_messages\\text_file\\expenditure.txt";
status_code = "C:\\Users\\Admin\\.vscode\\learn_program_projects\\project_pesa_messages\\text_file\\status.txt";


# now read the file and print 
with open(filepath) as file_object:
    content = file_object.read();

    # try the search 
    content_list = content.split(' ');

    print(content[:50] + "...");

    # th ewords
    expe_words = ['sent','paid','of','withdrawal'];
    content_file = '';
    status_message = '';

    # search for a word
    for i in range(len(content_list)):
        # now find the wor you want 
        if content_list[i] in expe_words:
            # find the index of the word 
            exp = '';
            for j in range(i+2, i+10):
                if content_list[j] == 'on':
                    break;
                else: 
                    exp += content_list[j] + ' ';
            content_file += exp + '\n'
        if content_list[i].lower() == 'cofirmed':
            status_message += content_list[i-1:i+1] + '\n';
        if content_list[i].lower() == 'failed':
            status_message += content_list[i] + '\n';
    with open(expend_file, 'w') as file_content:
        file_content.write(content_file);
    # the status file
    with open(status_code, 'w') as file_content:
        file_content.write(status_message);

    # for the content from 0:first .

# then read the expenditure file
with open(expend_file) as file_object:
    content = file_object.read()

    print(content)

# then read the expenditure file
with open(status_code) as file_object:
    content = file_object.read()

    print(content)