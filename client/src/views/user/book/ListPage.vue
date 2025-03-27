<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <UserNavbar />
            </aside>
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary">📚 Sách</h2>
                </div>

                <!-- Danh sách sách -->
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead class="table-primary">
                            <tr>
                                <th>#</th>
                                <th>Mã sách</th>
                                <th>Tên sách</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Năm XB</th>
                                <th>Tác giả</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(book, index) in books" :key="book._id">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <span class="clickable" @click="goToBookDetail(book.masach)">
                                        {{ book.masach }}
                                    </span>
                                </td>
                                <td>{{ book.tensach }}</td>
                                <td>{{ book.dongia.toLocaleString() }} VND</td>
                                <td>{{ book.soquyen }}</td>
                                <td>{{ book.namxuatban }}</td>
                                <td>{{ book.tacgia }}</td>
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
            books: [], // Danh sách sách
        };
    },
    async created() {
        await this.fetchBooks();
    },
    methods: {
        async fetchBooks() {
            try {
                const response = await axios.get("http://localhost:3000/admin/books");
                this.books = response.data;
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sách:", error);
            }
        },
        goToBookDetail(masach) {
            this.$router.push(`/user/book_detail/${masach}`);
        },
    }
};
</script>

<style scoped>
.table {
    font-size: 16px;
    text-align: center;
}
</style>
