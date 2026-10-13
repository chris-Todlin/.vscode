#! python3

# This file is going to use the regex searching t do the work
import re # for the regular expression

# the phoneRegex
def regex_num():
    phoneNumRegex = re.compile(r"\d\d\d-\d\d\d-\d\d\d\d")
    mo =phoneNumRegex.search('My number is 415-555-4242.')
    print(f"Phone number found: {mo.group()}")

# the phoneRegex usign grouping
def regex_num_grouping():
    phoneNumRegex = re.compile(r"(\d\d\d)-(\d\d\d-\d\d\d\d)")
    mo =phoneNumRegex.search('My number is 415-555-4242.')
    print(mo.groups())
    print(f"Phone number found: {mo.group()}")

# usingt he pipe option
def regex_pipe():
    hero_regex = re.compile(r'Batman|Tina Fey')

    mo1 = hero_regex.search('Batman and Tina Fey.')
    print(mo1)

    mo2 = hero_regex.search('Tina Fey and Batman.')
    print(mo2)

# finding diffrent variation of the bat man
def variation_regex():
    bat_regex = re.compile(r'Bat(man|copter|mobile|bat)')
    mo = bat_regex.search('Batmobile lost a wheel')
    print(mo.groups())

# Optional matching with the ?
def option_mathcing():
    opt_match = re.compile(r'Bat(wo)?man')
    mo1 = opt_match.search('The Adventures of Batman')
    print(mo1.group())
    mo2 = opt_match.search('The Adventures of Batwoman')
    print(mo2.group())

# mathing with *
def asterik_matching():
    opt_match = re.compile(r'Bat(wo)*man')
    mo1 = opt_match.search('The Adventures of Batman')
    print(mo1.group())
    mo2 = opt_match.search('The Adventures of Batwoman')
    print(mo2.group())
    mo3 = opt_match.search('The Adventures of Batwowowowoman')
    print(mo3.group())

# mathing with +
def plus_matching():
    try:
        opt_match = re.compile(r'Bat(wo)+man')
        mo1 = opt_match.search('The Adventures of Batman')
        print(mo1.group())
        mo2 = opt_match.search('The Adventures of Batwoman')
        print(mo2.group())
        mo3 = opt_match.search('The Adventures of Batwowowowoman')
        print(mo3.group())
    except AttributeError:
        print("There was an error in one of the pattern, reulsted to NONE")

# using the curly brackets to prevent a repetition of pattern such a 1111 and such
def repetition_regex():
    try:
        ha_regex = re.compile(r'(Ha){3}')
        mo1 = ha_regex.search('HaHaHa')
        print(mo1.group())

        mo2 = ha_regex.search('Ha')
        print(mo2 == None)
    except AttributeError:
        pass

def greedy_nongreedy():
    try:
        greedyHaRegex = re.compile(r'(Ha){3,5}')
        mo1 = greedyHaRegex.search('HaHaHaHaHa')
        print(mo1.group())
        nongreedyHaRegex = re.compile(r'(Ha){3,5}?')
        mo2 = nongreedyHaRegex.search('HaHaHaHaHa')
        print(mo2.group())
        print(mo2.findall())
    except AttributeError:
        pass

# mathcing somthing like failed or confiremed
def comfirmsomething(message):
    code_regex = re.compile(r'(\w{2}\d\w{2}\d{2}\w{3})')
    status_regex = re.compile(r'(failed|(C|c)onfirmed)')
    revenue_regex = re.compile(r'(recieved|deposited)')
    expenditure_regex = re.compile(r'(transferred|bought|sent|paid|withdrawal)')
    account_balance_regex = re.compile(r'(account balance)')

    # date regex
    time_regex = re.compile(r'(\d+:\d+ (PM|AM))')
    # now the time regex
    date_regex = re.compile(r'\d+/\d+/\d+')
    # amount regex
    amount_regex = re.compile(r'(is Ksh\d+.\d+)')
    balance_regex = re.compile(r'(is Ksh\d+.\d+)')
    print(code_regex.findall(message))
    print(status_regex.findall(message))
    print(revenue_regex.findall(message))
    print(expenditure_regex.findall(message))
    print(account_balance_regex.findall(message))
    print(date_regex.findall(message))
    print(time_regex.findall(message))
    print(balance_regex.findall(message))

