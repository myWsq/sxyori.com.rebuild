import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home/Home.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                noAuth: true
            }
        },
        {
            path: "/dashboard",
            name: "dashboard",
            meta: {
                auth: true
            },
            component: () => import("./views/Dashboard/Dashboard.vue"),
            redirect: "/dashboard/teachers",
            children: [
                {
                    path: "teachers",
                    name: "dashboard-teachers",
                    component: () =>
                        import("./views/Dashboard/Teachers/Teachers.vue")
                },
                {
                    path: "courses",
                    name: "dashboard-course",
                    component: () =>
                        import("./views/Dashboard/Course/Course.vue")
                },
                {
                    path: "announcements",
                    name: "dashboard-announcements",
                    component: () =>
                        import(
                            "./views/Dashboard/Announcement/Announcement.vue"
                        )
                },
                {
                    path: "chat",
                    name: "dashboard-chat",
                    component: () => import("./views/Dashboard/Chat/Chat.vue")
                },
                {
                    path: "users",
                    name: "dashboard-users",
                    component: () => import("./views/Dashboard/Users/Users.vue")
                }
            ]
        },
        {
            path: "/403",
            name: "403",
            component: () => import("./views/403.vue")
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(item => item.meta.auth)) {
        if (store.state.me) {
            next();
        } else {
            try {
                await store.dispatch("getMe");
                if (store.state.me) {
                    next();
                } else {
                    next("/");
                }
            } catch (e) {
                next("/");
            }
        }
    } else if (to.matched.some(item => item.meta.noAuth)) {
        if (store.state.me) {
            next("/dashboard");
        } else {
            try {
                await store.dispatch("getMe");
                next("/dashboard");
            } catch (e) {
                next();
            }
        }
    } else {
        next();
    }
});

export default router;
