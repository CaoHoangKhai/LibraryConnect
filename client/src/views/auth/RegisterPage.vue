<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow" style="width: 850px;">
            <h2 class="text-center mb-3">Đăng ký</h2>

            <Form @submit="register" :validation-schema="schema">
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Họ Lót</label>
                        <Field name="holot" v-model="registerData.holot" type="text" class="form-control"
                            placeholder="Nhập họ lót" />
                        <ErrorMessage name="holot" class="text-danger" />
                    </div>

                    <div class="mb-3 col-md-6">
                        <label class="form-label">Tên</label>
                        <Field name="ten" v-model="registerData.ten" type="text" class="form-control"
                            placeholder="Nhập tên" />
                        <ErrorMessage name="ten" class="text-danger" />
                    </div>
                </div>

                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Ngày sinh</label>
                        <Field name="ngaysinh" v-model="registerData.ngaysinh" type="date" class="form-control" />
                        <ErrorMessage name="ngaysinh" class="text-danger" />
                    </div>

                    <div class="mb-3 col-md-6">
                        <label class="form-label">Số điện thoại</label>
                        <Field name="dienthoai" v-model="registerData.dienthoai" type="tel" class="form-control"
                            placeholder="Nhập số điện thoại" />
                        <ErrorMessage name="dienthoai" class="text-danger" />
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Phái:</label>
                    <div class="d-flex align-items-center">
                        <Field name="phai" v-model="registerData.phai" as="select" class="d-none">
                            <option value="Nam"></option>
                            <option value="Nữ"></option>
                            <option value="Khác"></option>
                        </Field>

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="nam" value="Nam"
                                v-model="registerData.phai" />
                            <label class="form-check-label" for="nam">Nam</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="nu" value="Nữ"
                                v-model="registerData.phai" />
                            <label class="form-check-label" for="nu">Nữ</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="khac" value="Khác"
                                v-model="registerData.phai" />
                            <label class="form-check-label" for="khac">Khác</label>
                        </div>
                    </div>
                    <ErrorMessage name="phai" class="text-danger" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email:</label>
                    <Field name="email" v-model="registerData.email" type="text" class="form-control"
                        placeholder="Nhập email" />
                    <ErrorMessage name="email" class="text-danger" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Địa Chỉ:</label>
                    <Field name="diachi" v-model="registerData.diachi" type="text" class="form-control"
                        placeholder="Nhập địa chỉ" />
                    <ErrorMessage name="diachi" class="text-danger" />
                </div>

                <p class="text-center">
                    Bạn đã có tài khoản?
                    <router-link :to="{ name: 'login' }" class="text-primary">Đăng nhập</router-link>
                </p>

                <button class="btn btn-success w-100" type="submit" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    Đăng ký
                </button>

                <div v-if="errorMessage" class="alert alert-danger mt-3">
                    {{ errorMessage }}
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import AuthService from "@/services/auth.service";
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            registerData: {
                madocgia: "", // Mã độc giả sẽ được tạo tự động
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
            })
        };
    },
    methods: {
        // Loại bỏ dấu tiếng Việt và chuyển chữ thường
        removeVietnameseTones(str) {
            return str
                .normalize("NFD") // Tách dấu khỏi ký tự gốc
                .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
                .replace(/đ/g, "d").replace(/Đ/g, "d") // Chuyển đ → d, Đ → d
                .toLowerCase(); // Chuyển thành chữ thường
        },

        // Tạo mã độc giả (tên không dấu, chữ thường + ngày + tháng sinh)
        generateMadocgia() {
            if (this.registerData.ten && this.registerData.ngaysinh) {
                const date = new Date(this.registerData.ngaysinh);
                const month = String(date.getMonth() + 1).padStart(2, "0"); // 2 chữ số
                const day = String(date.getDate()).padStart(2, "0"); // 2 chữ số

                // Xử lý tên thành không dấu, chữ thường
                const tenKhongDau = this.removeVietnameseTones(this.registerData.ten);

                // Tạo mã độc giả
                this.registerData.madocgia = `${tenKhongDau}${day}${month}`;
            }
        },

        async register(values, { setErrors }) {
            this.isLoading = true;
            this.errorMessage = "";

            try {
                // Gọi hàm generateMadocgia() để tạo mã độc giả
                this.generateMadocgia();

                const requestData = {
                    ...this.registerData,
                    ngaysinh: this.registerData.ngaysinh
                        ? new Date(this.registerData.ngaysinh).toISOString().split('T')[0]
                        : null
                };

                await axios.post("http://localhost:3000/auth/register", requestData);
                alert("Đăng ký thành công!");
                this.$router.push({ name: "login" });
            } catch (error) {
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    this.errorMessage = error.response?.data?.message || "Đăng ký thất bại!";
                }
            } finally {
                this.isLoading = false;
            }
        }
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
