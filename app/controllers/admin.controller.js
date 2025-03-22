const ApiError = require("../api-error");
const AdminService = require("../services/admin.service");
const MongoDB = require("../utils/mongodb.util");

exports.loginAdmin = async (req, res, next) => {
    try {
        const { sodienthoai, password } = req.body;
        if (!sodienthoai || !password) {
            return next(new ApiError(400, "Bạn phải nhập cả số điện thoại và mật khẩu."));
        }
        const adminService = new AdminService(MongoDB.client);
        const admin = await adminService.loginAdmin(sodienthoai, password);
        if (!admin) {
            return next(new ApiError(401, "Số điện thoại hoặc mật khẩu không đúng."));
        }
        return res.json({ message: "Đăng nhập thành công!", admin });
    } catch (error) {
        return next(new ApiError(500, error.message));
    }
};