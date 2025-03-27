<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <AdminNavbar />
            </aside>
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="container text-center">
                    <br>
                </div>
                <div class="container">
                    <div class="row g-2">
                        <!-- Tổng số người dùng -->
                        <div class="col-3">
                            <div
                                class="p-3 border bg-info d-flex justify-content-between align-items-center text-white">
                                <div class="fs-5">
                                    <div class="fs-3">{{ totalUsers }}</div>
                                    <div>Người dùng</div>
                                </div>
                                <div class="text-right">
                                    <i class="fas fa-user fa-5x"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Tổng số sách -->
                        <div class="col-3">
                            <div
                                class="p-3 border bg-success d-flex justify-content-between align-items-center text-white">
                                <div class="fs-5">
                                    <div class="fs-3">{{ totalBooks }}</div>
                                    <div>Sách</div>
                                </div>
                                <div class="text-right">
                                    <i class="fas fa-book fa-5x"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Sách đang được mượn -->
                        <div class="col-3">
                            <div
                                class="p-3 border bg-warning d-flex justify-content-between align-items-center text-white">
                                <div class="fs-5">
                                    <div class="fs-3">{{ totalBorrowedBooks }}</div>
                                    <div>Sách đang mượn</div>
                                </div>
                                <div class="text-right">
                                    <i class="fas fa-book-reader fa-5x"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Sách trả muộn -->
                        <div class="col-3">
                            <div
                                class="p-3 border bg-danger d-flex justify-content-between align-items-center text-white">
                                <div class="fs-5">
                                    <div class="fs-3">{{ totalOverdueBooks }}</div>
                                    <div>Sách trả muộn</div>
                                </div>
                                <div class="text-right">
                                    <i class="fas fa-exclamation-triangle fa-5x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import AdminNavbar from "@/components/AdminNavbar.vue";

export default {
    components: {
        AdminNavbar,
    },
    data() {
        return {
            totalUsers: 0,
            totalBooks: 0,
            totalBorrowedBooks: 0,
            totalOverdueBooks: 0
        };
    },
    mounted() {
        this.fetchStatistics();
    },
    methods: {
        async fetchStatistics() {
            try {
                const response = await axios.get("http://localhost:3000/admin/dashboard");
                this.totalUsers = response.data.totalUsers;
                this.totalBooks = response.data.totalBooks;
                this.totalBorrowedBooks = response.data.totalBorrowedBooks;
                this.totalOverdueBooks = response.data.totalOverdueBooks;
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
            }
        }
    }
};
</script>

<style scoped>
.text-right {
    margin-right: 20px;
}
</style>
