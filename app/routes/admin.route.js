const express = require("express");
const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");
const publisherController = require("../controllers/publisher.controller");
const bookController = require("../controllers/book.controller");
const borrowController = require("../controllers/borrow.controller");
const dashboardController = require("../controllers/dashboard.controller");
const returnedController = require("../controllers/returned.controller");



const router = express.Router();

router.post("/login", adminController.loginAdmin);

router.post("/add-user", authController.create);

router.post("/add-book", bookController.createBook);
router.get("/books", bookController.findAll);
router.get("/book_detail/:id", bookController.findOne);


router.get("/nha-xuat-ban", publisherController.findAll);
router.post("/them-nha-xuat-ban",publisherController.createPublisher);

router.get("/users", authController.findAll);
router.get("/user/:id", authController.findOne);

router.get("/borrowing", borrowController.findAll);
router.get("/returned_list", returnedController.findAll);
router.post("/returned", returnedController.create);


router.get("/overdue", borrowController.findOverdueBooks);

router.get("/dashboard", dashboardController.getStatistics)
module.exports = router;