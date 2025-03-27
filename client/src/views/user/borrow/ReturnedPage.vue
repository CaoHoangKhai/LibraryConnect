<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <UserNavbar />
            </aside>

            <!-- Main Content -->
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary">Sách Đã Trả</h2>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên Sách</th>
                                <th>Ngày Trả</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(book, index) in returnedBooks" :key="book._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ book.tenSach || "Không rõ" }}</td>
                                <td>{{ formatDate(book.ngaytrasach) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import UserNavbar from "@/components/UserNavbar.vue";
import axios from "axios";

export default {
    components: {
        UserNavbar,
    },
    data() {
        return {
            user: JSON.parse(localStorage.getItem("user")) || {}, // Lấy thông tin user từ localStorage
            returnedBooks: [] // Danh sách sách đã trả
        };
    },
    mounted() {
        this.fetchReturnedBooks();
    },
    methods: {
        async fetchReturnedBooks() {
            try {
                const url = `http://localhost:3000/user/returned/${this.user.madocgia}`;
                console.log(`📢 Gửi request đến: ${url}`);
                
                const response = await axios.get(url);
                console.log("📢 Dữ liệu nhận được:", response.data);
                
                this.returnedBooks = response.data;
            } catch (error) {
                console.error("❌ Lỗi khi lấy danh sách sách đã trả:", error.response?.data || error.message);
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

.table th,
.table td {
    text-align: center;
    vertical-align: middle;
}
</style>
