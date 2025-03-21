<template>
    <div class="layout">
        <UserNavbar /> <!-- Navbar cố định bên trái -->

        <div class="content">
            <div class="card shadow-lg p-4">
                <div class="card-body">
                    <!-- Tiêu đề căn giữa -->
                    <h2 class="mb-4 text-center text-primary">📖 Hồ Sơ Cá Nhân</h2>

                    <form>
                        <!-- Họ và Tên + Số Điện Thoại -->
                        <div class="mb-3 row">
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-person-fill"></i> Họ và Tên</label>
                                <input v-model="fullName" type="text" class="form-control" readonly />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-telephone-fill"></i> Số Điện Thoại</label>
                                <input v-model="user.dienthoai" type="text" class="form-control" readonly />
                            </div>
                        </div>

                        <!-- Ngày Sinh + Giới Tính -->
                        <div class="mb-3 row">
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-calendar"></i> Ngày Sinh</label>
                                <input v-model="formattedDate" type="text" class="form-control" readonly />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-gender-ambiguous"></i> Giới Tính</label>
                                <input v-model="user.phai" type="text" class="form-control" readonly />
                            </div>
                        </div>

                        <!-- Địa Chỉ + Email -->
                        <div class="mb-3 row">
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-geo-alt-fill"></i> Địa Chỉ</label>
                                <input v-model="user.diachi" type="text" class="form-control" readonly />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-envelope-fill"></i> Email</label>
                                <input v-model="user.email" type="email" class="form-control" readonly />
                            </div>
                        </div>

                        <!-- <button class="btn btn-danger w-100 mt-3" @click="logout">
                            <i class="bi bi-box-arrow-right"></i> Đăng xuất
                        </button> -->
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserNavbar from "@/components/UserNavbar.vue";

export default {
    components: {
        UserNavbar
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user")) || {}
        };
    },
    computed: {
        fullName() {
            return `${this.user.holot || ""} ${this.user.ten || ""}`.trim();
        },
        formattedDate() {
            if (!this.user?.ngaysinh) return "";
            const date = new Date(this.user.ngaysinh);
            return date.toLocaleDateString("vi-VN"); // Chuyển về định dạng dd/mm/yyyy
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("user");
            this.$router.push("/auth/login");
        }
    }
};
</script>

<style scoped>
/* Bố cục trang */
.layout {
    display: flex;
    width: 100%;
    height: 100vh;
}

/* Navbar cố định bên trái */
.layout UserNavbar {
    width: 250px;
    position: fixed;
    height: 100vh;
    background-color: #f8f9fa;
    padding-top: 20px;
}

/* Nội dung chính */
.content {
    flex: 1;
    margin-left: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

/* Thiết kế card */
.card {
    width: 80%;
    max-width: 600px;
    border-radius: 10px;
}

/* Tùy chỉnh biểu tượng */
.bi {
    margin-right: 8px;
    color: #007bff;
}
</style>
