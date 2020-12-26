import serial
import requests
import time

ser = serial.Serial('/dev/ttyUSB0',9600)
response=requests.get('https://holidayhacks.herokuapp.com/all').json()


try:
    while True:
        for elem in response:
            if elem['username']=='Jack':
                amount=int(elem['price'])-int(elem['balance'])
                amount=str(amount).encode()

        with serial.Serial('/dev/ttyUSB0',9600) as ser:
            ser.write(amount)
            print(amount)
            time.sleep(5)
except:
    ser.close()