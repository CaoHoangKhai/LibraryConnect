<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow" style="width: 350px;">
            <h2 class="text-center mb-3">Đăng nhập</h2>

            <Form @submit="login" :validation-schema="schema">
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <Field name="email" v-model="loginData.email" type="email" class="form-control"
                        placeholder="Nhập email" required />
                    <ErrorMessage name="email" class="text-danger" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Số điện thoại</label>
                    <Field name="dienthoai" v-model="loginData.dienthoai" type="text" class="form-control"
                        placeholder="Nhập số điện thoại" required />
                    <ErrorMessage name="dienthoai" class="text-danger" />
                </div>
                <p class="text-center">
                    Bạn chưa có tài khoản?
                    <router-link :to="{ name:'register'}" class="text-primary">Đăng ký ngay</router-link>
                </p>


                <button class="btn btn-primary w-100" type="submit" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    Đăng nhập
                </button>

                <div v-if="errorMessage" class="alert alert-danger mt-3">
                    {{ errorMessage }}
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            loginData: {
                email: "",
                dienthoai: ""
            },
            errorMessage: "",
            isLoading: false,
            schema: yup.object().shape({
                email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
                dienthoai: yup.string().matches(/^\d+$/, "Số điện thoại không hợp lệ").required("Số điện thoại là bắt buộc")
            })
        };
    },
    methods: {
        async login(values, { resetForm }) {
            this.isLoading = true;
            this.errorMessage = "";
            try {
                const response = await axios.post("http://localhost:3000/auth/login", values);
                if (response.data && response.data.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    alert("Đăng nhập thành công!");
                    this.$router.push("/user/profile");
                } else {
                    throw new Error("Dữ liệu người dùng không hợp lệ!");
                }
            } catch (error) {
                if (error.response?.data?.message === "Email không tồn tại.") {
                    this.errorMessage = "Email không tồn tại trong hệ thống.";
                } else {
                    this.errorMessage = error.response?.data?.message || "Email hoặc số điện thoại không chính xác!";
                }
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>

<style scoped>
.card {
    border-radius: 10px;
}

.text-danger {
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>
