<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <AdminNavbar />
            </aside>
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary">Danh sách Sách Đang Cho Mượn</h2>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead class="table-primary">
                            <tr>
                                <th>#</th>
                                <th>Mã độc giả</th>
                                <th>Tổng số sách mượn</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(reader, index) in borrowlist" :key="reader.madocgia">
                                <td>{{ index + 1 }}</td>
                                <td>{{ reader.madocgia }}</td>
                                <td>{{ reader.totalBorrowed }}</td>
                                <td>
                                    <button class="btn btn-info btn-sm" @click="toggleDropdown(reader.madocgia)">
                                        {{ openDropdowns.includes(reader.madocgia) ? 'Ẩn' : 'Hiển thị' }} sách
                                    </button>
                                </td>
                            </tr>
                            <tr v-for="(reader, index) in borrowlist" v-show="openDropdowns.includes(reader.madocgia)" :key="'books-' + reader.madocgia">
                                <td colspan="4">
                                    <table class="table table-sm table-bordered">
                                        <thead class="table-secondary">
                                            <tr>
                                                <th>#</th>
                                                <th>Mã sách</th>
                                                <th>Tên sách</th>
                                                <th>Đơn giá</th>
                                                <th>Năm XB</th>
                                                <th>Tác giả</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(book, bookIndex) in reader.books" :key="book.masach + bookIndex">
                                                <td>{{ bookIndex + 1 }}</td>
                                                <td>{{ book.masach }}</td>
                                                <td>{{ book.tensach }}</td>
                                                <td>{{ book.dongia.toLocaleString() }} VND</td>
                                                <td>{{ book.namxuatban }}</td>
                                                <td>{{ book.tacgia }}</td>
                                                <td>
                                                    <button class="btn btn-danger btn-sm" @click="returnBook(reader.madocgia, book.masach)">
                                                        Trả Sách
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            borrowlist: [],
            openDropdowns: [], // Danh sách độc giả có dropdown mở
        };
    },
    async created() {
        await this.fetchBorrowList();
    },
    methods: { 
        async fetchBorrowList() {
            try {
                const response = await axios.get("http://localhost:3000/admin/borrowing");
                console.log("📢 Danh sách sách mượn:", response.data);
                this.borrowlist = response.data;
            } catch (error) {
                console.error("❌ Lỗi khi lấy danh sách Sách cho mượn:", error);
            }
        },

        async returnBook(madocgia, masach) {
            if (!confirm("Bạn có chắc muốn trả sách này?")) return;

            try {
                const response = await axios.post("http://localhost:3000/admin/returned", {
                    madocgia: madocgia,
                    masach: masach
                });

                console.log("✅ Trả sách thành công:", response.data);

                // Cập nhật lại danh sách sau khi trả sách
                await this.fetchBorrowList();
            } catch (error) {
                console.error("❌ Lỗi khi trả sách:", error);
            }
        },

        toggleDropdown(madocgia) {
            if (this.openDropdowns.includes(madocgia)) {
                this.openDropdowns = this.openDropdowns.filter(id => id !== madocgia);
            } else {
                this.openDropdowns.push(madocgia);
            }
        }
    },
};
</script>