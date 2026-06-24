import numpy as np
import matplotlib.pyplot as plt

# ------------------------------------------------
# Table 2 data (PID controller)
# ------------------------------------------------
t_data = np.array([0.25, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0], dtype=float)
v_data = np.array([0.22, 0.43, 0.63, 0.80, 0.93, 1.00, 1.02, 1.00, 0.97, 0.95], dtype=float)

# ------------------------------------------------
# Interpolation for smooth curve
# ------------------------------------------------
t_smooth = np.linspace(0, 5, 1000)
v_smooth = np.interp(t_smooth, t_data, v_data)

# ------------------------------------------------
# Compute lap time (10 m track)
# ------------------------------------------------
distance = np.sum((v_smooth[1:] + v_smooth[:-1]) / 2 * np.diff(t_smooth))
track_length = 10.0
lap_time = track_length / np.mean(v_smooth)

# ------------------------------------------------
# Plot Speed vs Time
# ------------------------------------------------
plt.figure(figsize=(10, 6))
plt.plot(t_data, v_data, 'o-', linewidth=2, markersize=8, label='Speed (PID Control)')
plt.title('Robot Car Speed vs Time (PID Controller)')
plt.xlabel('Time (s)')
plt.ylabel('Speed (m/s)')
plt.grid(True)
plt.legend()
plt.xlim(0, 5.5)
plt.ylim(0, 1.2)
plt.show()

# ------------------------------------------------
# Output lap time
# ------------------------------------------------
print(f"Estimated lap time with PID control: {lap_time:.2f} seconds")
