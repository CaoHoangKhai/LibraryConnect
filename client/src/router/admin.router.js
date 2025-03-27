const adminRoutes = [
    // Xác thực (Authentication)
    {
        path: "/admin/login",
        name: "admin.login",
        component: () => import("@/views/admin/LoginAdmin.vue"),
    },
    {
        path: "/admin/register",
        name: "admin.register",
        component: () => import("@/views/admin/RegisterAdmin.vue"),
    },
    
    // Dashboard & Hồ sơ
    {
        path: "/admin/dashboard",
        name: "admin.dashboard",
        component: () => import("@/views/admin/Dashboard.vue"),
    },
    // {
    //     path: "/admin/profile",
    //     name: "admin.profile",
    //     component: () => import("@/views/admin/Dashboard.vue"),
    // },
    
    // Quản lý người dùng
    {
        path: "/admin/add-user",
        name: "admin.adduser",
        component: () => import("@/views/admin/users/AddUser.vue"),
    },
    {
        path: "/admin/users",
        name: "admin.users",
        component: () => import("@/views/admin/users/UsersList.vue"),
    },
    {
        path: "/admin/user/:madocgia",
        name: "admin.UserDetail",
        component: () => import("@/views/admin/users/UserDetail.vue"),
    },
    
    // Quản lý sách
    {
        path: "/admin/add-book",
        name: "admin.addbook",
        component: () => import("@/views/admin/books/AddBook.vue"),
    },
    {
        path: "/admin/books",
        name: "admin.books",
        component: () => import("@/views/admin/books/BooksList.vue"),
    },
    {
        path: "/admin/book_detail/:id",
        name: "admin.bookdetail",
        component: () => import("@/views/admin/books/BookDetail.vue"),
    },
    {
        path: "/admin/borrowed",
        name: "admin.borrowed",
        component: () => import("@/views/admin/borrow/BorrowedPage.vue"),
    },
    {
        path: "/admin/returned_list",
        name: "admin.returned_list",
        component: () => import("@/views/admin/borrow/ReturnedList.vue"),
    },
    
    // Quản lý nhà xuất bản
    {
        path: "/admin/publishers",
        name: "admin.publishers",
        component: () => import("@/views/admin/publishers/PublisherList.vue"),
    },
    {
        path: "/admin/add-publisher",
        name: "admin.addpublisher",
        component: () => import("@/views/admin/publishers/AddPublisher.vue"),
    },
];

export default adminRoutes;