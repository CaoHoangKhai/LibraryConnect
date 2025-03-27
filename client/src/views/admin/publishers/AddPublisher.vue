<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <AdminNavbar />
            </aside>
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary">🏢 Thêm Nhà Xuất Bản</h2>
                </div>

                <!-- Card chứa Form -->
                <div class="card shadow-lg">
                    <div class="card-body">
                        <h5 class="card-title text-center text-primary">Thông Tin Nhà Xuất Bản</h5>
                        <Form @submit="addPublisher" :validation-schema="schema">
                            <div class="mb-3">
                                <label class="form-label">Tên Nhà Xuất Bản</label>
                                <Field name="TenNXB" v-model="publisherData.TenNXB" type="text" class="form-control"
                                    placeholder="Nhập tên nhà xuất bản" />
                                <ErrorMessage name="TenNXB" class="text-danger" />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Địa Chỉ</label>
                                <Field name="DiaChi" v-model="publisherData.DiaChi" type="text" class="form-control"
                                    placeholder="Nhập địa chỉ" />
                                <ErrorMessage name="DiaChi" class="text-danger" />
                            </div>

                            <button class="btn btn-success w-100" type="submit" :disabled="isLoading">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                                Thêm Nhà Xuất Bản
                            </button>

                            <div v-if="successMessage" class="alert alert-success mt-3">
                                {{ successMessage }}
                            </div>
                            <div v-if="errorMessage" class="alert alert-danger mt-3">
                                {{ errorMessage }}
                            </div>
                        </Form>
                    </div>
                </div>
                <!-- End Card -->
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
            publisherData: {
                TenNXB: "",
                DiaChi: "",
            },
            isLoading: false,
            successMessage: "",
            errorMessage: "",
            schema: yup.object().shape({
                TenNXB: yup.string().required("Tên Nhà Xuất Bản không được để trống"),
                DiaChi: yup.string().required("Địa chỉ không được để trống"),
            }),
        };
    },
    methods: {
        async addPublisher() {
            this.isLoading = true;
            this.successMessage = "";
            this.errorMessage = "";

            // Tạo maxb bằng UUID thay vì timestamp
            const newPublisher = {
                maxb: crypto.randomUUID(), // Tạo mã duy nhất
                TenNXB: this.publisherData.TenNXB.trim(),
                DiaChi: this.publisherData.DiaChi.trim()
            };

            try {
                const response = await axios.post("http://localhost:3000/admin/them-nha-xuat-ban", newPublisher);
                this.successMessage = response.data.message || "Nhà Xuất Bản đã được thêm thành công!";

                // Reset form
                this.publisherData.TenNXB = "";
                this.publisherData.DiaChi = "";
            } catch (error) {
                this.errorMessage = error.response?.data?.message || "Lỗi khi thêm Nhà Xuất Bản!";
            } finally {
                this.isLoading = false;
            }
        },
    },

};
</script>

<style scoped>
.card {
    max-width: 600px;
    margin: auto;
}
</style>