# the main
if __name__ == "__main__":
    regex_num()
    regex_num_grouping()
    regex_pipe()
    variation_regex()
    option_mathcing()
    asterik_matching()
    plus_matching()
    repetition_regex()
    greedy_nongreedy()

    message = '''
            UJ5AB96MJR Confirmed. Your account balance was: M-PESA Account : Ksh157.00 M-PESA Pochi Account : Ksh0.00 on 5/10/26 at 12:31 PM. Transaction cost, Ksh0.00. Buy & sell NSE shares NOW with ZIIDI Trader on https://saf.cx/gkMQq
            UJ4M18RIP0 confirmed.You bought Ksh20.00 of airtime for 0745367797 on 4/10/26 at 1:20 PM.New  balance is Ksh185.00. Transaction cost, Ksh0.00. Amount you can transact within the day is 499,915.00.You can now access M-PESA via *334#
            UJ5M18VSG9 confirmed.You bought Ksh10.00 of airtime on 5/10/26 at 12:39 PM.New M-PESA balance is Ksh145.00. Transaction cost, Ksh0.00. Amount you can transact within the day is 499,960.00. See all your balances now https://saf.cx/3wAmy
            UJ5M18UJVA Confirmed. Ksh30.00 sent to JENAN  NAMACHANJA on 5/10/26 at 7:04 AM. New M-PESA balance is Ksh155.00. Transaction cost, Ksh0.00. Amount you can transact within the day is 499,970.00. See all your balances now https://saf.cx/kWQpy
            UJ5M18VPLC Confirmed. Your account balance was: M-PESA Account : Ksh155.00 M-PESA Pochi Account : Ksh0.00 on 5/10/26 at 12:32 PM. Transaction cost, Ksh0.00. Buy & sell NSE shares NOW with ZIIDI Trader on https://saf.cx/gkMQq
            UJ5AB96SIX Confirmed. Ksh50.00 sent to E-CITIZEN for account YZVRQXQNW on 5/10/26 at 12:43 PM New M-PESA balance is Ksh107.00. Transaction cost, Ksh0.00.Amount you can transact within the day is 499,950.00. See all your balances now https://saf.cx/kWQpy
            UJ5M18VQVJ Confirmed. Your account balance was: M-PESA Account : Ksh155.00 M-PESA Pochi Account : Ksh0.00 on 5/10/26 at 12:28 PM. Transaction cost, Ksh0.00. Buy & sell NSE shares NOW with ZIIDI Trader on https://saf.cx/gkMQq
            UJ5M18UJXF Confirmed. Your account balance was: M-PESA Account : Ksh155.00 M-PESA Pochi Account : Ksh0.00 on 5/10/26 at 7:07 AM. Transaction cost, Ksh0.00. Buy & sell NSE shares NOW with ZIIDI Trader on https://saf.cx/gkMQq
            UJ5AB97S54 Confirmed. Ksh20.00 sent to DESMOND  KISUVEI on 5/10/26 at 5:01 PM. New M-PESA balance is Ksh87.00. Transaction cost, Ksh0.00. Amount you can transact within the day is 499,930.00. See all your balances now https://saf.cx/kWQpy
            UJ5AB98YLK Confirmed. Ksh50.00 paid to DAVID NGUGI NJUGUNA. on 5/10/26 at 7:38 PM.New M-PESA balance is Ksh37.00. Transaction cost, Ksh0.00. Amount you can transact within the day is 499,880.00. See all your balances now https://saf.cx/kWQpy
            '''
    comfirmsomething(message)



'''
Table 7-1: Shorthand Codes for Common Character Classes
Shorthand character class
Represents
\d
\D
\w
\W
\s
\S
Any numeric digit from 0 to 9.
Any character that is not a numeric digit from 0 to 9.
Any letter, numeric digit, or the underscore character. 
(Think of this as matching “word” characters.)
Any character that is not a letter, numeric digit, or the 
underscore character.
Any space, tab, or newline character. (Think of this as 
matching “space” characters.)
Any character that is not a space, tab, or newline.
Character classes are nice for shortening regular expressions. The char
'''