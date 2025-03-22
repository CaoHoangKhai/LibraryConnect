const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
class AdminService {
    constructor(client) {
        this.Admin = client.db().collection("NhanVien");
    }
    extractAdminData(payload) {
        return {
            msnv: payload.msvn,
            HoTenNv: payload.HoTenNV,
            Password: payload.Password,
            ChucVu: payload.ChucVu,
            DiaChi: payload.DiaChi,
            SoDienThoai: payload.SoDienThoai,
        };
    }
    async checkMSNV(msnv) {
        return await this.Admin.findOne({ msnv });
    }

    async loginAdmin(SoDienThoai, password) {
        try {
            const admin = await this.Admin.findOne({ SoDienThoai });
    
            if (!admin) {
                throw new Error("Số điện thoại không tồn tại.");
            }
    
            // if (!admin.Password.startsWith("$2b$")) {
            //     throw new Error("Mật khẩu không hợp lệ hoặc chưa được mã hóa.");
            // }
    
            // const isMatch = await bcrypt.compare(password, admin.Password);
            // if (!isMatch) {
            //     throw new Error("Mật khẩu không chính xác.");
            // }
            return admin;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
}
module.exports = AdminService;