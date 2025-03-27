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

exports.findAll = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const books = await bookService.findAll();

        if (!books.length) {
            return res.status(404).json({ message: "Không tìm thấy sách nào." });
        }

        return res.json(books);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi khi lấy danh sách sách: ${error.message}` });
    }
};
exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const book = await bookService.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Không tìm thấy sách." });
        }

        return res.json(book);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi khi tìm sách: ${error.message}` });
    }
};

