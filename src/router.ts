import { createRouter, createWebHashHistory } from "vue-router";

const routes: any = [
  {
    name: "notFound",
    path: "/:path(.*)+",
    redirect: {
      name: "/main",
    },
  },
  {
    name: "/main",
    path: "/",
    component: () => import("./App.vue"),
  },
  {
    name: "/community",
    path: "/community",
    component: () => import("./view/community.vue"),
  },
  {
    name: "/lang",
    path: "/lang",
    component: () => import("./view/lang.vue"),
  },
  {
    name: "/update",
    path: "/update",
    component: () => import("./view/updateVip.vue"),
  },
  {
    name: "/share",
    path: "/share",
    component: () => import("./view/share.vue"),
  },
  {
    name: "/stack",
    path: "/stack",
    component: () => import("./view/stack.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
router.beforeEach((to, form, next) => {
  if (to.name === "/stack") {
    Object.hasOwnProperty.call(to.params, "coin") ? next() : next("/");
  }
    next();
});

export { router };
