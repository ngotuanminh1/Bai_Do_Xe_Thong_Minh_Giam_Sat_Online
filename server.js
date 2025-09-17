const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const https = require('https');

const app = express();
const port = 3000;

const TELEGRAM_BOT_TOKEN = '8089197695:AAEef7gmRgmK0ozKhG_kFWjO57VEZLF8KI4';
const TELEGRAM_CHAT_ID = '5948793735';

// Firebase service account key JSON
const serviceAccount = require('./serviceAccountKey.json');

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://baidoxe-25a5e-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();
const statusRef = db.ref('parking/status');
const reservationsRef = db.ref('parking/reservations');
const gasLogsRef = db.ref('parking/gasLogs');
const commandsRef = db.ref('parking/commands');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Khởi tạo dữ liệu mặc định nếu chưa có
async function initData() {
  try {
    const snapshot = await statusRef.once('value');
    if (!snapshot.exists()) {
      await statusRef.set({
        totalCars: 0,
        xeVao: 0,
        slots: [0, 0],  // 0 = empty, 2 = occupied
        gasAlert: false
      });
    }

    const gSnapshot = await gasLogsRef.once('value');
    if (!gSnapshot.exists()) {
      await gasLogsRef.set([]);
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
}
initData();



function sendTelegramAlert(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const data = JSON.stringify({
    chat_id: TELEGRAM_CHAT_ID,
    text: message
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = https.request(url, options, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error('Telegram error:', error);
  });

  req.write(data);
  req.end();
}

// Route trả về file admin.html
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Nhận dữ liệu từ Arduino/ESP32 gửi lên mỗi 5s
app.post('/fromarduino', async (req, res) => {
  try {
    // Dữ liệu mong đợi:
    // { event: string, total: number, slots: [number], gas: number }

    const { event, total, slots: newSlots, gas } = req.body;

    // Validate dữ liệu
    if (typeof event !== 'string' || typeof total !== 'number' || !Array.isArray(newSlots)) {
      return res.status(400).json({ status: 'error', message: 'Invalid data format' });
    }

    // Lấy trạng thái hiện tại
    const snapshot = await statusRef.once('value');
    let status = snapshot.val() || {
      totalCars: 0,
      xeVao: 0,
      slots: [0, 0],  // Chỗ đỗ xe (0: trống, 2: chiếm dụng)
      gasAlert: false  // Cảnh báo khí gas
    };

    // Cập nhật số xe vào (xeVao) dựa vào tổng xe hiện tại
    if (total > status.totalCars) {
      status.xeVao += (total - status.totalCars);  // Thêm số xe vào
    } else if (total < status.totalCars) {
      status.xeVao -= (status.totalCars - total);  // Giảm số xe vào
      if (status.xeVao < 0) status.xeVao = 0;  // Đảm bảo số xe vào không nhỏ hơn 0
    }

    status.totalCars = total;  // Cập nhật tổng số xe

    // Cập nhật trạng thái các slot
    if (newSlots.length === status.slots.length) {
      status.slots = newSlots.map(s => (s === 2 ? 2 : 0));  // Đảm bảo chỉ có 0 hoặc 2 (2: đã chiếm dụng, 0: trống)
    } else {
      console.warn("Received slots length mismatch");
    }

    // Cập nhật cảnh báo khí gas (ngưỡng > 200)
    // Nếu giá trị gas lớn hơn 200, thì gasAlert sẽ là true
    if (typeof gas === 'number') {
      const previousAlert = status.gasAlert;
      status.gasAlert = gas > 150;

      // Gửi cảnh báo nếu vượt ngưỡng và lần đầu
      if (!previousAlert && status.gasAlert) {
        // Gửi cảnh báo khi khí gas vượt ngưỡng lần đầu
        const message = `🚨 *CẢNH BÁO KHÍ GAS!*\n\nNồng độ khí gas hiện tại: *${gas}* ppm\n⚠️ Vượt ngưỡng an toàn (>150 ppm)\n\nThời gian: ${new Date().toLocaleString()}`;
        sendTelegramAlert(message);
      }

      // Gửi thông báo phục hồi khi khí gas trở lại an toàn
      if (previousAlert && !status.gasAlert) {
        const message = `✅ *ĐÃ HẾT CẢNH BÁO KHÍ GAS!*\n\nNồng độ khí gas hiện tại: *${gas}* ppm\n✔️ Đã về mức an toàn (<=150 ppm)\n\nThời gian: ${new Date().toLocaleString()}`;
        sendTelegramAlert(message);
      }
    }



    // Lưu log khí gas (giữ tối đa 20 bản ghi)
    if (typeof gas === 'number') {
      const gasLogsSnapshot = await gasLogsRef.once('value');
      let gasLogs = gasLogsSnapshot.val() || [];
      gasLogs.push({ time: Date.now(), gas });
      if (gasLogs.length > 20) gasLogs.shift();  // Giới hạn số lượng bản ghi log khí gas
      await gasLogsRef.set(gasLogs);
    }

    // Cập nhật trạng thái lên Firebase
    await statusRef.set(status);

    console.log(`Event: ${event}, Total cars: ${status.totalCars}, Xe vao: ${status.xeVao}, Gas: ${gas}, Slots: ${JSON.stringify(status.slots)}`);

    res.json({ status: 'success', total: status.totalCars });

  } catch (err) {
    console.error("Error in /fromarduino:", err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});
app.post('/pre-reserve', async (req, res) => {
  try {
    const { name, license, slotIndex } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !license || slotIndex === undefined || typeof slotIndex !== 'number' || slotIndex < 0) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin hoặc slot không hợp lệ" });
    }

    const statusSnap = await statusRef.once('value');
    const status = statusSnap.val() || { slots: [0, 0, 0] };

    // Kiểm tra slots có phải là mảng và slotIndex có hợp lệ
    if (!Array.isArray(status.slots) || slotIndex >= status.slots.length) {
      return res.status(400).json({ success: false, message: "Slot không hợp lệ" });
    }

    if (status.slots[slotIndex] !== 0) {
      return res.status(400).json({ success: false, message: "Chỗ đã được đặt hoặc chiếm" });
    }

    // Đánh dấu slot là "reserved"
    status.slots[slotIndex] = 1;
    await statusRef.set(status);

    // Lấy danh sách đặt chỗ hiện tại
    const snapshot = await reservationsRef.once('value');
    const reservations = snapshot.val() || [];

    // Tạo ID mới
    const id = uuidv4();

    reservations.push({
      id,
      name,
      license,
      position: slotIndex + 1,
      createdAt: new Date().toISOString(),
      paid: false,
      checkin: false
    });

    await reservationsRef.set(reservations);

    res.json({ success: true, message: "Vui lòng thanh toán để hoàn tất đặt chỗ", id });
  } catch (err) {
    console.error("Error in /pre-reserve:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});
// API xác nhận thanh toán theo id đặt chỗ
app.post('/reservations/:id/confirm-payment', async (req, res) => {
  try {
    const id = req.params.id;

    // Lấy danh sách đặt chỗ hiện tại
    const snapshot = await reservationsRef.once('value');
    let reservations = snapshot.val() || [];

    // Tìm đặt chỗ theo id
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đặt chỗ" });
    }

    // Cập nhật trạng thái đã thanh toán
    reservations[index].paid = true;

    // Lưu lại lên Firebase
    await reservationsRef.set(reservations);

    res.json({ success: true, message: "Xác nhận thanh toán thành công" });
  } catch (err) {
    console.error("Error in /reservations/:id/confirm-payment:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});
app.post('/confirm-payment', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Thiếu ID đặt chỗ" });
    }

    const snapshot = await reservationsRef.once('value');
    let reservations = snapshot.val() || [];

    const reservationIndex = reservations.findIndex(r => r.id === id);
    if (reservationIndex === -1) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đặt chỗ" });
    }

    // Cập nhật trạng thái đã thanh toán
    reservations[reservationIndex].paid = true;

    // (Bạn có thể thêm qrUrl hoặc thông tin khác ở đây nếu cần)
    
    await reservationsRef.set(reservations);

    res.json({ success: true, message: "Xác nhận thanh toán thành công" });
  } catch (err) {
    console.error("Lỗi xác nhận thanh toán:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

app.get('/check-payment', async (req, res) => {
  try {
    const license = req.query.license;
    if (!license) {
      return res.status(400).json({ success: false, message: "Thiếu biển số xe" });
    }

    const snapshot = await reservationsRef.once('value');
    const reservations = snapshot.val() || [];

    // Tìm bản ghi đặt chỗ theo biển số xe
    const reservation = reservations.find(r => r.license === license);

    if (!reservation) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đặt chỗ" });
    }

    if (!reservation.paid) {
      return res.status(400).json({ success: false, message: "Chưa thanh toán" });
    }

    // Nếu đã thanh toán, trả về mã QR (giả sử lưu trong reservation.qrUrl hoặc tạo mới)
    const qrUrl = reservation.qrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(reservation.id)}`;

    res.json({
      success: true,
      message: "Thanh toán đã được xác nhận.",
      qrUrl
    });

  } catch (err) {
    console.error("Error in /check-payment:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});


// API trả về trạng thái bãi đỗ
app.get('/status', async (req, res) => {
  try {
    const snapshot = await statusRef.once('value');
    const status = snapshot.val();
    if (!status) return res.status(404).json({ message: "No status data" });

    res.json({
      tongCho: status.slots.length,
      daDo: status.slots.filter(s => s === 2).length,
      conTrong: status.slots.filter(s => s === 0).length,
      xeVao: status.xeVao,
      totalCars: status.totalCars,
      slots: status.slots,
      gasAlert: status.gasAlert
    });
  } catch (err) {
    console.error("Error in /status:", err);
    res.status(500).json({ message: err.message });
  }
});

// Reset số xe vào (xeVao)
app.post('/reset-xevao', async (req, res) => {
  try {
    const snapshot = await statusRef.once('value');
    let status = snapshot.val() || {
      totalCars: 0,
      xeVao: 0,
      slots: [0, 0],
      gasAlert: false
    };

    status.xeVao = 0;
    await statusRef.set(status);
    res.json({ success: true });
  } catch (err) {
    console.error("Error in /reset-xevao:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/bookings', async (req, res) => {
  try {
    const snapshot = await reservationsRef.once('value');
    const reservations = snapshot.val() || [];
    res.json(reservations);
  } catch (err) {
    console.error("Error in /bookings:", err);
    res.status(500).json({ message: err.message });
  }
});

app.delete('/bookings/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const snapshot = await reservationsRef.once('value');
    let reservations = snapshot.val() || [];

    const index = reservations.findIndex(r => r.id === id);
    if (index === -1)
      return res.status(404).json({ success: false, message: "Không tìm thấy đặt chỗ" });

    reservations.splice(index, 1); // ❗ XÓA phần tử khỏi mảng
    await reservationsRef.set(reservations); // ❗ Ghi đè lại toàn bộ mảng lên Firebase

    res.json({ success: true });
  } catch (err) {
    console.error(`Error deleting booking ${req.params.id}:`, err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Lấy danh sách đặt chỗ
app.get('/reservations', async (req, res) => {
  try {
    const snapshot = await reservationsRef.once('value');
    const reservations = snapshot.val() || [];
    res.json(reservations);
  } catch (err) {
    console.error("Error in /reservations:", err);
    res.status(500).json({ message: err.message });
  }
});

// Xóa đặt chỗ theo id
app.delete('/reservations/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const snapshot = await reservationsRef.once('value');
    let reservations = snapshot.val() || [];
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) return res.status(404).json({ success: false, message: "Không tìm thấy đặt chỗ" });

    reservations.splice(index, 1);
    await reservationsRef.set(reservations);
    res.json({ success: true });
  } catch (err) {
    console.error(`Error deleting reservation ${req.params.id}:`, err);
    res.status(500).json({ success: false, message: err.message });
  }
});
app.get('/command', async (req, res) => {
  try {
    const snapshot = await commandsRef.once('value');
    const command = snapshot.val();

    if (command && command.action === 'open') {
      res.send("open");  // ESP32 đang mong đợi chuỗi "open"
    } else {
      res.status(404).send("no command");
    }
  } catch (err) {
    console.error("Error in /command:", err);
    res.status(500).send("server error");
  }
});

app.post('/commands/reset', async (req, res) => {
  try {
    await commandsRef.set({});
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Check-in bằng QR code
// Check-in bằng QR code
app.post('/checkin', async (req, res) => {
  try {
    const { qr } = req.body;
    if (!qr) return res.status(400).json({ success: false, message: "Thiếu dữ liệu QR" });

    // Lấy tất cả các đặt chỗ từ Firebase
    const snapshot = await reservationsRef.once('value');
    let reservations = snapshot.val() || [];

    // Tìm đặt chỗ dựa vào ID của QR code
    const reservation = reservations.find(r => r.id === qr);

    if (!reservation) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đặt chỗ" });
    }

    if (reservation.checkin) {
      return res.json({ success: false, message: "Đã check-in trước đó" });
    }

    reservation.checkin = new Date().toLocaleString();
    reservation.time = "1 giờ"; // thời gian check-in

    const pos = parseInt(reservation.position, 10) - 1; // vị trí slot (0-based)

    // Lấy trạng thái hiện tại
    const statusSnap = await statusRef.once('value');
    let status = statusSnap.val() || { slots: [0, 0], xeVao: 0 };

    // Cập nhật slot thành chiếm dụng
    if (pos >= 0 && pos < status.slots.length) {
      status.slots[pos] = 2;
    }

    // Cập nhật số xe vào (xeVao) +1 vì có xe mới vào
    status.xeVao += 1;
    status.totalCars = Math.max(status.totalCars, status.xeVao); // đảm bảo totalCars không nhỏ hơn xeVao

    // Lưu trạng thái mới lên Firebase
    await statusRef.set(status);
    await reservationsRef.set(reservations);

    // Logic cảnh báo còi nếu xe đầu tiên đỗ vị trí số 2
    if (status.xeVao === 1 && pos === 1) { // xe đầu tiên vào và đỗ vị trí số 2 (pos=1)
      await commandsRef.set({
        action: "beep",   // lệnh còi cảnh báo
        slot: pos,
        timestamp: Date.now()
      });
    } else {
      // Lệnh mở barie bình thường
      await commandsRef.set({
        action: "open",
        slot: pos,
        timestamp: Date.now()
      });
    }

    res.json({
      success: true,
      message: 'Check-in thành công!',
      valid: true,
      slotAvailable: true,
    });
  } catch (err) {
    console.error("Error in /checkin:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});
// Tắt cảnh báo khí gas thủ công
app.post('/dismiss-gas-alert', async (req, res) => {
  try {
    const snapshot = await statusRef.once('value');
    let status = snapshot.val();

    if (!status) {
      return res.status(404).json({ success: false, message: "Không tìm thấy trạng thái hệ thống" });
    }

    if (!status.gasAlert) {
      return res.json({ success: true, message: "Không có cảnh báo để tắt" });
    }

    // Cập nhật trạng thái gasAlert về false
    status.gasAlert = false;
    await statusRef.set(status);

    res.json({ success: true, message: "Đã tắt cảnh báo khí gas" });
  } catch (err) {
    console.error("Lỗi trong /dismiss-gas-alert:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});


// Lấy log khí gas
app.get('/logs', async (req, res) => {
  try {
    const snapshot = await gasLogsRef.once('value');
    const logs = snapshot.val() || [];
    res.json(logs);
  } catch (err) {
    console.error("Error in /logs:", err);
    res.status(500).json({ message: err.message });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
