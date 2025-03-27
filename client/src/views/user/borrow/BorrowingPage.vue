<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <UserNavbar />
            </aside>
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary">Sách Đang Mượn</h2>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên Sách</th>
                                <th>Ngày Mượn</th>
                                <th>Ngày Trả</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(book, index) in borrowingBooks" :key="book._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ book.bookInfo?.tensach || "Không rõ" }}</td>
                                <td>{{ formatDate(book.ngaymuon) }}</td>
                                <td>{{ formatDate(book.ngaytra) }}</td>
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
            user: JSON.parse(localStorage.getItem("user")) || {},
            borrowingBooks: [] // Lưu danh sách sách đang mượn
        };
    },
    mounted() {
        this.fetchBookBorrowing();
        console.log("User từ localStorage:", this.user); // Kiểm tra user khi component mount
        this.fetchBookBorrowing();
    },
    methods: {

        async fetchBookBorrowing() {
            try {
                console.log(`📢 Gửi request đến: http://localhost:3000/user/borrowing/${this.user.madocgia}`);
                const response = await axios.get(`http://localhost:3000/user/borrowing/${this.user.madocgia}`);
                console.log("📢 Dữ liệu nhận được:", response.data);
                this.borrowingBooks = response.data; // Gán dữ liệu đúng biến
            } catch (error) {
                console.error("❌ Lỗi khi lấy danh sách sách đang mượn:", error.response?.data || error.message);
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
