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
            !payload.namxuatban || !payload.maxb || !payload.tacgia) {
            throw new Error("Vui lòng điền đầy đủ thông tin sách!");
        }

        return {
            masach: payload.masach.trim(),
            tensach: payload.tensach.trim(),
            dongia: payload.dongia,
            soquyen: payload.soquyen,
            namxuatban: payload.namxuatban,
            maxb: payload.maxb.trim(),
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
}

module.exports = BookService;
