import React, { useEffect }  from "react";
import ProductListForm from "../../components/product/productListForm";
import { useDispatch } from "react-redux";
import { fetchWishlistProducts } from "../../redux/product/productActions";
import { Dispatch } from "redux";
import { useSelector } from "react-redux";
import { RootState } from "@/index";


const WishListPage: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    console.log("wishListpage rendering")
    console.log("user?.id",user?.id)
    if (user?.id) {
        dispatch(fetchWishlistProducts(user.id));
      }
  }, [dispatch,user?.id]);

  return (
    <div className="container mt-5">
    <ProductListForm products={products} ></ProductListForm>
    </div>
  );
};

export default WishListPage;
