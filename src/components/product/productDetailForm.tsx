import { fetchProduct } from "../../redux/actions/productActions";
import { RootState } from "@/redux/reducers";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { Dispatch, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

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
              브랜드: {product.brand}
            </Typography>
            <Typography variant="subtitle2" style={{ marginBottom: "24px" }}>
              가격: {product.price.toLocaleString()}원
            </Typography>
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
