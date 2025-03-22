<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow" style="width: 350px;">
            <h2 class="text-center mb-3">Đăng nhập Admin</h2>

            <Form @submit="login" :validation-schema="schema">
                <div class="mb-3">
                    <label class="form-label">Số điện thoại</label>
                    <Field name="sodienthoai" v-model="loginAdminData.sodienthoai" type="text" class="form-control"
                        placeholder="Nhập số điện thoại" />
                    <ErrorMessage name="sodienthoai" class="text-danger" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Mật khẩu</label>
                    <Field name="password" v-model="loginAdminData.password" type="password" class="form-control"
                        placeholder="Nhập mật khẩu" />
                    <ErrorMessage name="password" class="text-danger" />
                </div>

                <button class="btn btn-primary w-100" type="submit" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span> Đăng nhập
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
            loginAdminData: {
                sodienthoai: "",
                password: "",
            },
            errorMessage: "",
            isLoading: false,
            schema: yup.object().shape({
                sodienthoai: yup
                    .string()
                    .matches(/^\d+$/, "Số điện thoại không hợp lệ")
                    .required("Vui lòng nhập số điện thoại."),
                password: yup.string().required("Vui lòng nhập mật khẩu."),
            }),
        };
    },
    methods: {
        async login(values) {
            this.isLoading = true;
            this.errorMessage = "";
            try {
                const { data } = await axios.post("http://localhost:3000/admin/login", values);

                if (data && data.admin) {
                    localStorage.setItem("admin", JSON.stringify(data.admin));
                    alert("Đăng nhập thành công!");
                    this.$router.push({ name: "admin.dashboard" });
                } else {
                    throw new Error("Thông tin đăng nhập không hợp lệ!");
                }
            } catch (error) {
                this.errorMessage =
                    error.response?.data?.message || "Số điện thoại hoặc mật khẩu không chính xác!";
            } finally {
                this.isLoading = false;
            }
        },
    },
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
