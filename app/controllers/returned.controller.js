const ApiError = require("../api-error");
const ReturnedService = require("../services/returned.service");
const BorrowService = require("../services/borrow.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    try {
        const returnedService = new ReturnedService(MongoDB.client);
        const borrowService = new BorrowService(MongoDB.client);
        const booksCollection = MongoDB.client.db().collection("SACH"); // Collection chứa sách

        // 📌 Kiểm tra dữ liệu đầu vào
        if (!req.body.madocgia || !req.body.masach) {
            return next(new ApiError(400, "madocgia và masach là bắt buộc"));
        }

        // 🔍 Kiểm tra xem sách có đang được mượn không
        const borrowRecord = await borrowService.findByUserAndBook(req.body.madocgia, req.body.masach);
        if (!borrowRecord) {
            return next(new ApiError(404, "Sách này không tồn tại trong danh sách mượn!"));
        }

        // ✅ Ghi nhận trả sách vào collection DATRASACH
        const result = await returnedService.create(req.body);

        // 🔄 Xóa bản ghi trong danh sách mượn sau khi trả
        await borrowService.remove(req.body.madocgia, req.body.masach);

        // 🔄 Cập nhật số lượng sách trong SACH (+1)
        const updateResult = await booksCollection.updateOne(
            { masach: req.body.masach },
            { $inc: { soquyen: 1 } } // Tăng số lượng sách lên 1
        );

        if (updateResult.modifiedCount === 0) {
            console.warn("⚠️ Không tìm thấy sách để cập nhật số lượng!");
        }

        res.status(201).json({
            message: "✅ Trả sách thành công! Số lượng sách đã được cập nhật.",
            data: result
        });
    } catch (error) {
        console.error("❌ Lỗi khi trả sách:", error);
        next(new ApiError(500, "Lỗi máy chủ khi xử lý yêu cầu trả sách"));
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const borrowService = new BorrowService(MongoDB.client);

        // 🔍 Lấy danh sách tất cả sách mượn, nhóm theo mã độc giả
        const borrowList = await borrowService.getAllBorrowsGroupedByReader();

        res.status(200).json(borrowList);
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách mượn sách theo nhóm:", error);
        next(new ApiError(500, "Lỗi máy chủ khi lấy danh sách mượn sách"));
    }
};
exports.findByReaderId = async (req, res, next) => {
    try {
        const returnedService = new ReturnedService(MongoDB.client);
        const { madocgia } = req.params;

        if (!madocgia) {
            return next(new ApiError(400, "madocgia là bắt buộc"));
        }

        const returnedBooks = await returnedService.findByReaderId(madocgia);
        
        if (!returnedBooks.length) {
            return next(new ApiError(404, "Không tìm thấy sách đã trả của độc giả này"));
        }

        res.status(200).json(returnedBooks);
    } catch (error) {
        console.error("❌ Lỗi khi tìm sách đã trả theo madocgia:", error);
        next(new ApiError(500, "Lỗi máy chủ khi tìm sách đã trả"));
    }
};
