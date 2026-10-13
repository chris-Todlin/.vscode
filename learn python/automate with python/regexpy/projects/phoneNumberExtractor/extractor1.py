#! python3
# extractor1.py - This is the first one to start the program 
import re

sample_text = """
John Doe - Phone: +254-712-345678, Email: john.doe@example.com
Jane Smith - Phone: 0712-987-654, Email: jane_smith@work.co.ke
"""

# the first condition is only the digits whould be 10 or 13
def cheker1(strUser):
    check1 = re.compile(r'\+\d{3}-\d{3}-\d{6}|\d{4}-\d{3}-\d{3}')
    results1 = check1.search(strUser)

    print(results1.group())
    results1 = check1.findall(strUser)

    print(results1)

def emailchecker1(userstr):
    emailcheck = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}')
    results1 = emailcheck.findall(userstr)
    
    print(results1)
def dateChecker(struser):
    datecheck1 = re.compile(r'\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2}')
    results1 = datecheck1.findall(struser)
    
    print(results1)

cheker1(sample_text)
emailchecker1(sample_text)
dateChecker('30/06/2026 2026-06-30')