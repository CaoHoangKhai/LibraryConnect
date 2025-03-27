const { ObjectId } = require("mongodb");

class ReturnedService {
    constructor(client) {
        this.collection = client.db().collection("DATRASACH"); // Collection chứa sách đã trả
    }

    async create(payload) {
        const doc = {
            madocgia: payload.madocgia,
            masach: payload.masach,
            ngaytrasach: new Date() // Ghi nhận thời gian trả sách
        };
        const result = await this.collection.insertOne(doc);
        return result;
    }

    // 📌 Tìm sách đã trả theo mã độc giả
    async findByReaderId(madocgia) {
        try {
            return await this.collection.aggregate([
                {
                    $match: { madocgia: madocgia } // Lọc theo mã độc giả
                },
                {
                    $lookup: {
                        from: "SACH", // Collection chứa thông tin sách
                        localField: "masach",
                        foreignField: "masach",
                        as: "bookInfo"
                    }
                },
                {
                    $unwind: {
                        path: "$bookInfo",
                        preserveNullAndEmptyArrays: true // Nếu không có thông tin sách thì không bị lỗi
                    }
                },
                {
                    $project: {
                        _id: 1,
                        madocgia: 1,
                        masach: 1,
                        ngaytrasach: 1,
                        tenSach: "$bookInfo.tensach" // Lấy tên sách
                    }
                }
            ]).toArray();
        } catch (error) {
            console.error("❌ Lỗi khi tìm sách đã trả:", error);
            return [];
        }
    }
    

    async getAllBorrowsGroupedByReader() {
        try {
            return await this.collection.aggregate([
                {
                    $group: {
                        _id: "$madocgia",
                        totalReturned: { $sum: 1 }, // Tổng số sách đã trả
                        books: {
                            $push: {
                                masach: "$masach",
                                ngaytrasach: "$ngaytrasach"
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
                        totalReturned: 1,
                        books: 1
                    }
                }
            ]).toArray();
        } catch (error) {
            console.error("❌ Lỗi khi nhóm sách theo độc giả:", error);
            return [];
        }
    }
    
}

module.exports = ReturnedService;
