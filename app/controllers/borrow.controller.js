const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const BorrowService = require("../services/borrow.service");
const BookService = require("../services/book.service");
const PublisherService = require("../services/publisher.service");

exports.createBorrow = async (req, res, next) => {
    try {
        const borrowService = new BorrowService(MongoDB.client);
        const bookService = new BookService(MongoDB.client);

        if (!req.body.madocgia || !req.body.masach) {
            return res.status(400).json({ message: "Thiếu thông tin độc giả hoặc sách" });
        }

        // 🔍 Kiểm tra số sách độc giả đã mượn
        const borrowedBooks = await borrowService.getBorrowsByReaderId(req.body.madocgia);
        if (borrowedBooks.length >= 3) {
            return res.status(400).json({ message: "Bạn đã mượn đủ 3 cuốn, không thể mượn thêm" });
        }

        // 🔍 Tìm sách theo `masach`
        const book = await bookService.getBookById(req.body.masach);
        if (!book) {
            return res.status(404).json({ message: "Không tìm thấy sách" });
        }

        // 📉 Kiểm tra số lượng sách
        if (book.soquyen <= 0) {
            return res.status(400).json({ message: "Sách đã hết, không thể mượn" });
        }

        // ✅ Tạo bản ghi mượn sách
        const newBorrow = await borrowService.createBorrow(req.body);

        // 🔄 Cập nhật số lượng sách (giảm đi 1)
        await bookService.updateBookQuantity(req.body.masach, -1);

        res.status(201).json({
            message: "Mượn sách thành công",
            borrowId: newBorrow,
        });
    } catch (error) {
        console.error("❌ Lỗi khi mượn sách:", error);
        next(new ApiError(500, "Lỗi máy chủ khi xử lý yêu cầu"));
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const borrowService = new BorrowService(MongoDB.client);
        const bookService = new BookService(MongoDB.client);
        const publisherService = new PublisherService(MongoDB.client);

        // 🔍 Lấy danh sách tất cả lượt mượn
        const borrows = await borrowService.getAllBorrows();

        // 🔄 Nhóm sách theo `madocgia`
        const borrowSummary = {};
        for (const borrow of borrows) {
            if (!borrowSummary[borrow.madocgia]) {
                borrowSummary[borrow.madocgia] = {
                    madocgia: borrow.madocgia,
                    totalBorrowed: 0, // Tổng số lượt mượn của độc giả
                    books: [], // Danh sách sách mà độc giả đã mượn
                };
            }
            
            // Lấy thông tin sách
            const book = await bookService.getBookById(borrow.masach);
            const publisher = book ? await publisherService.getPublisherById(book.manxb) : null;

            // Đẩy thông tin sách vào danh sách
            borrowSummary[borrow.madocgia].books.push({
                masach: borrow.masach,
                tensach: book ? book.tensach : "Không rõ",
                dongia: book ? book.dongia : 0,
                namxuatban: book ? book.namxuatban : "Không rõ",
                TenNXB: publisher ? publisher.TenNXB : "Không rõ",
                tacgia: book ? book.tacgia : "Không rõ",
            });

            // Tăng tổng số lượt mượn
            borrowSummary[borrow.madocgia].totalBorrowed += 1;
        }

        // 📝 Chuyển object về dạng array
        res.status(200).json(Object.values(borrowSummary));
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách mượn sách:", error);
        next(new ApiError(500, "Lỗi máy chủ khi xử lý yêu cầu"));
    }
};

exports.findByReaderId = async (req, res, next) => {
    try {
        console.log("📝 req.params:", req.params); // Kiểm tra giá trị nhận được

        const borrowService = new BorrowService(MongoDB.client);
        const { madocgia } = req.params;

        if (!madocgia) {
            return res.status(400).json({ message: "Thiếu mã độc giả" });
        }

        const borrows = await borrowService.getBorrowsByReaderId(madocgia);
        res.status(200).json(borrows);
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách mượn sách theo độc giả:", error);
        next(new ApiError(500, "Lỗi máy chủ khi xử lý yêu cầu"));
    }
};

exports.findOverdueBooks = async (req, res, next) => {
    try {
        const borrowService = new BorrowService(MongoDB.client);
        const overdueBorrows = await borrowService.getOverdueBorrows();

        if (!overdueBorrows.length) {
            console.log("✅ Không có sách bị mượn trễ.");
            return res.status(200).json({ message: "Không có sách bị mượn trễ" });
        }

        console.log("📌 Sách mượn trễ:", overdueBorrows);
        res.status(200).json(overdueBorrows);
    } catch (error) {
        console.error("❌ LỖI API:", error);
        res.status(500).json({ message: "Lỗi máy chủ: " + error.message });
    }
};
