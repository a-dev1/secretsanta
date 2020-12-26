
#include <Arduino.h>
#include <U8x8lib.h>
#include "pitches.h"
U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(/* reset=*/ U8X8_PIN_NONE);
 
#define melodyPin 5
int sensorpin = A6;
int sensorValue = 0; 

int wish_melody[] = {
  NOTE_B3, 
  NOTE_F4, NOTE_F4, NOTE_G4, NOTE_F4, NOTE_E4,
  NOTE_D4, NOTE_D4, NOTE_D4,
  NOTE_G4, NOTE_G4, NOTE_A4, NOTE_G4, NOTE_F4,
  NOTE_E4, NOTE_E4, NOTE_E4,
  NOTE_A4, NOTE_A4, NOTE_B4, NOTE_A4, NOTE_G4,
  NOTE_F4, NOTE_D4, NOTE_B3, NOTE_B3,
  NOTE_D4, NOTE_G4, NOTE_E4,
  NOTE_F4
};

int wish_tempo[] = {
  4,
  4, 8, 8, 8, 8,
  4, 4, 4,
  4, 8, 8, 8, 8,
  4, 4, 4,
  4, 8, 8, 8, 8,
  4, 4, 8, 8,
  4, 4, 4,
  2
};

void sing(){
    Serial.println(" 'We wish you a Merry Christmas'");
    int size = sizeof(wish_melody) / sizeof(int);
    for (int thisNote = 0; thisNote < size; thisNote++) {

      // to calculate the note duration, take one second
      // divided by the note type.
      //e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
      int noteDuration = 1000 / wish_tempo[thisNote];
      if(analogRead(sensorpin)<50){
        break;
      }
      buzz(melodyPin, wish_melody[thisNote], noteDuration);

      // to distinguish the notes, set a minimum time between them.
      // the note's duration + 30% seems to work well:
      int pauseBetweenNotes = noteDuration * 1.30;
      delay(pauseBetweenNotes);

      // stop the tone playing:
      buzz(melodyPin, 0, noteDuration);

    }
}
void buzz(int targetPin, long frequency, long length) {
  digitalWrite(4, HIGH);
  long delayValue = 1000000 / frequency / 2; // calculate the delay value between transitions
  //// 1 second's worth of microseconds, divided by the frequency, then split in half since
  //// there are two phases to each cycle
  long numCycles = frequency * length / 1000; // calculate the number of cycles for proper timing
  //// multiply frequency, which is really cycles per second, by the number of seconds to
  //// get the total number of cycles to produce
  for (long i = 0; i < numCycles; i++) { // for the calculated length of time...
    analogWrite(targetPin, 255); // write the buzzer pin high to push out the diaphram
    delayMicroseconds(delayValue);// wait for the calculated delay value
    analogWrite(targetPin, 0); // write the buzzer pin low to pull back the diaphram
    delayMicroseconds(delayValue); // wait again or the calculated delay value
  }
  digitalWrite(4, LOW);

}
void setup() {
  // put your setup code here, to run once:
  u8x8.begin();
  u8x8.setFlipMode(1);
  pinMode(9, OUTPUT); // Buzzer
  pinMode(4, OUTPUT); // Led indicator when singing a note
  pinMode(sensorpin, INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  u8x8.setFont(u8x8_font_amstrad_cpc_extended_r);
  sensorValue = analogRead(sensorpin);
  Serial.println(sensorValue);
  u8x8.clearDisplay();
  u8x8.draw2x2String(1, 3,"X-mas");

//  u8x8.setCursor(0, 1);
//  u8x8.print("hello World");
 
  if (sensorValue > 60) {
   sing();
  }
   u8x8.refreshDisplay();
    
}
