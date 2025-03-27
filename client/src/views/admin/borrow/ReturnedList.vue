<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar Admin -->
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <AdminNavbar />
            </aside>

            <!-- Nội dung chính -->
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary">📚 Danh sách Sách Đã Cho Mượn</h2>

                    <!-- Hiển thị trạng thái tải dữ liệu -->
                    <div v-if="loading" class="text-center">⏳ Đang tải dữ liệu...</div>
                    <div v-else-if="error" class="text-danger">{{ error }}</div>
                    <div v-else>
                        <!-- Hiển thị danh sách sách theo nhóm độc giả -->
                        <div v-for="reader in returnedList" :key="reader._id"
                            class="mb-4 p-3 border rounded bg-white shadow">
                            <h4 class="text-primary">👤 Mã độc giả: {{ reader.madocgia }}</h4>
                            <p class="text-muted">📖 Tổng số sách đã mượn: {{ reader.totalBorrowed }}</p>

                            <table class="table table-bordered mt-2">
                                <thead class="table-light">
                                    <tr>
                                        <th>📚 Mã Sách</th>
                                        <th>📅 Ngày Mượn</th>
                                        <th>📆 Ngày Trả</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="book in reader.books" :key="book.masach">
                                        <td>{{ book.masach }}</td>
                                        <td>{{ formatDate(book.ngaymuon) }}</td>
                                        <td>{{ formatDate(book.ngaytra) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
            returnedList: [],
            loading: false,
            error: null,
        };
    },
    methods: {
        async fetchReturnedList() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get("http://localhost:3000/admin/returned_list");
                this.returnedList = response.data;
            } catch (err) {
                this.error = "❌ Lỗi khi tải danh sách sách đã trả!";
            } finally {
                this.loading = false;
            }
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        },
    },
    mounted() {
        this.fetchReturnedList();
    },
};
</script>