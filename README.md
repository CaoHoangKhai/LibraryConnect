# 📚 LibraryConnect – Hệ Thống Quản Lý Đăng Ký Mượn Sách

## 🏫 Giới thiệu
**LibraryConnect** là hệ thống quản lý thư viện trực tuyến, giúp người dùng đăng ký mượn – trả sách dễ dàng và giúp quản trị viên theo dõi tình trạng mượn sách hiệu quả.  
Dự án được phát triển bằng **Node.js**, **Vue.js**, **MongoDB** và **Bootstrap**, tạo nên một nền tảng quản lý sách thân thiện, hiện đại và dễ mở rộng.

---

## 💡 Mục tiêu đề tài
- Xây dựng hệ thống quản lý mượn – trả sách trực tuyến.
- Cho phép người dùng đăng ký tài khoản, mượn sách và xem lịch sử mượn.
- Cung cấp giao diện quản trị viên để quản lý độc giả, sách, nhà xuất bản và theo dõi việc mượn – trả.
- Ứng dụng công nghệ web hiện đại để tối ưu hiệu năng và trải nghiệm người dùng.

---

## ⚙️ Công nghệ sử dụng

| Công nghệ | Vai trò | Phiên bản khuyến nghị |
|------------|----------|------------------------|
| **Node.js** | Backend, xử lý API | v18+ |
| **Express.js** | Framework web cho Node | Latest |
| **MongoDB** | Cơ sở dữ liệu NoSQL | 6.x |
| **Vue.js** | Frontend, giao diện người dùng | v3.x |
| **Bootstrap** | Giao diện, responsive layout | 5.x |
| **Visual Studio Code** | IDE phát triển | Latest |

---

## 🧱 Cấu trúc thư mục
LibraryConnect/
│
├── backend/ # Source code Node.js (API & server)
│ ├── src/
│ │ ├── controllers/ # Bộ điều khiển xử lý logic
│ │ ├── models/ # Định nghĩa các collection MongoDB
│ │ ├── routes/ # Các endpoint API
│ │ └── app.js # Điểm khởi chạy backend
│ ├── package.json
│
├── frontend/ # Source code Vue.js
│ ├── src/
│ │ ├── components/ # Các component giao diện
│ │ ├── views/ # Trang giao diện chính (Admin/User)
│ │ └── router/ # Điều hướng Vue Router
│ ├── package.json
│
└── README.md 


---

## 🧩 Các chức năng chính

### 🔹 Giao diện Quản Trị Viên
- Đăng nhập / Đăng xuất  
- Quản lý độc giả  
- Quản lý nhân viên  
- Quản lý nhà xuất bản  
- Quản lý sách cho mượn và theo dõi tình trạng trả  

### 🔹 Giao diện Người Dùng
- Đăng ký và đăng nhập  
- Cập nhật hồ sơ cá nhân  
- Xem danh sách sách có sẵn  
- Xem sách đang mượn và đã trả  
- Gửi yêu cầu mượn sách  

---

## 📊 Mô hình cơ sở dữ liệu

Các collection chính trong MongoDB:

| Collection | Mô tả |
|-------------|-------|
| **DOCGIA** | Lưu thông tin độc giả |
| **NHANVIEN** | Quản lý nhân viên thư viện |
| **NHAXUATBAN** | Thông tin nhà xuất bản |
| **SACH** | Danh sách sách có trong thư viện |
| **THEODOIMUONSACH** | Theo dõi lịch sử mượn – trả |
| **DATRASACH** | Ghi nhận sách đã được trả |

---

## 🧠 Cách cài đặt và chạy dự án

### 1️⃣ Clone repository
```bash
git clone https://github.com/<your-username>/LibraryConnect.git
cd LibraryConnect

