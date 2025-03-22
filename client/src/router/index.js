import { createWebHistory, createRouter } from "vue-router";
import authRoutes from "./auth.router";
import userRoutes from "./user.router";
import adminRoutes from "./admin.router";

const routes = [
    {
        path: "/",
        redirect: "/auth/login", // Chuyển hướng mặc định đến /auth/login
    },
    {
        path: "/user",
        redirect: "/user/profile", // Chuyển hướng mặc định đến /auth/login
    },
    {
        path:"/admin",
        redirect: "admin/dashboard",
    },
    ...authRoutes,
    ...userRoutes,
    ...adminRoutes,
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/error/NotFound.vue"),
    },
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
