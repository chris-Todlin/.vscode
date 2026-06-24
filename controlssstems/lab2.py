import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit

# Table 3 data (Four Motors, Track with Corners)
t_data = np.array([0.0, 1.3, 1.4, 3.6, 5.7, 6.8, 9.0], dtype=float)
y_data = np.array([0.00, 1.23, 1.02, 0.78, 1.10, 0.95, 1.31], dtype=float)

# First-order step-response model
def first_order_step(t, y0, K, tau):
    return y0 + K * (1 - np.exp(-t / tau))

# Initial guesses
y0_guess = y_data[0]
K_guess = y_data[-1] - y_data[0]
tau_guess = (t_data[-1] - t_data[0]) / 5

p0 = [y0_guess, K_guess, tau_guess]

# Curve fit
popt, pcov = curve_fit(first_order_step, t_data, y_data, p0=p0)

y0_fit, K_fit, tau_fit = popt

# Fitted response
y_fit = first_order_step(t_data, y0_fit, K_fit, tau_fit)

# Error measures
rmse = np.sqrt(np.mean((y_data - y_fit)**2))

print(f"y0  = {y0_fit:.6f}")
print(f"K   = {K_fit:.6f}")
print(f"tau = {tau_fit:.6f}")
print(f"RMSE = {rmse:.6f}")

# Plot raw data and fitted curve
plt.figure(figsize=(8,5))
plt.plot(t_data, y_data, 'o', label='Raw data')
plt.plot(t_data, y_fit, '-', linewidth=2, label='Curve fit')
plt.xlabel('Time (s)')
plt.ylabel('Speed (m/s)')
plt.title('Raw Data and Curve Fit (Four Motors)')
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()
