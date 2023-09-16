import React, { useState, useEffect, Dispatch } from "react";
import axios from "axios";
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
import { IProduct } from "../../redux/types/productTypes";
import mainRequest from "@/api/mainRequest";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchProduct,
  fetchProducts,
} from "../../redux/actions/productActions";
import { Navigate, useNavigate } from "react-router-dom";
import ProductCard from "./productCardForm";

const ProductListForm: React.FC = () => {
  // const [products, setProducts] = useState<IProduct[]>([]);
  const products = useSelector((state: any) => state.product.products);
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   mainRequest.post("/products/list")
  //     .then(response => {
  //       setProducts(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching products:", error);
  //     });
  // }, []);
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
          .map((product: IProduct) => (
            <ProductCard product={product} key={product.id} />
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
