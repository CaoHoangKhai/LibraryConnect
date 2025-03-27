<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 ">
                <AdminNavbar />
            </aside>

            <!-- Main Content -->
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary">📚 Thêm Sách</h2>
                </div>

                <!-- Card bao form -->
                <div class="card shadow">
                    <div class="card-body">
                        <!-- Form -->
                        <Form @submit="createBook" :validation-schema="schema">
                            <!-- Hàng 1 -->
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Mã Sách</label>
                                    <Field name="masach" v-model="bookData.masach" type="text" class="form-control"
                                        placeholder="Nhập mã sách" disabled />
                                    <ErrorMessage name="masach" class="text-danger" />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Tên Sách</label>
                                    <Field name="tensach" v-model="bookData.tensach" type="text" class="form-control"
                                        placeholder="Nhập tên sách" />
                                    <ErrorMessage name="tensach" class="text-danger" />
                                </div>
                            </div>

                            <!-- Hàng 2 -->
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Đơn Giá</label>
                                    <Field name="dongia" v-model="bookData.dongia" type="number" class="form-control"
                                        placeholder="Nhập giá sách" />
                                    <ErrorMessage name="dongia" class="text-danger" />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Số Quyển</label>
                                    <Field name="soquyen" v-model="bookData.soquyen" type="number" class="form-control"
                                        placeholder="Nhập số lượng" />
                                    <ErrorMessage name="soquyen" class="text-danger" />
                                </div>
                            </div>

                            <!-- Hàng 3 -->
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Năm Xuất Bản</label>
                                    <Field name="namxuatban" v-model="bookData.namxuatban" type="number"
                                        class="form-control" placeholder="Nhập năm xuất bản" />
                                    <ErrorMessage name="namxuatban" class="text-danger" />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <Field name="manxb" as="select" v-model="bookData.manxb" class="form-control">
                                        <option value="" disabled>Chọn nhà xuất bản</option>
                                        <option v-for="publisher in publishers" :key="publisher._id"
                                            :value="publisher.manxb">
                                            {{ publisher.TenNXB }}
                                        </option>
                                    </Field>
                                    <ErrorMessage name="manxb" class="text-danger" />
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Tác Giả</label>
                                <Field name="tacgia" v-model="bookData.tacgia" type="text" class="form-control"
                                    placeholder="Nhập tên tác giả" />
                                <ErrorMessage name="tacgia" class="text-danger" />
                            </div>
                            <!-- Nút Thêm Sách -->
                            <button class="btn btn-primary w-100" type="submit" :disabled="isLoading">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                                Thêm Sách
                            </button>

                            <!-- Hiển thị lỗi -->
                            <div v-if="errorMessage" class="alert alert-danger mt-3">
                                {{ errorMessage }}
                            </div>
                        </Form>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import AdminNavbar from "@/components/AdminNavbar.vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";

export default {
    components: {
        AdminNavbar,
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            bookData: {
                masach: "", // Sẽ được tự động tạo
                tensach: "",
                dongia: null,
                soquyen: null,
                namxuatban: null,
                manxb: "",
                tacgia: "",
            },
            publishers: [],
            errorMessage: "",
            isLoading: false,
            schema: yup.object().shape({
                tensach: yup.string().required("Vui lòng nhập tên sách."),
                dongia: yup.number().positive("Giá phải lớn hơn 0").required("Vui lòng nhập giá."),
                soquyen: yup.number().min(1, "Số quyển phải ít nhất là 1").required("Vui lòng nhập số lượng."),
                namxuatban: yup.string()
                    .matches(/^\d{4}$/, "Năm không hợp lệ, phải có đúng 4 chữ số")
                    .test(
                        "is-valid-year",
                        "Năm không hợp lệ, phải từ 1900 đến năm hiện tại",
                        value => {
                            const year = parseInt(value, 10);
                            return year >= 1900 && year <= new Date().getFullYear();
                        }
                    )
                    .required("Vui lòng nhập năm xuất bản."),
                manxb: yup.string().required("Vui lòng chọn nhà xuất bản."),
                tacgia: yup.string().required("Vui lòng nhập tên tác giả."),
            }),
        };
    },
    methods: {
        async fetchPublishers() {
            try {
                const response = await axios.get("http://localhost:3000/admin/nha-xuat-ban");
                console.log("Dữ liệu nhà xuất bản:", response.data);
                this.publishers = response.data;
            } catch (error) {
                console.error("Lỗi khi lấy nhà xuất bản:", error);
            }
        },

        generateBookCode() {
            const now = new Date();
            const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;
            const formattedTime = `${now.getHours().toString().padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;

            this.bookData.masach = `BOOK-${formattedDate}-${formattedTime}`;
        },

        async createBook(values) {
            this.isLoading = true;
            this.errorMessage = "";

            console.log("📤 Dữ liệu gửi lên API:", values); // Kiểm tra dữ liệu

            try {
                const response = await axios.post("http://localhost:3000/admin/add-book", values, {
                    headers: { "Content-Type": "application/json" }
                });

                console.log("✅ Kết quả từ server:", response.data);

                if (response.data.bookId) {
                    alert("✅ Thêm sách thành công!");
                    this.bookData = { masach: "", tensach: "", dongia: null, soquyen: null, namxuatban: null, manxb: "", tacgia: "" };
                    this.generateBookCode();
                } else {
                    this.errorMessage = response.data.message || "⚠️ Lỗi không xác định!";
                }
            } catch (error) {
                console.error("❌ Lỗi API:", error.response?.data || error);
                this.errorMessage = error.response?.data?.message || "⚠️ Lỗi khi thêm sách!";
            } finally {
                this.isLoading = false;
            }
        }

    },
    async mounted() {
        await this.fetchPublishers();
        this.generateBookCode(); // Tạo mã sách tự động khi mở form
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
