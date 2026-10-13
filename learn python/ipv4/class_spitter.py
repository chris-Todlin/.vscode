#! python3

# this program is going to spit out the class given the ipv4 in 32-bit formart

# ask for the Ipv4 string 
""" ip_addr = input("Enter the IPV4 address in 32 bit notation : ");
octets = ip_addr.split('.')

# slice the first ip_addr[0-4]
first_octet = int(octets[0]); """

# variable
octets = [0,0,0,0];

# finctiion to find the class of the given IPV4 address
def find_class(first_octet):
   # apply the class rules
   class_of_ip = None;
   if first_octet >=0 and first_octet <=127:   
      class_of_ip = 'A';
      print("The class of the given IPV4 address is Class A");
   elif first_octet <= 191:
      class_of_ip = 'B';
      print("The class of the given IPV4 address is Class B");
   elif first_octet <= 223:
      class_of_ip = 'C';    
      print("The class of the given IPV4 address is Class C");
   elif first_octet <= 239: 
      class_of_ip = 'D';
      print("The class of the given IPV4 address is Class D");
   elif first_octet <= 255:
      class_of_ip = 'E';
      print("The class of the given IPV4 address is Class E");
   else:    
      class_of_ip = None;
      print("No such class exists!!");

   # the part to find the netid and hostid of the given IPV4 address
   print("The netid and hostid of the given IPV4 address is : ");
   if class_of_ip in classes_dict:
      netid = classes_dict[class_of_ip]['netid']
      hostid = classes_dict[class_of_ip]['hostid']
      print(f"NetID: {netid}, HostID: {hostid}")
      print(f"The number of hosts in this class is: {2 ** (hostid * 8) - 2}")
    

# function to turn 8 bit into decimal
def bit_to_decimal(bit):
    decimal = 0;
    for i  in range(8):
        decimal = int(decimal)  + int(int(bit[i]) * (2 ** (7 - i)));
    print(decimal);
    return decimal;

# function to group into 8bit
def group_into_8bits(ip_addr):
    octets;
    for i in range(0,4):
        octets[i] = (ip_addr[i*8:(i+1)*8]);
    return octets;

# setting a base on if there is a spcae between the bits to split
def split_bits(ip_add):
    return ip_add.split(); # the space

# main program 
def main():
    # addint the loop part till the exit is neter
    while True:
        print("Is the notation in 32 bit or 2 bit format? ");
        contr = input();
        
        # control structure to check the format of the IPV4 address
        if contr == "32":
            ip32();
        elif contr == "2":
            ip2();
        else:
            print("Invalid input!!");

        # ask if the user wants to continue or not
        print("Do you want to continue? (y/n) : ");         
        continue_choice = input();
        if continue_choice != "y":
            break;

# the funxtion for the 32 
def ip32():
    ip_addr = input("Enter the IPV4 address in 32 bit notation : ");
    octets = ip_addr.split('.')

    # slice the first ip_addr[0-4]
    first_octet = int(octets[0]);

    find_class(first_octet);

def ip2():
    ip_add =input("Enter the IPV4 address in 2 bit notation : ");

    group_into_8bits(ip_add);

    octets_two = None;

    # getting the bit sin group first
    if len(ip_add) == 32:
        octets_two = group_into_8bits(ip_add);
    else:
        octets_two = split_bits(ip_add);

    # now get the bit into decimal but octets
    for i in range(0,4):
        octets[i] = bit_to_decimal(octets_two[i]);

    # find the class
    find_class(octets[0]);

# find the netid and hostid of the given IPV4 address
classes_dict = {
    'A': {'netid': '1 byte ', 'hostid': 3},
    'B': {'netid': '2 bytes', 'hostid': 2}, 
    'C': {'netid': '3 bytes', 'hostid': 1},
    'D': {'netid': '0 bytes', 'hostid': 0, 'note': 'Multicast address'},
    'E': {'netid': '0 bytes', 'hostid': 0 , 'note': 'Experimental: Reserved for future use'}
}

def get_it(addr):
    # split the addres to make room for the .
     ip_addr = addr.split('.');
     # get teh binary_num
     binary_numbers = [0,0,0,0];
     # now get the loop running
     for i in range(len(ip_addr)):
         binary_numbers[i] = f"{int(ip_addr[i]):08b}"
     # then join the numbers
     binary_number = ' '.join(binary_numbers);
     print(binary_number);

# AAA!! I need to clean up this dirty laundry
main();