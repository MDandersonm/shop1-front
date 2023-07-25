import productTest from "../pages/product/productTest";
import ProductListPage from "../pages/product/productListPage";


const productRoutes = [
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
