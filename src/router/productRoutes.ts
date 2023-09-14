import productTest from "../pages/product/productTest";
import ProductListPage from "../pages/product/productListPage";
import ProductRegisterPage from "../pages/product/productRegisterPage";


const productRoutes = [
  {
    path: "/product-register",
    component: ProductRegisterPage,
  },
  {
    path: "/product-list",
    component: ProductListPage,
  },
  {
    path: "/userOnly/product-test",
    component: productTest,
  },


];

export default productRoutes;
