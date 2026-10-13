#! python3
# processtrial.py - Trying out the part on the process of the program 

# setting the points right 
points = {
    'A' : 4.0,
    'B' : 3.0,  
    'C' : 2.0,
    'D' : 1.0,
    'F' : 0.0
}

def assign_points(grades):
    # run the loop for the grades dictionary 
    for v in grades.values():

        # since we have the grades sanitized, we only focus on the assignment 
        v['points'] = points[v['grade']] # assign the points to each subject

    # find the toatal points there in
    total_points = 0

    for v in grades.values():
        total_points  += v['points']

    # Find the average points
    average_points = total_points / len(grades) 

    # add the two to the dictonary 
    grades['total'] = {
        'total_points' : total_points,
        'average_points' : average_points
    }

    return grades # return the modifies dictoanary 
