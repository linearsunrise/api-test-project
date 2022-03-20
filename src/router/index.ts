import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import PostsView from "../views/PostsView.vue";
import PostView from "../views/PostView.vue";
import UserView from "../views/UserView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/posts",
    name: "home",
    component: PostsView,
    meta: {
      title: "Посты",
    },
  },
  {
    path: "/posts/:postId",
    name: "posts",
    component: PostView,
    meta: {
      title: "Пост пользователя",
    },
  },
  {
    path: "/users/:userId",
    name: "users",
    component: UserView,
    meta: {
      title: "Пользователь",
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
