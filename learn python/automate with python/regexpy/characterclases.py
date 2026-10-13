#! python3
# characterclases.py - shows how to use character classes in regex

import re

# trial case one
xmasRegex = re.compile(r'\d+\s\w+')
findings = xmasRegex.findall('12 drummers, 11 pipers, 10 lords, 9 ladies, 8 maids, 7 swans, 6 geese, 5 rings, 4 birds, 3 hens, 2 doves, 1 partridge')
print(findings)