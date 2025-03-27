<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <AdminNavbar />
            </aside>

            <!-- Nội dung chính -->
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="row">
                    <div class="col-12 mt-3">
                        <h2 class="mb-4 text-primary">📚 Chỉnh Sửa Sách</h2>

                        <!-- Kiểm tra nếu có dữ liệu sách -->
                        <div v-if="book" class="card p-4 shadow-sm">
                            <div class="row">
                                <!-- Cột hình ảnh sách -->
                                <div class="col-md-4 text-center">
                                    <img :src="book.image" alt="Bìa sách" class="img-fluid rounded shadow">
                                    <input type="text" class="form-control mt-2" v-model="book.image"
                                        placeholder="URL hình ảnh" />
                                </div>

                                <!-- Cột thông tin sách -->
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Tên Sách</label>
                                        <input type="text" class="form-control" v-model="book.tensach" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Tác giả</label>
                                        <input type="text" class="form-control" v-model="book.tacgia" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Đơn giá (VND)</label>
                                        <input type="number" class="form-control" v-model="book.dongia" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Số lượng</label>
                                        <input type="number" class="form-control" v-model="book.soquyen" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Năm xuất bản</label>
                                        <input type="number" class="form-control" v-model="book.namxuatban" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Nhà xuất bản</label>
                                        <input type="text" class="form-control" v-model="book.TenNXB" disabled/>
                                    </div>

                                    <!-- Nút hành động -->
                                    <div class="d-flex align-items-center mt-3" style="gap: 5px;">
                                        <button @click="updateBook" class="btn btn-success px-3">
                                            💾 Lưu thay đổi
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
import AdminNavbar from "@/components/AdminNavbar.vue";
import axios from "axios";

export default {
    components: {
        AdminNavbar,
    },
    data() {
        return {
            book: null,
            publishers: [] // Thêm dòng này
        };
    },
    async created() {
        await this.fetchBookDetail();
        await this.fetchPublishers();
    },
    methods: {
        async fetchBookDetail() {
            try {
                const bookId = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/admin/book_detail/${bookId}`);
                this.book = response.data;

                // Tìm nhà xuất bản phù hợp dựa trên tên (nếu cần)
                const matchedPublisher = this.publishers.find(p => p.TenNXB === this.book.TenNXB);
                if (matchedPublisher) {
                    this.book.manxb = matchedPublisher._id; // Gán _id của NXB vào book.manxb
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin sách:", error);
            }
        },
        async fetchPublishers() {
            try {
                const response = await axios.get("http://localhost:3000/admin/nha-xuat-ban");
                console.log("Dữ liệu nhà xuất bản:", response.data);
                this.publishers = response.data;
            } catch (error) {
                console.error("Lỗi khi lấy nhà xuất bản:", error);
            }
        },
        async updateBook() {
            try {
                const response = await axios.put(`http://localhost:3000/admin/update_book/${this.book._id}`, this.book);
                if (response.status === 200) {
                    alert("✅ Cập nhật sách thành công!");
                }
            } catch (error) {
                console.error("Lỗi khi cập nhật sách:", error);
                alert("⚠️ Lỗi khi cập nhật sách!");
            }
        }
    },
    computed: {
        selectedPublisher() {
            return this.publishers.find(p => p._id === this.book.manxb) || null;
        }
    }

};
</script>

<style scoped>
.container-fluid {
    padding: 20px;
}

.form-label {
    font-weight: bold;
}
</style>
