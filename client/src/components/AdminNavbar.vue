<template>
    <nav class="sidebar">
        <div class="sidebar-header">
            <router-link class="navbar-brand">📚 OnlineBookLoan</router-link>
        </div>

        <ul class="nav flex-column">
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'admin.dashboard' }">Trang Tổng Quan</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'admin.users' }">👥Dánh Sách Khách Hàng</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'admin.books' }">📚 Sách</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'admin.addbook' }">📚 Thêm Sách</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'admin.borrowed' }">📖 Sách Cho Mượn</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'admin.publisher' }">Nhà Xuất Bản</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'admin.profile' }">📖 Hồ Sơ Cá Nhân</router-link>
            </li>
            <li class="nav-item">
                <button class="btn btn-danger w-100 mt-3" @click="logout">🚪 Đăng Xuất</button>
            </li>

        </ul>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.removeItem("user");
            this.$router.push("/auth/login");
        }
    }
};
</script>

<style scoped>
/* Sidebar cố định bên trái */
.sidebar {
    width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #343a40;
    color: white;
    padding: 20px;
}

/* Tên website */
.sidebar-header {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

/* Navigation items */
.nav-link {
    color: white;
    padding: 10px;
    display: block;
    text-decoration: none;
    transition: 0.3s;
}

.nav-link:hover {
    background-color: #495057;
    border-radius: 5px;
}
</style>
