<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <UserNavbar />
            </aside>

            <!-- Nội dung chính -->
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="row">
                    <div class="col-12 mt-3">
                        <h2 class="mb-4 text-primary">📚 Chi Tiết Sách</h2>

                        <!-- Kiểm tra nếu có dữ liệu sách -->
                        <div v-if="book" class="card p-4 shadow-sm">
                            <div class="row">
                                <!-- Cột hình ảnh sách -->
                                <div class="col-md-4 text-center">
                                    <img :src="book.image" alt="Bìa sách" class="img-fluid rounded shadow">
                                </div>

                                <!-- Cột thông tin sách -->
                                <div class="col-md-8">
                                    <h2 class="text-success fw-bold">{{ book.tensach }}</h2>
                                    <p class="fs-5"><strong class="fw-bold">Mã sách:</strong> {{ book.masach }}</p>
                                    <p class="fs-5"><strong class="fw-bold">Tác giả:</strong> {{ book.tacgia }}</p>
                                    <p class="fs-5"><strong class="fw-bold">Đơn giá:</strong> {{
                                        book.dongia.toLocaleString() }} VND</p>
                                    <p class="fs-5"><strong class="fw-bold">Số lượng:</strong> {{ book.soquyen }}</p>
                                    <p class="fs-5"><strong class="fw-bold">Năm xuất bản:</strong> {{ book.namxuatban }}
                                    </p>
                                    <p class="fs-5"><strong class="fw-bold">Nhà xuất bản:</strong> {{ book.maxb }}</p>

                                    <!-- Nút hành động -->
                                    <div class="d-flex align-items-center mt-3" style="gap: 5px;">
                                        <button @click="borrowBook" class="btn btn-primary px-3">
                                            📖 Mượn Sách
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="text-center">
                            <p>⏳ Đang tải thông tin sách...</p>
                        </div>
                    </div>
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
            book: null,
            isFavorite: false,
            user: JSON.parse(localStorage.getItem("user")) || {}
        };
    },
    async created() {
        await this.fetchBookDetail();
    },
    methods: {
        async fetchBookDetail() {
            try {
                const bookId = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/admin/book_detail/${bookId}`);
                this.book = response.data;
            } catch (error) {
                console.error("Lỗi khi lấy thông tin sách:", error);
            }
        },
        toggleFavorite() {
            this.isFavorite = !this.isFavorite;
        },
        async borrowBook() {
            if (!this.user || !this.user.madocgia) {
                alert("Bạn cần đăng nhập để mượn sách.");
                return;
            }

            const borrowData = {
                madocgia: this.user.madocgia,
                masach: this.book.masach,
                ngaymuon: new Date(), // Ngày hiện tại
                ngaytra: (() => {
                    let dueDate = new Date();
                    dueDate.setMonth(dueDate.getMonth() + 1);
                    return dueDate;
                })() // Trả sau 1 tháng
            };


            try {
                const response = await axios.post("http://localhost:3000/user/addborrow", borrowData);
                alert("📖 Mượn sách thành công! Mã mượn: " + response.data.borrowId);
            } catch (error) {
                console.error("❌ Lỗi khi mượn sách:", error.response?.data || error.message);

                // 🔍 Kiểm tra nếu lỗi là do đã mượn 3 cuốn sách
                if (error.response && error.response.data && error.response.data.message) {
                    alert(`❌ ${error.response.data.message}`);
                } else {
                    alert("❌ Mượn sách thất bại, vui lòng thử lại.");
                }
            }
        }
    },
};
</script>
