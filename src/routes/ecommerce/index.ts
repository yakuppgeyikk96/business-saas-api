// routes/ecommerce/index.ts
import { Router } from "express";
import { auth } from "@/middleware/auth";
import productRoutes from "../common/product.routes";
import { checkIndividualUser } from "@/middleware/checkIndividualUser";

const router = Router();

router.use(auth, checkIndividualUser);

const routes = [
  {
    path: "/products",
    route: productRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
