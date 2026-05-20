# LightLink — Li-Fi Communication System

Li-Fi communication system using an ESP32, LDR sensor, 16x2 LCD display, and a custom React-based web application to transmit and decode Morse code data through light pulses.

---

# Project Preview

<img width="800" height="600" alt="image" src="https://github.com/user-attachments/assets/1a394348-ef27-45c1-858f-c62175c260dc" />


![LCD Output](media/lcd-demo.jpg)

![Web App](media/webapp.png)

---

# Features

- ESP32-based receiver system
- LDR analog light detection
- 16x2 LCD live output display
- Morse code transmission system
- React-based custom web application
- Adjustable transmission timing controls
- Real-time transmission indicators
- Flashlight/light pulse communication


---

# How It Works

## Transmission
The user enters a message into the custom web application.

The application converts the message into Morse code and transmits it using flashlight/light pulses.

The web app also:
- shows the currently transmitting character
- displays live Morse symbols
- glows during transmission
- provides phone vibration feedback
- allows timing adjustments through settings

## Detection
The LDR sensor detects changes in light intensity and sends analog readings to the ESP32.

The ESP32 processes the incoming signals using MicroPython firmware.

## Output
Processed output and sensor information are displayed on the 16x2 LCD display connected to the ESP32.

---

# Technologies Used

## Hardware
- ESP32 Development Board
- LDR Sensor
- 16x2 LCD Display
- Breadboard
- Jumper Wires

## Software
- MicroPython
- Thonny IDE
- React
- JavaScript
- HTML/CSS
- CodeSandbox

---

#  Web App

https://xg2v9v.csb.app/

---

# Repository Structure

```text
lightlink-lifi/
│
├── firmware/
├── webapp/
├── electronics/
├── docs/
└── README.md
```

---

# Development Process

1. Researched Li-Fi communication systems and Morse code transmission methods.
2. Set up ESP32 development using MicroPython and Thonny IDE.
3. Tested LDR analog sensor readings.
4. Integrated the 16x2 LCD display.
5. Developed the React-based transmission web app.
6. Completed real-time flashlight pulse communication testing.

---

