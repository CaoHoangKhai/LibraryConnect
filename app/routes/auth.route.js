const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Đăng ký tài khoản (POST)
router.post("/register", authController.create);
router.get("/register", (req, res) => {
    res.json({ message: "Trang Đăng Ký" });
});

// Đăng nhập (POST)
router.post("/login", authController.login);
router.get("/login", (req, res) => {
    res.json({ message: "Trang Đăng Nhập" });
});


// Lấy danh sách người dùng (GET)
// router.get("/users", authController.findAll);

// // Xoá tất cả tài khoản (chỉ Admin mới nên có quyền này)
// router.delete("/users", authController.deleteAll);

// router.use((req, res) => {
//     res.status(404).json({ message: "Route không tồn tại" });
// });

module.exports = router;
