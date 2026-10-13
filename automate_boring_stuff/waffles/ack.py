#! python3

# This file is going to simulate te acknoledgement of the packets from the sender to the reciever
import time

def packet_timer(sec):
    start_time = time.perf_counter()
    time.sleep(sec)
    end_time = time.perf_counter()

    return end_time - start_time

def checker_ack():
    count = 1
    timers = [20,1,23,45]

    while count < 5:
        print(packet_timer(timers[count -1]))
        if packet_timer(timers[count -1]) < 3:
            print("Acknoledgement recieved...")
            break
        elif count == 4:
            print("Tired of sending these packets.")
        else:
            print("Trying again...")
        count += 1


# now the main part
if __name__ == "__main__":
    checker_ack()