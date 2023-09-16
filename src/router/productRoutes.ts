import productTest from "../pages/product/productTest";
import ProductListPage from "../pages/product/productListPage";
import ProductRegisterPage from "../pages/product/productRegisterPage";
import ProductDetailPage from "../pages/product/productDetailPage";
import ProductUpdatePage from "../pages/product/productUpdatePage";



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
    path: "/product-detail/:id",
    component: ProductDetailPage,
  },
  {
    path: "/product-update/:id",
    component: ProductUpdatePage,
  },
  {
    path: "/userOnly/product-test",
    component: productTest,
  },


];

export default productRoutes;
