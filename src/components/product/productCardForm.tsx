// ProductCard.tsx
import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { IProduct } from "../../redux/types/productTypes";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = (productId: number) => {
    // dispatch(fetchProduct(productId));
    navigate(`/product-detail/${productId}`);
  };

  return (
    <Card sx={{ width: "250px", margin: 2 }} key={product.id}>
      <CardActionArea onClick={() => handleCardClick(product.id)}>
        <CardMedia
          component="img"
          image={`/images/product/${product.image}`}
          alt={product.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: 20 }}
          >
            {product.name}
          </Typography>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="body1" component="span">
              {product.brand}
            </Typography>
            <Typography variant="body2" component="span">
              {Number(product.price).toLocaleString()}원
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
