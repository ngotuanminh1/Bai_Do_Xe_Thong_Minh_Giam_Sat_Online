#include <Servo.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 20, 4);
Servo barie;
SoftwareSerial espSerial(10, 11); // RX, TX

int cam1 = 2;
int cam2 = 3;
int park1 = 5;
int park2 = 6;
int coi = 8;
int gasPin = A0;

int ledDo = 7;
int ledXanh = 12;

int soXe = 0;
int gioiHan = 2;

int gasThresholdHigh = 300;
int gasThresholdLow = 250;
bool gasDetected = false;

bool carWaiting = false;
bool carEntering = false;
bool carPassedCam2 = false;
bool carExiting = false;
bool carPassedCam1 = false;
bool barieOpen = false;
bool isFullByReservation = false;

bool wrongParking = false; // Biến trạng thái còi cảnh báo xe đỗ sai

unsigned long standStartTime = 0;
unsigned long waitTimeout = 60000;
unsigned long lastParkingStatusSent = 0;
unsigned long parkingStatusInterval = 5000;

String lcdGasStatus = "An toan";
String lcdBarieStatus = "Dong";

void setup() {
  pinMode(cam1, INPUT);
  pinMode(cam2, INPUT);
  pinMode(park1, INPUT);
  pinMode(park2, INPUT);
  pinMode(coi, OUTPUT);
  pinMode(ledDo, OUTPUT);
  pinMode(ledXanh, OUTPUT);

  barie.attach(9);
  closeBarie();

  Serial.begin(9600);
  espSerial.begin(9600);

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Khoi dong he thong");
  delay(1500);
  updateLCD();
}

void loop() {
  unsigned long now = millis();
  int gasValue = analogRead(gasPin);

  // ==== GAS ==== //
  if (!gasDetected && gasValue > gasThresholdHigh) {
    gasDetected = true;
    lcdGasStatus = "Nguy hiem!";
    lcdBarieStatus = "Mo (Gas)";
    openBarie();
    digitalWrite(coi, HIGH);
    espSerial.println("GAS_ALERT");
    updateLCD();
  } else if (gasDetected && gasValue < gasThresholdLow) {
    gasDetected = false;
    lcdGasStatus = "An toan";
    lcdBarieStatus = "Dong";
    closeBarie();
    digitalWrite(coi, LOW);
    updateLCD();
  }

  if (gasDetected) {
    delay(100);
    return;
  }

  // ==== GỬI TRẠNG THÁI VỊ TRÍ ==== //
  if (now - lastParkingStatusSent >= parkingStatusInterval) {
    lastParkingStatusSent = now;
    sendParkingStatus();
  }

  // ==== XE ĐẾN CẢM BIẾN 1 ==== //
  if (!carWaiting && !carEntering && !carExiting && !barieOpen) {
    if (digitalRead(cam1) == LOW) {
      if (!isFullByReservation) {
        carWaiting = true;
        standStartTime = now;
        Serial.println("Xe den cam1 → thong bao ESP32");
        espSerial.println("XE_DEN");
        lcdBarieStatus = "Doi QR";
        updateLCD();
      } else {
        Serial.println("Da duoc dat het → Tu choi vao");
        beepContinuous(2000);
      }
    }
  }

  // ==== KIỂM TRA LỆNH TỪ ESP32 ==== //
  if (espSerial.available()) {
    String command = espSerial.readStringUntil('\n');
    command.trim();
    Serial.println("Lenh ESP32: " + command);

    if (command == "open") {
      Serial.println("→ Mo barie (QR hop le)");
      openBarie();
      carEntering = true;
      carPassedCam2 = false;
      carWaiting = false;
      standStartTime = now;
      lcdBarieStatus = "Mo (QR)";
      updateLCD();
    } else if (command.startsWith("FULL:")) {
      int value = command.substring(5).toInt();
      isFullByReservation = (value == 1);
      Serial.print("Dat het cho: ");
      Serial.println(isFullByReservation);
    } else if (command == "beep") {
      Serial.println("Beep command received, activating buzzer");
      startBeepContinuous();
    } else if (command == "stopbeep") {
      Serial.println("Stop beep command received");
      stopBeep();
    }
  }

  // ==== QUÁ THỜI GIAN CHỜ QUÉT QR ==== //
  if (carWaiting && (now - standStartTime > waitTimeout)) {
    Serial.println("Het thoi gian cho QR → Huy");
    carWaiting = false;
    beepContinuous(1000);
    lcdBarieStatus = "Dong";
    updateLCD();
  }

  // ==== XE VÀO SAU KHI MỞ ==== //
  if (carEntering) {
    if (!carPassedCam2) {
      if (digitalRead(cam2) == LOW) {
        carPassedCam2 = true;
        Serial.println("Xe qua cam2");
        standStartTime = now;
      } else if (now - standStartTime > waitTimeout) {
        beepContinuous(1000);
      }
    } else {
      if (digitalRead(cam2) == HIGH) {
        closeBarie();
        carEntering = false;
        soXe++;
        Serial.print("Xe vao → Tong xe: ");
        Serial.println(soXe);
        espSerial.print("SOXE:");
        espSerial.println(soXe);
        lcdBarieStatus = "Dong";
        updateLCD();
      }
    }
  }

  // ==== XE RA ==== //
  if (!carExiting && !carEntering && !barieOpen) {
    if (digitalRead(cam2) == LOW && soXe > 0) {
      carExiting = true;
      carPassedCam1 = false;
      openBarie();
      lcdBarieStatus = "Mo (Xe ra)";
      beepOnce();
      Serial.println("Xe ra: mo barie");
      standStartTime = now;
      updateLCD();
    }
  }

  if (carExiting) {
    if (!carPassedCam1) {
      if (digitalRead(cam1) == LOW) {
        carPassedCam1 = true;
        Serial.println("Xe ra: qua cam1");
        standStartTime = now;
      } else if (now - standStartTime > waitTimeout) {
        beepContinuous(1000);
      }
    } else {
      if (digitalRead(cam1) == HIGH) {
        closeBarie();
        carExiting = false;
        soXe--;
        Serial.print("Xe ra → Tong xe: ");
        Serial.println(soXe);
        espSerial.print("SOXE:");
        espSerial.println(soXe);
        lcdBarieStatus = "Dong";
        updateLCD();
      }
    }
  }

  // ==== KIỂM TRA TRẠNG THÁI ĐỖ XE - CÒI CẢNH BÁO ==== //
  int park1Status = digitalRead(park1);  // LOW = có xe
  int park2Status = digitalRead(park2);

  if (park1Status == LOW && park2Status == HIGH) {
    // Xe thứ 1 đỗ đúng chỗ, park2 trống
    if (wrongParking) {
      wrongParking = false;
      stopBeep();
      Serial.println("Xe ve dung cho 1, tat coi canh bao");
    }
  } else if (park2Status == LOW) {
    // park2 có xe
    if (soXe >= 2) {
      // Xe thứ 2 đỗ đúng vị trí, tắt còi
      if (wrongParking) {
        wrongParking = false;
        stopBeep();
        Serial.println("Xe thu 2 do dung cho, tat coi canh bao");
      }
    } else {
      // Xe đỗ sai vị trí (park2 có xe mà soXe < 2)
      if (!wrongParking) {
        wrongParking = true;
        startBeepContinuous();
        Serial.println("Xe do sai cho, bat coi canh bao");
      }
    }
  } else {
    // Không có xe hoặc xe đi khỏi vị trí sai
    if (wrongParking) {
      wrongParking = false;
      stopBeep();
      Serial.println("Xe roi cho sai, tat coi canh bao");
    }
  }
}

