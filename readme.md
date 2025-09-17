<h1 align="center">
🚗 Dự Án Nhận Diện Bãi Đỗ Xe Thông Minh Có Hệ Thống Giám Sát Online
</h1>
<div align="center">
  <img src="REAME/logoDaiNam.png" alt="DaiNam University Logo" width="250">
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
