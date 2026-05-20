# Project Explanation

LightLink is a Li-Fi communication system that uses visible light instead of radio waves to transmit data.

The system uses a custom React-based web application to convert messages into Morse code flashlight pulses. An ESP32 with an LDR sensor detects the incoming light intensity changes and processes the received signals.

A 16x2 LCD display is connected to the ESP32 to display live sensor values and decoded message output during testing.

# Working Principle

## Transmission
The user enters a message into the React-based web application.

The application converts the text into Morse code patterns and transmits them using flashlight/light pulses.

Short pulses represent dots and longer pulses represent dashes.

## Detection
The LDR sensor detects changes in light intensity and sends analog values to the ESP32.

The ESP32 processes the incoming light changes and measures pulse timing.

## Output
The processed information is displayed on the 16x2 LCD display connected to the ESP32.
