<h1 align="center">
🚗 Dự Án Nhận Diện Bãi Đỗ Xe Thông Minh Có Hệ Thống Giám Sát Online
</h1>
<div align="center">
  <img src="README/logoDaiNam.png" alt="DaiNam University Logo" width="250">
</div>
<br>
<div align="center">

[![FIT DNU](https://img.shields.io/badge/-FIT%20DNU-28a745?style=for-the-badge)](https://fitdnu.net/)
[![DAINAM UNIVERSITY](https://img.shields.io/badge/-DAINAM%20UNIVERSITY-dc3545?style=for-the-badge)](https://dainam.edu.vn/vi)

</div>
<hr>

<h2 align="center">✨ Mô tả dự án</h2>
<p align="justify">
  Đây là dự án mô phỏng <strong>**BÃI ĐỖ XE THÔNG MINH CÓ GIÁM SÁT ONLINE**</strong> sử dụng **Arduino + ESP32**, kết hợp với **cảm biến hồng ngoại và cảm biến khí gas <strong>ESP32-CAM</strong>. Hệ thống hỗ trợ <strong> khách đặt chỗ trước qua QR code <strong>đồng thời có chức năng **cảnh báo khẩn cấp** khi phát hiện khí gas vượt ngưỡng.</strong>
</p>
<hr>

<h2 align="center">🚀 Cấu trúc dự án</h2>
<pre>
📂 IOT
├── 📁 models/                   # Thư mục chứa các file xử lý dữ liệu (models, slots, người dùng)
├── 📁 node_modules/             # Thư viện được cài thông qua npm
├── 📁 public/                   # Tài nguyên tĩnh phục vụ frontend
│   ├── 🎨 admin-style.css       # Giao diện cho trang quản trị
│   ├── 📄 admin.html            # Giao diện dành cho admin
│   ├── 📄 index.html            # Giao diện dành cho khách hàng
│   └── 🎨 style.css             # CSS dùng chung cho giao diện người dùng
├── 📁 readme/                   # Thư mục chứa tài nguyên liên quan README
│   └── 🖼️ logoDaiNam.png        # Hình ảnh logo dự án
├── 📜 package.json              # Thông tin dự án & các dependencies
├── 📦 package-lock.json         # Khóa version các gói npm
├── 📄 server.js                 # File chính chạy backend Node.js + Express
├── 🔑 serviceAccountKey.json    # Khóa Firebase Admin (bảo mật – không chia sẻ)
├── 📘 README.md                 # Tài liệu mô tả dự án
└── 📝 readme.md                 # Tài liệu mô tả dự án
</pre>


<hr>

## Chuẩn bị 
### 🛠️ Phần cứng

<div align="center>

[![Arduino Uno R3](https://img.shields.io/badge/-ARDUINO%20UNO%20R3-00979D?style=for-the-badge&logo=arduino&logoColor=white)](#)
[![ESP32](https://img.shields.io/badge/ESP32-%23239121.svg?style=for-the-badge&logo=esp32&logoColor=white)](#)
[![Servo](https://img.shields.io/badge/-SERVO-DC143C?style=for-the-badge)](#)
[![WiFi](https://img.shields.io/badge/-WIFI-007396?style=for-the-badge)](#)
[![Dây Kết Nối](https://img.shields.io/badge/-D%C3%82Y%20K%E1%BA%BET%20N%E1%BB%90I-555555?style=for-the-badge)](#)
[![Cảm biến hồng ngoại (x4)](https://img.shields.io/badge/Cảm%20biến%20hồng%20ngoại-FF5733?style=for-the-badge)](#)
[![Cảm Biến Khí Gas](https://img.shields.io/badge/Cảm%20biến%20khí%20Gas%20MQ--2-5C3EE8?style=for-the-badge)](#)
[![Màn LCD](https://img.shields.io/badge/LCD%2016x2-28B463?style=for-the-badge)](#)
[![Còi Chíp (Buzzer)](https://img.shields.io/badge/Buzzer%20Cảnh%20Báo-F39C12?style=for-the-badge)](#)

### 💻 Phần mềm

### 💻 Phần mềm sử dụng

[![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![Express](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](#)
[![Firebase Admin SDK](https://img.shields.io/badge/-Firebase%20Admin-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](#)
[![HTML](https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Fetch API](https://img.shields.io/badge/-Fetch%20API-FF6F00?style=for-the-badge)](#)
[![VS Code](https://img.shields.io/badge/-Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)](#)
[![JSON](https://img.shields.io/badge/-JSON-000000?style=for-the-badge&logo=json&logoColor=white)](#)

</div>

<hr>

<h2 align="center">📦 Các thư viện Node.js cần thiết</h2>
<p align="justify">
  <strong>Các gói cần cài đặt:</strong><br>
  - express<br>
  - firebase-admin<br>
  - uuid<br><br>

  <strong>Cài các module cần thiết:</strong><br>
 
  <code>npm install</code><br><br>
  
  <strong>Lệnh cài thư viện:</strong><br>
  - (Tùy chọn) Tạo môi trường ảo (nên dùng <code>nvm</code> hoặc <code>npm init</code>):<br>
  <code>npm init -y</code><br><br>

  - Cài đặt các gói:<br>
  <code>npm install express firebase-admin uuid</code><br><br>

  - <strong>Chạy server:</strong><br>
  <code>node server.js</code>
  <p><em>Lưu ý: Đảm bảo đã cấu hình đúng file <code>serviceAccountKey.json</code> trước khi chạy server.</em></p>
</p>

<hr>

<h2 align="center">🧮 Bảng mạch</h2>
<p align="center">
  ⛓️‍💥 <strong>Hướng dẫn cắm dây:</strong>
</p>

<hr>

<h2 align="center">Cắm các thiết bị</h2>
<div align="center">
  <img src="README/noiday.jpg" alt="Cắm các thiết bị" width="100%">
</div>

<h4 align="center">📡 Cảm biến Gas</h4>
<div align="center">
<table>
  <tr>
    <th>Thiết bị</th>
    <th>Chân</th>
    <th>Giá trị</th>
    <th>Ghi chú</th>
  </tr>
  <tr>
    <td>Cảm biến Gas</td>
    <td>VCC</td>
    <td>5V</td>
    <td>Cấp nguồn cho cảm biến</td>
  </tr>
  <tr>
    <td></td>
    <td>GND</td>
    <td>GND</td>
    <td>Nối đất</td>
  </tr>
  <tr>
    <td></td>
    <td>A0</td>
    <td>A0</td>
    <td>Đọc giá trị gas từ cảm biến (analog)</td>
  </tr>
</table>
</div>

<br>

<h4 align="center">🚗 Cảm biến xe (Cam1 & Cam2)</h4>
<div align="center">
<table>
  <tr>
    <th>Thiết bị</th>
    <th>Chân</th>
    <th>Giá trị</th>
    <th>Ghi chú</th>
  </tr>
  <tr>
    <td>Cam1 (Cảm biến đầu vào)</td>
    <td>OUT</td>
    <td>D2</td>
    <td>Phát hiện xe vào</td>
  </tr>
  <tr>
    <td>Cam2 (Cảm biến đầu ra)</td>
    <td>OUT</td>
    <td>D3</td>
    <td>Phát hiện xe ra</td>
  </tr>
</table>
</div>

<br>

<h4 align="center">📍 Cảm biến vị trí đỗ (Park1 & Park2)</h4>
<div align="center">
<table>
  <tr>
    <th>Thiết bị</th>
    <th>Chân</th>
    <th>Giá trị</th>
    <th>Ghi chú</th>
  </tr>
  <tr>
    <td>Park1</td>
    <td>OUT</td>
    <td>D5</td>
    <td>Phát hiện xe đỗ đúng vị trí đầu tiên</td>
  </tr>
  <tr>
    <td>Park2</td>
    <td>OUT</td>
    <td>D6</td>
    <td>Phát hiện xe đỗ đúng/sai ở vị trí thứ hai</td>
  </tr>
</table>
</div>

<br>

<h4 align="center">🧠 Kết nối Arduino & ESP32 (Giao tiếp Serial)</h4>
<div align="center">
<table>
  <tr>
    <th>Arduino</th>
    <th>ESP32</th>
    <th>Chức năng</th>
  </tr>
  <tr>
    <td>D10 (TX)</td>
    <td>RX</td>
    <td>Truyền dữ liệu từ Arduino sang ESP32</td>
  </tr>
  <tr>
    <td>D11 (RX)</td>
    <td>TX</td>
    <td>Nhận dữ liệu từ ESP32</td>
  </tr>
</table>
<p><i>Sử dụng thư viện <code>SoftwareSerial</code> để giao tiếp giữa Arduino và ESP32</i></p>
</div>

<br>

<h4 align="center">🔩 Servo (Barie)</h4>
<div align="center">
<table>
  <tr>
    <th>Thiết bị</th>
    <th>Chân</th>
    <th>Giá trị</th>
    <th>Ghi chú</th>
  </tr>
  <tr>
    <td>Servo</td>
    <td>VCC</td>
    <td>5V</td>
    <td>Cấp nguồn cho servo</td>
  </tr>
  <tr>
    <td></td>
    <td>GND</td>
    <td>GND</td>
    <td>Nối đất</td>
  </tr>
  <tr>
    <td></td>
    <td>Signal</td>
    <td>D9</td>
    <td>Điều khiển mở/đóng barie</td>
  </tr>
</table>
</div>

<br>

<h4 align="center">💡 Đèn LED trạng thái</h4>
<div align="center">
<table>
  <tr>
    <th>LED</th>
    <th>Chân Arduino</th>
    <th>Màu</th>
    <th>Ghi chú</th>
  </tr>
  <tr>
    <td>LED Đỏ</td>
    <td>D7</td>
    <td>Đỏ</td>
    <td>Bật khi barie đóng hoặc hệ thống nguy hiểm</td>
  </tr>
  <tr>
    <td>LED Xanh</td>
    <td>D12</td>
    <td>Xanh</td>
    <td>Bật khi barie mở</td>
  </tr>
</table>
</div>

<br>

<h4 align="center">📟 Màn hình LCD I2C (20x4)</h4>
<div align="center">
<table>
  <tr>
    <th>Thiết bị</th>
    <th>Chân</th>
    <th>Arduino</th>
    <th>Ghi chú</th>
  </tr>
  <tr>
    <td>LCD I2C</td>
    <td>VCC</td>
    <td>5V</td>
    <td>Cấp nguồn cho màn hình</td>
  </tr>
  <tr>
    <td></td>
    <td>GND</td>
    <td>GND</td>
    <td>Nối đất</td>
  </tr>
  <tr>
    <td></td>
    <td>SDA</td>
    <td>A4</td>
    <td>Dữ liệu I2C</td>
  </tr>
  <tr>
    <td></td>
    <td>SCL</td>
    <td>A5</td>
    <td>Clock I2C</td>
  </tr>
</table>
</div>


<hr>

<h2 align="center">🚀 Hướng dẫn cài đặt và chạy</h2>
<p align="justify">
  <strong>1. Chuẩn bị phần cứng:</strong><br>
  - Nạp mã Arduino:<br>
  &nbsp;&nbsp;&bull; Mở file <code>Arduino</code> bằng Arduino IDE.<br>
  &nbsp;&nbsp;&bull; Kết nối board Arduino với máy tính.<br>
  &nbsp;&nbsp;&bull; Nạp (upload) mã nguồn lên board.<br>
  &nbsp;&nbsp;&bull; Đảm bảo Arduino xuất hiện trên cổng COM.<br>
  - Nạp mã cho ESP32 với file <code>Esp32</code>.<br><br>
  <strong>2. CÀI ĐẶT PHẦN MỀM:</strong><br>
  <strong>2.1 Cài đặt Arduino IDE:</strong><br>
  &nbsp;&nbsp;&bull; Tải Arduino IDE tại: <a href="https://www.arduino.cc/en/software" target="_blank">Arduino Software</a>.<br>
  &nbsp;&nbsp;&bull; Cài đặt Driver CH340 nếu dùng board Arduino clone.<br><br>

  &nbsp;&nbsp;&bull; Cài đặt Driver CP210xVCP cho ESP32<br><br>

  <strong>2.2 Cài đặt thư viện cho Arduino:</strong><br>

  &nbsp;&nbsp;&bull; Mở Arduino IDE → Library Manager (Ctrl + Shift + I), tìm và cài: 
  
  <code>Servo.h</code> (Điều khiển servo)
  
  <code>SoftwareSerial.h</code> (Giao tiếp nối tiếp giả lập để kết nối Arduino với ESP32 qua các chân digital (10 và 11).)
  
  <code>Wire.h</code> (Giao tiếp I2C dùng cho màn hình LCD I2C.)
  
  <code>LiquidCrystal_I2C.h</code> (Điều khiển màn hình LCD I2C (20x4).)
</p>

<hr>

<h2 align="center">Hoạt động của hệ thống</h2>
<div align="center">
  <img src="README/sodo.jpg" alt="Kiến trúc hệ thống" width="100%">
</div>

<p align="justify">
  <strong>1️⃣ Khởi động hệ thống:</strong><br>
  - Bật nguồn cho Arduino, ESP32 và máy tính.<br>
  - Mở Serial Monitor (9600 baud) trên Arduino IDE để theo dõi hoạt động.<br>
  - Mở Serial Monitor (115200 baud) trên ESP32 để theo dõi hoạt động.<br>
  - Chạy Web Server trên PC bằng lệnh: <code>node server.js</code><br><br>
  <strong>Quy trình hoạt động:</strong><br>
  - 1. Khởi động hệ thống<br>
    - Màn hình LCD hiển thị thông báo "Khởi động hệ thống".<br>
    - Barie ở trạng thái đóng (servo ở góc 0 độ).<br>
    - Các cảm biến và LED được thiết lập trạng thái ban đầu.<br>
  - 2. Phát hiện khí gas nguy hiểm<br>
    - Cảm biến khí gas (chân A0) liên tục đo giá trị khí trong không khí"<br>
    - Nếu giá trị vượt ngưỡng cao (gasThresholdHigh), hệ thống cảnh báo nguy hiểm:<br>
    - Mở barie (servo xoay góc 90 độ).<br>
    - Bật còi báo động.<br>
    - Gửi tín hiệu cảnh báo GAS_ALERT đến ESP32.<br>
    - LCD hiển thị trạng thái khí gas "Nguy hiểm" và barie "Mở (Gas)" và gửi thông báo về Telegram.<br>
    - Khi giá trị khí gas giảm dưới ngưỡng thấp (gasThresholdLow), hệ thống tắt cảnh báo, đóng barie, tắt còi, và LCD hiển thị trạng thái an toàn.<br>
    - 3. Phát hiện xe đến (Cảm biến Cam1)<br>
    - Khi cảm biến Cam1 (chân 2) phát hiện xe (tín hiệu LOW), nếu bãi chưa đầy:"<br>
    - Gửi tín hiệu "XE_DEN" cho ESP32 để yêu cầu quét QR.<br>
    - Barie giữ trạng thái đóng, LCD hiển thị "Đợi QR".<br>
    - Nếu bãi đã đầy theo dữ liệu đặt trước từ ESP32, còi sẽ báo hiệu từ chối xe.<br>
    - 4. Mở barie cho xe hợp lệ<br>
    - Khi nhận được lệnh open từ ESP32 (sau khi xác nhận QR hợp lệ), barie sẽ mở."<br>
    - Xe đi vào qua cảm biến Cam2 (chân 3).<br>
    - Khi xe qua Cam2 hoàn toàn, barie tự động đóng lại.<br>
    - Số xe trong bãi tăng lên 1, trạng thái được gửi về ESP32 và hiển thị trên LCD.<br>
    - 5. Xe ra khỏi bãi<br>
    - Khi phát hiện xe đi ra tại cảm biến Cam2 (và số xe > 0), barie sẽ mở."<br>
    - Xe đi qua cảm biến Cam1 ra khỏi bãi, barie đóng lại.<br>
    - Số xe trong bãi giảm 1, trạng thái gửi về ESP32 và cập nhật trên LCD.<br>
    - 6. Kiểm tra vị trí đỗ xe và còi cảnh báo<br>
    - Hai cảm biến đỗ xe (park1 và park2) theo dõi vị trí xe đỗ.<br>
    - Nếu xe đỗ sai vị trí (ví dụ park2 có xe nhưng số xe trong bãi chưa đủ 2), còi báo động sẽ được kích hoạt để cảnh báo.<br>
    - 7. Gửi trạng thái đỗ xe định kỳ<br>
    - Mỗi 5 giây, hệ thống gửi trạng thái chỗ đỗ xe (cảm biến park1, park2) về ESP32 để theo dõi và hiển thị.<br>
  - Arduino nhận kết quả và điều khiển động cơ, servo.
</p>

<hr>

<h2 align="center">Giải thích code</h2>
<p align="justify">
  <strong>Arduino Code (arduino.ino):</strong><br>
  - <em>Khởi tạo:</em> Khởi tạo Serial ở tốc độ 9600, cSử dụng các thư viện: Servo.h, SoftwareSerial.h, Wire.h, LiquidCrystal_I2C.h. Cấu hình các chân kết nối: Cảm biến xe (cam1, cam2): D2, D3. Cảm biến vị trí đỗ (park1, park2): D5, D6. Cảm biến gas: A0. Còi cảnh báo: D8. LED báo trạng thái: D7 (Đỏ), D12 (Xanh). Servo điều khiển barie: D9. Giao tiếp với ESP32 qua UART mềm (SoftwareSerial(10, 11)). Hiển thị thông tin qua màn hình LCD I2C (LiquidCrystal_I2C)<br>

  - <em>Vòng lặp chính:</em> -📡 Nhận dữ liệu cảm biến. Đọc giá trị khí gas từ analog A0. Đọc trạng thái cảm biến cam1, cam2 để xác định xe đến/đi. Đọc trạng thái cảm biến đỗ xe park1, park2<br>
  - <em>3. Xử lý dữ liệu & hành động</em><br>
  &nbsp;&nbsp;&rarr; ☢️ Phát hiện khí gas: Nếu nồng độ gas vượt ngưỡng → mở barie, bật còi, gửi "GAS_ALERT" đến ESP32. Nếu gas giảm → đóng barie, tắt còi <br>
  &nbsp;&nbsp;&rarr; 🔐 Nhận lệnh từ ESP32: Nếu ESP32 gửi "open" → mở barie, cho xe vào. Nếu gửi "beep" → bật còi cảnh báo đỗ sai. Nếu gửi "stopbeep" → tắt còi <br>
  &nbsp;&nbsp;&rarr; 🚗 Xử lý xe vào (cam2). Khi xe đi qua cảm biến cam2 sau khi barie mở: Đóng barie. Tăng biến đếm soXe, gửi SOXE:x về ESP32<br>
  &nbsp;&nbsp;&rarr; 🅿️ Xử lý xe ra (cam2 → cam1). Khi có xe đi ra (cam2 LOW, rồi qua cam1): Mở barie. Giảm soXe, gửi SOXE:x về ESP32. Đóng barie sau khi xe đi qua<br><br>
  &nbsp;&nbsp;&rarr; 🚨 Kiểm tra đỗ sai: Nếu có xe ở park2 nhưng soXe < 2 → đỗ sai → bật còi cảnh báo. Nếu xe đỗ đúng hoặc đi khỏi → tắt còi<br><br>
  &nbsp;&nbsp;&rarr; 📤 Gửi trạng thái định kỳ: Gửi trạng thái chỗ đỗ xe (PARKING:x,y) mỗi 5 giây về ESP32<br><br>

  <strong>ESP32 (esp32.ino):</strong><br>
  - <em>Khởi tạo:</em> Khởi tạo Serial ở tốc độ 115200, Kết nối WiFi (ssid = "....."). Cấu hình UART giao tiếp với Arduino (RX: D16, TX: D17). Thiết lập server:<br>
  
  POST /fromarduino → gửi dữ liệu. <br>
  
  GET /command → lấy lệnh từ server. <br>
  
  POST /commands/reset → reset lệnh<br>

  - <em>Vòng lặp chính:</em> -🔁 Nhận dữ liệu từ Arduino: Dữ liệu nhận dạng: <br>

  "GAS_ALERT" → gửi báo động gas lên server<br>

  "SOXE:x" hoặc "Tong xe: x" → cập nhật số xe<br>

  "PARKING:x,y" → cập nhật trạng thái các slot<br>

  - <em>3. Gửi dữ liệu lên server</em><br>
  &nbsp;&nbsp;&rarr; Gửi định dạng JSON: <br>

  {<br>
  "event": "update",<br>
  "total": x,<br>
  "slots": [2, 0]<br>
  }<br>

  &nbsp;&nbsp;&rarr; ☢️ Nếu phát hiện "GAS_ALERT":<br>
  Gửi báo động lên server:<br>

  {<br>
  "event": "gas_alert",<br>
  "total": x,<br>
  "slots": [2, 0],<br>
  "gas": 300<br>
  }<br>

  &nbsp;&nbsp;&rarr; 4. Xử lý điều kiện còi cảnh báo. Nếu slot2 = 2 và slot1 ≠ 2 → đỗ sai → gửi "beep" cho Arduino (1 lần duy nhất). Nếu điều kiện không còn → tắt chế độ cảnh báo (beepSent = false)<br>

  &nbsp;&nbsp;&rarr; 5. Kiểm tra lệnh từ server: Gửi GET /command mỗi 3 giây. Nếu có "open": Gửi "open" về Arduino Gửi POST rỗng để reset lệnh trên server<br>
  <strong>&amp; Node.js & Firebase Code (server.js):</strong><br>

  - <em>Khởi tạo:</em> Server Express khởi chạy tại <code>http://localhost:3000/</code> Kết nối Firebase Realtime Database bằng Admin SDK (từ file serviceAccountKey.json).<code>Khởi tạo dữ liệu mặc định cho trạng thái bãi đỗ và log khí gas nếu chưa tồn tại.</code>.<br>

  - <em>Xử lý dữ liệu từ ESP32/Arduino:</em> LNhận dữ liệu gửi lên mỗi 5 giây qua route /fromarduino: Dữ liệu gồm: sự kiện (event), tổng số xe (total), trạng thái slot (slots), và nồng độ khí gas (gas). Cập nhật số xe ra/vào, trạng thái từng chỗ đỗ. Ghi log khí gas (tối đa 20 bản ghi).Nếu nồng độ khí gas > 150 ppm, kích hoạt cảnh báo Telegram. Nếu trở về mức an toàn, gửi thông báo khôi phục.<br>

  - <em>Giao tiếp với Arduino qua API:</em> /command: Arduino gọi định kỳ để kiểm tra lệnh từ server. Nếu có lệnh "open" hoặc "beep" (ví dụ: xe đầu tiên đỗ sai slot), server sẽ phản hồi tương ứng. /commands/reset: Xóa/reset lệnh sau khi xử lý xong.<br>

  - <em>Chức năng Đặt chỗ và Thanh toán:</em> /pre-reserve: Đặt chỗ trước (với tên, biển số và vị trí slot). /confirm-payment: Xác nhận thanh toán cho đặt chỗ. /check-payment: Kiểm tra trạng thái thanh toán và trả về mã QR nếu thành công.<br>

  - <em>Check-in bằng QR Code:</em> /checkin: Nhận mã QR từ người dùng → kiểm tra hợp lệ → đánh dấu checkin, cập nhật slot chiếm dụng. Nếu xe đầu tiên đỗ vào slot số 2 → gửi lệnh "beep" đến Arduino.<br>

  - <em>Quản lý trạng thái bãi đỗ:</em> /status: Trả về thông tin toàn bộ trạng thái bãi đỗ (tổng chỗ, còn trống, xe vào, cảnh báo khí gas...). /reset-xevao: Đặt lại số lượng xe đã vào.<br>

  - <em>Quản lý Đặt chỗ:</em> /reservations, /bookings: Lấy danh sách đặt chỗ. DELETE /reservations/:id: Xóa đặt chỗ theo ID.<br>

  - <em>Cảnh báo khí gas:</em> Tự động cảnh báo qua Telegram nếu gas vượt ngưỡng. /dismiss-gas-alert: Cho phép tắt cảnh báo khí gas thủ công.<br>

  - <em>Xem lịch sử khí gas:</em> /logs: Trả về log 20 bản ghi khí gas gần nhất để hiển thị trên web/admin.<br>

  - <em>Giao diện web khách hàng:</em>/đặt chỗ thanh toán sau khi admin xác nhận in mã QR tương ứng<br>

  - <em>Giao diện web admin:</em>/admin: Trả về trang quản trị admin.html để giám sát bãi đỗ, đặt chỗ, cảnh báo, quét QR<br>

  - <em>Thông báo Telegram (Real-time):</em>Gửi tin nhắn khi: Phát hiện nồng độ khí gas vượt ngưỡng an toàn (>150 ppm). Gas quay về trạng thái bình thường.<br>
</p>

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
      <th>Họ và Tên</th>
      <th>Vai trò</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ngô Tuấn Minh</td>
      <td>Phát triển dự án</td>
    </tr>
  </tbody>
</table>
</center>






<p align="center">© 2025 NGÔ TUẤN MINH, CNTT16-06, TRƯỜNG ĐẠI HỌC ĐẠI NAM</p>

