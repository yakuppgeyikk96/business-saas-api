import { auth } from "@/middleware/auth";
import { checkBusinessUser } from "@/middleware/checkBusinessUser";
import { Router } from "express";
import organizationRoutes from "./organization.routes";
import productRoutes from "../common/product.routes";
import organizationMemberRoutes from "./organizationMember.routes";
import categoryRoutes from "../common/category.routes";

const router = Router();

router.use(auth);
router.use(checkBusinessUser);

const routes = [
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
  router.use(route.path, route.route);
});

export default router;
