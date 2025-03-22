const { ObjectId } = require("mongodb");
class PublisherService {
    constructor(client) {
        this.Publisher = client.db().collection("NHAXUATBAN");
    }
    extractPublisherData(payload) {
        return {
            maxb: payload.maxb,
            TenXB: payload.TenXB,
            DiaChi: payload.DiaChi,
        };
    }
    async findAll() {
        return await this.Publisher.find({}).toArray();
    }
}
module.exports = PublisherService;