const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();


router.post("/add-user", authController.create);
router.get("/users", authController.findAll);
router.get("/user/:id", authController.findOne);

module.exports = router;