import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import Book from "@/views/Book.vue";
import store from "@/store/index";

Vue.use(VueRouter);

const checkAuth = (to: Route, from: Route, next: NavigationGuardNext) => {
    if (store.state.user) {
        next();
    } else {
        next("/login");
    }
};

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter: checkAuth,
    },
    {
        path: "/book/:id",
        name: "BookDetail",
        component: Book,
        beforeEnter: checkAuth,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
