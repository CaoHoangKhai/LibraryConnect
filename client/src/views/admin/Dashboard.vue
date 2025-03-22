<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <AdminNavbar />
            </aside>
            <main class="col-md-9 col-lg-10 px-md-4">
                <div class="mt-3">
                    <h2 class="mb-4 text-primary">📚 Sách</h2>
                </div>
            </main>
        </div>
    </div>
</template>
<script>
import AdminNavbar from "@/components/AdminNavbar.vue";
export default {
    components: {
        AdminNavbar,
    },
}
</script>

<style scoped>
</style>