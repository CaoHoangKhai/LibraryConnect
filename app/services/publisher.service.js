const { ObjectId } = require("mongodb");

class PublisherService {
    constructor(client) {
        this.Publisher = client.db().collection("NHAXUATBAN");
    }

    extractPublisherData(payload) {
        return {
            manxb: payload.manxb || new ObjectId().toHexString(), // Tạo ID nếu không có
            TenNXB: payload.TenNXB?.trim(),
            DiaChi: payload.DiaChi?.trim(),
        };
    }

    async createPublisher(payload) {
        // Kiểm tra nếu thiếu thông tin cần thiết
        if (!payload.TenNXB || !payload.DiaChi) {
            throw new Error("Tên nhà xuất bản và địa chỉ không được để trống.");
        }

        const publisher = this.extractPublisherData(payload);
        const result = await this.Publisher.insertOne(publisher);
        return result.insertedId ? publisher : null;
    }

    async findAll() {
        return await this.Publisher.find({}).toArray();
    }
    async getPublisherById(manxb) {
        return await this.Publisher.findOne({ _id: manxb });
    }
}
module.exports = PublisherService;
