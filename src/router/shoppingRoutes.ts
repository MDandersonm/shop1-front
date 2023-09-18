import CheckoutPage from "../pages/shopping/checkoutPage";
import CartPage from "../pages/shopping/cartPage";

const shoppingRoutes = [
  {
    path: "/cart",
    component: CartPage,
    allowedRoles: ["ROLE_ADMIN", "ROLE_USER"],
  },
  {
    path: "/checkout",
    component: CheckoutPage,
    allowedRoles: ["ROLE_ADMIN", "ROLE_USER"],
  },
];

export default shoppingRoutes;
