import CheckoutPage from "../pages/shopping/checkoutPage";
import CartPage from "../pages/shopping/cartPage";


const shoppingRoutes = [
  {
    path: "/cart",
    component: CartPage,
  },
  {
    path: "/checkout",
    component: CheckoutPage,
  },


];

export default shoppingRoutes;
