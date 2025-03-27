<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <AdminNavbar />
            </aside>
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary">🏢 Danh Sách Nhà Xuất Bản</h2>

                    <!-- Kiểm tra nếu có dữ liệu -->
                    <div v-if="publishers.length > 0">
                        <table class="table table-bordered table-hover">
                            <thead class="table-primary">
                                <tr>
                                    <th>#</th>
                                    <th>Tên Nhà Xuất Bản</th>
                                    <th>Địa Chỉ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(publisher, index) in publishers" :key="publisher._id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ publisher.TenNXB }}</td>
                                    <td>{{ publisher.DiaChi }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Hiển thị nếu không có dữ liệu -->
                    <div v-else class="alert alert-warning">
                        Không có nhà xuất bản nào trong hệ thống.
                    </div>
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
            publishers: [],
        };
    },
    mounted() {
        this.fetchPublishers();
    },
    methods: {
        async fetchPublishers() {
            try {
                const response = await axios.get("http://localhost:3000/admin/nha-xuat-ban");
                this.publishers = response.data;
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

<style scoped></style>