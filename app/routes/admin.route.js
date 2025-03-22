const express = require("express");
const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");
const publisherController = require("../controllers/publisher.controller");
const bookController = require("../controllers/book.controller");



const router = express.Router();

router.post("/login", adminController.loginAdmin);

router.post("/add-user", authController.create);

router.post("/add-book", bookController.createBook);

router.get("/nha-xuat-ban", publisherController.findAll);

router.get("/users", authController.findAll);
router.get("/user/:id", authController.findOne);

module.exports = router;