// CartPage.tsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/reducers";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/actions/shoppingActions";

const CartForm: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.shopping.cart);
  const totalPrice = cartItems.reduce((acc, item) => {
    console.log("Price:", item.product.price);
    console.log("Quantity:", item.quantity);
    const price =
      typeof item.product.price === "number" ? item.product.price : 0;
    const quantity = typeof item.quantity === "number" ? item.quantity : 0;

    return acc + price * quantity;
  }, 0);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const product = cartItems[index].product;
    const currentQuantity = cartItems[index].quantity;
    const size = cartItems[index].size; // size 정보를 가져옵니다.

    if (newQuantity > currentQuantity) {
      dispatch(incrementQuantity(product.id, size));
    } else if (newQuantity < currentQuantity && newQuantity >= 1) {
      dispatch(decrementQuantity(product.id, size));
    }
  };

  return (
    <div>
      {cartItems.map((item, index) => (
        <Card
          key={item.product.id + item.size}
          style={{ display: "flex", marginBottom: "20px" }}
        >
          <CardMedia
            component="img"
            image={
              item.product.image
                ? `/images/product/${item.product.image}`
                : "/path/to/default/image.jpg"
            }
            alt={item.product.name}
            style={{ width: "150px" }}
          />
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="h5">{item.product.name}</Typography>
            <Typography>brand: {item.product.brand}</Typography>
            <Typography>Size: {item.size}</Typography>
            <Typography>Price: {Number(item.product.price).toLocaleString()}원</Typography>
          </CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <TextField
              value={item.quantity}
              type="number"
              inputProps={{ min: 1 }}
              style={{ width: "50px", margin: "0 20px" }}
              onChange={(e) => handleQuantityChange(index, +e.target.value)} // + 기호를 붙이면, JavaScript는 해당 문자열을 숫자로 변환
            />

            <Typography style={{ margin: "0 20px" }}>
              Total:  {Number(item.product.price * item.quantity).toLocaleString()}원 
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              //   flexDirection: "row",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              style={{
                // backgroundColor: "darkred",
                // color: "white",
                height: "40px",
              }}
              onClick={() =>
                dispatch(removeFromCart(item.product.id, item.size))
              }
            >
              Remove
            </Button>
          </div>
        </Card>
      ))}
      <Typography
        variant="h6"
        style={{ textAlign: "right", marginRight: "20px" }}
      >
        Total Price:  {Number(totalPrice).toLocaleString()}원
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ display: "block", margin: "20px auto", width: "100px" }}
      >
        결제
      </Button>
    </div>
  );
};

export default CartForm;