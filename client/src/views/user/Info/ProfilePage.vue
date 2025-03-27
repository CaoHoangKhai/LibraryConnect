<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <UserNavbar />
            </aside>
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary"> Hồ Sơ Cá Nhân</h2>
                </div>
                <div class="card-body">
                    <form>

                        <!-- Mã Độc Giả -->
                        <div class="mb-4">
                            <label class="form-label"><i class="bi bi-person-fill"></i> Mã Độc Giả</label>
                            <input v-model="user.madocgia" type="text" class="form-control form-control-lg" readonly />
                        </div>

                        <!-- Họ và Tên + Ngày Sinh -->
                        <div class="mb-4 row">
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-person-fill"></i> Họ và Tên</label>
                                <input v-model="fullName" type="text" class="form-control form-control-lg" readonly />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-calendar"></i> Ngày Sinh</label>
                                <input v-model="formattedDate" type="text" class="form-control form-control-lg"
                                    readonly />
                            </div>
                        </div>

                        <!-- Giới Tính + Số Điện Thoại -->
                        <div class="mb-4 row">
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-gender-ambiguous"></i> Giới Tính</label>
                                <input v-model="user.phai" type="text" class="form-control form-control-lg" readonly />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-telephone-fill"></i> Số Điện Thoại</label>
                                <input v-model="user.dienthoai" type="text" class="form-control form-control-lg"
                                    readonly />
                            </div>
                        </div>

                        <!-- Email + Địa Chỉ -->
                        <div class="mb-4 row">
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-envelope-fill"></i> Email</label>
                                <input v-model="user.email" type="email" class="form-control form-control-lg"
                                    readonly />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label"><i class="bi bi-geo-alt-fill"></i> Địa Chỉ</label>
                                <input v-model="user.diachi" type="text" class="form-control form-control-lg"
                                    readonly />
                            </div>
                        </div>

                        <!-- Nút đăng xuất -->
                        <!-- <button class="btn btn-danger w-100 mt-4 py-2" @click="logout">
                            <i class="bi bi-box-arrow-right"></i> Đăng xuất
                        </button> -->

                    </form>
                </div>
            </main>
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