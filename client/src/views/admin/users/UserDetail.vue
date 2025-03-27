<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <AdminNavbar />
            </aside>

            <!-- Main Content -->
            <main class="col-md-9 col-lg-10 d-flex justify-content-center align-items-center vh-100">
                <div class="card p-4 shadow" style="width: 850px;">
                    <h2 class="text-center mb-3">👥 Thông Tin Độc Giả</h2>

                    <Form @submit="updateUser" :validation-schema="schema">
                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label class="form-label">Mã Độc Giả</label>
                                <Field name="madocgia" v-model="user.madocgia" type="text" class="form-control"
                                    disabled />
                            </div>

                            <div class="mb-3 col-md-6">
                                <label class="form-label">Họ Lót</label>
                                <Field name="holot" v-model="user.holot" type="text" class="form-control" />
                                <ErrorMessage name="holot" class="text-danger" />
                            </div>

                            <div class="mb-3 col-md-6">
                                <label class="form-label">Tên</label>
                                <Field name="ten" v-model="user.ten" type="text" class="form-control" />
                                <ErrorMessage name="ten" class="text-danger" />
                            </div>

                            <div class="mb-3 col-md-6">
                                <label class="form-label">Ngày sinh</label>
                                <Field name="ngaysinh" v-model="user.ngaysinh" type="date" class="form-control" />
                                <ErrorMessage name="ngaysinh" class="text-danger" />
                            </div>

                            <div class="mb-3 col-md-6">
                                <label class="form-label">Số điện thoại</label>
                                <Field name="dienthoai" v-model="user.dienthoai" type="tel" class="form-control" />
                                <ErrorMessage name="dienthoai" class="text-danger" />
                            </div>

                            <div class="mb-3 col-md-6">
                                <label class="form-label">Giới Tính</label>
                                <Field name="phai" v-model="user.phai" type="text" class="form-control" disabled />
                                <ErrorMessage name="phai" class="text-danger" />
                            </div>
                            
                            <div class="mb-3 col-md-6">
                                <label class="form-label">Địa Chỉ</label>
                                <Field name="diachi" v-model="user.diachi" type="text" class="form-control" />
                                <ErrorMessage name="diachi" class="text-danger" />
                            </div>

                            <div class="mb-3 col-md-6">
                                <label class="form-label">Email</label>
                                <Field name="email" v-model="user.email" type="email" class="form-control" />
                                <ErrorMessage name="email" class="text-danger" />
                            </div>
                        </div>



                        <button class="btn btn-success w-100" type="submit" :disabled="isLoading">
                            <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                            Cập nhật
                        </button>

                        <div v-if="errorMessage" class="alert alert-danger mt-3">
                            {{ errorMessage }}
                        </div>
                    </Form>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import AdminNavbar from "@/components/AdminNavbar.vue";
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    components: {
        AdminNavbar,
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            user: {
                madocgia: "",
                holot: "",
                ten: "",
                ngaysinh: null,
                dienthoai: "",
                phai: "",
                diachi: "",
                email: "",
            },
            isLoading: false,
            errorMessage: "",
            schema: yup.object().shape({
                holot: yup.string().required("Họ lót là bắt buộc"),
                ten: yup.string().required("Tên là bắt buộc"),
                ngaysinh: yup.date().nullable().required("Ngày sinh là bắt buộc"),
                dienthoai: yup.string()
                    .matches(/^\d+$/, "Số điện thoại không hợp lệ")
                    .required("Số điện thoại là bắt buộc"),
                phai: yup.string().required("Vui lòng chọn giới tính"),
                diachi: yup.string().required("Địa chỉ là bắt buộc"),
                email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
            }),
        };
    },
    async created() {
        await this.fetchUser();
    },
    methods: {
        async fetchUser() {
            try {
                const response = await axios.get(`http://localhost:3000/admin/user/${this.$route.params.madocgia}`);
                this.user = response.data;
            } catch (error) {
                this.errorMessage = "Không thể tải thông tin độc giả.";
            }
        },
        // async updateUser() {
        //     this.isLoading = true;
        //     this.errorMessage = "";

        //     try {
        //         await axios.put(`http://localhost:3000/admin/user/${this.user.madocgia}`, this.user);
        //         alert("Cập nhật thành công!");
        //     } catch (error) {
        //         this.errorMessage = "Cập nhật thất bại!";
        //     } finally {
        //         this.isLoading = false;
        //     }
        // }
    }
};
</script>

<style scoped>
.text-danger {
    font-size: 14px;
    margin-top: 4px;
}

.form-check-input {
    margin-right: 5px;
}
</style>
