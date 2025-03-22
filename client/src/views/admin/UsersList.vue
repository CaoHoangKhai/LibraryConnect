<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <AdminNavbar />
            </aside>
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary">📚 Danh Sách Độc Giả</h2>

                    <!-- Bảng danh sách độc giả -->
                    <div v-if="users.length > 0">
                        <table class="table table-bordered table-hover">
                            <thead class="table-primary">
                                <tr>
                                    <th>Mã Độc Giả</th>
                                    <th>Họ Lót</th>
                                    <th>Tên</th>
                                    <th>Ngày Sinh</th>
                                    <th>Phái</th>
                                    <th>Địa Chỉ</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user._id">
                                    <td>{{ user.madocgia }}</td>
                                    <td>{{ user.holot }}</td>
                                    <td>{{ user.ten }}</td>
                                    <td>{{ formatDate(user.ngaysinh) }}</td>
                                    <td>{{ user.phai }}</td>
                                    <td>{{ user.diachi || "N/A" }}</td>
                                    <td>{{ user.dienthoai }}</td>
                                    <td>{{ user.email }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-else class="alert alert-warning">Không có dữ liệu.</div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import AdminNavbar from "@/components/AdminNavbar.vue";
import axios from "axios";

export default {
    components: {
        AdminNavbar,
    },
    data() {
        return {
            users: [],
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get("http://localhost:3000/admin/users");
                this.users = response.data;
            } catch (error) {
                console.error("Lỗi khi lấy danh sách độc giả:", error);
            }
        },
        formatDate(dateStr) {
            if (!dateStr) return "N/A";
            const date = new Date(dateStr);
            return date.toLocaleDateString("vi-VN");
        },
    },
};
</script>

<style scoped>
.table {
    font-size: 16px;
}

.table th, .table td {
    text-align: center;
    vertical-align: middle;
}
</style>
