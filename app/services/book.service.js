const { ObjectId } = require("mongodb");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("SACH");
    }

    generateBookId(tensach, namxuatban) {
        if (!tensach || !namxuatban) return null;
        const slug = tensach.toLowerCase().replace(/\s+/g, "-"); // Chuyển đổi tên sách thành slug
        return `${slug}-${namxuatban}`;
    }

    extractBookData(payload) {
        if (!payload.masach || !payload.tensach || !payload.dongia || !payload.soquyen ||
            !payload.namxuatban || !payload.manxb || !payload.tacgia) {
            throw new Error("Vui lòng điền đầy đủ thông tin sách!");
        }

        return {
            masach: payload.masach.trim(),
            tensach: payload.tensach.trim(),
            dongia: payload.dongia,
            soquyen: payload.soquyen,
            namxuatban: payload.namxuatban,
            manxb: payload.manxb.trim(),
            tacgia: payload.tacgia.trim(),
        };
    }

    async createBook(bookData) {
        try {
            const newBook = this.extractBookData(bookData);
            const result = await this.Book.insertOne(newBook);

            return result.insertedId ? { success: true, bookId: result.insertedId } : { success: false };
        } catch (error) {
            console.error("Lỗi khi tạo sách:", error);
            throw new Error(error.message);
        }
    }

    async findAll() {
        return await this.Book.aggregate([
            {
                $addFields: {
                    manxbObjectId: { $toObjectId: "$manxb" } // Chuyển `manxb` thành ObjectId
                }
            },
            {
                $lookup: {
                    from: "NHAXUATBAN",  // Collection nhà xuất bản
                    localField: "manxbObjectId", // Trường đã chuyển thành ObjectId
                    foreignField: "_id", // `_id` của NHAXUATBAN là ObjectId
                    as: "publisherInfo"
                }
            },
            {
                $unwind: {
                    path: "$publisherInfo",
                    preserveNullAndEmptyArrays: true // Giữ nguyên nếu không có NXB
                }
            },
            {
                $project: {
                    _id: 1,
                    masach: 1,
                    tensach: 1,
                    dongia: 1,
                    soquyen: 1,
                    namxuatban: 1,
                    TenNXB: { $ifNull: ["$publisherInfo.TenNXB", "Không xác định"] }, // Lấy tên nhà xuất bản
                    tacgia: 1,
                }
            }
        ]).toArray();
    }


    async findById(id) {
        const result = await this.Book.aggregate([
            {
                $match: { masach: id } // Tìm sách theo mã sách
            },
            {
                $addFields: {
                    manxbObjectId: { $toObjectId: "$manxb" } // Chuyển `manxb` thành ObjectId
                }
            },
            {
                $lookup: {
                    from: "NHAXUATBAN",
                    localField: "manxbObjectId",  // Liên kết từ bảng SACH
                    foreignField: "_id", // Liên kết với `_id` của NHAXUATBAN
                    as: "publisherInfo"
                }
            },
            {
                $unwind: {
                    path: "$publisherInfo",
                    preserveNullAndEmptyArrays: true // Tránh lỗi nếu không có NXB
                }
            },
            {
                $project: {
                    _id: 1,
                    masach: 1,
                    tensach: 1,
                    dongia: 1,
                    soquyen: 1,
                    namxuatban: 1,
                    TenNXB: { $ifNull: ["$publisherInfo.TenNXB", "Không xác định"] }, // Hiển thị tên NXB
                    tacgia: 1,
                }
            }
        ]).toArray();

        return result.length ? result[0] : null;
    }

    async getBookById(masach) {
        try {
            return await this.Book.findOne({ masach: masach });
        } catch (error) {
            console.error("❌ Lỗi khi lấy thông tin sách:", error);
            return null;
        }
    }

    async updateBookQuantity(masach, quantityChange) {
        return await this.Book.updateOne(
            { masach: masach },
            { $inc: { soquyen: quantityChange } }
        );
    }
    async countBooks() {
        return await this.Book.countDocuments();
    }


}

module.exports = BookService;
