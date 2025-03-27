const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

const AuthService = require("../services/auth.service");
const BookService = require("../services/book.service");
const BorrowService = require("../services/borrow.service");

exports.getStatistics = async (req, res, next) => {
    try {
        const userService = new AuthService(MongoDB.client);
        const bookService = new BookService(MongoDB.client);
        const borrowService = new BorrowService(MongoDB.client);

        // 📌 Lấy thống kê
        const totalUsers = await userService.countUsers(); // Tổng số người dùng
        const totalBooks = await bookService.countBooks(); // Tổng số sách
        const totalBorrowedBooks = await borrowService.countBorrowedBooks(); // Sách đang được mượn
        const totalOverdueBooks = await borrowService.countOverdueBooks(); // Sách trả muộn

        res.status(200).json({
            totalUsers,
            totalBooks,
            totalBorrowedBooks,
            totalOverdueBooks
        });
    } catch (error) {
        console.error("❌ Lỗi khi lấy thống kê:", error);
        next(new ApiError(500, "Lỗi máy chủ khi xử lý yêu cầu"));
    }
};
