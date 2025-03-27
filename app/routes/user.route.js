const express = require("express");
const borrowController = require("../controllers/borrow.controller");
const returnedController = require("../controllers/returned.controller");

const router = express.Router();

// Định nghĩa đường dẫn đúng
router.post("/addborrow", borrowController.createBorrow);
router.get("/borrowing/:madocgia", borrowController.findByReaderId);
router.get("/returned/:madocgia", returnedController.findByReaderId);
router.get("/borrowing", borrowController.findByReaderId);

// router.get("/addborrow", (req, res) => {
//     res.json({ message: "Trang Đăng Ký" });
// });

module.exports = router;
