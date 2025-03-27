const { ObjectId } = require("mongodb");

class BorrowService {
    constructor(client) {
        this.Borrow = client.db().collection("THEODOIMUONSACH"); // Collection chứa thông tin mượn sách
    }

    extractBorrowData(payload) {
        return {
            madocgia: payload.madocgia,
            masach: payload.masach,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
        };
    }

    async createBorrow(payload) {
        const borrowData = this.extractBorrowData(payload);
        const result = await this.Borrow.insertOne(borrowData);
        return result.insertedId;
    }

    async getAllBorrows() {
        try {
            return await this.Borrow.find({}).toArray();
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách mượn sách:", error);
            return [];
        }
    }

    async getBorrowsByReaderId(madocgia) {
        try {
            return await this.Borrow.aggregate([
                {
                    $match: { madocgia: madocgia }
                },
                {
                    $lookup: {
                        from: "SACH",
                        localField: "masach",
                        foreignField: "masach",
                        as: "bookInfo"
                    }
                },
                {
                    $unwind: { path: "$bookInfo", preserveNullAndEmptyArrays: true }
                },
                {
                    $project: {
                        _id: 1,
                        madocgia: 1,
                        masach: 1,
                        ngaymuon: 1,
                        ngaytra: 1,
                        "bookInfo.tensach": 1
                    }
                }
            ]).toArray();
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách mượn sách theo độc giả:", error);
            return [];
        }
    }

    async getOverdueBorrows() {
        try {
            const today = new Date();
            console.log("📅 Kiểm tra sách mượn trễ, hôm nay là:", today);

            const overdueBorrows = await this.Borrow.find({
                ngaytra: { $lt: today }
            }).toArray();

            console.log("🔍 Số sách mượn trễ:", overdueBorrows.length);
            return overdueBorrows;
        } catch (error) {
            console.error("❌ Lỗi khi lấy danh sách sách mượn quá hạn:", error);
            throw error;
        }
    }

    async countBorrowedBooks() {
        return await this.Borrow.countDocuments(); // Tổng số sách đang mượn
    }

    async countOverdueBooks() {
        const today = new Date();
        return await this.Borrow.countDocuments({ ngaytra: { $lt: today } });
    }

    // 🔍 Kiểm tra xem sách có đang được mượn không
    async findByUserAndBook(madocgia, masach) {
        return await this.Borrow.findOne({ madocgia, masach });
    }

    // ❌ Xóa sách khỏi danh sách mượn sau khi trả
    async remove(madocgia, masach) {
        return await this.Borrow.deleteOne({ madocgia, masach });
    }
    async getAllBorrowsGroupedByReader() {
        try {
            return await this.Borrow.aggregate([
                {
                    $group: {
                        _id: "$madocgia",
                        totalBorrowed: { $sum: 1 }, // Tổng số sách mượn
                        books: {
                            $push: {
                                masach: "$masach",
                                ngaymuon: "$ngaymuon",
                                ngaytra: "$ngaytra"
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "DOCGIA", // Bảng độc giả
                        localField: "_id",
                        foreignField: "madocgia",
                        as: "readerInfo"
                    }
                },
                {
                    $unwind: "$readerInfo"
                },
                {
                    $project: {
                        madocgia: "$_id",
                        hoten: "$readerInfo.hoten",
                        totalBorrowed: 1,
                        books: 1
                    }
                }
            ]).toArray();
        } catch (error) {
            console.error("❌ Lỗi khi nhóm sách theo độc giả:", error);
            return [];
        }
    }
ss    
}

module.exports = BorrowService;
