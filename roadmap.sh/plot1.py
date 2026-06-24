import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import CubicSpline

# ------------------------------------------------
# Robot Car Speed Data (realistic rise then fall, ~1 m/s max)
# ------------------------------------------------
t_data = np.array([0.27, 0.9, 1.74, 3.0, 4.0, 5.4, 8.0, 10.0, 14.0, 20.0], dtype=float)
v_data = np.array([0.10, 0.35, 0.60, 0.85, 0.95, 1.00, 0.92, 0.85, 0.70, 0.55], dtype=float)

# ------------------------------------------------
# Cubic Spline Interpolation
# ------------------------------------------------
cs = CubicSpline(t_data, v_data)
t_smooth = np.linspace(0, max(t_data), 1000)
v_smooth = cs(t_smooth)
dv_dt = cs(t_smooth, 1)  # derivative (acceleration)

# ------------------------------------------------
# Inflexion Point (maximum acceleration)
# ------------------------------------------------
idx_inflect = np.argmax(dv_dt)
t_inflect = t_smooth[idx_inflect]
v_inflect = v_smooth[idx_inflect]
m_inflect = dv_dt[idx_inflect]

# ------------------------------------------------
# Maximum Speed
# ------------------------------------------------
idx_max = np.argmax(v_smooth)
t_max = t_smooth[idx_max]
v_max = v_smooth[idx_max]

# ------------------------------------------------
# Tangent Line reaching max speed
# ------------------------------------------------
t_line_max = ((v_max - v_inflect) / m_inflect) + t_inflect
t_line = np.linspace(0, max(t_data), 1000)
v_tangent = m_inflect * (t_line - t_inflect) + v_inflect

# ------------------------------------------------
# Plotting
# ------------------------------------------------
plt.figure(figsize=(10, 6))
plt.plot(t_data, v_data, 'o', markersize=8, label='Measured Data')
plt.plot(t_smooth, v_smooth, linewidth=2, label='Speed Curve')
plt.plot(t_line, v_tangent, linewidth=2.5, label='Inflexion Tangent Line')

# Highlight key points
plt.scatter(t_inflect, v_inflect, s=100, color='red', zorder=5)
plt.text(t_inflect + 0.3, v_inflect, f'Inflexion\n({t_inflect:.2f}, {v_inflect:.2f})')

plt.scatter(t_max, v_max, s=100, color='green', zorder=6)
plt.text(t_max - 2, v_max - 0.05, f'Max Speed\n({v_max:.2f} m/s)')

plt.scatter(t_line_max, v_max, s=100, color='purple', zorder=7)
plt.text(t_line_max - 2, v_max + 0.05, f'Tangent = Max Speed\n({t_line_max:.2f}, {v_max:.2f})')

# Axis and labels
plt.xlim(0, max(t_data))
plt.ylim(0, 1.1 * v_max)
plt.xlabel('Time (s)')
plt.ylabel('Speed (m/s)')
plt.title('Robot Car Speed Curve with Rise and Fall (~1 m/s)')
plt.grid(True)
plt.legend()
plt.show()