// ==== MỞ/ĐÓNG BARIE ==== //
void openBarie() {
  barie.write(90);
  barieOpen = true;
  digitalWrite(ledDo, LOW);
  digitalWrite(ledXanh, HIGH);
}

// ==== ==== ==== //
void closeBarie() {
  barie.write(0);
  barieOpen = false;
  digitalWrite(ledDo, HIGH);
  digitalWrite(ledXanh, LOW);
}

// ==== CÒI ==== //
void beepOnce() {
  digitalWrite(coi, HIGH);
  delay(200);
  digitalWrite(coi, LOW);
}

void startBeepContinuous() {
  digitalWrite(coi, HIGH);
}

void stopBeep() {
  digitalWrite(coi, LOW);
}

void beepContinuous(unsigned long duration) {
  unsigned long start = millis();
  while (millis() - start < duration) {
    digitalWrite(coi, HIGH);
    delay(200);
    digitalWrite(coi, LOW);
    delay(200);
  }
}

// ==== GỬI TRẠNG THÁI ĐỖ XE ==== //
void sendParkingStatus() {
  int p1 = digitalRead(park1) == LOW ? 1 : 0;
  int p2 = digitalRead(park2) == LOW ? 1 : 0;
  String status = "PARKING:" + String(p1) + "," + String(p2);
  espSerial.println(status);
  Serial.println("Trang thai do xe: " + status);
}

// ==== LCD ==== //
void updateLCD() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Tong xe: ");
  lcd.print(soXe);
  lcd.print("/");
  lcd.print(gioiHan);

  lcd.setCursor(0, 1);
  lcd.print("Barie: ");
  lcd.print(lcdBarieStatus);

  lcd.setCursor(0, 2);
  lcd.print("Gas: ");
  lcd.print(lcdGasStatus);

  lcd.setCursor(0, 3);
  if (gasDetected) {
    lcd.print(">> TAM DUNG HE THONG <<");
  } else {
    lcd.print("He thong binh thuong");
  }
}
