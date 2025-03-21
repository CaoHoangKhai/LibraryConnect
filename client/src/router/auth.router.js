const authRoutes = [
    {
        path: "/auth/login",
        name: "login",
        component: () => import("@/views/auth/LoginPage.vue"),
    },
    {
        path: "/auth/register",
        name: "register",
        component: () => import("@/views/auth/RegisterPage.vue"),
    },
];

export default authRoutes;
