const ApiError = require("../api-error");
const PublisherService = require("../services/publisher.service");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const publishers = await publisherService.findAll();

        if (!publishers.length) {
            return res.status(404).json({ message: "Không tìm thấy nhà xuất bản nào." });
        }
        return res.json(publishers);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi khi lấy danh sách nhà xuất bản: ${error.message}` });
    }
};

// Thêm nhà xuất bản mới
exports.createPublisher = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);
        const publisher = await publisherService.createPublisher(req.body);

        if (!publisher) {
            return res.status(400).json({ message: "Không thể tạo nhà xuất bản." });
        }
        return res.status(201).json(publisher);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};