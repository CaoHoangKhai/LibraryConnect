const userRoutes = [
    {
        path: "/user/profile",
        name: "profile",
        component: () => import("@/views/user/ProfilePage.vue"),
    },
    // {
    //     path: "/user/register",
    //     name: "register",
    //     component: () => import("@/views/user/RegisterPage.vue"),
    // },
];

export default userRoutes;