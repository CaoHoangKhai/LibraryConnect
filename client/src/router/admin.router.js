const adminRoutes = [
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
    {
        path: "/admin/dashboard",
        name: "admin.dashboard",
        component: () => import("@/views/admin/Dashboard.vue"),
    },
    {
        path: "/admin/users",
        name: "admin.users",
        component: () => import("@/views/admin/UsersList.vue"),
    },
    {
        path: "/admin/add-book",
        name: "admin.addbook",
        component: () => import("@/views/admin/AddBook.vue"),
    },
    {
        path: "/admin/books",
        name: "admin.books",
        component: () => import("@/views/admin/Dashboard.vue"),
    },
    {
        path: "/admin/borrowed",
        name: "admin.borrowed",
        component: () => import("@/views/admin/Dashboard.vue"),
    },
    {
        path: "/admin/profile",
        name: "admin.profile",
        component: () => import("@/views/admin/Dashboard.vue"),
    },
    {
        path: "/admin/publisher",
        name: "admin.publisher",
        component: () => import("@/views/admin/PublisherList.vue"),
    }
];

export default adminRoutes;
