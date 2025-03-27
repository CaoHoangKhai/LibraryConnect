const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Kích hoạt middleware file upload
router.use(fileUpload());

// Xử lý tải ảnh
router.post("/upload", async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Vui lòng chọn ảnh!" });
        }

        const imageFile = req.files.image;
        const fileName = `${Date.now()}-${imageFile.name}`;
        const uploadPath = path.join(__dirname, "../public/uploads", fileName);

        // Di chuyển file vào thư mục public/uploads
        await imageFile.mv(uploadPath);

        // Trả về tên file để lưu vào database
        res.json({ fileName });
    } catch (error) {
        res.status(500).json({ message: "Lỗi tải ảnh: " + error.message });
    }
});

module.exports = router;
