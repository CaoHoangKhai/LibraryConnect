const ApiError = require("../api-error");
const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");

exports.createBook = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const newBook = await bookService.createBook(req.body);
        if (!newBook.success) {
            return next(new ApiError(400, "Thêm sách thất bại!"));
        }
        return res.status(201).json({ 
            message: "Thêm sách thành công!",
            bookId: newBook.bookId
        });
    } catch (error) {
        return next(new ApiError(500, `Lỗi thêm sách: ${error.message}`));
    }
};
