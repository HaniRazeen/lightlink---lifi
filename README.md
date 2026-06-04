# LightLink — Li-Fi Communication System

Hey there! LightLink is a fun, hands-on DIY Li-Fi (Light Fidelity) project I built to send and decode data using nothing but light waves. 

By typing a message into a custom React web app, the app translates the text into Morse code and flashes your phone or laptop screen. On the receiving end, an ESP32 equipped with a simple Light Dependent Resistor (LDR) captures those incoming light pulses, decodes them back into English characters in real time, and prints the message onto a 16x2 LCD screen.

---

# Project Preview

<img width="400" height="300" alt="LightLink Hardware Setup" src="https://github.com/user-attachments/assets/1a394348-ef27-45c1-858f-c62175c260dc" />

---

# Key Features

* **ESP32-Powered Receiver:** A standalone hardware module that captures and translates signal logic on the fly.
* **Analog Light Tracking:** Uses an LDR sensor to monitor shifting light levels and catch transmission peaks.
* **Live LCD Feed:** Decoded characters are pushed instantly to a 16x2 LCD screen so you can read messages live.
* **Web-Based Transmitter:** A custom React dashboard built to turn any modern smartphone, tablet, or laptop into a light transmitter.
* **Haptic & Visual Cues:** The app UI pulses in sync with the light bursts and uses mobile phone vibrations to let you "feel" the data stream.

---

# How It Works

### 1. The Transmitter (Web App)
You type a standard text message into the React app. The application takes that string, maps it directly to Morse code dots and dashes, and toggles the screen or flashlight to blink out the payload. 

To help you track what's happening, the app also:
* Highlights the exact character currently being sent.
* Flashes the background of the UI in real time with the bursts.
* Triggers phone vibrations to mimic the rhythm of the Morse signals.
* Allows you to speed up or slow down transmission timing to avoid signal drops.

### 2. The Detector (Hardware Assembly)
The LDR sensor keeps a constant eye on background light levels. When the transmitter flashes, it causes a sharp spike in the sensor's analog voltage. The ESP32 (running a custom MicroPython script) samples these readings, filters out ambient room noise, and maps the "on/off" durations back into Morse syntax.

### 3. The Output
Once a full letter or word sequence is recognized, the ESP32 decodes it back into English text and prints it straight to the 16x2 LCD display.

---

# Tech Stack

### Hardware
* **ESP32** Development Board
* **LDR Sensor** (Light Dependent Resistor)
* **16x2 LCD Display** (I2C interface makes this a lot cleaner to wire)
* Breadboard & Jumper Wires

### Software & Environment
* **MicroPython** (Firmware flash for the ESP32 logic)
* **Thonny IDE** (For testing and pushing scripts to the board)
* **React & JavaScript** (Handling the frontend UI and timing logic)
* **HTML5 & CSS3** (For the responsive layout and pulsing effects)
* **CodeSandbox** (Where the transmitter app is hosted)

---

# Web App

### Live Demo: [Try out the LightLink App](https://xg2v9v.csb.app/)

<img width="416" height="510" alt="LightLink Web App Interface" src="https://github.com/user-attachments/assets/e93d5f0f-4c32-403e-96ba-0c76995e7880" />

---

# Repository Layout

```text
lightlink-lifi/
│
├── docs/          # Project documentation
├── electronics/   # hardware wiring pinouts
├── firmware/      # MicroPython source code running on the ESP32
├── webapp/        # React frontend source files for the transmitter
├── .gitignore
├── LICENSE
└── README.md
