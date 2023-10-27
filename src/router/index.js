import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home";
import PictureDetails from "@/pages/PictureDetails";
import Favorites from "@/pages/Favorites";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/picture/:id",
    component: PictureDetails,
  },
  {
    path: "/favorites",
    component: Favorites,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
