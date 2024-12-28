import authRoutes from "@/routes/business/auth.routes";
import businessRoutes from "@/routes/business";
import ecommerceRoutes from "@/routes/ecommerce";
import { Router } from "express";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/business",
    route: businessRoutes,
  },
  {
    path: "/ecommerce",
    route: ecommerceRoutes,
  },
];

routes.forEach((route) => {
  router.use(`/api${route.path}`, route.route);
});

export default router;
