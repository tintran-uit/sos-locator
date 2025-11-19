# SOS Locator (Vue 3 + Vite)

Ứng dụng web đơn giản hỗ trợ gửi vị trí cứu nạn và hiển thị bản đồ cho đội cứu hộ.

## Tính năng
1. Người gặp nạn nhập họ tên, số điện thoại và lấy GPS hiện tại rồi gửi lên hệ thống.
2. Đội cứu hộ xem tất cả tín hiệu trên Google Maps với marker và danh sách.

Dữ liệu được lưu realtime trên Firebase Firestore. Bản đồ sử dụng Google Maps JavaScript API.

## Chuẩn bị
Tạo project Firebase và bật Firestore. Lấy thông tin cấu hình web app và điền vào file `.env` (tạo từ `.env.example`).
Lấy Google Maps API key (bật Maps JavaScript API) và đặt vào biến `VITE_GOOGLE_MAPS_API_KEY`.

```
cp .env.example .env
# Chỉnh sửa .env với các KEY thật
```

## Cài đặt
```
npm install
npm run dev
```
Dev server mặc định: http://localhost:5173

## Scripts
- `npm run dev` chạy môi trường phát triển
- `npm run build` build production vào thư mục `dist`
- `npm run preview` preview build
- `npm test` chạy test (Vitest)

## Cấu trúc thư mục chính
```
src/
  main.js            Khởi tạo app
  App.vue            Layout + navigation
  router/            Định nghĩa routes
  services/firebase.js  Kết nối Firestore
  services/location.js  Lấy vị trí trình duyệt
  stores/victims.js     Pinia store realtime
  views/               Các màn hình chính
```

## Mở rộng / Gợi ý tiếp theo
- Thêm clustering khi số lượng marker lớn.
- Thêm xác thực (mã OTP) cho số điện thoại.
- Thêm trạng thái (đã cứu, đang chờ) để đội cứu hộ quản lý.
- Gửi kèm độ chính xác (accuracy) và mốc thời gian.

## Cảnh báo bảo mật
API key Firebase & Google Maps nên giới hạn domain. Không lưu thông tin nhạy cảm ngoài tên + điện thoại.

## License
MIT (tuỳ chỉnh).
