import matplotlib.pyplot as plt

time = [0.25,0.5,0.75,1,1.5,2,2.5,3,4,5]
speed = [0.34,0.63,0.91,1.20,1.27,1.35,1.23,1.02,1.12,1.25]
pwm   = [25,35,45,56,70,80,74,51,54,66]

fig, ax1 = plt.subplots()

ax1.plot(time, speed, 'o-', linewidth=2, label='Speed')
ax1.set_xlabel('Time (s)')
ax1.set_ylabel('Speed (m/s)')
ax1.grid(True)

ax2 = ax1.twinx()
ax2.plot(time, pwm, 's--', linewidth=2, color='orange', label='PWM Duty-Cycle')
ax2.set_ylabel('PWM Duty-Cycle (%)')

fig.suptitle('Four Motors with Lead Controller')
fig.legend(loc='upper left')
plt.show()
