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

| Công nghệ | Vai trò |
|------------|----------|
| **Node.js** | Backend, xử lý API |
| **Express.js** | Framework web cho Node |
| **MongoDB** | Cơ sở dữ liệu NoSQL |
| **Vue.js** | Frontend, giao diện người dùng 
| **Bootstrap** | Giao diện, responsive layout |
| **Visual Studio Code** | IDE phát triển |

---

## 🧱 Cấu trúc thư mục

```
LibraryConnect/
│
├── app/ # Backend - API & Server (Node.js)
│ ├── config/ # Cấu hình hệ thống (CSDL, môi trường, biến ENV)
│ ├── controller/ # Bộ điều khiển xử lý logic cho các API
│ ├── routes/ # Định tuyến API (Express Router)
│ ├── services/ # Xử lý nghiệp vụ, giao tiếp giữa controller và model
│ ├── utils/ # Các hàm tiện ích dùng chung (format dữ liệu, xác thực,...)
│ ├── package.json # Thông tin và thư viện backend
│
├── client/ # Frontend - Giao diện người dùng (Vue.js)
│ ├── public/ # Chứa các tệp tĩnh (favicon, index.html,...)
│ ├── src/
│ │ ├── assets/ # Hình ảnh, biểu tượng, CSS, font,...
│ │ ├── components/ # Các component Vue tái sử dụng (nút, header, form,...)
│ │ ├── router/ # Cấu hình định tuyến (Vue Router)
│ │ ├── services/ # Các hàm gọi API (axios)
│ │ └── views/ # Các trang giao diện chính (Admin/User)
│ ├── package.json # Thông tin và thư viện frontend
│
└── README.md # Tài liệu mô tả dự án
```

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
git clone https://github.com/CaoHoangKhai/LibraryConnect.git
cd LibraryConnect
```

### 2️⃣ Cài đặt Backend
```bash
npm install
npm start
```

> Mặc định server chạy ở: **http://localhost:5000**

### 3️⃣ Cài đặt Frontend
```bash
cd client
npm install
npm run dev
```

> Mặc định frontend chạy ở: **http://localhost:3001**

---

## 📸 Giao diện minh họa

### 👨‍💼 Quản trị viên
- Trang đăng nhập  
- Trang quản lý sách  
- Trang quản lý độc giả  
- Trang thống kê mượn – trả  

### 👤 Người dùng
- Trang đăng nhập / đăng ký  
- Hồ sơ cá nhân  
- Danh sách sách  
- Trang mượn sách  
- Trang lịch sử mượn  

---

## 🧾 Kết quả đạt được
- Xây dựng hoàn chỉnh hệ thống quản lý mượn sách cơ bản.  
- Giao diện thân thiện, dễ sử dụng cho cả người dùng và quản trị viên.  
- Ứng dụng được triển khai thành công bằng Node.js + Vue.js + MongoDB.  

---

## ⚠️ Hạn chế
- Chưa tích hợp chức năng gửi thông báo (email, SMS).  
- Chưa có hệ thống phân quyền nâng cao.  
- Chưa hỗ trợ upload hình ảnh bìa sách.  
  
---

## 🚀 Hướng phát triển
- Phát triển tính năng phân quyền nâng cao cho nhân viên.  
- Tích hợp API gửi email khi gần đến hạn trả sách.  
- Cải thiện UI/UX với Vue Router & Vuex.  
- Triển khai hệ thống lên nền tảng đám mây (AWS, Render, Vercel).  

---

## 📚 Tài liệu tham khảo
1. [https://vuejs.org/](https://vuejs.org/)  
2. [https://nodejs.org/](https://nodejs.org/)  
3. [https://www.mongodb.com/](https://www.mongodb.com/)  
4. [https://getbootstrap.com/](https://getbootstrap.com/)  
5. Tài liệu học tập và hướng dẫn từ giảng viên bộ môn.  

---


---

📌 **Tác giả:** Cao Hoàng Khai  
📍 **Công nghệ:** Node.js | Vue.js | MongoDB | Bootstrap  
📧 **Liên hệ:** hoangcao230703@gmail.com
