import productRoutes from "@/routes/product.routes";
import categoryRoutes from "@/routes/category.routes";
import authRoutes from "@/routes/auth.routes";
import organizationRoutes from "@/routes/organization.routes";
import organizationMemberRoutes from "@/routes/organizationMember.routes";
import { Router } from "express";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/organizations",
    route: organizationRoutes,
  },
  {
    path: "/organization-members",
    route: organizationMemberRoutes,
  },
];

routes.forEach((route) => {
  router.use(`/api${route.path}`, route.route);
});

export default router;
