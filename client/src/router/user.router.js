const userRoutes = [
    // Hồ sơ cá nhân
    {
        path: "/user/profile",
        name: "user.profile",
        component: () => import("@/views/user/Info/ProfilePage.vue"),
    },
    // Sách đã mượn
    {
        path: "/user/borrowed",
        name: "user.borrowed",
        component: () => import("@/views/user/Info/BorrowedPage.vue"),
    },
    // Danh sách sách
    {
        path: "/user/books",
        name: "user.books",
        component: () => import("@/views/user/book/ListPage.vue"),
    },
    {
        path: "/user/book_detail/:id",
        name: "user.book_detail",
        component: () => import("@/views/user/book/BookDetail.vue"),
    },
    // Sách Đang Mượn
    {
        path: "/user/borrowing",
        name: "user.borrowing",
        component: () => import("@/views/user/borrow/BorrowingPage.vue"),
    },
    {
        path: "/user/returned",
        name: "user.borrowed",
        component: () => import("@/views/user/borrow/ReturnedPage.vue"),
    },

];

export default userRoutes;