import React, { useState, useEffect, Dispatch } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Tabs,
  Tab,
  SelectChangeEvent,
} from "@mui/material";
import { IProduct } from "../../redux/types/productTypes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/actions/productActions";
import ProductCard from "./productCardForm";

const ProductListForm: React.FC = () => {
  // const [products, setProducts] = useState<IProduct[]>([]);
  const products = useSelector((state: any) => state.product.products);
  const dispatch: Dispatch<any> = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [brand, setBrand] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("latest");

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

  const handleBrandChange = (event: SelectChangeEvent<string>) => {
    setBrand(event.target.value);
  };

  const handleSearchNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchName(event.target.value);
  };

  const handleSortChange = (event: React.SyntheticEvent, newValue: string) => {
    setSortOrder(newValue);
  };

  const filteredProducts = products.filter((product: IProduct) => {
    if (brand && product.brand !== brand) return false;
    if (searchName && !product.name.includes(searchName)) return false;
    return true;
  });

  const sortedProducts = filteredProducts.sort((a: IProduct, b: IProduct) => {
    switch (sortOrder) {
      case "priceLowToHigh":
        return Number(a.price) - Number(b.price);
      case "priceHighToLow":
        return Number(b.price) - Number(a.price);
      default:
        return 0; // 최신순 정렬 (현재 로직에서는 기본 배열 순서를 유지)
    }
  });

  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" p={1} m={1}>
        <Tabs value={sortOrder} onChange={handleSortChange}>
          <Tab value="latest" label="최신순" />
          <Tab value="priceLowToHigh" label="가격 낮은순" />
          <Tab value="priceHighToLow" label="가격 높은순" />
        </Tabs>
        <FormControl
          variant="outlined"
          sx={{ marginLeft: 10, marginRight: 10, width: 200 }}
        >
          <InputLabel id="brand-label">Brand</InputLabel>
          <Select
            labelId="brand-label"
            value={brand}
            onChange={handleBrandChange}
            label="Brand"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="나이키">나이키</MenuItem>
            <MenuItem value="아디다스">아디다스</MenuItem>
            <MenuItem value="푸마">푸마</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search Name"
          variant="outlined"
          value={searchName}
          onChange={handleSearchNameChange}
          sx={{ marginRight: 10 }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        // justifyContent="space-between"
        p={1}
        m={1}
        bgcolor="background.paper"
        sx={{ maxWidth: "100%" }}
      >
        {displayedProducts.map((product: IProduct) => (
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
