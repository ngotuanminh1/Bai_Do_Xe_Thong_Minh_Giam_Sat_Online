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

<h2 align="center">🧮 Bảng mạch</h2>
<p align="center">
  ⛓️‍💥 <strong>Hướng dẫn cắm dây:</strong>
</p>

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
  <img src="README/Sodo.jpg" alt="Kiến trúc hệ thống" width="100%">
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
  <strong>Arduino Code (arduino_code.ino):</strong><br>
  - <em>Khởi tạo:</em> Khởi tạo Serial ở tốc độ 115200, cấu hình chân cho cảm biến, relay và servo. Servo được gắn tại chân 9 và khởi tạo về góc 0°.<br>
  - <em>Vòng lặp chính:</em> Đọc trạng thái của cảm biến. Khi cảm biến thay đổi trạng thái hoặc sau khoảng thời gian định kỳ, gửi lệnh "CHECK" và chờ phản hồi từ Python.<br>
  - <em>Xử lý kết quả:</em><br>
  &nbsp;&nbsp;&rarr; Nếu nhận "ô tô": Kích hoạt relay chạy trong 4 giây.<br>
  &nbsp;&nbsp;&rarr; Nếu nhận "đồ chơi": Kích hoạt relay chạy 1.9 giây, quay servo 90° trong 2 giây, sau đó quay lại 0°.<br>
  &nbsp;&nbsp;&rarr; Nếu không nhận phản hồi: In thông báo timeout.<br>
  &nbsp;&nbsp;&rarr; Nếu nhận vật thể không phải hoa quả cần nhận diện "unknown": Không kích hoạt phần cứng và in thông báo "No relevant object detected; skipping processing.".<br><br>
  <strong>Flask &amp; YOLO Code (web.py):</strong><br>
  - <em>Khởi tạo:</em> Flask server khởi chạy tại <code>http://0.0.0.0:5000/</code> và tải mô hình YOLO từ file <code>best.pt</code>.<br>
  - <em>Xử lý ảnh:</em> Lấy ảnh từ ESP32-CAM qua URL, chạy YOLO để nhận diện đối tượng (quả cam tươi/hỏng), cập nhật ảnh annotate và kết quả phân loại.<br>
  - <em>Giao tiếp với Arduino:</em> Khi nhận lệnh "CHECK" qua Serial, Flask sẽ chụp ảnh mới, xử lý và gửi kết quả ("ô tô", "đồ chơi" hoặc "unknown") về Arduino.<br>
  - <em>Giao diện web:</em> Hiển thị video feed từ camera, thông tin FPS, trạng thái camera và cảnh báo.
</p>

<hr>

<h2 align="center">📸 Kết quả hiển thị</h2>
<div align="center">
  <p><strong>Ảnh car khi cam nhận diện:</strong></p>
  <img src="REAME/Car.jpg" alt="Ảnh ô tô" width="100%">
  
  <p><strong>Ảnh toys khi cam nhận diện:</strong></p>
  <img src="REAME/teddy bear.jpg" alt="Ảnh đồ chơi" width="100%">
</div>

<br>
<hr>

<h2 align="center">🌟 Poster ✨</h2>
<p align="center"><strong>Poster nhóm</strong></p>
<div align="center">
  <img src="./REAME/poster.jpg" alt="Poster nhóm" width="100%">
</div>

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
      <td>Ngô Tuấn MinhMinh</td>
      <td>Phát triển dự án</td>
    </tr>
  </tbody>
</table>
</center>






<p align="center">© 2025 NGÔ TUẤN MINH, CNTT16-06, TRƯỜNG ĐẠI HỌC ĐẠI NAM</p>

