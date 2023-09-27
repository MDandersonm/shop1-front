import CheckoutPage from "../pages/shopping/checkoutPage";
import CartPage from "../pages/shopping/cartPage";
import PaymentSuccess from "../pages/shopping/paymentSuccess";
import OrderListPage from "../pages/shopping/orderListPage";
import OrderDetailPage from "../pages/shopping/orderDetailPage";

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
  {
    path: "/order-list",
    component: OrderListPage,
    allowedRoles: ["ROLE_ADMIN", "ROLE_USER"],
  },
  {
    path: "/order-detail",
    component: OrderDetailPage,
    allowedRoles: ["ROLE_ADMIN", "ROLE_USER"],
  },
  {
    path: "/payment/success",
    component: PaymentSuccess,
    allowedRoles: ["ROLE_ADMIN", "ROLE_USER"],
  },
];

export default shoppingRoutes;
