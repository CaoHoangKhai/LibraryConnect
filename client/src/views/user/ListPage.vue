<!-- <template>
    <div class="container">
        <UserNavbar />
        <div class="content">
            <div class="card-body">
                <h2 class="mb-4 text-primary">📚 Sách</h2>
            </div>
        </div>
    </div>
</template> -->

<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-md-3 col-lg-2 bg-light position-sticky top-0 vh-100">
                <UserNavbar />
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
import UserNavbar from "@/components/UserNavbar.vue";
export default {
    components: {
        UserNavbar,
    },
}
</script>

<style scoped>
</style>