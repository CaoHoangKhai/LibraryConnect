const ApiError = require("../api-error");
const AuthService = require("../services/auth.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body || !req.body.madocgia || !req.body.holot || !req.body.ten) {
        return next(new ApiError(400, "Dữ liệu không hợp lệ! Vui lòng kiểm tra lại."));
    }

    try {
        const authService = new AuthService(MongoDB.client);
        const userId = await authService.register(req.body);
        return res.status(201).json({ message: "Đăng ký thành công!", userId });
    } catch (error) {
        return next(new ApiError(500, `Lỗi đăng ký: ${error.message}`));
    }
};
exports.login = async (req, res, next) => {
    try {
        const { email, dienthoai } = req.body;

        if (!email || !dienthoai) {
            return next(new ApiError(400, "Bạn phải nhập cả email và số điện thoại."));
        }

        const authService = new AuthService(MongoDB.client);
        const user = await authService.login({ email, dienthoai });

        return res.json({ message: "Đăng nhập thành công!", user });
    } catch (error) {
        return next(new ApiError(401, error.message));
    }
};
exports.findAll = async (req, res, next) => {
    try {
        const authService = new AuthService(MongoDB.client);  // Sử dụng client từ app.js
        const users = await authService.findAll();

        if (!users.length) {
            return res.status(404).json({ message: "Không tìm thấy độc giả nào." });
        }
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi khi lấy danh sách độc giả: ${error.message}` });
    }
};
exports.findOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Thiếu mã độc giả (madocgia)" });
        }

        const authService = new AuthService(MongoDB.client);
        const user = await authService.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: `Lỗi: ${error.message}` });
    }
};



exports.update = (req, res) => {
    res.send({ message: "update handler" });
};
exports.delete = (req, res) => {
    res.send({ message: "delete handler" });
};
exports.deleteAll = (req, res) => {
    res, send({ message: "deleteAll handler" });
};
exports.findAllFavorite = (req, res) => {
    res, send({ message: "findAllFavorite handler" });
};