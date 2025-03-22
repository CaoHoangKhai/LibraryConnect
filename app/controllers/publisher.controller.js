const ApiError = require("../api-error");
const PublisherService = require("../services/publisher.service");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
    try {
        const publisherService = new PublisherService(MongoDB.client);  // Sử dụng client từ app.js
        const users = await publisherService.findAll();

        if (!users.length) {
            return res.status(404).json({ message: "Không tìm thấy độc giả nào." });
        }
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi khi lấy danh sách độc giả: ${error.message}` });
    }
};