import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  ButtonGroup,
} from "@mui/material";
import { IProduct } from '../../redux/types/productTypes';

const ProductListForm: React.FC = () => {
  const products: IProduct[] = [
    {
      id: 1,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },
    {
      id: 2,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },
    {
      id: 3,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },
    {
      id: 4,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },
    {
      id: 5,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },
    {
      id: 6,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },
    {
      id: 7,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },
    {
      id: 8,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },
    {
      id: 9,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },
    {
      id: 10,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },
    {
      id: 11,
      name: "울트라 얼티메이트 MG",
      brand: "푸마",
      price: "289000",
      image: "/images/product/puma-ultra-ultimate.png",
    },

    // 이하 동일하게 추가
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLElement>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  return (
    <Box>
      <Box
        display="flex"
        flexWrap="wrap"
        // justifyContent="space-between"
        p={1}
        m={1}
        bgcolor="background.paper"
        sx={{ maxWidth: "100%" }}
      >
        {products
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((product) => (
            <Card sx={{ maxWidth: "250px", margin: 2 }} key={product.id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  // style={{ objectFit: 'contain' }}
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
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
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
          ))}
      </Box>
      <Box display="flex" justifyContent="center">
        <ButtonGroup color="primary">
          {Array.from({ length: numberOfPages }, (_, index) => (
            <Button
              key={index}
              onClick={(event) => handleChangePage(event, index + 1)}
              variant={currentPage === index + 1 ? "contained" : "outlined"}
            >
              {index + 1}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default ProductListForm;
