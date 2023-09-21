import Reactm, { useEffect, Dispatch } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel 스타일을 적용하기 위한 CSS 파일
import "./mainPage.css";
import { useSelector, useDispatch } from "react-redux";
import ProductCarousel from "../../components/main/ProductCarousel"; // 새로운 컴포넌트를 임포트 합니다.
import { fetchProducts } from "../../redux/product/productActions";

const MainPage: React.FC = () => {
  const products = useSelector((state: any) => state.product.products);
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Carousel autoPlay infiniteLoop interval={5000}  showStatus={false}>
        <div>
          <img src="/images/main/AHS2000.png" alt="image1" />
        </div>
        <div>
          <img src="/images/main/kor22.png" alt="image2" />
        </div>
        <div>
          <img src="/images/main/LP2000.png" alt="image3" />
        </div>
        <div>
          <img src="/images/main/OYF2000.png" alt="image4" />
        </div>
        <div>
          <img src="/images/main/PP2000.png" alt="image5" />
        </div>
      </Carousel>
      {products && products.length > 0 && (
        <ProductCarousel products={products} />
      )}
    </>
  );
};

export default MainPage;
