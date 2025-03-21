const { ObjectId } = require("mongodb");

class AuthService {
    constructor(client) {
        this.Auth = client.db().collection("DOCGIA");
    }

    // Hàm trích xuất dữ liệu cần thiết từ payload
    extractAuthData(payload) {
        return {
            madocgia: payload.madocgia,
            holot: payload.holot,
            ten: payload.ten,
            ngaysinh: payload.ngaysinh,
            phai: payload.phai,
            diachi: payload.diachi,
            dienthoai: payload.dienthoai,
            email: payload.email,
        };
    }

    // Đăng ký độc giả mới
    async register(payload) {
        const user = this.extractAuthData(payload);

        const emailExists = await this.checkEmail(user.email);
        if (emailExists) {
            throw new Error("Email đã tồn tại.");
        }

        const phoneExists = await this.checkPhone(user.dienthoai);
        if (phoneExists) {
            throw new Error("Số điện thoại đã tồn tại.");
        }

        const result = await this.Auth.insertOne(user);
        return result.insertedId;
    }


    // Đăng nhập yêu cầu cả email và số điện thoại
    async login({ email, dienthoai }) {
        if (!email) {
            throw new Error("Vui lòng nhập email.");
        }
        if (!dienthoai) {
            throw new Error("Vui lòng nhập số điện thoại.");
        }
    
        const emailExists = await this.checkEmail(email);
        const phoneExists = await this.checkPhone(dienthoai);
    
        if (!emailExists) {
            throw new Error("Email không tồn tại.");
        }
        if (!phoneExists) {
            throw new Error("Số điện thoại không tồn tại.");
        }
        
        // Kiểm tra nếu email và số điện thoại không thuộc cùng một người dùng
        if (emailExists.dienthoai !== dienthoai) {
            throw new Error("Email hoặc số điện thoại không chính xác.");
        }
    
        return emailExists; // Trả về thông tin người dùng nếu đúng
    }
    

    // Tìm độc giả theo mã độc giả
    async findById(id) {
        return await this.Auth.findOne({ madocgia: id });  // Không cần ObjectId
    }


    // Tìm tất cả độc giả
    async findAll() {
        return await this.Auth.find({}).toArray();
    }

    // Xóa độc giả theo ID
    async delete(id) {
        return await this.Auth.deleteOne({ _id: new ObjectId(id) });
    }
    async checkEmail(email) {
        return await this.Auth.findOne({ email });
    }

    async checkPhone(dienthoai) {
        return await this.Auth.findOne({ dienthoai });
    }

}

module.exports = AuthService;
