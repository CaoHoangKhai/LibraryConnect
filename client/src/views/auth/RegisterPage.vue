<template>
    <div class="register-container">
        <h2>Đăng ký tài khoản</h2>
        <form @submit.prevent="register">
            <input v-model="user.holot" placeholder="Họ lót" required />
            <input v-model="user.ten" placeholder="Tên" required />
            <input v-model="user.ngaysinh" type="date" required />
            <select v-model="user.phai">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
            <input v-model="user.diachi" placeholder="Địa chỉ" required />
            <input v-model="user.dienthoai" placeholder="Số điện thoại" required />
            <input v-model="user.email" type="email" placeholder="Email" required />
            <button type="submit">Đăng ký</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            user: {
                holot: "",
                ten: "",
                ngaysinh: "",
                phai: "Nam",
                diachi: "",
                dienthoai: "",
                email: ""
            },
            errorMessage: ""
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post("http://localhost:3000/auth/register", this.user);
                alert("Đăng ký thành công!");
            } catch (error) {
                this.errorMessage = error.response?.data?.message || "Đăng ký thất bại!";
            }
        }
    }
};
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: auto;
    text-align: center;
}

.error {
    color: red;
}
</style>