import { addToCart } from "../../redux/actions/shoppingActions";
import { fetchProduct } from "../../redux/actions/productActions";
import { RootState } from "@/redux/reducers";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

import { toast } from 'react-toastify';


type RouteParams = {
  [key: string]: string | undefined;
};

const ProductDetailForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const { product, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  const { id } = useParams<RouteParams>();
  const productId = Number(id);

  const sizes = ["240", "250", "260", "270", "280"];
  const [selectedSize, setSelectedSize] = React.useState(sizes[0]);

  const handleSizeChange = (event: SelectChangeEvent<string>) => {
    setSelectedSize(event.target.value as string);
  };
  const handleAddToCart = () => {
    dispatch(addToCart(product, selectedSize));
    toast.success("장바구니에 추가되었습니다!");
}

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No Product Found</div>;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <img
            src={
              product.image
                ? `/images/product/${product.image}`
                : "/path/to/default/image.jpg"
            }
            alt={product.name || "상품 이미지"}
            style={{
              width: "400px",
              objectFit: "cover",
              borderRadius: "10px",
              border: "0.5px solid lightgrey",
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Box
            style={{
              padding: "16px",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              style={{ marginBottom: "24px" }}
            >
              {product.name}
            </Typography>
            <Typography variant="subtitle2" style={{ marginBottom: "24px" }}>
              브랜드:{product.brand}
            </Typography>
            <Typography variant="subtitle2" style={{ marginBottom: "24px" }}>
              가격: {product.price.toLocaleString()}원
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <Typography variant="subtitle2" style={{ marginRight: "10px" }}>
                사이즈:
              </Typography>
              <Select
                value={selectedSize}
                onChange={handleSizeChange}
                variant="outlined"
                style={{ height: "30px", padding: "0 5px" }}
              >
                {sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon style={{ marginRight: "5px" }} />
                장바구니
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: "10px" }}
              >
                바로구매
              </Button>
              <Button variant="outlined">관심상품</Button>
            </div>
          </Box>
        </Grid>
      </Grid>

      <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />

      {product.detailImages &&
        product.detailImages.map((detailImage, index) => (
          <img
            key={index}
            src={
              detailImage.detailImageUrl
                ? `/images/product/${detailImage.detailImageUrl}`
                : "/path/to/default/detail/image.jpg"
            }
            alt={`상세 이미지 ${index + 1} ${detailImage.detailImageUrl}`}
            style={{
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
              border: "0.5px solid lightgrey",
              marginBottom: "20px", // 각 이미지 간 간격을 주기 위함
            }}
          />
        ))}
    </Container>
  );
};

export default ProductDetailForm;
