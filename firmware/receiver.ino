from machine import ADC, Pin, I2C
import time
from i2c_lcd import I2cLcd

I2C_ADDR = 0x27
i2c = I2C(0, scl=Pin(22), sda=Pin(21), freq=400000)
lcd = I2cLcd(i2c, I2C_ADDR, 2, 16)

lcd.putstr("Starting...")
time.sleep(2)
lcd.clear()


ldr = ADC(Pin(34))
ldr.atten(ADC.ATTN_11DB)

THRESHOLD = 2000   # Adjust if needed

# MORSE CODE

morse_to_text = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
    '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
    '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
    '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S',
    '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W',
    '-..-': 'X', '-.--': 'Y', '--..': 'Z',

    '-----': '0', '.----': '1', '..---': '2', '...--': '3',
    '....-': '4', '.....': '5', '-....': '6',
    '--...': '7', '---..': '8', '----.': '9'
}


# TIMING (MATCH IT WITH APP)

DOT_THRESHOLD = 500     # <200ms = dot, >200ms = dash
LETTER_GAP = 800        # gap between letters
WORD_GAP = 1500          # gap between words

current_symbol = ""
decoded_word = ""
last_signal_time = time.ticks_ms()

lcd.putstr("Receiving...")

print("RECEIVER STARTED")


while True:
    val = ldr.read()

    if val < THRESHOLD:
        start = time.ticks_ms()

    
        while ldr.read() < THRESHOLD:
            time.sleep(0.002)  

        duration = time.ticks_diff(time.ticks_ms(), start)

        print("Duration:", duration)

       
        if duration < DOT_THRESHOLD:
            current_symbol += '.'
        else:
            current_symbol += '-'

        print("Symbol:", current_symbol)

        last_signal_time = time.ticks_ms()

    # LETTER GAP
    if time.ticks_diff(time.ticks_ms(), last_signal_time) > LETTER_GAP:
        if current_symbol:
            letter = morse_to_text.get(current_symbol, '?')
            decoded_word += letter

            print(current_symbol, "->", letter)
            print("WORD:", decoded_word)
            print("----------------")

          
            lcd.clear()
            lcd.putstr("Receiving...")
            lcd.move_to(0, 1)
            lcd.putstr(decoded_word[:16])

            current_symbol = ""

   
    if time.ticks_diff(time.ticks_ms(), last_signal_time) > WORD_GAP:
        if decoded_word:
            print("=== NEW WORD ===\n")

            decoded_word = ""

            lcd.clear()
            lcd.putstr("New Word...")
            time.sleep(1)

            lcd.clear()
            lcd.putstr("Receiving...")

    time.sleep(0.005)  
