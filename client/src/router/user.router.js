const userRoutes = [
    // Hồ sơ cá nhân
    {
        path: "/user/profile",
        name: "user.profile",
        component: () => import("@/views/user/ProfilePage.vue"),
    },
    // Sách đã mượn
    {
        path: "/user/borrowed",
        name: "user.borrowed",
        component: () => import("@/views/user/BorrowedPage.vue"),
    },
    // Danh sách sách
    {
        path: "/user/books",
        name: "user.books",
        component: () => import("@/views/user/ListPage.vue"),
    },
    // Sách yêu thích
    {
        path: "/user/favorite",
        name: "user.favorite",
        component: () => import("@/views/user/FavoritePage.vue"),
    },
    // Sách Đang Mượn
    {
        path: "/user/borrowing",
        name: "user.borrowing",
        component: () => import("@/views/user/BorrowingPage.vue"),
    },

];

export default userRoutes;