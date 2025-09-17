#include <WiFi.h>
#include <HTTPClient.h>

// WiFi info
const char* ssid = "Tên Wfi";
const char* password = "Pass;

// Server URLs
const char* serverUrl = "http://<ip cua ban>:3000/fromarduino";
const char* getCommandUrl = "http://<ip cua ban>:3000/command";  
const char* resetCommandUrl = "http://<ip cua ban>:3000/commands/reset";

// UART pins for communication with Arduino
#define RXD2 16
#define TXD2 17

String incomingData = "";

// Biến lưu trạng thái xe
int latestTotal = -1;
int latestSlots[2] = {0, 0};

unsigned long lastCommandCheck = 0;
const unsigned long commandCheckInterval = 3000; // 3 giây

// Flag kiểm soát còi cảnh báo không lặp lại liên tục
bool beepSent = false;

// Hàm prototype
void sendToServer(int total, int slots[]);
int parseTotalCars(String data);
void parseSlots(String data, int slots[], int size);
void checkForOpenCommand();
void sendGasAlertToServer();
void checkBeepCondition();  // Hàm kiểm tra điều kiện beep

void setup() {
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected. IP: " + WiFi.localIP().toString());
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi lost connection. Reconnecting...");
    WiFi.disconnect();
    WiFi.begin(ssid, password);
    delay(1000);
    return;
  }

  // Đọc dữ liệu UART từ Arduino
  while (Serial2.available()) {
    char c = Serial2.read();
    if (c == '\n') {
      incomingData.trim();
      Serial.println("Received from Arduino: " + incomingData);

      if (incomingData == "GAS_ALERT") {
        Serial.println("Gas alert detected! Sending alert to server...");
        sendGasAlertToServer();
      } 
      else if (incomingData.startsWith("SOXE:") || incomingData.startsWith("Tong xe:")) {
        int total = parseTotalCars(incomingData);
        if (total >= 0) {
          latestTotal = total;
          Serial.println("Updated total cars: " + String(latestTotal));
        }
      } 
      else if (incomingData.startsWith("PARKING:")) {
        parseSlots(incomingData, latestSlots, 2);
        Serial.printf("Updated slots: [%d, %d]\n", latestSlots[0], latestSlots[1]);

        // Kiểm tra điều kiện còi cảnh báo khi có trạng thái mới
        checkBeepCondition();
      } 
      else {
        Serial.println("Warning: Cannot parse total cars from UART data");
      }

      // Gửi dữ liệu lên server nếu có tổng xe hợp lệ
      if (latestTotal >= 0) {
        sendToServer(latestTotal, latestSlots);
      }

      incomingData = "";
    } else {
      incomingData += c;
    }
  }

  // Kiểm tra lệnh open từ server định kỳ
  unsigned long now = millis();
  if (now - lastCommandCheck > commandCheckInterval) {
    lastCommandCheck = now;
    checkForOpenCommand();
  }
}

// Hàm kiểm tra điều kiện beep còi
void checkBeepCondition() {
  // Điều kiện: Xe có ở vị trí số 2 (index 1 == 2) mà vị trí số 1 (index 0) không có xe (khác 2)
  if (latestSlots[1] == 2 && latestSlots[0] != 2) {
    if (!beepSent) {
      Serial.println("Beep condition met! Sending beep command to Arduino...");
      Serial2.println("beep");  // Gửi lệnh beep cho Arduino
      beepSent = true;           // Đánh dấu đã gửi beep tránh gửi lại liên tục
    }
  } else {
    beepSent = false;  // Reset flag nếu không còn điều kiện beep nữa
  }
}

// Các hàm còn lại giữ nguyên (sendToServer, sendGasAlertToServer, parseTotalCars, parseSlots, checkForOpenCommand)

void sendToServer(int total, int slots[]) {
  String event = "update";
  String json = "{\"event\":\"" + event + "\",\"total\":" + total + ",\"slots\":[" + String(slots[0]) + "," + String(slots[1]) + "]}";

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(json);
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Server response: " + response);
  } else {
    Serial.println("Error sending POST: " + String(httpResponseCode));
  }

  http.end();
}

void sendGasAlertToServer() {
  String json = "{\"event\":\"gas_alert\",\"total\":" + String(latestTotal) + ",\"slots\":[" + String(latestSlots[0]) + "," + String(latestSlots[1]) + "],\"gas\":300}";
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(json);
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Server response (gas alert): " + response);
  } else {
    Serial.println("Error sending gas alert POST: " + String(httpResponseCode));
  }

  http.end();
}

int parseTotalCars(String data) {
  int index = data.indexOf("Tong xe:");
  if (index >= 0) {
    String numberPart = data.substring(index + 9);
    numberPart.trim();
    return numberPart.toInt();
  }

  index = data.indexOf("SOXE:");
  if (index >= 0) {
    String numberPart = data.substring(index + 5);
    numberPart.trim();
    return numberPart.toInt();
  }

  return -1;
}

void parseSlots(String data, int slots[], int size) {
  for (int i = 0; i < size; i++) {
    slots[i] = 0;  // mặc định trống
  }

  int index = data.indexOf("PARKING:");
  if (index < 0) return;

  String slotPart = data.substring(index + 8);
  slotPart.trim();

  int commaIndex = slotPart.indexOf(',');
  if (commaIndex < 0) return;

  if (size >= 1) {
    int val0 = slotPart.substring(0, commaIndex).toInt();
    slots[0] = (val0 == 1) ? 2 : 0;  // 1 = chỗ có xe, chuyển thành 2 gửi server
  }
  if (size >= 2) {
    int val1 = slotPart.substring(commaIndex + 1).toInt();
    slots[1] = (val1 == 1) ? 2 : 0;
  }
}

void checkForOpenCommand() {
  HTTPClient http;
  http.begin(getCommandUrl);

  int httpResponseCode = http.GET();
  if (httpResponseCode == 200) {
    String payload = http.getString();
    payload.trim();

    Serial.println("Received command payload: " + payload);

    if (payload.indexOf("open") >= 0) {
      Serial2.println("open");  // Gửi lệnh "open" cho Arduino
      Serial.println("Sent 'open' command to Arduino");

      // Gọi API reset để xoá lệnh 'open'
      HTTPClient resetHttp;
      resetHttp.begin(resetCommandUrl);
      resetHttp.POST("");  // POST rỗng
      resetHttp.end();
    }
  }
  http.end();
}
