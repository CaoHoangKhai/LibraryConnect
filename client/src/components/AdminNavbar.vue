<template>
    <nav class="sidebar">
        <div class="sidebar-header">
            <router-link class="navbar-brand" :to="{ name: 'admin.dashboard' }">📚 OnlineBookLoan</router-link>
        </div>

        <ul class="nav flex-column">
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'admin.dashboard' }">🏠 Trang Tổng Quan</router-link>
            </li>

            <!-- Quản lý Khách Hàng -->
            <li class="nav-item">
                <button class="nav-link toggle-btn" @click="toggleUsers">
                    👥 Quản lý Khách Hàng
                </button>
                <ul v-show="isUsersOpen" class="sub-menu">
                    <li>
                        <router-link class="nav-link sub-item" :to="{ name: 'admin.users' }">
                            📖 Danh Sách Khách
                        </router-link>
                    </li>
                    <li>
                        <router-link class="nav-link sub-item" :to="{ name: 'admin.adduser' }">
                            ➕ Thêm Khách Hàng
                        </router-link>
                    </li>
                </ul>
            </li>

            <!-- Quản lý Sách -->
            <li class="nav-item">
                <button class="nav-link toggle-btn" @click="toggleBooks">
                    📚 Quản lý Sách
                </button>
                <ul v-show="isBooksOpen" class="sub-menu">
                    <li><router-link class="nav-link sub-item" :to="{ name: 'admin.books' }">
                            📖 Danh Sách Sách
                        </router-link>
                    </li>
                    <li>
                        <router-link class="nav-link sub-item" :to="{ name: 'admin.addbook' }">
                            ➕ Thêm Sách
                        </router-link>
                    </li>
                </ul>
            </li>

            <!-- Sách Cho Mượn -->
            <li class="nav-item">
                <button class="nav-link toggle-btn" @click="toggleBorrowed">
                    📖 Quản lý Sách Cho Mượn
                </button>
                <ul v-show="isBorrowedOpen" class="sub-menu">
                    <li><router-link class="nav-link sub-item" :to="{ name: 'admin.borrowed' }">
                            📖 Danh Sách Sách Mượn
                        </router-link>
                    </li>
                    <!-- <li><router-link class="nav-link sub-item" :to="{ name: 'admin.borrowed-late' }">
                            📖 Danh Sách Sách Mượn Bị Trễ
                        </router-link>
                    </li> -->
                    <li><router-link class="nav-link sub-item" :to="{ name: 'admin.returned_list' }">
                            📖 Danh Sách Sách Đã Mượn
                        </router-link>
                    </li>
                </ul>
            </li>


            <!-- Quản lý Nhà Xuất Bản -->
            <li class="nav-item">
                <button class="nav-link toggle-btn" @click="togglePublishers">
                    🏢 Quản lý Nhà Xuất Bản
                </button>
                <ul v-show="isPublishersOpen" class="sub-menu">
                    <li><router-link class="nav-link sub-item" :to="{ name: 'admin.publishers' }">
                            🏢 Danh Sách Nhà XB
                        </router-link>
                    </li>
                    <li><router-link class="nav-link sub-item" :to="{ name: 'admin.addpublisher' }">
                            ➕ Thêm Nhà XB
                        </router-link>
                    </li>
                </ul>
            </li>

            <li class="nav-item">
                <button class="btn btn-danger w-100 mt-3" @click="logout">🚪 Đăng Xuất</button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isUsersOpen: JSON.parse(localStorage.getItem("isUsersOpen")) || false,
            isBooksOpen: JSON.parse(localStorage.getItem("isBooksOpen")) || false,
            isPublishersOpen: JSON.parse(localStorage.getItem("isPublishersOpen")) || false,
            isBorrowedOpen: JSON.parse(localStorage.getItem("isBorrowedOpen")) || false,
        };
    },
    methods: {
        toggleUsers() {
            this.isUsersOpen = !this.isUsersOpen;
            localStorage.setItem("isUsersOpen", JSON.stringify(this.isUsersOpen));
        },
        toggleBooks() {
            this.isBooksOpen = !this.isBooksOpen;
            localStorage.setItem("isBooksOpen", JSON.stringify(this.isBooksOpen));
        },
        toggleBorrowed() {
            this.isBorrowedOpen = !this.isBorrowedOpen;
            localStorage.setItem("isBorrowedOpen", JSON.stringify(this.isBorrowedOpen));
        },
        togglePublishers() {
            this.isPublishersOpen = !this.isPublishersOpen;
            localStorage.setItem("isPublishersOpen", JSON.stringify(this.isPublishersOpen));
        },
        logout() {
            localStorage.removeItem("user");
            this.$router.push("/auth/login");
        }
    }
};
</script>

<style scoped>
/* Sidebar */
.sidebar {
    width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #343a40;
    color: white;
    padding: 5px;
}

.sidebar-header {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

.nav-link {
    color: white;
    padding: 10px;
    display: flex;
    /* Sử dụng flexbox */
    align-items: center;
    /* Căn giữa nội dung */
    text-decoration: none;
    transition: 0.3s;
    cursor: pointer;
    border: none;
    background: none;
    text-align: left;
    width: 100%;
    white-space: nowrap;
    /* Giữ text trên một hàng */
    overflow: hidden;
    /* Ẩn phần bị tràn */
    text-overflow: ellipsis;
    /* Hiển thị dấu "..." nếu text quá dài */
}

.sub-item {
    font-size: 14px;
    opacity: 0.8;
    white-space: nowrap;
    /* Giữ text trên một hàng */
    overflow: hidden;
    text-overflow: ellipsis;
}


.nav-link:hover {
    background-color: #495057;
    border-radius: 5px;
}

/* Nút mở menu con */
.nav-link, .toggle-btn {
    font-size: 14px;
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;
}


/* Sub-menu (mục con) */
.sub-menu {
    list-style: none;
    padding-left: 20px;
    margin-top: 5px;
}

</style>
