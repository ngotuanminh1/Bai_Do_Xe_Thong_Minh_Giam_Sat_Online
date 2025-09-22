



<h2 align="center">🚀 Hướng dẫn cài đặt và chạy</h2>
<p align="justify">

## I. Chuẩn bị phần Cứng

- 1. **Nạp mã Arduino:**
  - Mở file Arduino bằng Arduino IDE.
  - Kết nối board Arduino với máy tính.
  - Nạp (upload) mã nguồn lên board.
  - Đảm bảo Arduino xuất hiện trên cổng COM.
- 2. **Nạp mã cho ESP32 với file `Esp32`.**
  - Mở file `ESP32` bằng Arduino IDE.
  - Kết nối board Arduino với máy tính.
  - Nạp (upload) mã nguồn lên board giữ nút boot trên ESP32.
  - Đảm bảo ESP32 xuất hiện trên cổng COM.

## II. CÀI ĐẶT PHẦN MỀM:

### 2.1 Cài đặt Arduino IDE:

- Tải Arduino IDE tại: [Arduino Software](https://www.arduino.cc/en/software)
- Cài đặt Driver CH340 nếu dùng board Arduino clone.
- Cài đặt Driver CP210xVCP cho ESP32.

### 2.2 Cài đặt thư viện cho Arduino:

- Mở Arduino IDE → Library Manager (Ctrl + Shift + I), tìm và cài:
  - `Servo.h` (Điều khiển servo)
  - `SoftwareSerial.h` (Giao tiếp nối tiếp giả lập để kết nối Arduino với ESP32 qua các chân digital 10 và 11)
  - `Wire.h` (Giao tiếp I2C dùng cho màn hình LCD I2C)
  - `LiquidCrystal_I2C.h` (Điều khiển màn hình LCD I2C 20x4)


<hr>

<h2 align="center">Hoạt động của hệ thống</h2>
<div align="center">
  <img src="README/sodo.jpg" alt="Kiến trúc hệ thống" width="100%">
</div>

---

<p align="justify">
 **1️⃣ Khởi động hệ thống:**

- Bật nguồn cho Arduino, ESP32 và máy tính.
- Mở Serial Monitor (9600 baud) trên Arduino IDE để theo dõi hoạt động.
- Mở Serial Monitor (115200 baud) trên ESP32 để theo dõi hoạt động.
- Chạy Web Server trên PC bằng lệnh: `node server.js`

---

## III. Quy trình hoạt động:

1. **Khởi động hệ thống**
   - Màn hình LCD hiển thị thông báo "Khởi động hệ thống".
   - Barie ở trạng thái đóng (servo ở góc 0 độ).
   - Các cảm biến và LED được thiết lập trạng thái ban đầu.

2. **Phát hiện khí gas nguy hiểm**
   - Cảm biến khí gas (chân A0) liên tục đo giá trị khí trong không khí.
   - Nếu giá trị vượt ngưỡng cao (`gasThresholdHigh`), hệ thống cảnh báo nguy hiểm:
     - Mở barie (servo xoay góc 90 độ).
     - Bật còi báo động.
     - Gửi tín hiệu cảnh báo `GAS_ALERT` đến ESP32.
     - LCD hiển thị trạng thái khí gas "Nguy hiểm" và barie "Mở (Gas)".
     - Gửi thông báo cảnh báo về Telegram.
   - Khi giá trị khí gas giảm dưới ngưỡng thấp (`gasThresholdLow`), hệ thống tắt cảnh báo, đóng barie, tắt còi, và LCD hiển thị trạng thái an toàn.

3. **Phát hiện xe đến (Cảm biến Cam1)**
   - Khi cảm biến Cam1 (chân 2) phát hiện xe (tín hiệu LOW), nếu bãi chưa đầy:
     - Gửi tín hiệu `"XE_DEN"` cho ESP32 để yêu cầu quét QR.
     - Barie giữ trạng thái đóng, LCD hiển thị "Đợi QR".
   - Nếu bãi đã đầy theo dữ liệu đặt trước từ ESP32, còi sẽ báo hiệu từ chối xe.
4. **Mở barie cho xe hợp lệ**
   - Khi nhận được lệnh `open` từ ESP32 (sau khi xác nhận QR hợp lệ), barie sẽ mở.
   - Xe đi vào qua cảm biến Cam2 (chân 3).
   - Khi xe qua Cam2 hoàn toàn, barie tự động đóng lại.
   - Số xe trong bãi tăng lên 1, trạng thái được gửi về ESP32 và hiển thị trên LCD.

5. **Xe ra khỏi bãi**
   - Khi phát hiện xe đi ra tại cảm biến Cam2 (và số xe > 0), barie sẽ mở.
   - Xe đi qua cảm biến Cam1 ra khỏi bãi, barie đóng lại.
   - Số xe trong bãi giảm 1, trạng thái gửi về ESP32 và cập nhật trên LCD.

6. **Kiểm tra vị trí đỗ xe và còi cảnh báo**
   - Hai cảm biến đỗ xe (`park1` và `park2`) theo dõi vị trí xe đỗ.
   - Nếu xe đỗ sai vị trí (ví dụ `park2` có xe nhưng số xe trong bãi chưa đủ 2), còi báo động sẽ được kích hoạt để cảnh báo.

7. **Gửi trạng thái đỗ xe định kỳ**
   - Mỗi 5 giây, hệ thống gửi trạng thái chỗ đỗ xe (cảm biến `park1`, `park2`) về ESP32 để theo dõi và hiển thị.
   - Arduino nhận kết quả và điều khiển động cơ, servo.

</p>

<hr>

<h2 align="center">Giải thích code</h2>
<p align="justify">
  # Hệ Thống Quản Lý Bãi Đỗ Xe với Arduino và ESP32

## IV. Mô tả hệ thống

### 1. Arduino Code (`arduino.ino`)

- **Khởi tạo:**
  - Serial tốc độ 9600.
  - Sử dụng các thư viện: `Servo.h`, `SoftwareSerial.h`, `Wire.h`, `LiquidCrystal_I2C.h`.
  - Cấu hình chân kết nối:
    - Cảm biến xe: `cam1` (D2), `cam2` (D3).
    - Cảm biến vị trí đỗ: `park1` (D5), `park2` (D6).
    - Cảm biến khí gas: Analog A0.
    - Còi cảnh báo: D8.
    - LED báo trạng thái: Đỏ (D7), Xanh (D12).
    - Servo điều khiển barie: D9.
  - Giao tiếp với ESP32 qua UART mềm: `SoftwareSerial(10, 11)`.
  - Hiển thị thông tin qua màn hình LCD I2C (`LiquidCrystal_I2C`).

- **Vòng lặp chính:**
  - Đọc dữ liệu cảm biến:
    - Đọc giá trị khí gas từ analog A0.
    - Đọc trạng thái cảm biến cam1, cam2 để xác định xe đến/đi.
    - Đọc trạng thái cảm biến đỗ xe park1, park2.
  
- **Xử lý dữ liệu & hành động:**
  - **Phát hiện khí gas:**
    - Nếu nồng độ khí gas vượt ngưỡng → mở barie, bật còi, gửi `"GAS_ALERT"` đến ESP32.
    - Nếu khí gas giảm → đóng barie, tắt còi.
  - **Nhận lệnh từ ESP32:**
    - `"open"` → mở barie, cho xe vào.
    - `"beep"` → bật còi cảnh báo đỗ sai.
    - `"stopbeep"` → tắt còi.
  - **Xử lý xe vào (qua cam2):**
    - Khi xe đi qua cam2 sau khi barie mở → đóng barie, tăng biến đếm `soXe`, gửi `"SOXE:x"` về ESP32.
  - **Xử lý xe ra (qua cam2 → cam1):**
    - Khi có xe đi ra (cam2 LOW rồi qua cam1) → mở barie, giảm `soXe`, gửi `"SOXE:x"` về ESP32, đóng barie sau khi xe đi qua.
  - **Kiểm tra đỗ sai:**
    - Nếu có xe ở `park2` nhưng `soXe < 2` → báo đỗ sai, bật còi cảnh báo.
    - Nếu xe đỗ đúng hoặc đi khỏi → tắt còi.
  - **Gửi trạng thái định kỳ:**
    - Gửi trạng thái chỗ đỗ xe định kỳ (ví dụ `"PARKING:x,y"`) mỗi 5 giây về ESP32.

---

### 2. ESP32 Code (`esp32.ino`)

- **Khởi tạo:**
  - Serial tốc độ 115200.
  - Kết nối WiFi (SSID).
  - Cấu hình UART giao tiếp với Arduino (`RX: D16`, `TX: D17`).
  - Thiết lập server với các endpoint:
    - `POST /fromarduino`: nhận dữ liệu từ Arduino.
    - `GET /command`: lấy lệnh từ server.
    - `POST /commands/reset`: reset lệnh.

- **Vòng lặp chính:**
  - Nhận dữ liệu từ Arduino:
    - `"GAS_ALERT"` → gửi báo động gas lên server.
    - `"SOXE:x"` hoặc `"Tong xe: x"` → cập nhật số xe.
    - `"PARKING:x,y"` → cập nhật trạng thái các slot.

- **Gửi dữ liệu lên server:**
  - Khi cập nhật trạng thái bình thường:
    ```json
    {
      "event": "update",
      "total": x,
      "slots": [2, 0]
    }
    ```
  - Khi phát hiện báo động khí gas:
    ```json
    {
      "event": "gas_alert",
      "total": x,
      "slots": [2, 0],
      "gas": 300
    }
    ```

---

## 3. Chú ý

- Tham số `x` đại diện cho số lượng xe hiện tại.
- Các giá trị trong `slots` đại diện trạng thái chỗ đỗ (ví dụ: số xe đỗ tại các vị trí).
- Giá trị `"gas": 300` chỉ mang tính minh họa, thực tế lấy từ cảm biến gas.

  ---

### 4. Xử lý điều kiện còi cảnh báo

- Nếu `slot2 = 2` và `slot1 ≠ 2` → được xem là đỗ sai chỗ.
- Khi phát hiện đỗ sai, gửi lệnh `"beep"` cho Arduino **một lần duy nhất** để bật còi cảnh báo.
- Nếu điều kiện đỗ sai không còn tồn tại, tắt chế độ cảnh báo và đặt biến `beepSent = false` để sẵn sàng phát hiện lần sau.

### 5. Kiểm tra lệnh từ server

- ESP32 gửi yêu cầu `GET /command` đến server mỗi 3 giây để lấy lệnh điều khiển.
- Nếu server trả về lệnh `"open"` → ESP32 gửi lệnh `"open"` về Arduino để mở barie cho xe vào.
- Sau khi xử lý lệnh, ESP32 gửi `POST` rỗng đến `POST /commands/reset` để reset trạng thái lệnh trên server.

---

## V. Node.js & Firebase Code (`server.js`)

### 1. Khởi tạo

- Server Express chạy tại địa chỉ: `http://localhost:3000/`.
- Kết nối Firebase Realtime Database sử dụng Admin SDK thông qua file cấu hình `serviceAccountKey.json`.
- Khởi tạo dữ liệu mặc định cho trạng thái bãi đỗ và log khí gas nếu chưa tồn tại trong cơ sở dữ liệu.

### 2. Xử lý dữ liệu từ ESP32/Arduino

- Nhận dữ liệu từ ESP32/Arduino gửi lên mỗi 5 giây qua route `POST /fromarduino`.
- Dữ liệu nhận gồm:
  - `event`: loại sự kiện (ví dụ: `"update"`, `"gas_alert"`).
  - `total`: tổng số xe hiện có.
  - `slots`: trạng thái các vị trí đỗ.
  - `gas`: nồng độ khí gas (nếu có).
- Cập nhật số xe ra/vào, trạng thái từng chỗ đỗ trong Firebase.
- Ghi lại log khí gas, giới hạn tối đa 20 bản ghi gần nhất.
- Nếu phát hiện nồng độ khí gas vượt ngưỡng 150 ppm, kích hoạt cảnh báo Telegram.
- Khi khí gas trở lại mức an toàn, gửi thông báo khôi phục qua Telegram.

### 3. Giao tiếp với Arduino qua API

- `GET /command`: Arduino/ESP32 gọi định kỳ để lấy lệnh điều khiển.
  - Server trả về lệnh `"open"`, `"beep"` hoặc rỗng.
- `POST /commands/reset`: Reset lệnh sau khi Arduino/ESP32 đã xử lý xong.

### 4. Chức năng Đặt chỗ và Thanh toán

- `POST /pre-reserve`: Đặt chỗ trước với thông tin tên, biển số xe, vị trí slot.
- `POST /confirm-payment`: Xác nhận thanh toán cho đặt chỗ.
- `GET /check-payment`: Kiểm tra trạng thái thanh toán và trả về mã QR tương ứng.

### 5. Check-in bằng QR Code

- `POST /checkin`: Nhận mã QR từ người dùng.
- Kiểm tra tính hợp lệ của mã QR, đánh dấu checkin và cập nhật trạng thái slot chiếm dụng.
- Nếu xe đầu tiên đỗ vào slot số 2, gửi lệnh `"beep"` đến Arduino để cảnh báo đỗ sai.

### 6. Quản lý trạng thái bãi đỗ

- `GET /status`: Trả về toàn bộ trạng thái bãi đỗ gồm tổng chỗ, số chỗ còn trống, số xe vào, cảnh báo khí gas, v.v.
- `POST /reset-xevao`: Đặt lại số lượng xe hiện tại về 0 hoặc giá trị mặc định.

### 7. Quản lý Đặt chỗ

- `GET /reservations` và `GET /bookings`: Lấy danh sách các đặt chỗ và đặt trước.
- `DELETE /reservations/:id`: Xóa đặt chỗ theo ID.

### 8. Cảnh báo khí gas

- Tự động gửi cảnh báo qua Telegram khi nồng độ khí gas vượt ngưỡng an toàn (>150 ppm).
- `POST /dismiss-gas-alert`: Cho phép người dùng tắt cảnh báo khí gas thủ công.

### 9. Xem lịch sử khí gas

- `GET /logs`: Trả về 20 bản ghi khí gas gần nhất để hiển thị trên trang web hoặc giao diện admin.

### 10. Giao diện web

- **Khách hàng:**
  - Cho phép đặt chỗ và thanh toán, nhận mã QR khi được admin xác nhận.
- **Admin:**
  - Truy cập `/admin` để quản lý toàn bộ bãi đỗ: giám sát trạng thái bãi đỗ, đặt chỗ, cảnh báo, và quét mã QR.

### 11. Thông báo Telegram (Real-time)

- Gửi tin nhắn cảnh báo khi phát hiện khí gas vượt ngưỡng (>150 ppm).
- Gửi tin nhắn khi khí gas trở lại mức an toàn.


<hr>

<h2 align="center">📸 Kết quả hiển thị</h2>
<div align="center">
  <p><strong>Tổng quan Mô hình</strong></p>
  <img src="README/image1.png" alt="Ảnh mô hình" width="100%">
  
  <p><strong>Đặt chỗ</strong></p>
  <img src="README/image3.png" alt="Đặt chỗ thành công in QR" width="100%">
</div>

  <p><strong>Xe Vào</strong></p>
  <img src="README/image2.png" alt="Khi có xe vào" width="100%">
</div>

<p><strong>Quét QR thành công Server trả về Open cho Esp32</strong></p>
  <img src="README/image4.png" alt="Quét QR thành công Admin" width="100%">
</div>

<p><strong>Xe đỗ vị trí 1 nhận diện gửi lên Server đổi màu ô đỗ</strong></p>
  <img src="README/image5.png" alt="Xe đỗ vị trí 1" width="100%">
</div>

<p><strong>Cảnh báo khí GAS</strong></p>
  <img src="README/image6.png" alt="Quét QR thành công Admin" width="100%">
</div>

<br>
<hr>


<br>
<hr>

<h2 align="center">🤝</h2>
<p>Dự án được phát triển bởi:</p>
<center>
<table>
  <thead>
    <tr>
      <th>Giảng viên hướng dẫn</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Thầy Nguyễn Văn Nhân</td>
    </tr>
  </tbody>
</table>
</center>

<center>
<table>
  <thead>
    <tr>
      <th>Họ và Tên</th>
      <th>Mã sinh viên</th>
      <th>Vai trò</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ngô Tuấn Minh</td>
      <td>1571020175</td>
      <td>Phát triển dự án</td>
    </tr>
  </tbody>
</table>
</center>






<p align="center">© 2025 NGÔ TUẤN MINH, CNTT16-06, TRƯỜNG ĐẠI HỌC ĐẠI NAM</p>

