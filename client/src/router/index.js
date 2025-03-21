import { createWebHistory, createRouter } from "vue-router";
import authRoutes from "./auth.router";
// import adminRoutes from "./admin";
import userRoutes from "./user.router";

const routes = [
    ...authRoutes,
    // ...adminRoutes,
    ...userRoutes,
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
