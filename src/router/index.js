import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  base: "/",
  linkActiveClass: "link--active",
  linkExactActiveClass: "link--active",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/Sensors",
      name: "Sensors",
      component: () => import("../views/SensorsView.vue"),
    },
    {
      path: "/Sensor/:id",
      name: "Sensor",
      props: true,
      component: () => import("../views/SensorView.vue"),
    },
    {
      path: "/collaborators",
      name: "collaborators",
      component: () => import("../views/CollaboratorsView.vue"),
    },
    {
      path: "/collaborator/:id",
      name: "collaborator",
      props: true,
      component: () => import("../views/CollaboratorView.vue"),
    },
    {
      path: "/map",
      name: "map",
      component: () => import("../views/MapView.vue"),
    },
    {
      path: "/geomap",
      name: "geomap",
      component: () => import("../views/GeoMapView.vue"),
    },
    {
      path: "/comming",
      name: "comming",
      component: () => import("../views/CommingView.vue"),
    },
  ],
});

export default router;
