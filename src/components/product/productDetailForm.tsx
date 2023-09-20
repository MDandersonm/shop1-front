import { addToCart, goToCheckOut } from "../../redux/actions/shoppingActions";
import {
  deleteProduct,
  fetchProduct,
} from "../../redux/actions/productActions";
import { RootState } from "@/redux/reducers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkUser } from "../../redux/actions/userActions";

type RouteParams = {
  [key: string]: string | undefined;
};

const ProductDetailForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

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

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.user);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleButtonClick = (action: () => void) => {
    if (isLoggedIn) {
      action();
    } else {
      setOpenDialog(true);
    }
  };

  const handleAddToCart = () => {
    //장바구니 추가
    if (product) {
      console.log("user?.username",user?.username);
      dispatch(addToCart("cart", product, selectedSize));
      toast.success("장바구니에 추가되었습니다!");
    } else {
      alert("product가 null입니다");
    }
  };

  const handleGoToCheckOut = () => {
    //바로구매
    if (product) {
      dispatch(goToCheckOut("direct", product, selectedSize));
      navigate("/checkout");
    } else {
      alert("product가 null입니다");
    }
  };

  useEffect(() => {
    dispatch(checkUser());
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  const handleUpdateClick = (productId: number) => {
    navigate(`/product-update/${productId}`);
  };
  const handleDeleteClick = (productId: number) => {
    dispatch(deleteProduct(productId));

    navigate(`/product-list`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No Product Found</div>;

  return (
    <>
      <Container style={{
                minWidth: "800px",
              }}>
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
                  onClick={() => handleButtonClick(handleAddToCart)}
                >
                  <ShoppingCartIcon style={{ marginRight: "5px" }} />
                  장바구니
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleButtonClick(handleGoToCheckOut)}
                >
                  바로구매
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    // 관심상품에 대한 로직 추가 필요
                    handleButtonClick(() => {
                      // 로그인이 되어 있을 때 수행될 관심상품 로직
                    });
                  }}
                >
                  관심상품
                </Button>
              </div>
              {user?.role === "ROLE_ADMIN" && (
                <div style={{ marginTop: "35px", marginBottom: "24px" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      handleUpdateClick(product.id);
                    }}
                  >
                    <EditIcon style={{ marginRight: "5px" }} />
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      handleDeleteClick(product.id);
                    }}
                  >
                    <DeleteIcon style={{ marginRight: "5px" }} />
                    삭제
                  </Button>
                </div>
              )}
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>로그인 필요</DialogTitle>
        <DialogContent>
          <DialogContentText>로그인하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              navigate("/sign-in");
              setOpenDialog(false);
            }}
            color="primary"
          >
            네
          </Button>
          <Button
            onClick={() => setOpenDialog(false)}
            color="primary"
            autoFocus
          >
            아니오
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductDetailForm;
