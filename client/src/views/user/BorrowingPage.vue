<template>
    <div class="layout d-flex justify-content-center align-items-center vh-100">
        <div class="card shadow-lg p-5" style="max-width: 900px; width: 100%;">
            <UserNavbar />
            <div class="card-body">
                <!-- Tiêu đề căn giữa -->
                <h2 class="mb-4 text-center text-primary">⏳ Sách Đang Mượn</h2>
            </div>
        </div>
    </div>
</template>
<script>
import UserNavbar from "@/components/UserNavbar.vue";
export default {
    components: {
        UserNavbar,
    },
}
</script>