import productRoutes from "@/routes/product.routes";
import categoryRoutes from "@/routes/category.routes";
import { Router } from "express";

const router = Router();

const routes = [
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
];

routes.forEach((route) => {
  router.use(`/api${route.path}`, route.route);
});

export default router;
