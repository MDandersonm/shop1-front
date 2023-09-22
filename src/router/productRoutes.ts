import productTest from "../pages/product/productTest";
import ProductListPage from "../pages/product/productListPage";
import ProductRegisterPage from "../pages/product/productRegisterPage";
import ProductDetailPage from "../pages/product/productDetailPage";
import ProductUpdatePage from "../pages/product/productUpdatePage";
import WishListPage from "../pages/product/wishListPage";

// allowedRoles: ['user', 'admin'] // 회원 및 관리자 접근 가능

const productRoutes = [
  {
    path: "/product-register",
    component: ProductRegisterPage,
    allowedRoles: ['ROLE_ADMIN'] // 관리자만 접근 가능
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
    allowedRoles: ['ROLE_ADMIN'] // 관리자만 접근 가능
  },
  {
    path: "/userOnly/product-test",
    component: productTest,
  },
  {
    path: "/wishlist",
    component: WishListPage,
    allowedRoles: ['ROLE_ADMIN' , 'ROLE_USER']
  },


];

export default productRoutes;
