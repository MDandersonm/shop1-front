import React ,{useEffect}from "react";
import ProductListForm from "../../components/product/productListForm";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { fetchProducts } from "../../redux/product/productActions";
import { RootState } from "@/index";
import { useSelector } from "react-redux";
// import ProductListForm from "@/components/product/productListForm";

const ProductListPage: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mt-5">
    <ProductListForm products={products} ></ProductListForm>
    </div>
  );
};

export default ProductListPage;
